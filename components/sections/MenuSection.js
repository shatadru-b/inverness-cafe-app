'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { defaultMenuData } from '@/lib/menuData';
import { useCart } from '@/lib/CartContext';
import ItemCustomiseModal from '@/components/ItemCustomiseModal';
import styles from './menu.module.css';

const PLACEHOLDER_IMAGE = '/images/menu/burger-classic.jpg';

function getItemImage(item) {
  return item.image || PLACEHOLDER_IMAGE;
}

const categories = Object.keys(defaultMenuData);

function getTagLabel(tag) {
  if (tag === 'popular') return 'Popular';
  if (tag === 'vegetarian') return 'Vegetarian';
  if (tag === 'spicy') return 'Spicy';
  return tag;
}

function categoryAnchorId(cat) {
  return `menu-${cat}`;
}

function formatPrice(price) {
  return `£${Number(price).toFixed(2)}`;
}

/**
 * Fixed nav + sticky tab strip height (px).
 * iOS Safari often reports sticky height after layout; re-measure from live DOM.
 */
function getStickyOffsetPx(stickyEl) {
  const navH =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
  const stickyH = stickyEl?.offsetHeight || 72;
  return navH + stickyH;
}

/** Extra scroll so section top sits clearly past the spy line (iOS smooth-scroll undershoot). */
const SCROLL_OVERSHOOT_PX = 24;
/** Spy activates a little early so near-miss landings still highlight the right tab. */
const SPY_SLACK_PX = 20;

function scrollYForCategory(cat, stickyEl) {
  const el = document.getElementById(categoryAnchorId(cat));
  if (!el) return null;
  const offset = getStickyOffsetPx(stickyEl);
  // Scroll further down than exact offset so top ends up < offset after iOS settles
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset + SCROLL_OVERSHOOT_PX);
}

/**
 * @param {object} [props]
 * @param {string[]} [props.onlyCategories] Limit to these category keys (e.g. ['pizza'])
 * @param {string} [props.heading] Override section H2 title
 * @param {string} [props.subtitle] Override section subtitle
 * @param {boolean} [props.hideHeader] Hide the default section header (when page has its own H1)
 */
export default function MenuSection({
  onlyCategories,
  heading = 'Our Menu',
  subtitle = 'Crafted with passion, served with love',
  hideHeader = false,
} = {}) {
  const categoryKeys = onlyCategories?.length
    ? onlyCategories.filter((c) => defaultMenuData[c])
    : categories;
  const initialCat = categoryKeys[0] || 'pizza';
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [customiseItem, setCustomiseItem] = useState(null);
  const { cartItems, addToCart, updateQuantity } = useCart();
  const stickyRef = useRef(null);
  /** When set, scroll-spy must not override the tab the user just clicked. */
  const clickLockRef = useRef(null);
  const unlockTimerRef = useRef(null);

  const scrollToCategory = useCallback((cat) => {
    const el = document.getElementById(categoryAnchorId(cat));
    if (!el) return;

    // Pin highlight to the clicked tab — spy must not steal it mid-scroll
    clickLockRef.current = cat;
    setActiveCategory(cat);
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

    const offset = getStickyOffsetPx(stickyRef.current);
    el.style.scrollMarginTop = `${offset - SCROLL_OVERSHOOT_PX}px`;

    // Global scroll-padding (nav only) would land short of sticky+nav.
    const root = document.documentElement;
    const prevPad = root.style.scrollPaddingTop;
    root.style.scrollPaddingTop = '0px';

    const targetY = scrollYForCategory(cat, stickyRef.current);
    if (targetY != null) {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }

    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      root.style.scrollPaddingTop = prevPad;
      window.removeEventListener('scrollend', onScrollEnd);
      if (unlockTimerRef.current) {
        clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = null;
      }

      // Snap-correct if still short of spy line (iOS smooth scroll / rubber band)
      const off = getStickyOffsetPx(stickyRef.current);
      const still = document.getElementById(categoryAnchorId(cat));
      if (still) {
        const top = still.getBoundingClientRect().top;
        // Need top <= off - a few px so spy picks this category
        if (top > off - 4) {
          const y = scrollYForCategory(cat, stickyRef.current);
          if (y != null) window.scrollTo({ top: y, behavior: 'auto' });
        }
      }

      setActiveCategory(cat);
      // Hold lock one more frame so a late scroll event can't revert the tab
      requestAnimationFrame(() => {
        setActiveCategory(cat);
        clickLockRef.current = null;
      });
    };

    const onScrollEnd = () => release();
    window.addEventListener('scrollend', onScrollEnd);
    // iOS often lacks scrollend — fallback; keep lock until settle + snap
    unlockTimerRef.current = setTimeout(release, 1200);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat && defaultMenuData[cat]) {
      const t = setTimeout(() => scrollToCategory(cat), 200);
      return () => clearTimeout(t);
    }
  }, [scrollToCategory]);

  // Scroll-spy: last category whose top has crossed (sticky bottom + slack)
  useEffect(() => {
    let ticking = false;

    const updateActiveFromScroll = () => {
      ticking = false;
      if (clickLockRef.current) return;

      const offset = getStickyOffsetPx(stickyRef.current);
      const line = offset + SPY_SLACK_PX;
      let current = categoryKeys[0];
      for (const cat of categoryKeys) {
        const el = document.getElementById(categoryAnchorId(cat));
        if (!el) continue;
        // Activate once header reaches sticky strip (with slack for iOS undershoot)
        if (el.getBoundingClientRect().top <= line) current = cat;
      }
      setActiveCategory((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveFromScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // iOS URL bar show/hide changes layout without always firing scroll reliably
    window.visualViewport?.addEventListener('resize', onScroll);
    updateActiveFromScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.visualViewport?.removeEventListener('resize', onScroll);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, [categoryKeys.join('|')]);

  /** Total qty of this menu item across all cart line variants. */
  const qtyForItem = (itemId) =>
    cartItems.filter((i) => i.id === itemId).reduce((s, i) => s + (i.quantity || 0), 0);

  /** Decrement one unit from the last cart line for this menu item. */
  const decrementItem = (itemId) => {
    const lines = cartItems.filter((i) => i.id === itemId);
    if (!lines.length) return;
    const line = lines[lines.length - 1];
    const key = line.cartKey || line.id;
    updateQuantity(key, (line.quantity || 1) - 1);
  };

  const handleAddClick = (item) => {
    if (item.available === false) return;
    if (item.productType === 'pizza' || item.productType === 'pasta') {
      setCustomiseItem(item);
      return;
    }
    addToCart(item);
  };

  const handleCustomiseConfirm = (configuredItem) => {
    addToCart(configuredItem);
    setCustomiseItem(null);
  };

  const renderMenuItem = (item) => {
    const imageSrc = getItemImage(item);
    const canOrder = item.available !== false && Number(item.price) > 0;
    const needsCustomise = item.productType === 'pizza' || item.productType === 'pasta';
    const qty = qtyForItem(item.id);
    const addLabel = needsCustomise
      ? item.productType === 'pizza'
        ? 'Customise & add'
        : 'Choose type & add'
      : 'Add to Cart';

    return (
      <article className={styles.itemCard} key={item.id}>
        <div className={styles.itemCardImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={`${item.name} at Inverness Cafe & Pizzeria`}
            loading="lazy"
          />
          {!item.available && (
            <div className={styles.itemCardSoldOut}>
              <span>Sold Out</span>
            </div>
          )}
          {item.featured && (
            <span className={styles.itemCardFeatured}>Chef&apos;s Favourite</span>
          )}
          {item.tags?.length > 0 && (
            <div className={styles.itemCardTagsOnImage}>
              {item.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.itemCardTag}>{getTagLabel(tag)}</span>
              ))}
            </div>
          )}
        </div>
        <div className={styles.itemCardBody}>
          <div className={styles.itemCardTitleRow}>
            <h4 className={styles.itemCardName}>{item.name}</h4>
            <span className={styles.itemCardPrice}>{formatPrice(item.price)}</span>
          </div>
          {item.description && (
            <p className={styles.itemCardDesc}>{item.description}</p>
          )}
          {item.productType === 'pizza' && (
            <p className={styles.itemCardHint}>Optional extra toppings +£1.95 each</p>
          )}
          {item.productType === 'pasta' && (
            <p className={styles.itemCardHint}>Choose penne, fusilli or spaghetti</p>
          )}
          {canOrder && (
            <div className={styles.itemCardActions}>
              {qty > 0 ? (
                <div className={styles.qtyControl} role="group" aria-label={`Quantity for ${item.name}`}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => decrementItem(item.id)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{qty}</span>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => handleAddClick(item)}
                    aria-label={needsCustomise ? 'Add another (customise)' : 'Increase quantity'}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.itemCardAddBtn}
                  onClick={() => handleAddClick(item)}
                >
                  {addLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </article>
    );
  };

  const showTabs = categoryKeys.length > 1;

  return (
    <section id="menu" className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
      <div className="container">
        {!hideHeader && (
          <div className="section-header">
            <div className="section-tag">Full Menu</div>
            <h2 className="section-title">{heading}</h2>
            <p className="section-subtitle">{subtitle}</p>
          </div>
        )}

        {showTabs && (
          <div className={styles.tabsSticky} ref={stickyRef}>
            <div className={styles.tabs}>
              {categoryKeys.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`menu-tab${activeCategory === cat ? ' active' : ''}`}
                  aria-current={activeCategory === cat ? 'true' : undefined}
                  onClick={() => scrollToCategory(cat)}
                >
                  {defaultMenuData[cat].title}
                </button>
              ))}
            </div>
          </div>
        )}

        {categoryKeys.map((cat) => {
          const data = defaultMenuData[cat];
          return (
            <div key={cat} id={categoryAnchorId(cat)} className={styles.categoryBlock}>
              <div className={styles.catHeader}>
                <h3 style={{ fontFamily: 'var(--ff-heading)', fontSize: '1.875rem', fontWeight: 700 }}>{data.title}</h3>
                <div className={styles.catLine}></div>
              </div>
              {data.description && (
                <p style={{ color: 'var(--clr-text-muted)', marginTop: '-1rem', marginBottom: '1.5rem' }}>{data.description}</p>
              )}

              {data.items && (
                <div className={styles.menuGrid}>
                  {data.items.map((item) => renderMenuItem(item))}
                </div>
              )}

              {data.subcategories && data.subcategories.map((sub) => (
                <div key={sub.name}>
                  <h4 className={styles.subHeader}>
                    {sub.name}
                    {sub.subtitle && <span className={styles.subHeaderSub}> — {sub.subtitle}</span>}
                  </h4>
                  <div className={styles.menuGrid}>
                    {sub.items.map((item) => renderMenuItem(item))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {customiseItem && (
        <ItemCustomiseModal
          item={customiseItem}
          onClose={() => setCustomiseItem(null)}
          onConfirm={handleCustomiseConfirm}
        />
      )}
    </section>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { defaultMenuData } from '@/lib/menuData';
import { useCart } from '@/lib/CartContext';
import ItemCustomiseModal from '@/components/ItemCustomiseModal';
import styles from './menu.module.css';

const categoryEmojis = {
  pizza: '🍕',
  pasta: '🍝',
  burgers: '🍔',
  sides: '🥗',
  kitchen: '🍳',
  juices: '🧃',
  shakes: '🥤',
  coffee: '☕',
};

const PLACEHOLDER_IMAGE = '/images/menu/burger-classic.jpg';

function getItemImage(item) {
  return item.image || PLACEHOLDER_IMAGE;
}

const categories = Object.keys(defaultMenuData);

function getTagLabel(tag) {
  if (tag === 'popular') return '⭐ Popular';
  if (tag === 'vegetarian') return '🌱 Vegetarian';
  if (tag === 'spicy') return '🌶️ Spicy';
  return tag;
}

function categoryAnchorId(cat) {
  return `menu-${cat}`;
}

function formatPrice(price) {
  return `£${Number(price).toFixed(2)}`;
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('pizza');
  const [addedItems, setAddedItems] = useState({});
  const [customiseItem, setCustomiseItem] = useState(null);
  const { addToCart } = useCart();

  const scrollToCategory = useCallback((cat) => {
    const el = document.getElementById(categoryAnchorId(cat));
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    setActiveCategory(cat);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat && defaultMenuData[cat]) {
      setActiveCategory(cat);
      const t = setTimeout(() => scrollToCategory(cat), 200);
      return () => clearTimeout(t);
    }
  }, [scrollToCategory]);

  useEffect(() => {
    let ticking = false;

    const updateActiveFromScroll = () => {
      ticking = false;
      const stickyBar = document.querySelector(`.${styles.tabsSticky}`);
      const stickyH = stickyBar ? stickyBar.getBoundingClientRect().height : 64;
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
      const markerY = navH + stickyH + 24;

      let current = categories[0];
      for (const cat of categories) {
        const el = document.getElementById(categoryAnchorId(cat));
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - markerY <= 0) current = cat;
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
    updateActiveFromScroll();
    const t = setTimeout(updateActiveFromScroll, 300);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t);
    };
  }, []);

  const flashAdded = (key) => {
    setAddedItems((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [key]: false }));
    }, 1500);
  };

  const handleAddClick = (item) => {
    if (item.available === false) return;
    if (item.productType === 'pizza' || item.productType === 'pasta') {
      setCustomiseItem(item);
      return;
    }
    addToCart(item);
    flashAdded(item.id);
  };

  const handleCustomiseConfirm = (configuredItem) => {
    addToCart(configuredItem);
    flashAdded(configuredItem.id);
    setCustomiseItem(null);
  };

  const renderMenuItem = (item) => {
    const imageSrc = getItemImage(item);
    const canOrder = item.available !== false && Number(item.price) > 0;
    const needsCustomise = item.productType === 'pizza' || item.productType === 'pasta';
    const buttonLabel = addedItems[item.id]
      ? '✓ Added'
      : needsCustomise
        ? item.productType === 'pizza'
          ? 'Customise & add'
          : 'Choose type & add'
        : '+ Add to Cart';

    return (
      <article className={styles.itemCard} key={item.id}>
        <div className={styles.itemCardImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={item.name} loading="lazy" />
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
              <button
                type="button"
                className={`${styles.itemCardAddBtn} ${addedItems[item.id] ? styles.itemCardAddBtnAdded : ''}`}
                onClick={() => handleAddClick(item)}
              >
                {buttonLabel}
              </button>
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <section id="menu" className="site-section section-padding" style={{ background: 'var(--clr-bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Full Menu</div>
          <h2 className="section-title">Our Menu</h2>
          <p className="section-subtitle">Crafted with passion, served with love</p>
        </div>

        <div className={styles.tabsSticky}>
          <div className={styles.tabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`menu-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => scrollToCategory(cat)}
              >
                {categoryEmojis[cat] || '🍽️'} {defaultMenuData[cat].title}
              </button>
            ))}
          </div>
        </div>

        {categories.map((cat) => {
          const data = defaultMenuData[cat];
          return (
            <div key={cat} id={categoryAnchorId(cat)} className={styles.categoryBlock}>
              <div className={styles.catHeader}>
                <span style={{ fontSize: '2.25rem' }}>{categoryEmojis[cat] || '🍽️'}</span>
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

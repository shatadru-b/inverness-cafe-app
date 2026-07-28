'use client';

import { useEffect, useState } from 'react';
import { PIZZA_TOPPINGS, PASTA_TYPES, TOPPING_PRICE } from '@/lib/menuData';
import styles from './ItemCustomiseModal.module.css';

/**
 * Option A customise sheet:
 * - Pizza: optional extra toppings (+£ each)
 * - Pasta: required pasta shape (free)
 */
export default function ItemCustomiseModal({ item, onClose, onConfirm }) {
  const isPizza = item?.productType === 'pizza';
  const isPasta = item?.productType === 'pasta';
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [pastaType, setPastaType] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setSelectedToppings([]);
    setPastaType(null);
    setError('');
    // Lock body scroll while open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;

  const toggleTopping = (topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.find((t) => t.id === topping.id);
      if (exists) return prev.filter((t) => t.id !== topping.id);
      return [...prev, topping];
    });
  };

  const toppingsTotal = selectedToppings.length * TOPPING_PRICE;
  const unitPrice = Number(item.price) + toppingsTotal;

  const handleConfirm = () => {
    if (isPasta && !pastaType) {
      setError('Please choose a pasta type');
      return;
    }
    setError('');

    const pastaMeta = PASTA_TYPES.find((p) => p.id === pastaType);
    onConfirm({
      ...item,
      price: unitPrice,
      basePrice: Number(item.price),
      toppings: isPizza ? selectedToppings.map(({ id, name, price }) => ({ id, name, price })) : [],
      pastaType: isPasta ? pastaType : undefined,
      pastaTypeName: isPasta ? pastaMeta?.name : undefined,
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.sheet}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="customise-title"
      >
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p className={styles.kicker}>{isPizza ? 'Customise pizza' : isPasta ? 'Choose pasta type' : 'Customise'}</p>
            <h3 id="customise-title">{item.name}</h3>
            <p className={styles.sub}>{item.description}</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className={styles.body}>
          {isPasta && (
            <section className={styles.section}>
              <h4 className={styles.sectionTitle}>
                Pasta type <span className={styles.required}>Required</span>
              </h4>
              <p className={styles.sectionHint}>No extra charge — pick one shape</p>
              <div className={styles.optionGrid}>
                {PASTA_TYPES.map((type) => {
                  const active = pastaType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      className={`${styles.optionCard} ${active ? styles.optionCardActive : ''}`}
                      onClick={() => {
                        setPastaType(type.id);
                        setError('');
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={type.image} alt="" className={styles.optionImg} />
                      <span className={styles.optionName}>{type.name}</span>
                      <span className={styles.optionMeta}>{type.description}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {isPizza && (
            <section className={styles.section}>
              <h4 className={styles.sectionTitle}>
                Extra toppings <span className={styles.optional}>Optional</span>
              </h4>
              <p className={styles.sectionHint}>+£{TOPPING_PRICE.toFixed(2)} each</p>
              <div className={styles.chipGrid}>
                {PIZZA_TOPPINGS.map((topping) => {
                  const active = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                      onClick={() => toggleTopping(topping)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={topping.image} alt="" className={styles.chipImg} />
                      <span>{topping.name}</span>
                      <span className={styles.chipPrice}>+£{topping.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
              {selectedToppings.length > 0 && (
                <p className={styles.selectedSummary}>
                  Selected: {selectedToppings.map((t) => t.name).join(', ')}
                </p>
              )}
            </section>
          )}

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.footer}>
          <div className={styles.totalBlock}>
            <span className={styles.totalLabel}>Item total</span>
            <span className={styles.totalValue}>£{unitPrice.toFixed(2)}</span>
          </div>
          <button type="button" className={`btn btn-primary ${styles.confirmBtn}`} onClick={handleConfirm}>
            Add to cart — £{unitPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

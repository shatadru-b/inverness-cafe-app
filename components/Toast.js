'use client';

import { useState } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  return (
    <div className={`toast ${type}`} role="alert">
      <span>{type === 'success' ? '✅' : '❌'}</span>
      <span>{message}</span>
      <button onClick={onClose} style={{ marginLeft: '1rem', opacity: 0.6, fontSize: '1.2rem' }}>×</button>
    </div>
  );
}

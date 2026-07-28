'use client';

import { useEffect } from 'react';

/** Legacy route → single-page section */
export default function MenuRedirect() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    window.location.replace(cat ? `/?cat=${encodeURIComponent(cat)}#menu` : '/#menu');
  }, []);

  return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-text-muted)' }}>
      Opening menu…
    </div>
  );
}

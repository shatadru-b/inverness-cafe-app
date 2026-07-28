'use client';

import { useEffect } from 'react';

/** Legacy route → single-page section */
export default function ContactRedirect() {
  useEffect(() => {
    window.location.replace('/#contact');
  }, []);

  return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-text-muted)' }}>
      Opening contact…
    </div>
  );
}

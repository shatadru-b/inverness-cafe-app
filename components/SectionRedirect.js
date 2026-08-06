'use client';

import { useEffect } from 'react';

/** Legacy path → home hash section (static export has no next.config redirects). */
export default function SectionRedirect({ section, preserveCat }) {
  useEffect(() => {
    let target = `/#${section}`;
    if (preserveCat) {
      const cat = new URLSearchParams(window.location.search).get('cat');
      if (cat) target = `/?cat=${encodeURIComponent(cat)}#${section}`;
    }
    window.location.replace(target);
  }, [section, preserveCat]);

  return null;
}

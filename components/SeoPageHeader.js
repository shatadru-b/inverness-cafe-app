/**
 * Lightweight SEO page intro — one H1 + optional lead.
 * Uses existing site section styles only (no new visual system).
 */
export default function SeoPageHeader({ title, lead, tag }) {
  return (
    <div className="section-header" style={{ paddingTop: '2rem', marginBottom: '1.5rem' }}>
      {tag ? <div className="section-tag">{tag}</div> : null}
      <h1 className="section-title">{title}</h1>
      {lead ? <p className="section-subtitle">{lead}</p> : null}
    </div>
  );
}

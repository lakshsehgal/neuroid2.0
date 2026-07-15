// Neuroid — temporary "website in progress" holding page, shown site-wide
// while the full site is being fixed. Rendered by app/layout.js when
// MAINTENANCE_MODE is true; flip that flag to bring the site back. Server
// component on purpose (no hooks) so every route stays static while gated.

const TICKER_LINE = 'WEBSITE IN PROGRESS · NEUROID · BACK SOON · '.repeat(6);

export default function Maintenance() {
  return (
    <div className="wip-root">
      <div className="wip-ticker" aria-hidden="true">
        <div className="wip-ticker-track">
          <span>{TICKER_LINE}</span>
          <span>{TICKER_LINE}</span>
        </div>
      </div>

      <main className="wip-main">
        <div className="wip-card">
          <div className="wip-eyebrow">
            <i className="wip-square" />
            Neuroid — Status
          </div>
          <h1 className="wip-headline">
            Website in <span className="nrd-highlight">progress</span>
            <span className="nrd-stop">.</span>
          </h1>
          <p className="wip-copy">
            We&rsquo;re rebuilding the site to make it faster and sharper.
            The full experience will be back shortly.
          </p>
          <p className="wip-copy wip-copy--muted">
            Need us in the meantime? We&rsquo;re one email away.
          </p>
          <div className="wip-actions">
            <a className="wip-btn" href="mailto:laksh@neuroidmedia.com">
              Email Neuroid
            </a>
            <span className="nrd-pixels" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>
      </main>

      <div className="wip-ticker wip-ticker--yellow" aria-hidden="true">
        <div className="wip-ticker-track">
          <span>{TICKER_LINE}</span>
          <span>{TICKER_LINE}</span>
        </div>
      </div>
    </div>
  );
}

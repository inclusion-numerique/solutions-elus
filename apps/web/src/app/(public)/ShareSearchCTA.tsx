import Link from 'next/link'

export const ShareSearchCTA = () => (
  <div className="fr-py-20v fr-pb-24v fr-background-alt--blue-france">
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--gutters">
        <div
          className="fr-col-12"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <picture>
            <img
              src="/dsfr/artwork/pictograms/buildings/city-hall.svg"
              alt="Boite email"
              style={{ textAlign: 'center', width: 96 }}
            />
          </picture>
          <h2 className="fr-mt-1v" style={{ textAlign: 'center' }}>
            Je suis maire ou président d&apos;intercommunalité
          </h2>
          <div className="fr-btns-group fr-btns-group--inline-md fr-btns-group--icon-left">
            <Link
              href="/partager"
              className="fr-btn fr-mb-0 fr-icon-send-plane-fill"
            >
              Je partage mes solutions&nbsp;!
            </Link>
            <Link
              href="/projets"
              className="fr-btn fr-mt-4v fr-mt-md-0 fr-mb-0 fr-icon-search-line"
            >
              Je cherche des solutions&nbsp;!
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)
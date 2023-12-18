import Link from 'next/link'
import { PublicHeaderNav } from '@sde/web/app/(public)/PublicHeaderNav'

const PublicHeader = () => (
  <header role="banner" className="fr-header">
    <div className="fr-header__body">
      <div className="fr-container">
        <div className="fr-header__body-row">
          <div className="fr-header__brand fr-enlarge-link">
            <div className="fr-header__brand-top">
              <div className="fr-header__logo">
                <Link
                  href="/"
                  aria-current="page"
                  target="_self"
                  title="Solutions d'élus"
                >
                  <p className="fr-logo">
                    Ministère
                    <br />
                    de la transition
                    <br />
                    écologique
                    <br />
                    et de la cohésion
                    <br />
                    des territoires
                  </p>
                </Link>
              </div>
              <div className="fr-header__navbar">
                <button
                  id="fr-btn-menu-mobile"
                  data-fr-opened="false"
                  aria-controls="modal-menu-mobile"
                  aria-haspopup="menu"
                  title="Menu"
                  className="fr-btn--menu fr-btn"
                  data-fr-js-modal-button="true"
                >
                  Menu
                </button>
              </div>
            </div>
            <div className="fr-header__service">
              <Link
                href="/"
                aria-current="page"
                target="_self"
                title="Solutions d'élus"
              >
                <h2>Solutions d&apos;élus</h2>
              </Link>
            </div>
          </div>
          <div
            className="fr-header__tools fr-hidden fr-unhidden-lg"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <picture>
              <img
                alt="Logo du Conseil National de la Refondation"
                src="/images/cnr_logo_horizontal.svg"
                className="fr-p-2v"
                width={239}
                height={83}
              />
            </picture>
            <picture>
              <img
                alt="Logo de l'Agence Nationale de la Cohésion des Territoires"
                src="/images/logo-anct.svg"
                className="fr-p-2v fr-ml-4w"
                width={190}
                height={80}
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
    <div className="fr-header__menu fr-modal" id="fr-menu-mobile">
      <div className="fr-container">
        <button
          type="button"
          className="fr-btn--close fr-btn"
          aria-controls="fr-menu-mobile"
        >
          Fermer
        </button>
        <div className="fr-header__menu-links">
          <ul className="fr-btns-group" />
        </div>
        <nav className="fr-nav" id="fr-navigation" aria-label="Menu principal">
          <PublicHeaderNav />
        </nav>
      </div>
    </div>
    <div id="modal-menu-mobile" className="fr-header__menu fr-modal" aria-label="Menu principal">
      <div className="fr-container">
        <button
          aria-controls="modal-menu-mobile"
          className="fr-btn--close fr-btn"
        >
          Fermer
        </button>
        <div className="fr-header__menu-links">
          <ul className="fr-btns-group">
            <li>
              <Link
                className="fr-btn"
                href="/"
                aria-controls="modal-menu-mobile"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                className="fr-btn"
                href="/partager"
                aria-controls="modal-menu-mobile"
              >
                Partager
              </Link>
            </li>
            <li>
              <Link
                className="fr-btn"
                href="/projets"
                aria-controls="modal-menu-mobile"
              >
                Voir les projets
              </Link>
            </li>
            <li>
              <Link
                className="fr-btn"
                href="/contact"
                aria-controls="modal-menu-mobile"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
)

export default PublicHeader

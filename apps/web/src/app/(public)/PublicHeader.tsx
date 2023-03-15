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
                    className="nuxt-link-exact-active nuxt-link-active"
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
                <div className="fr-header__operator">
                  <h2>Solutions d&apos;élus</h2>
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
            </div>
          </div>
        </div>
      </div>
      <div
        className="fr-header__menu fr-modal"
        id="fr-menu-mobile"
        data-fr-js-modal="true"
        data-fr-js-header-modal="true"
      >
        <div className="fr-container">
          <button
            type="button"
            className="fr-btn--close fr-btn"
            aria-controls="fr-menu-mobile"
            data-fr-js-modal-button="true"
          >
            Fermer
          </button>
          <div className="fr-header__menu-links">
            <ul className="fr-btns-group" data-fr-js-header-links="true" />
          </div>
          <nav
            className="fr-nav"
            id="fr-navigation"
            aria-label="Menu principal"
            data-fr-js-navigation="true"
          >
            <PublicHeaderNav />
          </nav>
        </div>
      </div>
      <div
        id="modal-menu-mobile"
        className="fr-header__menu fr-modal"
        data-fr-js-modal="true"
        data-fr-js-header-modal="true"
      >
        <div className="fr-container">
          <button
            aria-controls="modal-menu-mobile"
            className="fr-btn--close fr-btn"
            data-fr-js-modal-button="true"
          >
            Fermer
          </button>
          <div className="fr-header__menu-links">
            <ul className="fr-btns-group" data-fr-js-header-links="true">
              <li>
                <Link className="fr-btn" href="/">
                  Accueil
                </Link>
              </li>
              <li>
                <Link className="fr-btn" href="/projet">
                  Partager
                </Link>
              </li>
              <li>
                <Link className="fr-btn" href="/projets">
                  Voir les projets
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )

export default PublicHeader

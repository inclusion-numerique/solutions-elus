import Link from 'next/link'
import { UserMenu } from '@sde/web/app/dashboard/UserMenu'
import { SessionUser } from '@sde/web/auth/sessionUser'

const PrivateHeader = ({ user }: { user: SessionUser }) => (
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
                    République
                    <br />
                    Française
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
          <div className="fr-header__tools">
            <div className="fr-header__tools-links">
              <ul className="fr-links-group">
                <li>
                  <UserMenu user={user} />
                </li>
                <li>
                  <Link
                    href="/api/auth/signout"
                    target="_self"
                    className="fr-btn fr-btn--sm fr-btn--icon-left fr-icon-logout-box-r-line"
                  >
                    Se déconnecter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
          <ul className="fr-links-group" data-fr-js-header-links="true">
            <li>
              <Link
                href="/auth/login"
                target="_self"
                className="fr-btn fr-btn--icon-left fr-icon-account-line"
              >
                Espace ANCT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
)

export default PrivateHeader

"use client"

import { useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { Matomo } from "../app/Matomo"

type CookieConsentModel = {
  isSet: boolean
  consent: {
    mandatory: true
    analytics: {
      matomo: boolean
    }
  }
}

const defaultConsent: CookieConsentModel = {
  isSet: false,
  consent: {
    mandatory: true,
    analytics: {
      matomo: false,
    },
  },
};

const fullConsent: CookieConsentModel = {
  isSet: true,
  consent: {
    mandatory: true,
    analytics: {
      matomo: true,
    },
  }
}

export const CookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useLocalStorage<CookieConsentModel>('cookie-consent', defaultConsent)
  
  return (
    <>
      {!cookieConsent.isSet && (
        <div className="fr-consent-banner">
          <h2 className="fr-h6">À propos des cookies sur Solution d&apos;élus</h2>
          <div className="fr-consent-banner__content">
            <p className="fr-text--sm">
              Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles
              sur ce site. Pour en savoir plus, visitez la page <a href="/confidentialite">Confidentialité</a>. 
              Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer en 
              cliquant sur <a href="#gestion-des-cookies">Gestion des cookies</a> en bas de page.
            </p>
          </div>
          <ul className="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">
            <li>
              <button className="fr-btn" title="Autoriser tous les cookies" onClick={() => {setCookieConsent(fullConsent)}}>
                Tout accepter
              </button>
            </li>
            <li>
              <button className="fr-btn" title="Refuser tous les cookies" onClick={() => {setCookieConsent({...defaultConsent, isSet: true })}}>
                Tout refuser
              </button>
            </li>
            <li>
              <button className="fr-btn fr-btn--secondary" data-fr-opened="false" aria-controls="fr-consent-modal" title="Personnaliser les cookies">
                Personnaliser
              </button>
            </li>
          </ul>
        </div>
      )}

      {cookieConsent.isSet && (
        (cookieConsent?.consent?.analytics?.matomo) && (
          <Matomo nonce={undefined} />
        )
      )}

      <CookieModal cookieConsent={cookieConsent} setCookieConsent={setCookieConsent} />
    </>
  )
};

type CookieModalProps = {
  cookieConsent: CookieConsentModel
  setCookieConsent: (cookieConsent: CookieConsentModel) => void
}

export const CookieModal = ({cookieConsent, setCookieConsent}: CookieModalProps) => {
  const [form, setForm] = useState<CookieConsentModel>(cookieConsent)

  useEffect(() => {
    setForm(() => cookieConsent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookieConsent])

  const handleConfirm = () => {
    setCookieConsent(form)
  }

  return (
    <dialog id="fr-consent-modal" className="fr-modal" role="dialog" aria-labelledby="fr-consent-modal-title">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" aria-controls="fr-consent-modal" title="Fermer">
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-consent-modal-title" className="fr-modal__title">
                  Panneau de gestion des cookies
                </h1>
                <div className="fr-consent-manager">
                  {/* Finalités */}
                  <div className="fr-consent-service fr-consent-manager__header">
                    <fieldset className="fr-fieldset fr-fieldset--inline">
                      <legend id="finality-legend" className="fr-consent-service__title">
                        Préférences pour tous les services. <br/>
                        <a href="/confidentialite">Données personnelles et cookies</a>
                      </legend>
                      <div className="fr-consent-service__radios">
                        <div className="fr-radio-group">
                          <input
                            type="radio"
                            id="consent-all-accept"
                            name="consent-all"
                            checked={form.isSet && Object.values(form.consent).every((finality) => Object.values(finality).every((service) => service === true))}
                            onChange={(event) => event.target.checked && setForm(fullConsent)}
                          />
                          <label className="fr-label" htmlFor="consent-all-accept">
                            Tout accepter
                          </label>
                        </div>
                        <div className="fr-radio-group">
                          <input
                            type="radio"
                            id="consent-all-refuse"
                            name="consent-all"
                            checked={form.isSet && Object.values(form.consent).every((finality) => Object.values(finality).every((service) => service === false))}
                            onChange={(event) => event.target.checked && setForm({...defaultConsent, isSet: true })}
                          />
                          <label className="fr-label" htmlFor="consent-all-refuse">
                            Tout refuser
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="fr-consent-service">
                    <fieldset aria-labelledby="mandatory-legend mandatory-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                      <legend id="mandatory-legend" className="fr-consent-service__title">Cookies obligatoires</legend>
                      <div className="fr-consent-service__radios">
                        <div className="fr-radio-group">
                          <input disabled defaultChecked type="radio" id="consent-mandatory-accept" name="consent-mandatory"/>
                          <label className="fr-label" htmlFor="consent-mandatory-accept">Accepter</label>
                        </div>
                        <div className="fr-radio-group">
                          <input disabled type="radio" id="consent-mandatory-refuse" name="consent-mandatory"/>
                          <label className="fr-label" htmlFor="consent-mandatory-refuse">Refuser</label>
                        </div>
                      </div>
                      <p id="mandatory-desc" className="fr-consent-service__desc">
                        Ce site utilise des cookies nécessaires à son bon fonctionnement 
                        qui ne peuvent pas être désactivés.
                      </p>
                    </fieldset>
                  </div>
                  {/* Analytics */}
                  <div className="fr-consent-service">
                    <fieldset aria-labelledby="analytics-legend analytics-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                      <legend id="analytics-legend" className="fr-consent-service__title">Analyse d&apos;audience</legend>
                      <div className="fr-consent-service__radios">
                        <div className="fr-radio-group">
                          <input
                            type="radio"
                            id="consent-analytics-accept"
                            name="consent-analytics"
                            checked={form.isSet && Object.values(form.consent.analytics).every((service) => service === true)}
                            onChange={(event) => event.target.checked && setForm({
                              isSet: true,
                              consent: {
                                ...form.consent,
                                analytics: {
                                  matomo: true
                                }
                              }
                            })}
                          />
                          <label className="fr-label" htmlFor="consent-analytics-accept">
                            Accepter
                          </label>
                        </div>
                        <div className="fr-radio-group">
                          <input
                            type="radio"
                            id="consent-analytics-refuse"
                            name="consent-analytics"
                            checked={form.isSet && Object.values(form.consent.analytics).every((service) => service === false)}
                            onChange={(event) => event.target.checked && setForm({
                              isSet: true,
                              consent: {
                                ...form.consent,
                                analytics: {
                                  matomo: false
                                }
                              }
                            })}
                          />
                          <label className="fr-label" htmlFor="consent-analytics-refuse">
                            Refuser
                          </label>
                        </div>
                      </div>
                      <p id="analytics-desc" className="fr-consent-service__desc">
                        Description optionnelle de la finalité.
                      </p>
                      <div className="fr-consent-service__collapse">
                        <button className="fr-consent-service__collapse-btn" aria-expanded="false" aria-describedby="analytics-legend" aria-controls="analytics-collapse">
                          Voir plus de détails
                        </button>
                      </div>
                      <div className="fr-consent-services fr-collapse" id="analytics-collapse">
                        {/* Sous finalités */}
                        <div className="fr-consent-service">
                          <fieldset aria-labelledby="analytics-matomo-legend analytics-matomo-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                            <legend id="analytics-matomo-legend" className="fr-consent-service__title" aria-describedby="analytics-matomo-desc">
                              Matomo
                            </legend>
                            <div className="fr-consent-service__radios fr-fieldset--inline">
                              <div className="fr-radio-group">
                                <input
                                  type="radio"
                                  id="consent-analytics-matomo-accept"
                                  name="consent-analytics-matomo"
                                  checked={form.isSet ? form.consent?.analytics?.matomo : false}
                                  onChange={(event) => event.target.checked && setForm({
                                    isSet: true,
                                    consent: {
                                      ...form.consent,
                                      analytics: {
                                        ...form.consent?.analytics,
                                        matomo: true
                                      }
                                    }
                                  })}
                                />
                                <label className="fr-label" htmlFor="consent-analytics-matomo-accept">
                                  Accepter
                                </label>
                              </div>
                              <div className="fr-radio-group">
                                <input
                                  type="radio"
                                  id="consent-analytics-matomo-refuse"
                                  name="consent-analytics-matomo"
                                  checked={form.isSet ? !form.consent?.analytics?.matomo : false}
                                  onChange={(event) => event.target.checked && setForm({
                                    isSet: true,
                                    consent: {
                                      ...form.consent,
                                      analytics: {
                                        ...form.consent?.analytics,
                                        matomo: false
                                      }
                                    }
                                  })}
                                />
                                <label className="fr-label" htmlFor="consent-analytics-matomo-refuse">
                                  Refuser
                                </label>
                              </div>
                            </div>
                            <p id="analytics-matomo-desc" className="fr-consent-service__desc">
                              Description optionnelle du service.
                            </p>
                          </fieldset>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  {/* Bouton de confirmation/fermeture */}
                  <ul className="fr-consent-manager__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-sm">
                    <li>
                      <button
                        className="fr-btn"
                        aria-controls="fr-consent-modal"
                        onClick={handleConfirm}
                      >
                        Confirmer mes choix
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}
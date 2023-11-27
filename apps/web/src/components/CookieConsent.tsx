"use client"

import { useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import { Matomo } from "./Matomo"
import { AdForm } from "./AdForm"

interface CookieConsentModel {
  isSet: boolean
  consent: {
    mandatory: true
    analytics: {
      matomo: boolean
    };
    marketing: {
      adform: boolean
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
    marketing: {
      adform: false,
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
    marketing: {
      adform: true,
    },
  }
}

const isValid = (value: any): value is CookieConsentModel =>
    typeof value?.isSet === 'boolean' &&
    typeof value?.consent?.analytics?.matomo === 'boolean' &&
    typeof value?.consent?.marketing?.adform === 'boolean';

const CookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useLocalStorage<CookieConsentModel>('cookie-consent', defaultConsent)

  useEffect(() => {
    if (!isValid(cookieConsent)) {
      setCookieConsent(defaultConsent)
    }
  }, [cookieConsent, setCookieConsent])

  if (cookieConsent.isSet === true) return (
    <>
      {(cookieConsent?.consent?.analytics?.matomo) && (
        <Matomo nonce={undefined} />
      )}

      {(cookieConsent?.consent?.marketing?.adform) && (
        <AdForm nonce={undefined} />
      )}

      <CookieModal cookieConsent={cookieConsent} setCookieConsent={setCookieConsent} />
    </>
  )
  
  if (cookieConsent.isSet === false) return (
    <>
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
      
      <CookieModal cookieConsent={cookieConsent} setCookieConsent={setCookieConsent} />
    </>
  )
};

export default CookieConsent;

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

  const handleCancel = () => {
    setForm(cookieConsent)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      id="fr-consent-modal"
      className="fr-modal"
      role="dialog"
      aria-labelledby="fr-consent-modal-title"
      onClose={handleCancel}
      onClick={(event) => {
        if (event.target === event.currentTarget) { handleCancel() }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') { handleCancel() }
      }}
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  title="Fermer"
                  className="fr-btn--close fr-btn"
                  aria-controls="fr-consent-modal"
                  onClick={handleCancel}
                >
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
                            checked={Object.values(form?.consent).every((finality) => Object.values(finality).every((service) => service === true))}
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
                            checked={Object.values(form?.consent).every((finality) => Object.values(finality).every((service) => service === false))}
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
                      <legend id="analytics-legend" className="fr-consent-service__title">
                        Analyse d&apos;audience
                      </legend>
                      <div className="fr-consent-service__radios">
                        <div className="fr-radio-group">
                          <input
                            type="radio"
                            id="consent-analytics-accept"
                            name="consent-analytics"
                            checked={form?.consent?.analytics === undefined ?  false : Object.values(form?.consent?.analytics).every((service) => service === true)}
                            onChange={(event) => event.target.checked && setForm({
                              isSet: true,
                              consent: {
                                ...form?.consent,
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
                            checked={form?.consent?.analytics === undefined ?  true : Object.values(form?.consent?.analytics).every((service) => service === false)}
                            onChange={(event) => event.target.checked && setForm({
                              isSet: true,
                              consent: {
                                ...form?.consent,
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
                        Nous utilisons des cookies d&apos;analyse d&apos;audience pour nous aider à 
                        comprendre comment les visiteurs interagissent avec ce site web.
                      </p>
                      <div className="fr-consent-service__collapse">
                        <button className="fr-consent-service__collapse-btn" aria-expanded="false" aria-describedby="analytics-legend" aria-controls="analytics-collapse">
                          Voir plus de détails
                        </button>
                      </div>
                      <div className="fr-consent-services fr-collapse" id="analytics-collapse">
                        {/* Matomo */}
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
                                  checked={form?.consent?.analytics?.matomo}
                                  onChange={(event) => event.target.checked && setForm({
                                    isSet: true,
                                    consent: {
                                      ...form?.consent,
                                      analytics: {
                                        ...form?.consent?.analytics,
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
                                  checked={!form?.consent?.analytics?.matomo}
                                  onChange={(event) => event.target.checked && setForm({
                                    isSet: true,
                                    consent: {
                                      ...form?.consent,
                                      analytics: {
                                        ...form?.consent?.analytics,
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
                            <p id="service-matomo-desc" className="fr-consent-service__desc">
                              Matomo est un outil d&apos;analyse d&apos;audience que nous utilisons pour 
                              comprendre comment les visiteurs utilisent notre site web. Les cookies de 
                              Matomo nous aident à améliorer l&apos;expérience utilisateur en analysant 
                              les performances et l&apos;utilisation de notre site.
                            </p>
                          </fieldset>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  {/* Marketing */}
                  <div className="fr-consent-service">
                    <fieldset aria-labelledby="marketing-legend marketing-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                      <legend id="marketing-legend" className="fr-consent-service__title">
                        Marketing
                      </legend>
                      <div className="fr-consent-service__radios">
                        <div className="fr-radio-group">
                          <input
                            type="radio"
                            id="consent-marketing-accept"
                            name="consent-marketing"
                            checked={form?.consent?.marketing === undefined ?  false : Object.values(form?.consent?.marketing).every((service) => service === true)}
                            onChange={(event) => event.target.checked && setForm({
                              isSet: true,
                              consent: {
                                ...form?.consent,
                                marketing: {
                                  adform: true
                                }
                              }
                            })}
                          />
                          <label className="fr-label" htmlFor="consent-marketing-accept">
                            Accepter
                          </label>
                        </div>
                        <div className="fr-radio-group">
                          <input
                            type="radio"
                            id="consent-marketing-refuse"
                            name="consent-marketing"
                            checked={form?.consent?.marketing === undefined ?  true : Object.values(form?.consent?.marketing).every((service) => service === false)}
                            onChange={(event) => event.target.checked && setForm({
                              isSet: true,
                              consent: {
                                ...form?.consent,
                                marketing: {
                                  adform: false
                                }
                              }
                            })}
                          />
                          <label className="fr-label" htmlFor="consent-marketing-refuse">
                            Refuser
                          </label>
                        </div>
                      </div>
                      <p id="marketing-desc" className="fr-consent-service__desc">
                        Nous utilisons des cookies de marketing pour personnaliser et améliorer 
                        votre expérience sur notre site, et pour comprendre l&apos;efficacité 
                        de nos campagnes marketing.
                      </p>
                      <div className="fr-consent-service__collapse">
                        <button className="fr-consent-service__collapse-btn" aria-expanded="false" aria-describedby="marketing-legend" aria-controls="marketing-collapse">
                          Voir plus de détails
                        </button>
                      </div>
                      <div className="fr-consent-services fr-collapse" id="marketing-collapse">
                        {/* Adform */}
                        <div className="fr-consent-service">
                          <fieldset aria-labelledby="marketing-adform-legend marketing-adform-desc" role="group" className="fr-fieldset fr-fieldset--inline">
                            <legend id="marketing-adform-legend" className="fr-consent-service__title" aria-describedby="marketing-adform-desc">
                              Adform
                            </legend>
                            <div className="fr-consent-service__radios fr-fieldset--inline">
                              <div className="fr-radio-group">
                                <input
                                  type="radio"
                                  id="consent-marketing-adform-accept"
                                  name="consent-marketing-adform"
                                  checked={form?.consent?.marketing?.adform}
                                  onChange={(event) => event.target.checked && setForm({
                                    isSet: true,
                                    consent: {
                                      ...form?.consent,
                                      marketing: {
                                        ...form?.consent?.marketing,
                                        adform: true
                                      }
                                    }
                                  })}
                                />
                                <label className="fr-label" htmlFor="consent-marketing-adform-accept">
                                  Accepter
                                </label>
                              </div>
                              <div className="fr-radio-group">
                                <input
                                  type="radio"
                                  id="consent-marketing-adform-refuse"
                                  name="consent-marketing-adform"
                                  checked={!form?.consent?.marketing?.adform}
                                  onChange={(event) => event.target.checked && setForm({
                                    isSet: true,
                                    consent: {
                                      ...form?.consent,
                                      marketing: {
                                        ...form?.consent?.marketing,
                                        adform: false
                                      }
                                    }
                                  })}
                                />
                                <label className="fr-label" htmlFor="consent-marketing-adform-refuse">
                                  Refuser
                                </label>
                              </div>
                            </div>
                            <p id="service-adform-desc" className="fr-consent-service__desc">
                              Les cookies d&apos;Adform nous aident à mesurer l&apos;efficacité 
                              de nos campagnes publicitaires en suivant les interactions des 
                              utilisateurs avec nos publicités.
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
                        className="fr-btn fr-btn--secondary"
                        aria-controls="fr-consent-modal"
                        onClick={handleCancel}
                      >
                        Annuler
                      </button>
                    </li>
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
"use client"

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prefer-object-spread */

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Matomo, Infopro, Manageo, AdForm, LinkedIn, GoogleTagManager } from "@sde/web/components/scripts";

interface CookieConsentModel {
  isSet: boolean
  consent: {
    mandatory: true
    analytics: {
      matomo: boolean
      infopro: boolean
      manageo: boolean
    };
    marketing: {
      adform: boolean
      linkedin: boolean
      'google-tag-manager': boolean
    }
  }
}

const defaultConsent: CookieConsentModel = {
  isSet: false,
  consent: {
    mandatory: true,
    analytics: {
      matomo: false,
      infopro: false,
      manageo: false,
    },
    marketing: {
      adform: false,
      linkedin: false,
      'google-tag-manager': false,
    },
  },
};

const fullConsent: CookieConsentModel = {
  isSet: true,
  consent: {
    mandatory: true,
    analytics: {
      matomo: true,
      infopro: true,
      manageo: true,
    },
    marketing: {
      adform: true,
      linkedin: true,
      'google-tag-manager': true,
    },
  }
}

const isValid = (value: any): value is CookieConsentModel =>
    typeof value?.isSet === 'boolean' &&
    typeof value?.consent?.mandatory === 'boolean' &&
    typeof value?.consent?.analytics?.matomo === 'boolean' &&
    typeof value?.consent?.analytics?.infopro === 'boolean' &&
    typeof value?.consent?.analytics?.manageo === 'boolean' &&
    typeof value?.consent?.marketing?.adform === 'boolean' &&
    typeof value?.consent?.marketing?.linkedin === 'boolean' &&
    typeof value?.consent?.marketing?.['google-tag-manager'] === 'boolean';

const CookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useLocalStorage<CookieConsentModel>('cookie-consent', defaultConsent)

  useEffect(() => {
    if (!isValid(cookieConsent)) {
      setCookieConsent(defaultConsent)
    }
  }, [cookieConsent, setCookieConsent])

  if (cookieConsent.isSet === true) return (
    <>
      {(cookieConsent?.consent?.analytics?.matomo) && <Matomo /> }
      {(cookieConsent?.consent?.analytics?.infopro) && <Infopro /> }
      {(cookieConsent?.consent?.analytics?.manageo) && <Manageo /> }

      {(cookieConsent?.consent?.marketing?.adform) && <AdForm /> }
      {(cookieConsent?.consent?.marketing?.linkedin) && <LinkedIn /> }
      {(cookieConsent?.consent?.marketing?.['google-tag-manager']) && <GoogleTagManager /> }
      

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

interface Finality {
  type: 'finality'
  name: 'analytics' | 'marketing'
  title: string
  description: string
  services: Service[]
}

interface Service {
  type: 'service'
  name: 'matomo' | 'infopro' | 'manageo' | 'adform' | 'linkedin' | 'google-tag-manager'
  title: string
  description: string
}

const CONFIG: Finality[] = [
  {
    type: 'finality',
    name: 'analytics',
    title: 'Analyse d\'audience',
    description: 'Nous utilisons des cookies d\'analyse d\'audience pour nous aider à comprendre comment les visiteurs interagissent avec ce site web.',
    services: [
      {
        type: 'service',
        name: 'matomo',
        title: 'Matomo',
        description: 'Matomo est un outil d\'analyse d\'audience que nous utilisons pour comprendre comment les visiteurs utilisent notre site web. Les cookies de Matomo nous aident à améliorer l\'expérience utilisateur en analysant les performances et l\'utilisation de notre site.',
      },
      {
        type: 'service',
        name: 'manageo',
        title: 'Manageo',
        description: 'Manageo est un service d\'analyse qui nous permet de comprendre les interactions des visiteurs avec notre site web. Ces données nous aident à optimiser notre contenu et à améliorer l\'expérience utilisateur.',
      },
      {
        type: 'service',
        name: 'infopro',
        title: 'Infopro',
        description: 'Infopro est un service d\'analyse d\'audience qui nous aide à recueillir des informations sur la manière dont les utilisateurs interagissent avec notre site web. Ces données nous permettent d\'optimiser nos services et de mieux répondre aux besoins de nos visiteurs.',
      },
    ],
  },
  {
    type: 'finality',
    name: 'marketing',
    title: 'Marketing',
    description: 'Nous utilisons des cookies de marketing pour personnaliser et améliorer votre expérience sur notre site, et pour comprendre l\'efficacité de nos campagnes marketing.',
    services: [
      {
        type: 'service',
        name: 'adform',
        title: 'Adform',
        description: 'Les cookies d\'Adform nous aident à mesurer l\'efficacité de nos campagnes publicitaires en suivant les interactions des utilisateurs avec nos publicités.',
      },
      {
        type: 'service',
        name: 'linkedin',
        title: 'LinkedIn',
        description: 'LinkedIn est un service de marketing professionnel qui nous permet de mieux comprendre l\'impact de nos campagnes publicitaires sur la plateforme. Les cookies LinkedIn suivent les interactions des utilisateurs avec nos contenus publicitaires.',
      },
      {
        type: 'service',
        name: 'google-tag-manager',
        title: 'Google Tag Manager',
        description: 'Google Tag Manager est un outil de gestion de tags qui facilite l\'implémentation et la gestion des tags de suivi sur notre site web. Il nous permet de personnaliser et d\'optimiser notre stratégie marketing en suivant diverses interactions des utilisateurs.',
      }
    ],
  },
];


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

                  {CONFIG.map((finality) => (
                    <div className="fr-consent-service" key={finality.name}>
                      <fieldset aria-labelledby={`${finality.name}-legend ${finality.name}-desc`} role="group" className="fr-fieldset fr-fieldset--inline">
                        <legend id={`${finality.name}-legend`} className="fr-consent-service__title">
                          {finality.title}
                        </legend>
                        <div className="fr-consent-service__radios">
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id={`consent-${finality.name}-accept`}
                              name={`consent-${finality.name}`}
                              checked={Object.values(form?.consent[finality.name]).every((service) => service === true)}
                              onChange={(event) => event.target.checked && setForm({
                                isSet: true,
                                consent: {
                                  ...form?.consent,
                                  [finality.name]: 
                                    Object.assign({}, form?.consent[finality.name], {
                                      [finality.services[0].name]: true,
                                      [finality.services[1].name]: true,
                                      [finality.services[2].name]: true,
                                    }),
                                }
                              })}
                            />
                            <label className="fr-label" htmlFor={`consent-${finality.name}-accept`}>
                              Accepter
                            </label>
                          </div>
                          <div className="fr-radio-group">
                            <input
                              type="radio"
                              id={`consent-${finality.name}-refuse`}
                              name={`consent-${finality.name}`}
                              checked={Object.values(form?.consent[finality.name]).every((service) => service === false)}
                              onChange={(event) => event.target.checked && setForm({
                                isSet: true,
                                consent: {
                                  ...form?.consent,
                                  [finality.name]: 
                                    Object.assign({}, form?.consent[finality.name], {
                                      [finality.services[0].name]: false,
                                      [finality.services[1].name]: false,
                                      [finality.services[2].name]: false,
                                    }),
                                }
                              })}
                            />
                            <label className="fr-label" htmlFor={`consent-${finality.name}-refuse`}>
                              Refuser
                            </label>
                          </div>
                        </div>
                        <p id={`${finality.name}-desc`} className="fr-consent-service__desc">
                          {finality.description}
                        </p>
                        <div className="fr-consent-service__collapse">
                          <button className="fr-consent-service__collapse-btn" aria-expanded="false" aria-describedby={`${finality.name}-legend`} aria-controls={`${finality.name}-collapse`}>
                            Voir plus de détails
                          </button>
                        </div>
                        <div className="fr-consent-services fr-collapse" id={`${finality.name}-collapse`}>
                          {finality.services.map((service) => (
                            <div className="fr-consent-service" key={service.name}>
                              <fieldset aria-labelledby={`${finality.name}-${service.name}-legend ${finality.name}-${service.name}-desc`} role="group" className="fr-fieldset fr-fieldset--inline">
                                <legend id={`${finality.name}-${service.name}-legend`} className="fr-consent-service__title" aria-describedby={`${finality.name}-${service.name}-desc`}>
                                  {service.title}
                                </legend>
                                <div className="fr-consent-service__radios fr-fieldset--inline">
                                  <div className="fr-radio-group">
                                    <input
                                      type="radio"
                                      id={`consent-${finality.name}-${service.name}-accept`}
                                      name={`consent-${finality.name}-${service.name}`}
                                      checked={(form?.consent[finality.name] as any)[service.name]}
                                      onChange={(event) => event.target.checked && setForm({
                                        isSet: true,
                                        consent: {
                                          ...form?.consent,
                                          [finality.name]:
                                            Object.assign({}, form?.consent[finality.name], {
                                              [service.name]: true,
                                            }),
                                        }
                                      })}
                                    />
                                    <label className="fr-label" htmlFor={`consent-${finality.name}-${service.name}-accept`}>
                                      Accepter
                                    </label>
                                  </div>
                                  <div className="fr-radio-group">
                                    <input
                                      type="radio"
                                      id={`consent-${finality.name}-${service.name}-refuse`}
                                      name={`consent-${finality.name}-${service.name}`}
                                      checked={!(form?.consent[finality.name] as any)[service.name]}
                                      onChange={(event) => event.target.checked && setForm({
                                        isSet: true,
                                        consent: {
                                          ...form?.consent,
                                          [finality.name]: 
                                            Object.assign({}, form?.consent[finality.name], {
                                              [service.name]: false,
                                            }),
                                        }
                                      })}
                                    />
                                    <label className="fr-label" htmlFor={`consent-${finality.name}-${service.name}-refuse`}>
                                      Refuser
                                    </label>
                                  </div>
                                </div>
                                <p id={`${finality.name}-${service.name}-desc`} className="fr-consent-service__desc">
                                  {service.description}
                                </p>
                              </fieldset>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                  
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
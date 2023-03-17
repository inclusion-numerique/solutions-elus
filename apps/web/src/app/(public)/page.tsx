import Link from 'next/link'
import styles from './styles.module.css'
import { categories, categoryProjectsLink } from '@sde/web/anctProjects'
import { Showcase } from '@sde/web/app/(public)/Showcase'
import { getShowcaseProjects } from '@sde/web/legacyProject/showcaseProjects'

// Revalidate this page every day
export const revalidate = 86_400

export default async function HomePage() {
  const projects = await getShowcaseProjects()
  return (
    <>
      <div
        className="fr-background-alt--blue-france"
        style={{ position: 'relative' }}
      >
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-6 fr-pr-md-1w">
              <h1
                className={`fr-text-title--blue-france fr-mt-20v ${styles.title}`}
              >
                Ensemble,
                <br />
                partageons les solutions
                <br /> des territoires
              </h1>
              <p className={`fr-mt-10v ${styles.lead}`}>
                « La transition écologique est le défi majeur pour notre pays.
                Les collectivités territoriales sont en première ligne pour y
                faire face. Le partage de solutions concrètes, des réussites
                faites ici ou là, est indispensable pour accélération la
                transition écologique de nos territoires. Ensemble, partageons
                les solutions. »
              </p>
              <p className="fr-text fr-mb-20v fr-text--bold">
                Christophe Béchu,
                <br />
                Ministre de la Transition écologique <br />
                et de la Cohésion des territoires
              </p>
            </div>

            <div className="fr-hidden fr-unhidden-md fr-pl-4w">
              <div
                title="Photographie d'un village français"
                className={`${styles.asideCover}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fr-pt-20v">
        <Showcase projects={projects} />
      </div>
      <div className="fr-py-30v fr-background-alt--blue-france">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-btns-group fr-btns-group--lg">
                <Link
                  href="/projet"
                  className="fr-btn fr-py-8v fr-mb-0"
                  style={{ textAlign: 'center' }}
                >
                  Je suis maire ou président d&apos;intercommunalité,
                  <br />
                  je partage mes solutions&nbsp;!
                </Link>
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-btns-group fr-btns-group--lg">
                <Link
                  href="/projets"
                  className="fr-btn fr-btn--secondary fr-py-8v fr-mb-0"
                  style={{ textAlign: 'center' }}
                >
                  Je suis maire ou président d&apos;intercommunalité, <br />
                  je cherche des solutions&nbsp;!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="fr-container fr-py-30v">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2 className="fr-mb-10v">
                Découvrez des solutions partout en France
              </h2>
            </div>
            {categories.map((category) => (
              <div key={category} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <div className="fr-tile fr-tile--horizontal fr-enlarge-link">
                  <div className="fr-tile__body fr-m-4v">
                    <h4 className="fr-tile__title fr-mb-0">
                      <Link href={categoryProjectsLink(category)}>
                        {category}
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fr-background-alt--grey fr-py-30v">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2 className="fr-mb-10v">Questions fréquentes</h2>
            </div>
            <div
              className="fr-accordions-group"
              data-fr-js-accordions-group="true"
              style={{ width: '100%' }}
            >
              <section className="fr-accordion">
                <h3 className="fr-accordion__title">
                  <button
                    className="fr-accordion__btn"
                    aria-expanded="false"
                    aria-controls="accordion-1"
                    data-fr-js-collapse-button="true"
                  >
                    Quel type de projets puis-je partager sur cette
                    plateforme&nbsp;?
                  </button>
                </h3>
                <div
                  className="fr-collapse"
                  id="accordion-1"
                  data-fr-js-collapse="true"
                >
                  <p>
                    À priori, toutes les thématiques sont couvertes. L’idée est
                    de montrer une solution innovante de par sa conception, sa
                    mise en œuvre ou encore ses parties prenantes.
                  </p>
                  <p>
                    Si vous avec une solution à fort impact sur votre territoire
                    et que vous pensez qu’elle peut se répliquer, cette
                    plateforme est l’endroit idéal pour la partager.
                  </p>
                </div>
              </section>
              <section className="fr-accordion">
                <h3 className="fr-accordion__title">
                  <button
                    className="fr-accordion__btn"
                    aria-expanded="false"
                    aria-controls="accordion-2"
                    data-fr-js-collapse-button="true"
                  >
                    Et si j’ai un projet et non une solution&nbsp;?
                  </button>
                </h3>
                <div
                  className="fr-collapse"
                  id="accordion-2"
                  data-fr-js-collapse="true"
                >
                  <p>
                    Si vous avez un projet, la projetothèque est là pour vous
                    inspirer et, pourquoi pas, en améliorer un ou plusieurs
                    aspects.
                  </p>
                  <p>
                    Si votre souhait est d’avoir connaissance des offres
                    d’ingénierie ou de financement, le site du Ministère
                    Aides-territoires (
                    <a
                      href="https://aides-territoires.beta.gouv.fr"
                      target="_blank"
                      rel="noreferrer"
                      className="fr-link"
                    >
                      https://aides-territoires.beta.gouv.fr
                    </a>
                    ) est l’endroit idéal.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

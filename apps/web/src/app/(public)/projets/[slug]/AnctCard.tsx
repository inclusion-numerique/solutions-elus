

export const AnctCard = () => (
  <div className="fr-card fr-enlarge-link fr-card--horizontal fr-card--horizontal-tier">
    <div className="fr-card__header">
      <div className="fr-card__img fr-p-16v">
        <picture
          className="fr-responsive-img"
          style={{ flexGrow: 0, flexShrink: 0, height: "160px" }}
        >
          <img
            id="anct-logo"
            src="/images/anct.svg"
            alt="Agence Nationale de la Cohésion des Territoires"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </picture>
      </div>
    </div>
    <div className="fr-card__body">
      <div className="fr-card__content">
        <h2 className="fr-card__title fr-mb-4v">
          <a href="https://agence-cohesion-territoires.gouv.fr/" target="_blank">
            L’Agence Nationale de la Cohésion des Territoires
          </a>
        </h2>
        <div className="fr-card__desc">
          <p className="">
            L’Agence Nationale de la Cohésion des Territoires (ANCT) est un
            nouveau partenaire pour les collectivités locales : elle conçoit et
            anime des programmes d’appui nationaux pour mettre en œuvre les
            politiques publiques, dont Action Cœur de Ville fait partie.
          </p>
          <p className="">
            Dans ce cadre, elle est chargée de la mise en œuvre opérationnelle
            du programme et de son évaluation, du pilotage du centre de
            ressources collaboratif ainsi que de l’organisation des séminaires
            nationaux.
          </p>
        </div>
      </div>
    </div>
  </div>
)
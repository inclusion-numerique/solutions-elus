import Link from "next/link";
import { prismaClient } from '@sde/web/prismaClient'

const DashboardPage = async () => {
  const leadsCount = await prismaClient.getLeadFormSubmission.count()
  const projectsCount = await prismaClient.shareProjectFormSubmission.count()

  return (
    <>
      <div className="fr-grid-row fr-pt-8v">
        <h2>Solutions d&apos;élus</h2>
      </div>
      <div className="fr-grid-row fr-mt-2v fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body">
              <div className="fr-card__content">
                <h4 className="fr-card__title">
                  <span className="fr-icon-folder-2-fill fr-mr-2v" />
                  Projets
                </h4>
                <div className="fr-card__desc fr-pt-4v">
                  <p>{projectsCount} projets ont été enregistrés.</p>
                  <Link
                    href="/dashboard/projets"
                    className="fr-btn fr-mt-2v"
                  >
                    Voir les projets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body">
              <div className="fr-card__content">
                <h4 className="fr-card__title">
                  <span className="fr-icon-folder-2-fill fr-mr-2v" />
                  Contacts
                  <p className="fr-badge fr-badge--sm fr-badge--info fr-ml-4v">Salon des Maires 2023</p>
                </h4>
                <div className="fr-card__desc fr-pt-4v">
                  <p>{leadsCount} contacts ont été enregistrés.</p>
                  <Link
                    href="/dashboard/contacts"
                    className="fr-btn fr-mt-2v"
                  >
                    Voir les contacts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage
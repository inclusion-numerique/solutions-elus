import { dashboardRootPath } from '@sde/web/dashboard/dashboard'
import { prismaClient } from '@sde/web/prismaClient'
import { shareProjectSubmissionsCsvFilename } from '@sde/web/shareProject/shareProjectSubmissionsDownload'
import Link from 'next/link'

const ShareProjectSubmissionsPage = async () => {
  const projectsCount = await prismaClient.shareProjectFormSubmission.count()
  const downloadFilename = shareProjectSubmissionsCsvFilename()

  const projects = await prismaClient.shareProjectFormSubmission.findMany({
    include: {
      attachments: true,
      community: true,
    },
    orderBy: { created: 'desc' },
  })

  return (
    <>
      <div className="fr-grid-row fr-pt-8v">
        <div className="fr-col-12">
          <Link
            href={dashboardRootPath}
            className="fr-link fr-link--icon-left fr-icon-arrow-left-line"
          >
            Retour
          </Link>
        </div>
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
                  <a
                    className="fr-btn fr-btn--icon-left fr-icon-download-line"
                    href="/api/projects/download"
                    download={downloadFilename}
                  >
                    Télécharger au format CSV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-grid-row fr-mt-8v">
        <div className="fr-col-12">
          <h4 className="fr-card__title">
            <span className="fr-icon-time-line fr-mr-2v" />
            Derniers projets
          </h4>
        </div>
        <div className="fr-col-12">
          <div className="fr-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Collectivité</th>
                  <th>Solution</th>
                  <th>Nom</th>
                  <th>Qualité</th>
                  <th>Email</th>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th />
                </tr>
              </thead>
              <tbody className="fr-table">
                {projects.map(
                  ({
                    id,
                    created,
                    name,
                    community,
                    email,
                    quality,
                    solution,
                    reference,
                  }) => (
                    <tr key={id}>
                      <td>
                        {created.toLocaleDateString()} à{' '}
                        {created.toLocaleTimeString()}
                      </td>
                      <td>{community.name}</td>
                      <td>{solution}</td>
                      <td>{name}</td>
                      <td>{quality}</td>
                      <td>
                        <a
                          href={`mailto:${email}`}
                          className="fr-link fr-link--sm"
                        >
                          {email}
                        </a>
                      </td>
                      <td>
                        <Link
                          prefetch={false}
                          className="fr-btn fr-btn--icon-left fr-btn--secondary fr-btn--sm fr-icon-eye-line"
                          href={`/dashboard/projets/${reference}`}
                        >
                          Détails
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default ShareProjectSubmissionsPage

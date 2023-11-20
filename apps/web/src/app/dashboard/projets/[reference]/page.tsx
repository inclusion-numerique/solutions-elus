import { prismaClient } from '@sde/web/prismaClient'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { dashboardRootPath } from '@sde/web/dashboard/dashboard'
import { ViewAttachmentButton } from '@sde/web/app/dashboard/projets/[reference]/ViewAttachmentButton'

const ShareProjectSubmissionPage = async ({
  params: { reference },
}: {
  params: { reference: string }
}) => {
  const project = await prismaClient.shareProjectFormSubmission.findUnique({
    where: { reference },
    include: { community: true, attachments: true },
  })
  if (!project) {
    return notFound()
  }

  const {
    created,
    community,
    attachments,
    email,
    name,
    solution,
    quality,
    dates,
    description,
    domain,
    partners,
    phone,
    tech,
  } = project

  return (
    <>
      <div className="fr-grid-row fr-pt-8v">
        <div className="fr-col-12">
          <Link
            href={`${dashboardRootPath}/projets`}
            className="fr-link fr-link--icon-left fr-icon-arrow-left-line"
          >
            Retour
          </Link>
        </div>
      </div>
      <div className="fr-grid-row fr-mt-8v fr-mb-12v fr-grid-row--center">
        <div className="fr-col-12">
          <div className="fr-card">
            <div className="fr-card__body">
              <div className="fr-card__content">
                <div className="fr-card__desc">
                  <div className="fr-grid-row">
                    <h2 className="">
                      <span className="fr-icon-folder-2-fill fr-mr-2v" />
                      Projet &#8220;{solution}&#8221;
                    </h2>
                  </div>
                  <div className="fr-grid-row fr-grid-row--gutters">
                    <div className="fr-col-12 fr-col-lg-6">
                      <h5>Informations</h5>
                      <div className="fr-table fr-table--">
                        <table>
                          <tbody>
                            <tr>
                              <td>Date</td>
                              <td className="fr-text--bold">
                                {created.toLocaleDateString()} à{' '}
                                {created.toLocaleTimeString()}
                              </td>
                            </tr>
                            <tr>
                              <td>Nom</td>
                              <td className="fr-text--bold">{solution}</td>
                            </tr>
                            <tr>
                              <td>Référence</td>
                              <td className="fr-text--bold">{reference}</td>
                            </tr>
                            <tr>
                              <td>Thématique</td>
                              <td className="fr-text--bold">{domain}</td>
                            </tr>
                            <tr>
                              <td>Collectivité</td>
                              <td>
                                <span className="fr-text--bold">
                                  {community.name}
                                </span>{' '}
                                <span className="fr-badge fr-badge--sm fr-badge--blue-cumulus fr-ml-2v">
                                  {community.scale}
                                </span>
                                <span className="fr-text--sm fr-ml-2v">
                                  {community.zipcodes.join(', ')}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Nom</td>
                              <td className="fr-text--bold">{name}</td>
                            </tr>
                            <tr>
                              <td>Qualité</td>
                              <td className="fr-text--bold">{quality}</td>
                            </tr>
                            <tr>
                              <td>Téléphone</td>
                              <td className="fr-text--bold">
                                <a
                                  href={`telto:${phone}`}
                                  className="fr-link fr-link--sm"
                                >
                                  {phone}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td className="fr-text--bold">
                                <a
                                  href={`mailto:${email}`}
                                  className="fr-link fr-link--sm"
                                >
                                  {email}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="fr-col-12 fr-col-lg-6">
                      <h5>Description</h5>
                      <p>{description}</p>
                    </div>
                    <div className="fr-col-12 fr-col-lg-6">
                      <h5>Dates clefs</h5>
                      <p>{dates}</p>
                    </div>
                    <div className="fr-col-12 fr-col-lg-6">
                      <h5>Partenaires</h5>
                      <p>{partners}</p>
                    </div>
                    <div className="fr-col-12 fr-col-lg-6">
                      <h5>Aspects techniques</h5>
                      <p>{tech}</p>
                    </div>
                    <div className="fr-col-12 fr-col-lg-6">
                      <h5>Pièces jointes</h5>
                      {attachments.length > 0 ? (
                        <div className="fr-table fr-table--">
                          <table>
                            <tbody>
                              {attachments.map(({ name, key, type }) => (
                                <tr key={key}>
                                  <td>
                                    <span className="fr-badge fr-badge--sm fr-badge--yellow-moutarde">
                                      {type}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="fr-text--bold">
                                      {name}
                                    </span>
                                  </td>

                                  <td>
                                    <ViewAttachmentButton
                                      fileKey={key}
                                      name={name}
                                      reference={reference}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p>Aucune pièce jointe</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ShareProjectSubmissionPage

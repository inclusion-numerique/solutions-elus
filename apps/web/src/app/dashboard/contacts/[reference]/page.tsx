import { prismaClient } from '@sde/web/prismaClient'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { dashboardRootPath } from '@sde/web/dashboard/dashboard'

const GetLeadSubmissionPage = async ({
  params: { reference },
}: {
  params: { reference: string }
}) => {
  const lead = await prismaClient.getLeadFormSubmission.findUnique({
    where: { reference },
    include: { community: true },
  })
  if (!lead) {
    return notFound()
  }

  const {
    created,
    community,
    email,
    name,
    phone,
  } = lead

  return (
    <>
      <div className="fr-grid-row fr-pt-8v">
        <div className="fr-col-12">
          <Link
            href={`${dashboardRootPath}/contacts`}
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
                      Contact &#8220;{name}&#8221;
                    </h2>
                  </div>
                  <div className="fr-grid-row fr-grid-row--gutters">
                    <div className="fr-col-12">
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
                              <td className="fr-text--bold">{name}</td>
                            </tr>
                            <tr>
                              <td>Référence</td>
                              <td className="fr-text--bold">{reference}</td>
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
export default GetLeadSubmissionPage

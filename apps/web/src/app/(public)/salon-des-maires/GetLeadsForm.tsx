'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { trpc } from '@sde/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { withTrpc } from '@sde/web/withTrpc'
import { InputFormField } from '@sde/web/form/InputFormField'
import { useMemo } from 'react'
import { generateReference } from '@sde/web/shareProject/generateReference'
import { CommunitySearchFormField } from '@sde/web/form/CommunitySearchFormField'
import { GetLeadData, GetLeadFormDataValidation } from '@sde/web/shareProject/lead'
import { CheckboxFormField } from '@sde/web/form/CheckboxFormField'

const ShareProjectForm = () => {
  const createLead = trpc.createLead.useMutation()

  // Unique client side reference for this forms
  const reference = useMemo(generateReference, [])

  const form = useForm<GetLeadData>({
    resolver: zodResolver(GetLeadFormDataValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      reference,
    },
  })
  const { handleSubmit, control } = form

  const onSubmit = async (data: GetLeadData) => {
    try {
      await createLead.mutateAsync(data)
    } catch {
      // Error message will be in hook result
    }
  }

  const fieldsDisabled = createLead.isLoading

  return (
    <div
      className="fr-container fr-background-default--grey fr-py-8v fr-px-4v fr-px-md-8v"
      style={{ position: 'relative', border: '1px solid var(--border-default-grey)' }}
    >
      <div
        className="fr-col-12"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <picture>
          <img
            src="/dsfr/artwork/pictograms/buildings/city-hall.svg"
            alt="Boite email"
            style={{ textAlign: 'center', width: 96 }}
          />
        </picture>
      </div>
      {createLead.isSuccess ? (
        <div
          className="fr-col-12"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <h2 className="fr-mt-1v" style={{ textAlign: 'center' }}>
            Merci pour votre participation !
          </h2>
          <p className="fr-text--lead fr-mb-3w fr-px-8v" style={{ textAlign: 'center' }}>
            Nous avons bien enregistré votre demande et nous vous recontacterons dans les meilleurs délais.
          </p>
          <Link href="/projets" className="fr-btn fr-btn--secondary">
            Découvrir les projets
          </Link>
        </div>
      ) : (
        <>
          <h2 className="fr-mt-2v fr-mb-8v" style={{ textAlign: 'center' }}>
            J&apos;aimerais être recontacté pour partager 
            <br/>
            le projet de ma collectivité
          </h2>
          <hr className="fr-mb-3v" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <CommunitySearchFormField
              label="Collectivité"
              disabled={fieldsDisabled}
              control={control}
              path="community"
            />
            <InputFormField
              label="Nom et prénom"
              disabled={fieldsDisabled}
              control={control}
              path="name"
              type="text"
            />
            <InputFormField
              label="Adresse email"
              disabled={fieldsDisabled}
              control={control}
              path="email"
              type="email"
            />
            <InputFormField
              label="Numéro de téléphone"
              hint="Facultatif"
              disabled={fieldsDisabled}
              control={control}
              path="phone"
              type="phone"
            />
            <CheckboxFormField
              label="J'accepte d'être recontacté par l'équipe Solutions d'élus"
              disabled={fieldsDisabled}
              control={control}
              path="consent"
            />

            <div className="fr-mt-8v">
              {createLead.isError && (
                <p className="fr-error-text fr-mb-2v">
                  {createLead.error?.message ??
                    'Une erreur est survenue, merci de réessayer.'}
                </p>
              )}
              <div className="fr-btns-group fr-btns-group--icon-left">
                <button
                  className="fr-btn fr-icon-send-plane-fill"
                  type="submit"
                  disabled={createLead.isLoading}
                >
                  J&apos;envoie ma demande&nbsp;!
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default withTrpc(ShareProjectForm)

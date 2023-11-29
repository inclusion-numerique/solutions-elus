'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { Controller, useForm } from 'react-hook-form'
import { useReadLocalStorage } from 'usehooks-ts'
import { trpc } from '@sde/web/trpc'
import { withTrpc } from '@sde/web/withTrpc'
import { ShareProjectData, ShareProjectFormDataValidation } from '@sde/web/shareProject/project'
import { InputFormField } from '@sde/web/form/InputFormField'
import AttachmentUploader from '@sde/web/attachments/AttachmentUploader'
import { generateReference } from '@sde/web/shareProject/generateReference'
import { RadioFormField } from '@sde/web/form/RadioFormField'
import { CommunitySearchFormField } from '@sde/web/form/CommunitySearchFormField'
import { CookieConsentModel } from '@sde/web/components/CookieConsent'

const projectCategories = [
  'Accès aux soins',
  'Accès au numérique',
  'Attractivité et revitalisation',
  'Développement économique',
  'Éducation et jeunesse',
  'Infrastructures locales',
  'Logement et cadre de vie',
  'Services au public',
  'Solidarité',
  'Soutien aux associations',
  'Transition écologique',
  'Transport et mobilités',
].map((category) => ({ name: category, value: category }))

const ShareProjectForm = () => {
  const isProd = process.env.NODE_ENV === 'production'
  const cookieConsent = useReadLocalStorage<CookieConsentModel>('cookie-consent')

  const createProject = trpc.createProject.useMutation()

  // Unique client side reference for this forms
  const reference = useMemo(generateReference, [])

  const form = useForm<ShareProjectData>({
    resolver: zodResolver(ShareProjectFormDataValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      reference,
      attachments: [],
    },
  })
  const { handleSubmit, control } = form

  const onSubmit = async (data: ShareProjectData) => {
    try {
      await createProject.mutateAsync(data)
      if (isProd && !!cookieConsent && cookieConsent?.isSet && cookieConsent?.consent?.marketing?.['google-tag-manager']) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        gtag("event","conversion",{ allow_custom_scripts: !0, send_to: "DC-3689183/solelus/2023-0+unique" });
      }
    } catch {
      // Error message will be in hook result
    }
  }

  const fieldsDisabled = createProject.isLoading

  return (
    <div
      className="fr-container fr-background-default--grey fr-py-8v fr-px-4v fr-px-md-8v fr-mt-20v"
      style={{
        position: 'relative',
        border: '1px solid var(--border-default-grey)',
      }}
    >
      {createProject.isSuccess ? (
        <>
          <h2>Merci pour votre participation !</h2>
          <p className="fr-text--lead fr-mb-3w">
            Nous avons bien enregistré votre projet.
          </p>
          <Link href="/" className="fr-btn fr-btn--secondary">
            Retour à l&apos;accueil
          </Link>
          <>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element, no-template-curly-in-string */}
            <img src="https://ad.doubleclick.net/ddm/activity/src=3689183;type=solelus;cat=2023-0;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?" width="1" height="1" alt=""/>
          </noscript>
        </>
        </>
      ) : (
        <>
          <h4>Vous êtes maire ou président d&apos;intercommunalité&nbsp;?</h4>
          <p className="fr-text--lead fr-mb-8v">
            Ce formulaire vous permet de renseigner les projets de votre
            territoire, en quelques clics.
          </p>
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
              label="Qualité"
              disabled={fieldsDisabled}
              control={control}
              path="quality"
              type="text"
            />
            <InputFormField
              label="Email"
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
            <hr className="fr-mt-10v mb-10v" />
            <RadioFormField
              label="Votre idée concerne le domaine suivant"
              disabled={fieldsDisabled}
              options={projectCategories}
              control={control}
              path="domain"
            />
            <InputFormField
              label="Nom de votre solution"
              hint="Maximum 100 caractères"
              disabled={fieldsDisabled}
              control={control}
              path="solution"
              type="text"
            />
            <InputFormField
              label="Pouvez-vous décrire votre projet en quelques lignes ?"
              hint="Maximum 2000 caractères"
              disabled={fieldsDisabled}
              control={control}
              path="description"
              type="textarea"
            />
            <InputFormField
              label="Quelles ont été les dates clefs ?"
              hint="Maximum 500 caractères"
              disabled={fieldsDisabled}
              control={control}
              path="dates"
              type="textarea"
            />
            <InputFormField
              label="Qui sont les partenaires du projet ?"
              hint="Maximum 500 caractères"
              disabled={fieldsDisabled}
              control={control}
              path="partners"
              type="textarea"
            />
            <InputFormField
              label="Pouvez-vous décrire les modalités et aspects techniques du projet ?"
              hint="Maximum 100 caractères"
              disabled={fieldsDisabled}
              control={control}
              path="tech"
              type="textarea"
            />
            <p>Souhaitez-vous ajouter des pièces jointes ?</p>
            <Controller
              control={control}
              name="attachments"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <AttachmentUploader
                  reference={reference}
                  onChange={(files) => {
                    onChange(
                      files.map(({ file, key }) => ({
                        type: file.type,
                        name: file.name,
                        key,
                      })),
                    )
                  }}
                />
              )}
            />

            {createProject.isError ? (
              <p className="fr-error-text">
                {createProject.error?.message ??
                  'Une erreur est survenue, merci de réessayer.'}
              </p>
            ) : null}

            <div className="fr-btns-group fr-btns-group--icon-left">
              <button
                className="fr-btn fr-mt-8v fr-icon-checkbox-circle-line"
                type="submit"
                disabled={createProject.isLoading}
              >
                Soumettre le projet
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default withTrpc(ShareProjectForm)

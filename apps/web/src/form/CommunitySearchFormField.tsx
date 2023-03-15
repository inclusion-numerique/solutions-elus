import { HTMLInputTypeAttribute } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { CommunitySearchBar } from '@sde/web/form/CommunitySearchBar'
import { ShareProjectData } from '@sde/web/shareProject/project'

// View design options here https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie
export function CommunitySearchFormField<T extends FieldValues>({
  label,
  path,
  control,
  placeholder,
  hint,
  disabled,
}: {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: string
  hint?: string
  type?: Exclude<HTMLInputTypeAttribute, 'checkbox'> | 'textarea'
  placeholder?: string
}) {
  const id = `input-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => {
        const community = value as ShareProjectData['community']

        return (
          <div
            className={`fr-input-group ${
              error ? 'fr-input-group--error' : ''
            } ${disabled ? 'fr-input-group--disabled' : ''} ${
              isTouched && !invalid ? 'fr-input-group--valid' : ''
            }`}
          >
            <label className="fr-label fr-pb-2v" htmlFor={id}>
              {label}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            {value ? (
              <div className="fr-btns-group fr-btns-group--icon-left">
                <button
                  type="button"
                  className="fr-btn fr-btn--lg fr-btn--secondary fr-icon-checkbox-circle-line"
                  onClick={() => {
                    onChange(null)
                  }}
                >
                  <span style={{ flex: 1 }}>
                    <strong>{community.name}</strong>
                    <span className="fr-my-0 fr-ml-2v fr-text--sm">
                      {community.zipcodes?.join(', ')}
                    </span>
                  </span>
                  <span className="fr-badge fr-badge--sm fr-badge--blue-cumulus fr-ml-2v">
                    {community.scale}
                  </span>
                </button>
              </div>
            ) : (
              <CommunitySearchBar
                disabled={disabled}
                id={id}
                placeholder={placeholder}
                onSelect={(community) => onChange(community)}
              />
            )}

            {error ? (
              <p id={`${id}__error`} className="fr-error-text">
                {error.message}
              </p>
            ) : null}
          </div>
        )
      }}
    />
  )
}

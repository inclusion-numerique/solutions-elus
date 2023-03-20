'use client'

import { ChangeEventHandler } from 'react'

const OptionBadge = <T extends string>({
  option,
  onClick,
  disabled,
}: {
  option: T
  onClick: (option: T) => void
  disabled?: boolean
}) => (
  <button
    type="button"
    className="fr-tag fr-mr-1w fr-mb-2v fr-tag--sm"
    onClick={
      disabled
        ? undefined
        : () => {
            onClick(option)
          }
    }
    aria-label={`Retirer ${option}`}
  >
    {option}
    <span className="fr-icon-close-line fr-ml-1w fr-icon--sm" />
  </button>
)

const OptionsList = <T extends string>({ options }: { options: T[] }) => (
  <>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
    )
  </>
)

// View design options here https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/liste-deroulante/
export const SelectTagsFormField = <T extends string>({
  label,
  placeholder,
  hint,
  disabled,
  required,
  emptyLabel = 'Sélectionnez une option',
  onAdd,
  onRemove,
  id,
  options,
  value,
}: {
  id: string
  value: Set<T>
  label?: string
  disabled?: boolean
  required?: boolean
  emptyLabel?: string
  onAdd: (added: T) => void
  onRemove: (removed: T) => void
  hint?: string
  placeholder?: string
  autoFocus?: boolean
  options: readonly T[]
}) => {
  const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onAdd(event.target.value as T)
  }

  const selectedOptions = options.filter((option) => value.has(option))
  const unselectedOptions = options.filter((option) => !value.has(option))
  const selectIsDisabled = disabled || unselectedOptions.length === 0

  return (
    <div className="fr-select-group">
      <label className="fr-label" htmlFor={id}>
        {label}
        {required ? ' *' : null}
        {hint ? <span className="fr-hint-text">{hint}</span> : null}
      </label>
      <select
        className="fr-select fr-select--error"
        aria-describedby="text-select-error-desc-error"
        id={id}
        placeholder={placeholder}
        disabled={selectIsDisabled}
        onChange={onSelectChange}
        value=""
      >
        <option value="">{emptyLabel}</option>
        <OptionsList options={unselectedOptions} />
      </select>
      <div className="fr-mt-4v">
        {selectedOptions.map((option) => (
          <OptionBadge
            key={option}
            option={option}
            disabled={disabled}
            onClick={onRemove}
          />
        ))}
      </div>
    </div>
  )
}

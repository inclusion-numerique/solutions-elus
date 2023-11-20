import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'

// View design options here https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/case-a-cocher/
export function CheckboxFormField<T extends FieldValues>({
  label,
  path,
  control,
  hint,
  disabled,
}: {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: string
  hint?: string
}) {
  const id = `checkbox-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <div className={`fr-checkbox-group${error ? ' fr-checkbox-group--error' : ''}${disabled ? ' fr-checkbox-group--disabled' : ''}${(isTouched && !invalid) ? ' fr-checkbox-group--valid' : ''}`}>
          <input
            className={`fr-input${error ? ' fr-input--error' : ''}`}
            aria-describedby={error ? `${id}__error` : undefined}
            type="checkbox"
            id={id}
            disabled={disabled}
            onBlur={onBlur}
            onChange={onChange}
            name={name}
            ref={ref}
          />
          <label className="fr-label" htmlFor={id}>
            {label}
            {hint ? <span className="fr-hint-text">{hint}</span> : null}
          </label>
          {error ? (<p id={`${id}__error`} className="fr-error-text">{error.message}</p>) : null}
        </div>
      )}
    />
  )
}

import React from 'react'
import './inputField.scss'

type Props = {
  isValid?: boolean
  onChange: (event: React.ChangeEvent<any>) => any
  label?: string
  placeholder?: string
  name: string
  value: string
  onBlur?: (...arg: any) => any
  autoComplete?: string
  type: 'text' | 'email' | 'text' | 'tel' | 'textarea'
  info?: string
  className?: string
}

export default function InputField({
  label,
  onChange,
  placeholder,
  type,
  name,
  autoComplete,
  value,
  className = '',
  isValid,
  onBlur,
  info
}: Props) {
  let validClass = ''
  if (isValid !== null && isValid !== undefined) {
    if (isValid) validClass = ' valid'
    else validClass = ' invalid'
  }
  const InputComponent =
    type === 'textarea' ? (
      <textarea
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        className={className + validClass}
        onBlur={onBlur}
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        className={className + validClass}
        onBlur={onBlur}
      />
    )
  return (
    <div className="text-field-container">
      {!!label && <div className="text-field-label">{label}</div>}
      <div className="text-field">
        {InputComponent}
        {/*<span className={!isValid ? 'invisible' : ''}>
          <IconChecked />
  </span>*/}
      </div>
      {info ? <div className="text-field-info">{info}</div> : ''}
    </div>
  )
}

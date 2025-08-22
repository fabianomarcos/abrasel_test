import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

import { Tooltip } from '../Tooltip'
import { Info } from '../Icons'
import { registerField } from '@/hooks/use-schema-validator'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  register?: ReturnType<typeof registerField>
  icon?: React.ReactElement
  errors?: FieldError
}

export const Input = ({
  name,
  label,
  register,
  errors,
  icon: Icon,
  ...props
}: IProps) => {
  const TooltipError = (
    <Tooltip title={errors?.message || ''}>
      <Info size={40} color="red" strokeWidth={1.2} />
    </Tooltip>
  )

  const sizeText =
    errors?.message && errors.message.length > 30 ? 'text-sm' : 'text-md'
  const labelInfo = errors?.message ? `${errors.message}!` : `${label}:`
  const labelClass = errors?.message ? ' text-amber-400' : 'text-gray-300'
  const opacityClass = errors?.message ? 'opacity-100' : 'hidden opacity-0'
  const borderClass = errors?.message
    ? 'border-red-500 focus:border-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:border-2'

  return (
    <div className="flex w-full flex-col">
      {label && (
        <p
          className={`${labelClass} ${sizeText} mb-1 self-start font-semibold`}
        >
          {labelInfo}
        </p>
      )}

      <div className="relative flex w-full items-center gap-1">
        <input
          {...props}
          {...register}
          name={name}
          className={`flex h-11 w-full rounded-lg border px-2 py-2 transition-all outline-none ${borderClass} `}
          onChange={props.onChange || register?.onChange}
        />

        {Icon && !errors?.message && (
          <div className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer">
            {Icon}
          </div>
        )}

        <div className={`transition-opacity duration-500 ${opacityClass}`}>
          {TooltipError}
        </div>
      </div>
    </div>
  )
}

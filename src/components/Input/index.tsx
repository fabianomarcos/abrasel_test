import { InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'
import { FieldError } from 'react-hook-form'

import { Tooltip } from '../Tooltip'
import { Info } from '../Icons'
import { registerField } from '@/hooks/use-schema-validator'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  register?: ReturnType<typeof registerField>
  icon?: React.ComponentType<IconBaseProps>
  errors?: FieldError
}

export const Input = ({ name, label, register, errors, ...props }: IProps) => {
  const TooltipError = (
    <Tooltip title={errors?.message || ''}>
      <Info size={40} color="red" strokeWidth={1.2} />
    </Tooltip>
  )

  const labelInfo = errors?.message ? `${errors.message}!` : `${label}:`
  const labelClass = errors?.message ? ' text-amber-400' : 'text-gray-300'
  const opacityClass = errors?.message ? 'opacity-100' : 'opacity-0'
  const borderClass = errors?.message
    ? 'border-red-500 focus:border-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:border-2'

  return (
    <div className="flex flex-col w-full items-start">
      {label && (
        <p className={`${labelClass} font-semibold self-start mb-1`}>
          {labelInfo}
        </p>
      )}

      <div className="flex items-center w-full gap-1 relative">
        <input
          {...props}
          {...register}
          name={name}
          className={`flex w-full min-w-[260px] h-11 rounded-lg px-2 py-2 border transition-all outline-none
            ${borderClass}
          `}
        />

        <div className={`transition-opacity duration-500 ${opacityClass}`}>
          {TooltipError}
        </div>
      </div>
    </div>
  )
}

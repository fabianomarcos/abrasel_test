import { cn } from '@/libs/tailwind'
import { ButtonHTMLAttributes } from 'react'

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  classNameOut?: string
}

export const Button = ({
  children,
  loading = false,
  classNameOut,
  ...rest
}: IProps) => {
  return (
    <button
      className={cn(
        'text-md flex min-h-10 cursor-pointer items-center justify-center gap-4 rounded-md bg-green-600 px-3 font-semibold transition-opacity hover:opacity-80',
        classNameOut,
      )}
      {...rest}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}

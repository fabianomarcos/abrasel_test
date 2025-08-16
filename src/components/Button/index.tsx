import { ButtonHTMLAttributes } from 'react'

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export const Button = ({ children, loading = false, ...rest }: IProps) => {
  return (
    <button
      className="
          flex items-center justify-center gap-4 px-3 rounded-md font-semibold
          text-md cursor-pointer transition-opacity hover:opacity-80
          bg-green-600
          min-h-10
          max-w-[260px]
        "
      {...rest}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}

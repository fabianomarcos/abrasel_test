import { cn } from '@/libs/tailwind'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={cn(
          'px-3 py-1 rounded border',
          page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100',
        )}
      >
        Anterior
      </button>

      <span className="px-2 text-sm">
        Página {page} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={cn(
          'px-3 py-1 rounded border',
          page === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-100',
        )}
      >
        Próxima
      </button>
    </div>
  )
}

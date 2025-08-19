import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

interface IProps {
  page: number
  perPage: number
  count: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export function Pagination({ page, perPage, count, setCurrentPage }: IProps) {
  const last = Math.max(1, Math.ceil(count / perPage))
  const pages = {
    last,
    penultimate: last - 1,
    antePenultimate: last - 2,
  }

  const goToUnderPage = () => {
    if (page > 1) setCurrentPage(page - 1)
  }

  const goToUpperPage = () => {
    if (last > page) setCurrentPage(page + 1)
  }

  const goToSelectedPage = (_page: number) => setCurrentPage(_page)

  const disableButton = (pageComponent: number) => page === pageComponent

  const show = (pageComponent: number) => last >= pageComponent

  const showButton = (pageComponent: number) =>
    pageComponent > 2 && show(pageComponent)

  return (
    <div className="my-4 flex justify-center">
      <button
        onClick={goToUnderPage}
        disabled={disableButton(1)}
        className="flex cursor-pointer items-center gap-2 rounded-l-lg border border-gray-300 bg-gray-900 px-4 py-2 disabled:opacity-50"
      >
        <FiArrowLeft size={20} className="text-gray-100" />
        <span className="text-white">Anterior</span>
      </button>

      <button
        onClick={() => goToSelectedPage(1)}
        disabled={disableButton(1)}
        className="cursor-pointer border border-gray-300 bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
      >
        1
      </button>

      <button
        onClick={() => goToSelectedPage(2)}
        disabled={disableButton(2)}
        className="cursor-pointer border border-gray-300 bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
      >
        2
      </button>

      <span className="border border-gray-300 bg-gray-900 px-4 py-2 text-white">
        ...
      </span>

      {showButton(page - 1) && (
        <button
          onClick={() => goToSelectedPage(page - 1)}
          disabled={disableButton(page - 1)}
          className="cursor-pointer border border-gray-300 bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {page - 1}
        </button>
      )}

      {showButton(page) && (
        <button
          onClick={() => goToSelectedPage(page)}
          disabled
          className="cursor-pointer border border-gray-300 bg-gray-900 px-4 py-2 text-white"
        >
          {page}
        </button>
      )}

      {showButton(page + 1) && (
        <button
          onClick={() => goToSelectedPage(page + 1)}
          className="cursor-pointer border border-gray-300 bg-gray-900 px-4 py-2 text-white"
        >
          {page + 1}
        </button>
      )}

      <span className="border border-gray-300 bg-gray-900 px-4 py-2 text-white">
        ...
      </span>

      {showButton(pages.penultimate) && (
        <button
          onClick={() => goToSelectedPage(pages.penultimate)}
          disabled={disableButton(pages.penultimate)}
          className="cursor-pointer border border-gray-300 bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {pages.penultimate}
        </button>
      )}
      {showButton(pages.last) && (
        <button
          onClick={() => goToSelectedPage(pages.last)}
          disabled={disableButton(pages.last)}
          className="cursor-pointer border border-gray-300 bg-gray-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {pages.last}
        </button>
      )}

      <button
        onClick={goToUpperPage}
        disabled={disableButton(pages.last)}
        className="flex cursor-pointer items-center gap-2 rounded-r-lg border border-gray-300 bg-gray-900 px-4 py-2 disabled:opacity-50"
      >
        <span>Próxima</span>
        <FiArrowRight size={20} className="text-gray-100" />
      </button>
    </div>
  )
}

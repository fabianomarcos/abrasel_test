import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { Pagination } from '..'

describe('Pagination Component', () => {
  type Setup = {
    page?: number
    perPage?: number
    count?: number
  }

  const setCurrentPage = vi.fn()

  const setup = ({ count = 100, page = 1, perPage = 10 }: Setup) => {
    render(
      <Pagination
        page={page}
        perPage={perPage}
        count={count}
        setCurrentPage={setCurrentPage}
      />,
    )
    return { setCurrentPage }
  }

  test('renders basic buttons', () => {
    setup({})
    expect(
      screen.getByRole('button', { name: /anterior/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /próxima/i })).toBeInTheDocument()
    screen.logTestingPlaygroundURL()
    expect(screen.getAllByText('1')).toHaveLength(2)
    expect(screen.getAllByText('...')).toHaveLength(2)
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeEnabled()
    expect(screen.getByText('10')).toBeEnabled()
  })

  test('renders all buttons in the middle of the pagination', async () => {
    setup({ count: 100, perPage: 10, page: 5 })
    const previousButton = screen.getByRole('button', { name: /anterior/i })
    expect(previousButton).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /próxima/i })).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getAllByText('...')).toHaveLength(2)
    expect(screen.getByText('4')).toBeEnabled()
    expect(screen.getByText('5')).toBeDisabled()
    expect(screen.getByText('6')).toBeEnabled()
    expect(screen.getByText('9')).toBeEnabled()
    expect(screen.getByText('10')).toBeEnabled()
  })

  test('disables "Previous" button when on the first page', () => {
    setup({ page: 1 })
    expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled()
  })

  test('disables "Next" button when on the last page', () => {
    setup({ page: 2, perPage: 10, count: 20 })
    expect(screen.getByRole('button', { name: /próxima/i })).toBeDisabled()
  })

  test('calls setCurrentPage when clicking "Next"', () => {
    const { setCurrentPage } = setup({ page: 1 })
    fireEvent.click(screen.getByRole('button', { name: /próxima/i }))
    expect(setCurrentPage).toHaveBeenCalledWith(2)
  })

  test('calls setCurrentPage when clicking "Previous"', () => {
    const { setCurrentPage } = setup({ page: 2 })
    fireEvent.click(screen.getByText('Anterior'))
    expect(setCurrentPage).toHaveBeenCalledWith(1)
  })

  test('calls setCurrentPage when clicking a specific page', () => {
    const { setCurrentPage } = setup({ page: 1 })
    fireEvent.click(screen.getByText('2'))
    expect(setCurrentPage).toHaveBeenCalledWith(2)
  })

  test('marks current page as disabled', () => {
    setup({ page: 3, perPage: 10, count: 100 })
    expect(screen.getByText('3')).toBeDisabled()
  })
})

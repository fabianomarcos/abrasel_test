import '@testing-library/jest-dom'
import { renderHook, screen, fireEvent, waitFor } from '@testing-library/react'

import { Listing } from './@components/listing'
import { renderWithClient } from '../../../../vitest.setup'
import { userStore } from '@/stores/user-store'
import { FakeUserService } from '@/test-utils/class-fakes/users/user-service.fake'
import { generateUsers } from '@/test-utils/data-fake'

const users = generateUsers(10)
const userService = new FakeUserService(users)

describe('ListPage Component', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
    vi.restoreAllMocks()
  })

  test('render user list', async () => {
    const user = users[0]
    const { result: userStoreResult } = renderHook(() => userStore())
    userStoreResult.current.setUser(user)

    renderWithClient(<Listing userService={userService} />)

    await screen.findByText(user.email)
    screen.logTestingPlaygroundURL()

    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByText(user.email)).toBeInTheDocument()
  })

  test('render pagination', async () => {
    const user = users[0]
    const { result: userStoreResult } = renderHook(() => userStore())
    userStoreResult.current.setUser(user)

    renderWithClient(<Listing userService={userService} />)

    await screen.findByText(user.email)
    screen.logTestingPlaygroundURL()

    expect(screen.getAllByRole('button', { name: /1/i })[0]).toBeDisabled()
    expect(screen.getAllByRole('button', { name: /1/i })[1]).toBeDisabled()
    expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /2/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /9/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /10/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /próxima/i })).toBeEnabled()
  })

  test('render pagination 2 when "button 2" is clicked', async () => {
    const user = users[0]
    const { result: userStoreResult } = renderHook(() => userStore())
    userStoreResult.current.setUser(user)

    renderWithClient(<Listing userService={userService} />)

    await screen.findByText(user.email)

    const nextButton = screen.getByRole('button', { name: /próxima/i })
    fireEvent.click(nextButton)
    const thirdPageButton = await screen.findByRole('button', { name: /3/i })

    expect(screen.getAllByRole('button', { name: /1/i })[0]).toBeEnabled()
    expect(screen.getByRole('button', { name: /anterior/i })).toBeEnabled()
    expect(screen.getAllByRole('button', { name: /2/i })[0]).toBeDisabled()
    expect(screen.getAllByRole('button', { name: /2/i })[1]).toBeDisabled()
    expect(screen.getByRole('button', { name: /9/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /10/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /próxima/i })).toBeEnabled()

    fireEvent.click(thirdPageButton)
    const fourthButtonPage = await screen.findByRole('button', { name: /4/i })
    fireEvent.click(fourthButtonPage)
    const fifthButtonPage = await screen.findByRole('button', { name: /5/i })

    expect(screen.getByRole('button', { name: /anterior/i })).toBeEnabled()
    expect(screen.getAllByRole('button', { name: /1/i })[0]).toBeEnabled()
    expect(screen.getByRole('button', { name: /2/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /3/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /4/i })).toBeDisabled()
    expect(fifthButtonPage).toBeEnabled()
    expect(screen.getByRole('button', { name: /9/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /10/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /próxima/i })).toBeEnabled()

    const penultimatePageButton = screen.getByRole('button', { name: /9/i })
    fireEvent.click(penultimatePageButton)
    await screen.findByRole('button', { name: /8/i })

    expect(screen.getAllByRole('button', { name: /1/i })[0]).toBeEnabled()
    expect(screen.getByRole('button', { name: /anterior/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /2/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /8/i })).toBeEnabled()
    expect(screen.getAllByRole('button', { name: /9/i })[0]).toBeDisabled()
    expect(screen.getAllByRole('button', { name: /9/i })[1]).toBeDisabled()
    expect(screen.getAllByRole('button', { name: /10/i })[0]).toBeEnabled()
    expect(screen.getAllByRole('button', { name: /10/i })[1]).toBeEnabled()
    expect(screen.getByRole('button', { name: /próxima/i })).toBeEnabled()

    const [lastPageButton] = screen.getAllByRole('button', { name: /10/i })
    fireEvent.click(lastPageButton)
    await waitFor(() => {
      const antecessorButton = screen.queryByRole('button', { name: /8/i })
      expect(antecessorButton).toBeNull()
      screen.logTestingPlaygroundURL()
      expect(screen.getAllByRole('button', { name: /1/i })[0]).toBeEnabled()
      expect(screen.getByRole('button', { name: /anterior/i })).toBeEnabled()
      expect(screen.getByRole('button', { name: /2/i })).toBeEnabled()
      expect(screen.getAllByRole('button', { name: /9/i })[0]).toBeEnabled()
      expect(screen.getAllByRole('button', { name: /9/i })[1]).toBeEnabled()
      expect(screen.getAllByRole('button', { name: /10/i })[0]).toBeDisabled()
      expect(screen.getAllByRole('button', { name: /10/i })[1]).toBeDisabled()
      expect(screen.getByRole('button', { name: /próxima/i })).toBeDisabled()
    })
  })
})

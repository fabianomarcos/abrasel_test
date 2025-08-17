import { useEffect } from 'react'
import { useValidateToken } from './hooks/use-validate-token'

export const Header = () => {
  const { verify } = useValidateToken()

  useEffect(() => {
    verify()
  }, [verify])

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1>My Application</h1>
    </header>
  )
}

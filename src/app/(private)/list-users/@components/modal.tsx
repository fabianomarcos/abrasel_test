import { UpdateFormSchemaType } from '@/schemas/update-form-schema'
import { useState } from 'react'

interface IProps {
  isOpen: boolean
  toggleModal: () => void
  editingUser: UpdateFormSchemaType
  updateUser: (body: UpdateFormSchemaType) => Promise<void>
}

export const Modal = ({
  toggleModal,
  isOpen,
  updateUser,
  editingUser,
}: IProps) => {
  const [name, setName] = useState('')

  return (
    <div className="flex h-screen items-center justify-center">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-80 rounded-2xl text-gray-500 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">
              Edite o nome do usuário
            </h2>

            <input
              type="text"
              value={name || editingUser?.name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Nome do usuário"
            />

            <button
              onClick={() => {
                updateUser({ ...editingUser, name })
                toggleModal()
              }}
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Confirmar
            </button>

            <button
              onClick={toggleModal}
              className="mt-2 w-full rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

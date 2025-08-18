'use client'
import { useEffect, useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'

import { ROUTES } from '@/routes'
import { userStore } from '@/stores/user-store'
import { useRouter } from 'next/navigation'
import { useGetUsers } from './hooks/use-get-users'
import { UserService } from '@/services/user'
import { Header } from '@/components/Header'
import { Loader } from '@/components/Loader'
import { Toast } from '@/components/Toast'
import { ERRORS } from '@/translator'
import { useDeleteUser } from './hooks/use-delete-user'
import { Pagination } from '@/components/Pagination'
import { Modal } from './@components/modal'
import { useUpdateUser } from '../profile/hooks/use-update-user'
import { UpdateFormSchemaType } from '@/schemas/update-form-schema'

const userService = new UserService()

export default function ListUsersPage() {
  const { user } = userStore()
  const [editUser, setEditUser] = useState({} as UpdateFormSchemaType)
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const {
    deleteUser,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeleteUser({
    userService,
  })

  const { update } = useUpdateUser({ userService })

  const { error, isPending, users } = useGetUsers({
    userService,
    page: 1,
    perPage: 20,
  })

  if (errorDelete) {
    Toast({ content: error?.message, options: { type: 'error' } })
  }

  if (error) {
    Toast({ content: ERRORS(error?.message), options: { type: 'error' } })
  }

  useEffect(() => {
    if (user?.role !== 'ADMIN') router.push(ROUTES.PRIVATE.HOME)
  }, [router, user?.role])

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Usuários</h1>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-800 text-left">
              <tr>
                <th className="px-4 py-2 border-b">Nome</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Role</th>
                <th className="px-4 py-2 border-b">Ativo</th>
                <th className="px-4 py-2 border-b">Criado em</th>
                <th className="px-4 py-2 border-b">Editar</th>
                <th className="px-4 py-2 border-b">Deletar</th>
              </tr>
            </thead>
            <tbody>
              {(isPending || isPendingDelete) && <Loader />}
              {users &&
                users?.data?.length > 0 &&
                users.data.map((user) => {
                  return (
                    <tr key={user.id} className="hover:bg-gray-600">
                      <td className="px-4 py-2 border-b">{user.name}</td>
                      <td className="px-4 py-2 border-b">{user.email}</td>
                      <td className="px-4 py-2 border-b">{user.role}</td>
                      <td className="px-4 py-2 border-b">
                        {user.active ? '✅' : '❌'}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="cursor-pointer px-4 py-2 border-b">
                        <FiEdit
                          role="button"
                          onClick={() => {
                            setShowModal((state) => !state)
                            setEditUser({ ...user, password: '' })
                          }}
                          color="#10c437"
                          size={20}
                        />
                      </td>
                      <td className="cursor-pointer px-4 py-2 border-b">
                        <FiTrash
                          role="button"
                          onClick={() => deleteUser(user.id)}
                          color="#d40101"
                          size={20}
                        />
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>

          {showModal && (
            <Modal
              isOpen={showModal}
              toggleModal={() => setShowModal((state) => !state)}
              editingUser={editUser}
              updateUser={update}
            />
          )}
        </div>

        <Pagination
          page={page}
          totalPages={users?.total || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

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
    page,
    perPage: 2,
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
      <div className="lg:6 mx-auto max-w-6xl px-2 py-4 sm:px-2">
        <h1 className="mb-4 text-2xl font-semibold">Usuários</h1>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-800 text-left">
              <tr>
                <th className="border-b px-3 py-2 sm:px-4">Nome</th>
                <th className="hidden border-b px-3 py-2 sm:table-cell sm:px-4">
                  Email
                </th>
                <th className="hidden border-b px-3 py-2 sm:table-cell sm:px-4">
                  Role
                </th>
                <th className="hidden border-b px-3 py-2 sm:table-cell sm:px-4">
                  Ativo
                </th>
                <th className="hidden border-b px-3 py-2 sm:table-cell sm:px-4">
                  Criado em
                </th>
                <th className="border-b px-3 py-2 text-center sm:px-4">
                  Editar
                </th>
                <th className="border-b px-3 py-2 text-center sm:px-4">
                  Deletar
                </th>
              </tr>
            </thead>
            <tbody>
              {(isPending || isPendingDelete) && <Loader />}
              {users &&
                users?.data?.length > 0 &&
                users.data.map((user) => {
                  return (
                    <tr key={user.id} className="hover:bg-gray-600">
                      <td className="border-b px-3 py-2 sm:px-4">
                        {user.name}
                      </td>
                      <td className="hidden border-b px-3 py-2 sm:table-cell sm:px-4">
                        {user.email}
                      </td>
                      <td className="hidden border-b px-3 py-2 sm:table-cell sm:px-4">
                        {user.role}
                      </td>
                      <td className="hidden border-b px-3 py-2 sm:table-cell sm:px-4">
                        {user.active ? '✅' : '❌'}
                      </td>
                      <td className="hidden border-b px-3 py-2 sm:table-cell sm:px-4">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="cursor-pointer border-b px-4 py-2">
                        <div className="flex justify-center">
                          <FiEdit
                            role="button"
                            onClick={() => {
                              setShowModal((state) => !state)
                              setEditUser({ ...user, password: '' })
                            }}
                            color="#10c437"
                            size={20}
                          />
                        </div>
                      </td>
                      <td className="cursor-pointer border-b text-center">
                        <div className="flex justify-center">
                          <FiTrash
                            role="button"
                            onClick={() => deleteUser(user.id)}
                            color="#d40101"
                            size={20}
                          />
                        </div>
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
          count={users?.total || 1}
          setCurrentPage={setPage}
          perPage={users?.perPage || 2}
        />
      </div>
    </div>
  )
}

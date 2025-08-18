'use client'

import { ToastContainer } from 'react-toastify'
import { queryClient } from '@/libs/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      {props.children}
    </QueryClientProvider>
  )
}

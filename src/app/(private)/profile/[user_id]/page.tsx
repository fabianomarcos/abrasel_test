'use client'
import { useState } from 'react'

import { Header } from '@/components/Header'
import { AddressForm } from '../components/address-form'
import { ProfileForm } from '../components/profile-form'

export default function ProfilePage() {
  const [tab, setTab] = useState<'profile' | 'address'>('profile')

  return (
    <div>
      <Header />

      <div className="flex flex-col py-8 px-16">
        <div className="flex gap-4 py-4">
          <span
            role="button"
            onClick={() => setTab('profile')}
            className="text-2xl cursor-pointer"
          >
            Perfil
          </span>
          <span
            role="button"
            onClick={() => setTab('address')}
            className="text-2xl cursor-pointer"
          >
            Endereço
          </span>
        </div>

        {tab === 'profile' && <ProfileForm />}

        {tab === 'address' && <AddressForm />}
      </div>
    </div>
  )
}

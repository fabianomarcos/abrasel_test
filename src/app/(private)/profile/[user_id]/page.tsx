'use client'
import { useState } from 'react'

import { Header } from '@/components/Header'
import { AddressForm } from '../components/address-form'
import { ProfileForm } from '../components/profile-form'

export default function ProfilePage() {
  const [tab, setTab] = useState<'profile' | 'address'>('profile')

  return (
    <>
      <Header />

      <div className="flex flex-col sm:px-8 sm:py-8 md:px-16">
        <div className="flex gap-4 px-6 py-4 sm:px-0">
          <span
            role="button"
            onClick={() => setTab('profile')}
            className={`cursor-pointer text-2xl ${tab === 'profile' ? 'text-amber-300' : ''}`}
          >
            Perfil
          </span>
          <span
            role="button"
            onClick={() => setTab('address')}
            className={`cursor-pointer text-2xl ${tab === 'address' ? 'text-amber-300' : ''}`}
          >
            Endereço
          </span>
        </div>

        {tab === 'profile' && <ProfileForm />}

        {tab === 'address' && <AddressForm />}
      </div>
    </>
  )
}

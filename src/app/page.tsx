import { MainPage } from './(home)/main'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div
      className="font-sans grid grid-rows-[10px_1fr_20px] items-center
                   justify-items-center min-h-screen p-8 pb-20 gap-12 sm:p-20"
    >
      <Header />

      <MainPage />

      <Footer />
    </div>
  )
}

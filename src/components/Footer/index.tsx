import Image from 'next/image'
import { EyeOutline, Target } from '../Icons'

export const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="#mission"
      >
        <Target aria-hidden size={24} />
        Missão
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="#vision"
      >
        <EyeOutline aria-hidden size={24} />
        Visão
      </a>

      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="#values"
      >
        <Image
          aria-hidden
          src="/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        Valores
      </a>

      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://abrasel.com.br/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Visitar nosso site
      </a>
    </footer>
  )
}

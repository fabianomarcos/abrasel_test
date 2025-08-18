'use client'
import { useState } from 'react'

export function useDataHeader() {
  const [showOptions, setShowOptions] = useState(false)

  const disappear = (styles: string) => {
    const element = document.querySelector(
      '[data-id="animation"]',
    ) as HTMLDivElement
    if (element) {
      element.classList.add(styles)
      element.addEventListener('animationend', () => {
        element.style.display = 'none'
      })
    }
  }

  const handleToggleUserOptions = (styles: string) => {
    const timer = showOptions ? 1000 : 0
    setTimeout(() => setShowOptions(!showOptions), timer)
    disappear(styles)
  }

  return {
    showOptions,
    handleToggleUserOptions,
  }
}

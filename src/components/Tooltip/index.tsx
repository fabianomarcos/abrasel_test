import React from 'react'

interface TooltipProps {
  title: string
  children: React.ReactElement
}

export const Tooltip = ({ title, children }: TooltipProps) => {
  return (
    <div className="relative flex items-center justify-center group cursor-help">
      {children}
      <span
        className="
          absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2
          w-40 bg-gray-500 text-white text-sm font-medium
          px-3 py-2 rounded-md
          opacity-0 invisible group-hover:opacity-100 group-hover:visible
          transition-opacity duration-400
          z-10
        "
      >
        {title}
        <span
          className="
            absolute top-full left-1/2 -translate-x-1/2
            border-x-6 border-x-transparent
            border-t-6 border-t-gray-600
          "
        />
      </span>
    </div>
  )
}

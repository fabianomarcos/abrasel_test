import { useState } from 'react'

type Option = {
  value: string | number
  label: string
}

type DropdownProps = {
  options: Option[]
  placeholder?: string
  onChange: (value: string) => void
}

export default function Dropdown({
  options,
  placeholder = 'Selecione...',
  onChange,
}: DropdownProps) {
  const [selected, setSelected] = useState('')

  const handleChange = (value: string) => {
    setSelected(value)
    onChange(value)
  }

  return (
    <div>
      <select
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full cursor-pointer rounded-xl border border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

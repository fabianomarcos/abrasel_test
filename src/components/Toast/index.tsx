import { toast, ToastContent, ToastOptions } from 'react-toastify'

interface IProps {
  content: ToastContent<unknown>
  options?: ToastOptions<unknown>
}

export const Toast = ({ content, options }: IProps) => {
  return toast(content, options)
}

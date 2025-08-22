import { IoEyeOutline as EyeOutline } from 'react-icons/io5'
import { FaLinkedin as Linkedin } from 'react-icons/fa6'
import { MdOutlineSaveAs as Save } from 'react-icons/md'
import { SiNamecheap as IName } from 'react-icons/si'

import {
  FiEye,
  FiEyeOff,
  FiInfo as Info,
  FiLogOut as LogOut,
  FiUser as User,
  FiUsers as Users,
  FiMail as Email,
} from 'react-icons/fi'

import { GiBullseye as Target } from 'react-icons/gi'

export {
  EyeOutline,
  IName,
  Info,
  Linkedin,
  LogOut,
  Save,
  User,
  Users,
  Target,
  Email,
}

export const PasswordIcon = (
  showPassword: boolean,
  togglePassword: () => void,
) =>
  showPassword ? (
    <FiEye onClick={togglePassword} />
  ) : (
    <FiEyeOff onClick={togglePassword} />
  )

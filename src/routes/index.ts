const createPageUrl = (base: string, sub_base: string = '') =>
  `/${base}/${sub_base}`

export const ROUTES = {
  PRIVATE: {
    HOME: '/',
    PROFILE: createPageUrl('profile'),
  },

  PUBLIC: {
    LOGIN: createPageUrl('sign-in'),
    REGISTER: createPageUrl('sign-up'),
    FORGOT_PASSWORD: createPageUrl('forgot-password'),
  },
}

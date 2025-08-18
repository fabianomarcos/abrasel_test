export type LanguageType = 'es-US' | 'pt-BR'

export const ERRORS = (text?: string) => {
  const language = navigator.language as LanguageType

  const error = {
    'Some fields are invalids:': {
      'en-US': 'Some fields are invalids',
      'pt-BR': 'Alguns campos são inválidos',
    },
    'Credential are not valid.': {
      'en-US': 'Credential are not valid.',
      'pt-BR': 'Credenciais Inválidas',
    },
    'User not exists': {
      'en-US': 'User not exists.',
      'pt-BR': 'Usuário não existe',
    },

    default: {
      'en-US': 'An error occurred, please try later.',
      'pt-BR': 'Ocorreu algum erro, tente mais tarde',
    },
  }

  const textKey = (text as keyof typeof error) || 'default'
  const errorWithKey = error[textKey || 'default'] || error.default
  const languageKey = language as keyof typeof errorWithKey
  const message =
    errorWithKey[languageKey] ||
    'Ocorreu algum erro tente novamente mais tarde.'

  return message
}

'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldValues,
  DefaultValues,
  Path,
  RegisterOptions,
  useForm,
  UseFormRegister,
  Resolver,
} from 'react-hook-form'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export function useValidateSchema<TSchema extends ZodType<any, any>>(
  schema: TSchema,
  defaultValues?: DefaultValues<z.infer<TSchema>>,
) {
  const methods = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema) as Resolver<z.infer<TSchema>>,
    defaultValues,
  })
  return {
    ...methods,
    errors: methods.formState.errors,
    isSubmitting: methods.formState.isSubmitting,
  }
}

export const registerField = <T extends FieldValues>(
  register: UseFormRegister<T>,
  name: Path<T>,
  options?: RegisterOptions<T, Path<T>>,
) => {
  return register(name, options)
}

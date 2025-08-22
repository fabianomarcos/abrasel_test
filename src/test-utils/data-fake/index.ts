import { User } from '@/services/sign-in/contracts'
import { faker } from '@faker-js/faker'

export function generateUsers(count = 100): User[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['ADMIN', 'USER']),
    active: faker.datatype.boolean(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    address_id: faker.string.uuid(),
  }))
}

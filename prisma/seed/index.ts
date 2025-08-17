import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice Admin',
        email: 'alice@admin.com',
        role: 'ADMIN',
        password: 'Admin@1234',
      },
      {
        name: 'Bob User',
        email: 'bob@user.com',
        role: 'USER',
        password: 'User@1234',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

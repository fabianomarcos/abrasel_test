Você consegue acompanhar em produção pela url https://abrasel-test.vercel.app

Usuário admin@admin.com
Senha   Admin@0904


Para rodar localmente rode os seguintes comandos abaixo: 
```bash
git checkout dev

pnpm install

npx prisma migrate dev

pnpm run dev
```

Para adicionar um usuário no banco roda 
```bash
npx prisma studio
```
Entrar na tabela users e adicionar um usuário como ADMIN na role

Abra [http://localhost:3000](http://localhost:3000) em seu browser.

Você consegue acompanhar em produção pela url https://abrasel-test.vercel.app


Para rodar localmente rode os seguintes comandos abaixo: 
```bash
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

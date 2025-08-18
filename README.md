Você consegue acompanhar em produção pela url https://abrasel-test.vercel.app

Usuário admin@admin.com
Senha   Admin@0904

obs: ainda estou mexendo no responsivo, devido a falta de tempo que tive. 

Para rodar localmente rode os seguintes comandos abaixo: 
```bash
git checkout dev

pnpm install

npx prisma migrate dev

pnpm run dev
```

Para adicionar um usuário no banco, cadastrar via browser clicando em Registrar nova conta e depois rodar 
```bash
npx prisma studio
```
Entrar na tabela users e editar o usuário criado como ADMIN na role

Deixei um usuário salvo como
admin@admin.com
Admin@0904

Abra [http://localhost:3000](http://localhost:3000) em seu browser.

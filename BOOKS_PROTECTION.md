# Proteção da seção de livros

O projeto Neon criado para esta integração é `livros-protegidos` (`shiny-waterfall-71868294`), na região `aws-us-east-2`.

## Publicação do backend

A sessão do Neon CLI precisa ser renovada antes do primeiro deploy:

```powershell
neon auth
neon functions deploy livrosapi --project-id shiny-waterfall-71868294 --branch br-red-dust-ben96zzs --src books-api\src --runtime nodejs24 --wait
```

Depois, copie a URL retornada pela Function para o atributo `data-api-url` em `content/page/acesso-livros.md`.

## Arquivos privados

Os livros protegidos devem ser enviados ao bucket privado `livros-privados`, usando as chaves listadas em `books-api/schema.sql`. Não publique esses arquivos novamente em `static/` ou no GitHub Pages.

## Liberar acesso

A página `acesso-livros` tem um formulário "Criar nova conta" (`auth.signUp.email`). Para funcionar, o cadastro por e-mail e senha precisa estar habilitado no Neon Auth (console do Neon → Auth → configurações). Uma conta nova não vê nenhum livro até receber permissão. Para liberar pelo terminal, use o script `books-api/scripts/permissoes.js`. Na primeira vez, instale as dependências e faça login no Neon CLI:

```powershell
cd books-api
npm install
neon auth
```

Depois:

```powershell
npm run permissoes -- usuarios
npm run permissoes -- livros
npm run permissoes -- liberar pessoa@exemplo.com chatbots javascript
npm run permissoes -- liberar pessoa@exemplo.com todos
npm run permissoes -- remover pessoa@exemplo.com chatbots
```

Se preferir não usar o Neon CLI, defina a variável de ambiente `DATABASE_URL`. Remover uma permissão impede novos links, mas um link já gerado vale até expirar.

Como alternativa manual, pegue o ID do usuário no Neon Auth e associe os livros na tabela `book_permissions`:

```sql
INSERT INTO book_permissions (user_id, book_id)
VALUES ('ID_DO_USUARIO_NEON', 'chatbots')
ON CONFLICT DO NOTHING;
```

O backend verifica o JWT, consulta essa tabela e cria um link assinado com validade de 5 minutos. O bucket nunca é acessado diretamente pelo navegador sem autorização.

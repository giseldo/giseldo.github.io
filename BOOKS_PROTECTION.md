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

## Cadastro com aprovação

Qualquer pessoa pode criar uma conta pelo botão **Criar conta** da página, mas a conta nasce **sem acesso**. No primeiro login o backend registra o usuário em `user_approvals` com status `pending` e responde 403 enquanto ele não for aprovado.

Pré-requisito: ative o cadastro por e-mail/senha nas configurações do Neon Auth (antes estava desativado). Depois execute de novo o `books-api/schema.sql` e publique a Function.

### Aprovar um usuário

No SQL Editor do Neon:

```sql
-- ver pedidos pendentes
SELECT user_id, email, requested_at FROM user_approvals WHERE status = 'pending';

-- aprovar e liberar livros
UPDATE user_approvals SET status = 'approved', decided_at = now() WHERE user_id = 'ID_DO_USUARIO_NEON';
INSERT INTO book_permissions (user_id, book_id)
VALUES ('ID_DO_USUARIO_NEON', 'chatbots')
ON CONFLICT DO NOTHING;

-- recusar
UPDATE user_approvals SET status = 'rejected', decided_at = now() WHERE user_id = 'ID_DO_USUARIO_NEON';
```

O backend exige as duas coisas: usuário `approved` **e** livro em `book_permissions`. O link assinado dura 5 minutos e o bucket nunca é acessado direto pelo navegador.

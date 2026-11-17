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

O cadastro público está desativado. Crie cada usuário autorizado no Neon Auth e depois associe os livros na tabela `book_permissions`:

```sql
INSERT INTO book_permissions (user_id, book_id)
VALUES ('ID_DO_USUARIO_NEON', 'chatbots')
ON CONFLICT DO NOTHING;
```

O backend verifica o JWT, consulta essa tabela e cria um link assinado com validade de 5 minutos. O bucket nunca é acessado diretamente pelo navegador sem autorização.

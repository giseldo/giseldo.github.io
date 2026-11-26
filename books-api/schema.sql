CREATE TABLE IF NOT EXISTS protected_books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_key TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS book_permissions (
  user_id TEXT NOT NULL,
  book_id TEXT NOT NULL REFERENCES protected_books(id) ON DELETE CASCADE,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, book_id)
);

CREATE INDEX IF NOT EXISTS book_permissions_user_id_idx
  ON book_permissions (user_id);

INSERT INTO protected_books (id, title, file_key)
VALUES
  ('chatbots', 'Construindo Chatbots', 'chatbots/chatbots.pdf'),
  ('javascript', 'Introdução a Javascript', 'javascript/JavaScript-com-Alana.pdf'),
  ('arvore', 'Árvore de Decisão com Python', 'arvore/arvore.pdf'),
  ('reg', 'Regressão Linear com Aprendizagem de Máquina', 'reg/reg.pdf'),
  ('vetorizacao', 'Processamento de Linguagem Natural', 'vetorizacao/vetorizacao.pdf'),
  ('contos', 'Contos do Sistema Solar', 'contos/contos.pdf'),
  ('contosvicosa', 'Contos de Viçosa', 'contosvicosa/contosvicosa.pdf'),
  ('matematicadiscreta', 'Noções de Matemática Discreta aplicada à Matemática Financeira', 'matematicadiscreta/matematicadiscreta.pdf')
ON CONFLICT (id) DO UPDATE
SET title = EXCLUDED.title, file_key = EXCLUDED.file_key;

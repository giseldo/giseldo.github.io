# Giseldo Neo

<p align="center">
  <img src="static/avatar-icon.png" alt="Logo de Giseldo Neo" width="96">
</p>

Código-fonte do site pessoal de [Giseldo Neo](https://giseldo.github.io), dedicado a inteligência artificial, tecnologia, cursos, livros e projetos.

## Tecnologias

- [Hugo](https://gohugo.io/) — gerador de site estático
- [Beautiful Hugo](https://github.com/halogenica/beautifulhugo) — tema base
- [GitHub Pages](https://pages.github.com/) — hospedagem
- [GitHub Actions](https://github.com/features/actions) — build e publicação automática

## Executando localmente

### Pré-requisitos

Instale o [Hugo Extended](https://gohugo.io/installation/) (a publicação automática usa a versão `0.134.2`) e o Git.

Clone o repositório com o submódulo do tema:

```bash
git clone --recurse-submodules https://github.com/giseldo/giseldo.github.io.git
cd giseldo.github.io
```

Se o repositório já tiver sido clonado sem os submódulos, execute:

```bash
git submodule update --init --recursive
```

Inicie o servidor de desenvolvimento:

```bash
hugo server -D
```

O site estará disponível em `http://localhost:1313`.

## Criando conteúdo

Para criar uma postagem a partir do arquétipo do projeto:

```bash
hugo new content post/nome-da-postagem.md
```

Os conteúdos ficam em `content/`, enquanto imagens, estilos, scripts e outros arquivos públicos ficam em `static/`.

## Gerando o site

Para gerar a versão de produção na pasta `public/`:

```bash
hugo --gc --minify
```

## Estrutura principal

```text
.
├── archetypes/       # Modelos para novos conteúdos
├── content/          # Páginas e postagens
├── layouts/          # Sobrescritas dos templates do tema
├── static/           # Imagens, estilos, scripts e arquivos estáticos
├── themes/           # Tema Beautiful Hugo (submódulo Git)
└── hugo.toml         # Configuração do site
```

## Publicação

Os pushes para a branch `master` acionam o workflow em `.github/workflows/main.yml`, que gera o site com Hugo e o publica automaticamente no GitHub Pages.

## Autor

[Giseldo Neo](https://github.com/giseldo)

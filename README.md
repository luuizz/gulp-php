# Template Gulp em PHP

Projeto em PHP estruturado com Gulp para compilação de SASS e minificação de arquivos CSS e JS, com configuração de SEO dinâmica para múltiplas páginas.

## Estrutura de pastas

```bash
GULP-PHP/
├── assets/
│ ├── icons/ # Ícones e favicons
│ ├── images/ # Imagens como JPG, PNG, SVG, WEBP
│ └── video/ # Arquivos de vídeo
├── css/
│ ├── lib/ # Bibliotecas externas de JS (ex: aos.min.js, swiper.min.js)
│ ├── main.css # CSS geral compilado e minificado
│ └── plugins.css #CSS de bibliotecas externas concatenadas e minificadas
├── js/
│ ├── lib/ # Bibliotecas externas de JS (ex: aos.min.js, swiper.min.js)
│ ├── scripts/ # Scripts customizados por página ou funcionalidade
│ ├── all.js # JS customizado concatenado e minificado
│ └── plugins.js # JS de bibliotecas externas concatenado e minificado
├── scss/
│ ├── _footer.scss
│ ├── _grid.scss
│ ├── _header.scss
│ ├── _home.scss
│ ├── _mixins.scss
│ ├── _patterns.scss
│ ├── _reset.scss
│ ├── _variables.scss
│ └── main.scss # Arquivo principal que importa todos os outros
├── vendor/ # Dependências do PHP (gerada pelo Composer)
├── .env
├── .env.example #Variaveis de exemplo
├── .gitignore
├── composer.json
├── composer.lock
├── config.php
├── footer.php
├── gulpfile.js
├── header.php # Configura as folhas de estilo e meta tags
├── index.php
├── package.json
├── quem-somos.php
├── README.md
└── yarn.lock
```

## Rodando o projeto

1.  Certifique-se de ter o **Node.js**, **Yarn** (ou npm) e o **Composer** instalados. Se não tiver o Composer, pode baixá-lo em [getcomposer.org](https://getcomposer.org/).

2.  Instale as dependências do Node.js:

    ```bash
    yarn install
    ```

    Ou, se preferir npm:

    ```bash
    npm install
    ```

3.  Instale as dependências do PHP (pasta `vendor`):

    ```bash
    composer install
    ```

4.  Crie e configure o arquivo `.env` para as variáveis de ambiente. Você pode usar o arquivo de exemplo como base:

    ```bash
    cp .env.example .env
    ```

5.  Rode o Gulp para compilar e iniciar o servidor:

    ```bash
    npx gulp
    ```

O processo agora está completo e pronto para começar o desenvolvimento.

O Gulp abre o navegador automaticamente na porta 8000 (configuração do servidor PHP embutido) e também na porta 3000 (padrão do browser sync).

Todas as alterações em arquivos SCSS, JS e PHP são observadas automaticamente e o navegador é atualizado.

## Estilos (CSS/SASS)

Todos os arquivos SASS estão dentro da pasta `scss/`.

O arquivo `main.scss` importa todos os outros arquivos:

```scss
// Global
@use 'variables';
@use 'mixins';
@use 'patterns';
@use 'reset';
@use 'grid';
@use 'header';

// Páginas - Se houver
@use 'home';
```

Para adicionar novos estilos estruturais ou por página:

1. Crie o arquivo `_nomedoarquivo.scss` dentro de `scss/`.

2. Importe no `main.scss`.

Bibliotecas externas de CSS devem ser colocadas na pasta `css/lib/`. Elas serão concatenadas e minificadas automaticamente em plugins.css.

## Scripts (JS)

Scripts customizados devem ser colocados em `js/scripts/`.

Bibliotecas externas devem ficar em `js/lib/`.

O Gulp concatena e minifica:

1. `all.js` → todos os scripts customizados

2. `plugins.js` → todas as bibliotecas externas

O BrowserSync atualiza automaticamente o navegador quando os arquivos são alterados.

## SEO Dinâmico

O projeto utiliza um sistema de SEO dinâmico, onde você define as meta tags para cada página de forma simples e segura.

### Padrão de Título:

O título de cada página segue o padrão `Nome do Site | Título da Página`. Você só precisa definir o título específico de cada página.

### Exemplo:

Para uma página "Sobre Nós", a variável `$pageTitle` deve ser definida como:

```php
<?php
$pageTitle = 'Sobre Nós';
$pageDescription = 'Conheça a história da nossa empresa e a nossa equipe.';
$pageKeywords = 'sobre nós, empresa, equipe, história';

include 'header.php';
?>
```

Com isso, a tag `<title>` na sua página se tornará `<title>Gulp Teste | Sobre Nós</title>`.

### Valores Padrão (Fallbacks):

Se alguma variável de SEO (como `$pageTitle`, `$pageDescription`, ou `$pageKeywords`) não for definida em uma página, o sistema usará automaticamente os valores padrão do arquivo .env, garantindo que não haja erros e que as tags não fiquem vazias.

## Deploy

Antes de enviar para produção, não inclua a pasta `node_modules` e `vendor`.

Apenas mantenha os arquivos compilados em `css/` e `js/`.

O servidor PHP deve estar configurado para a pasta raiz do projeto.

## Observações

- Todos os recursos de mídia e estáticos, como imagens, ícones e vídeos, devem ser armazenados na pasta `assets`. Essa prática mantém o projeto organizado e centraliza todos os arquivos de mídia em um só lugar.
- Certifique-se de que a variável de ambiente `SITE_NAME` no seu arquivo `.env` está configurada corretamente, pois ela é usada como base para todos os títulos de página.
- Para novas páginas, adicione as variáveis de SEO personalizadas e inclua `header.php` e `footer.php`.
- Sempre adicione bibliotecas externas em suas respectivas pastas (`css/lib` e `js/lib`) para que o Gulp as compile corretamente.

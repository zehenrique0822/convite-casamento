# 💌 Convite de Casamento Digital — Karine & João Gabriel

Aplicação web **React + Vite** (mobile-first, 100dvh) com **duas versões** do
convite, que compartilham o mesmo conteúdo e os mesmos modais:

| Versão | Como é | Onde fica o código |
| --- | --- | --- |
| **`minimal`** (atual) | Selo dourado com o monograma → as metades verdes abrem e revelam **uma única tela** com todas as informações. | `src/versions/minimal/` |
| **`classic`** (anterior) | Envelope animado → livreto com páginas viradas (*page flip*). | `src/components/` |

### Como alternar entre as versões

- **Padrão do site**: edite `version` em **`src/data/content.js`**
  (`'minimal'` ou `'classic'`).
- **Na hora, sem mexer no código**: use o parâmetro na URL —
  `?v=classic` ou `?v=minimal` (ex.: `https://seusite.com/?v=classic`).

Nada da versão antiga foi apagado: as duas continuam funcionando lado a lado.

## ✨ Recursos (versão `classic`)

- **Envelope animado** (Framer Motion): aba abre no eixo X, cartão desliza e o
  envelope some revelando o convite.
- **Page flip realista** com `react-pageflip` (arraste para o lado ou use as
  setas/bordas).
- **5 páginas**: Capa · Save the Date · Romântica · Interativa · Encerramento.
- **Página interativa** com caixa *glassmorphism* e grid 2×2 que abre modais.
- **Tipografia elegante**: Montserrat (apoio), Playfair Display (títulos) e
  Great Vibes (script).
- Paleta em tons pastéis + dourado suave.

---

## 🚀 Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Rode em desenvolvimento
npm run dev

# 3. Build de produção
npm run build
npm run preview
```

> Caso prefira instalar manualmente as dependências principais:
>
> ```bash
> npm install react react-dom framer-motion react-pageflip lucide-react
> npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
> ```

Abra o endereço exibido no terminal (ex.: `http://localhost:5173`).
Para a melhor experiência, use o **modo responsivo do navegador (mobile)** ou
abra no celular.

---

## ✏️ Como personalizar

### Textos, datas, nomes e links
Tudo está centralizado em **`src/data/content.js`**:

- `couple` → nomes e data.
- `pagesText` → textos de cada página (capa, save the date, versículo, etc.).
- `interactions` → os 4 botões da página interativa (título, texto do modal e
  link de ação opcional `actionUrl`).

### Imagens de fundo
Ainda em **`src/data/content.js`**, no objeto `images`:

- Troque as URLs do Unsplash pela URL da sua foto **ou**
- Coloque os arquivos na pasta **`/public`** e referencie pelo caminho a partir
  da raiz, por exemplo:

  ```js
  cover: '/minha-foto-capa.jpg',
  ```

### Cores e fontes
- **Cores**: `tailwind.config.js` → `theme.extend.colors` (ex.: `gold`, `cream`).
- **Fontes**: importadas no topo de `src/index.css` (Google Fonts) e mapeadas em
  `tailwind.config.js` → `fontFamily` (`font-script`, `font-serif`, `font-sans`).

### Ícones
Os ícones vêm do `lucide-react`. Na página interativa, o ícone de cada botão é
definido pelo campo `icon` em `content.js` (ex.: `"MapPin"`, `"Gift"`). Para usar
outro, importe-o em `src/components/pages/InteractivePage.jsx` e adicione ao mapa
`ICONS`.

---

## 🗂 Estrutura

```
convite-casamento/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── public/
│   └── heart.svg
└── src/
    ├── main.jsx
    ├── App.jsx                 # escolhe a versão + modal global
    ├── index.css               # fontes Google + utilidades (glass, etc.)
    ├── data/
    │   └── content.js          # >>> EDITE AQUI textos, data e versão <<<
    ├── versions/
    │   └── minimal/            # VERSÃO NOVA (tela única)
    │       ├── SealScreen.jsx      # selo + metades que abrem
    │       ├── MinimalInvite.jsx   # o cartão com todas as infos
    │       └── Eucalyptus.jsx      # folhagem em SVG (sem imagem externa)
    └── components/             # VERSÃO ANTIGA (envelope + livreto)
        ├── Envelope.jsx        # tela inicial animada
        ├── InvitationBook.jsx  # livreto com page flip
        ├── Modal.jsx           # bottom sheet / modal
        └── pages/
            ├── PageLayout.jsx      # moldura (fundo + overlay)
            ├── CoverPage.jsx       # Página 1
            ├── SaveTheDatePage.jsx # Página 2
            ├── RomanticPage.jsx    # Página 3
            ├── InteractivePage.jsx # Página 4 (interativa)
            └── ClosingPage.jsx     # Página 5
```

---

## 📝 Notas técnicas

- O **Modal é renderizado no `App`** (e não dentro da página) porque os
  elementos do `react-pageflip` recebem `transform`, o que quebraria um
  `position: fixed` dentro da página.
- Cada página passada ao `react-pageflip` é envolvida por um wrapper com
  `forwardRef` (exigência da lib).
- Layout usa `100dvh` para respeitar a barra de endereço dos navegadores mobile.
```

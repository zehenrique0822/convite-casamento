# Backup das fontes

## Situação atual: **Cormorant Garamond** (fonte única)

Em **16/07/2026** a fonte única passou de Playfair Display para
**Cormorant Garamond**. Motivo: o **"J" itálico da Playfair é um swash** (𝒥),
que era lido como **"F"** — aparecia no monograma "K&J" e em "João Gabriel".

Todas as candidatas testadas (Cormorant Garamond, EB Garamond, Lora, Crimson,
Spectral, Bodoni Moda, Libre Baskerville, Gelasio, Marcellus) desenham um "J"
normal; só a Playfair tem esse swash. A Cormorant foi escolhida por manter o
mesmo estilo (serifada elegante, itálico refinado, clássica de casamento).

> **Atenção ao mexer no tamanho dos textos:** a Cormorant é mais leve e tem
> altura-x menor que a Playfair. Por isso os textos pequenos levam um grau a
> mais de peso (`font-medium` / `font-semibold`) e ~1-2px a mais de tamanho.
> Sem isso, rótulos como "SÁBADO" e "ÀS 19:00" ficam finos demais no celular.

## Como REVERTER

Edite o bloco `fontFamily` em `tailwind.config.js`:

```js
// Voltar para a Playfair Display (cuidado: o "J" vira 𝒥 de novo):
fontFamily: {
  sans:   ['"Playfair Display"', 'serif'],
  script: ['"Playfair Display"', 'serif'],
  serif:  ['"Playfair Display"', 'serif'],
},

// Ou voltar às fontes ORIGINAIS (antes de 17/06/2026, três fontes distintas):
fontFamily: {
  sans:   ['Montserrat', 'system-ui', 'sans-serif'],
  script: ['"Great Vibes"', 'cursive'],
  serif:  ['"Playfair Display"', 'serif'],
},
```

Todas essas fontes continuam importadas em `src/index.css` (Google Fonts),
então nada mais precisa mudar — é só salvar e recarregar.

---

## Histórico: unificação em Playfair Display (17/06/2026)

Nessa data as três fontes originais foram unificadas em Playfair Display.
O quadro abaixo guarda **quais eram as fontes originais** e **onde eram usadas**.

## Fontes originais e onde eram usadas

| Classe Tailwind | Fonte original        | Onde era usada |
|-----------------|-----------------------|----------------|
| `font-sans`     | **Montserrat**        | Textos de apoio: rótulos em maiúsculas, subtítulos com espaçamento (capa topo/rodapé, "Save the Date" subtítulo), referência do versículo, rótulos dos botões interativos, textos dos modais (Como chegar, RSVP, PIX, Manual), formulário de RSVP, dica "arraste para virar". |
| `font-script`   | **Great Vibes**       | Nomes do casal (capa e Save the Date), título "Save the Date", textos em destaque cursivos do fechamento. |
| `font-serif`    | **Playfair Display**  | Títulos elegantes em itálico: data do Save the Date, **versículo** (página romântica), título "Toque nos ícones para interagir", títulos (`h3`) dos modais, fechamento. |

> Observação: `sans`, `script` e `serif` apontam **todas** para a mesma fonte
> (hoje a Cormorant Garamond). Por isso basta editar o `tailwind.config.js` para
> trocar de fonte — os componentes não precisam ser alterados.

---

## Outras alterações reversíveis feitas no mesmo dia

- **Imagens de fundo:** todas trocadas por `public/cristo.jpeg`. As URLs
  originais (Unsplash) estão comentadas em `src/data/content.js`, no objeto `images`.
- **Página "Save the Date":** ocultada. Para reativar, descomente o `import` e o
  `<Page>` correspondentes em `src/components/InvitationBook.jsx` e volte
  `const total = 4` para `5`.

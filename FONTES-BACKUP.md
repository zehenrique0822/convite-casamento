# Backup das fontes (antes de unificar tudo em Playfair Display)

Em **17/06/2026** todas as fontes do convite foram unificadas para
**Playfair Display** (a mesma fonte do versículo / `font-serif`).

Este arquivo guarda **quais eram as fontes originais** e **onde eram usadas**,
para o caso de você querer voltar.

## Como REVERTER

Edite `tailwind.config.js` e restaure o bloco `fontFamily` para:

```js
fontFamily: {
  sans:   ['Montserrat', 'system-ui', 'sans-serif'],
  script: ['"Great Vibes"', 'cursive'],
  serif:  ['"Playfair Display"', 'serif'],
},
```

As fontes já estão importadas em `src/index.css` (Google Fonts), então
nada mais precisa mudar — é só salvar e recarregar.

## Fontes originais e onde eram usadas

| Classe Tailwind | Fonte original        | Onde era usada |
|-----------------|-----------------------|----------------|
| `font-sans`     | **Montserrat**        | Textos de apoio: rótulos em maiúsculas, subtítulos com espaçamento (capa topo/rodapé, "Save the Date" subtítulo), referência do versículo, rótulos dos botões interativos, textos dos modais (Como chegar, RSVP, PIX, Manual), formulário de RSVP, dica "arraste para virar". |
| `font-script`   | **Great Vibes**       | Nomes do casal (capa e Save the Date), título "Save the Date", textos em destaque cursivos do fechamento. |
| `font-serif`    | **Playfair Display**  | Títulos elegantes em itálico: data do Save the Date, **versículo** (página romântica), título "Toque nos ícones para interagir", títulos (`h3`) dos modais, fechamento. |

> Observação: a configuração atual aponta `sans`, `script` e `serif` **todas**
> para Playfair Display. Por isso basta editar o `tailwind.config.js` para voltar
> ao estado anterior — os componentes não precisam ser alterados.

---

## Outras alterações reversíveis feitas no mesmo dia

- **Imagens de fundo:** todas trocadas por `public/cristo.jpeg`. As URLs
  originais (Unsplash) estão comentadas em `src/data/content.js`, no objeto `images`.
- **Página "Save the Date":** ocultada. Para reativar, descomente o `import` e o
  `<Page>` correspondentes em `src/components/InvitationBook.jsx` e volte
  `const total = 4` para `5`.

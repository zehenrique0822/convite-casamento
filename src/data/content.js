/**
 * ===================================================================
 *  CENTRAL DE CONTEÚDO DO CONVITE
 * ===================================================================
 *  >>> EDITE AQUI todos os textos, datas, links e imagens. <<<
 *  Tudo funciona SEM backend/API: mapa embutido, RSVP por WhatsApp,
 *  PIX gerado no navegador e conteúdo estático.
 *
 *  COMO TROCAR AS IMAGENS:
 *  - Substitua as URLs do Unsplash pela URL da sua foto, ou
 *  - coloque os arquivos na pasta /public e use o caminho '/foto.jpg'.
 * ===================================================================
 */

export const couple = {
  names: 'Karine & João Gabriel',
  date: '24. OUTUBRO. 2026',
}

/**
 * ----- QUAL VERSÃO DO CONVITE EXIBIR -----
 *   'minimal' -> versão nova: selo -> uma única tela com todas as infos.
 *   'classic' -> versão antiga: envelope -> livreto com páginas viradas.
 * Também dá para alternar sem editar o código, pela URL:
 *   ?v=classic  ou  ?v=minimal
 */
export const version = 'minimal'

/**
 * ----- Textos da versão 'minimal' (tela única) -----
 */
export const minimal = {
  monogram: 'K&J',
  seal: {
    hint: 'Clique no selo\npara abrir',
  },
  verse: {
    text:
      '“Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém o separe.”',
    ref: 'Mateus 19:6',
  },
  intro: 'Com a benção de Deus e de nossos pais,\nconvidamos você para a cerimônia \ndo nosso casamento',
  when: {
    month: 'OUTUBRO',
    weekday: 'SÁBADO',
    day: '24',
    time: 'ÀS 19:00',
    year: '2026',
  },
  footer: 'Clique nos botões acima',
}

/**
 * Monta o caminho de um arquivo da pasta /public respeitando onde o site está
 * hospedado. No GitHub Pages o convite fica em /convite-casamento/, então um
 * caminho fixo como '/cristo.jpeg' daria 404 — `BASE_URL` resolve isso sozinho
 * (vale '/' no dev e '/convite-casamento/' no ar).
 * Use só para arquivos locais; URLs externas (http...) devem ir cruas.
 */
const asset = (file) => `${import.meta.env.BASE_URL}${file}`

// ----- Imagens de fundo -----
// Todas as páginas usam a mesma foto (public/cristo.jpeg).
// Para voltar às imagens anteriores, restaure as URLs do Unsplash abaixo:
//   cover:       'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
//   saveTheDate: 'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?auto=format&fit=crop&w=1200&q=80'
//   romantic:    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
//   interactive: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
//   closing:     'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80'
export const images = {
  cover: asset('cristo.jpeg'),
  saveTheDate: asset('cristo.jpeg'),
  romantic: asset('cristo.jpeg'),
  interactive: asset('cristo.jpeg'),
  closing: asset('cristo.jpeg'),
}

// ----- Textos das páginas -----
export const pagesText = {
  cover: {
    top: 'CONVIDAMOS VOCÊ PARA O NOSSO CASAMENTO',
    bottom: 'AQUI INICIA A NOSSA HISTÓRIA',
  },
  saveTheDate: {
    title: 'Save the Date',
    subtitle: 'Reserve esta data no seu coração',
  },
  romantic: {
    // Mesmo versículo da versão 'minimal', para as duas versões baterem.
    quote:
      '“Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém o separe.”',
    ref: 'Mateus 19:6',
  },
  closing: {
    title: 'Esperamos por você!',
    subtitle: 'Com amor, Karine & João Gabriel',
  },
}

/**
 * ----- Botões interativos (Página 4) -----
 * Cada item tem um "type" que define o que o Modal mostra:
 *   'maps'  -> mapa embutido + botão "abrir no Google Maps"
 *   'rsvp'  -> formulário que envia pelo WhatsApp (sem backend)
 *   'pix'   -> chave PIX + "PIX Copia e Cola" gerado no navegador
 *   'guide' -> lista de seções (texto)
 * O "icon" é o nome do ícone do lucide-react.
 */
export const interactions = [
  {
    key: 'location',
    label: 'Como chegar',
    icon: 'MapPin',
    type: 'maps',
    title: 'Como chegar',
    // Dois locais: cerimônia (igreja) e jantar (espaço de festa).
    // Cada item gera um mapa embutido + botão "abrir no Google Maps".
    // "mapsQuery" é o que será buscado no mapa (nome + endereço).
    venues: [
      {
        name: 'Cerimônia · Igreja Nossa Senhora Aparecida',
        address:
          'Av. Armando Carreira, 96-142 — Pirapozinho/SP, 19200-000',
        mapsQuery:
          'Igreja Nossa Senhora Aparecida, Av. Armando Carreira, Pirapozinho - SP',
        time: '19h00 · chegue 30 minutos antes',
      },
      {
        name: 'Jantar · Espaço Garden',
        address:
          'Av. Washington Luiz, 1141 - Uep1-S.2 — Presidente Prudente/SP, 19023-450',
        mapsQuery:
          'Espaço Garden, Av. Washington Luiz, 1141, Presidente Prudente - SP',
        time: 'Logo após a cerimônia',
      },
    ],
  },
  {
    key: 'rsvp',
    label: 'Confirmar presença',
    icon: 'CalendarCheck',
    type: 'rsvp',
    title: 'Confirmar presença',
    intro:
      'Sua presença é muito importante para nós! Preencha abaixo e envie pelo WhatsApp.',
    deadline: '30 de setembro de 2026',
    // Número que receberá as confirmações no WhatsApp.
    // Formato: DDI + DDD + número (somente dígitos). Ex.: 5544999999999
    whatsappNumber: '5518997795672',
  },
  {
    key: 'gift',
    label: 'Presente aos noivos',
    icon: 'Gift',
    type: 'pix',
    title: 'Presente aos noivos',
    intro:
      'O seu carinho já é o nosso maior presente. Se desejar nos presentear, use o PIX abaixo. 💛',
    // Dados do PIX (o "Copia e Cola" é gerado automaticamente no navegador):
    pixKey: 'ffcac9e6-38d9-4127-a32e-f22edbd5c0e0',
    pixName: 'Karine e Joao Gabriel',
    pixCity: 'Presidente Prudente',
    // Opcional: se você já tiver o código "copia e cola" do seu banco, cole aqui
    // e ele será usado no lugar do gerado automaticamente. Deixe '' para gerar.
    pixCopiaECola: '',
    // Opcional: link para uma lista de presentes externa (deixe '' para esconder)
    giftListUrl: '',
  },
  {
    key: 'guide',
    label: 'Manual dos convidados',
    icon: 'BookOpen',
    type: 'guide',
    title: 'Manual dos convidados',
    sections: [
      { heading: 'Traje', text: 'Esporte fino. Capriche, mas venha confortável!' },
      {
        heading: 'Cores reservadas',
        text: 'Branco e off-white são exclusivos dos noivos. 🤍',
      },
      { heading: 'Horário', text: 'Cerimônia às 19h. Chegue 30 minutos antes.' },
      { heading: 'Crianças', text: 'São muito bem-vindas e ficam sob responsabilidade dos pais.' },
    ],
  },
]

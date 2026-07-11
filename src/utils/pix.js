/**
 * Gera o código "PIX Copia e Cola" (BR Code estático / padrão EMV do Banco Central)
 * inteiramente no navegador — não precisa de API/backend.
 *
 * Uso:
 *   buildPixPayload({ key: 'email@dominio.com', name: 'Joao e Karine', city: 'Maringa' })
 */

// Remove acentos e força MAIÚSCULAS (recomendado p/ nome e cidade no BR Code)
function sanitize(str = '') {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9 .\-]/g, '')
}

// Monta um campo TLV: ID (2) + tamanho (2) + valor
function tlv(id, value) {
  const len = String(value.length).padStart(2, '0')
  return `${id}${len}${value}`
}

// CRC16-CCITT (polinômio 0x1021, valor inicial 0xFFFF)
function crc16(payload) {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

export function buildPixPayload({ key, name = 'NOME', city = 'CIDADE', txid = '***', amount }) {
  if (!key) return ''

  const merchantAccount = tlv('26', tlv('00', 'br.gov.bcb.pix') + tlv('01', key))

  let payload =
    tlv('00', '01') + // Payload Format Indicator
    merchantAccount + // Conta do recebedor (GUI + chave)
    tlv('52', '0000') + // Merchant Category Code
    tlv('53', '986') + // Moeda = BRL
    (amount ? tlv('54', Number(amount).toFixed(2)) : '') + // Valor (opcional)
    tlv('58', 'BR') + // País
    tlv('59', sanitize(name).slice(0, 25)) + // Nome do recebedor
    tlv('60', sanitize(city).slice(0, 15)) + // Cidade
    tlv('62', tlv('05', txid)) // Campo adicional (txid)

  payload += '6304' // ID + tamanho do CRC, antes de calcular
  return payload + crc16(payload)
}

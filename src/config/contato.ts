export const WHATSAPP_NUMERO = '553898281877' // formato: 55 + DDD + número, só dígitos
export const WHATSAPP_EXIBICAO = '(38) 9828-1877'
export const EMAIL = 'contato@sindflow.com.br'
export const SITE = 'https://sindflow.com.br'
export const APP = 'https://app.sindflow.com.br'
export const APP_LOGIN = `${APP}/login`

export const whatsappLink = (mensagem: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`

export const MENSAGEM_GERAL =
  'Olá! Vim pelo site do SindFlow e gostaria de agendar uma demonstração.'

export const MENSAGEM_ASSESSORIA =
  'Olá! Vim pelo site do SindFlow e gostaria de saber mais sobre o plano com assessoria contábil e gerencial.'

export const mensagemPlano = (plano: string) =>
  `Olá! Tenho interesse no plano ${plano} do SindFlow e gostaria de agendar uma demonstração.`

// Endpoint público que recebe o formulário de interesse (Supabase Edge
// Function `lead-captura`). Ele grava o contato e avisa o time no WhatsApp;
// nenhuma chave fica no código da landing.
export const LEAD_ENDPOINT =
  'https://ezbltfdlkucfgblwudrt.supabase.co/functions/v1/lead-captura'

export const NOVA_ABA ={ target: '_blank', rel: 'noopener noreferrer' } as const

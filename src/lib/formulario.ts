// Abre o formulário de interesse de qualquer lugar da página (botões dos
// planos, por exemplo) sem precisar passar estado entre as seções.
export const EVENTO_ABRIR_FORMULARIO = 'sindflow:abrir-formulario'

export type PedidoFormulario = { plano?: string }

export function abrirFormulario(plano?: string) {
  window.dispatchEvent(
    new CustomEvent<PedidoFormulario>(EVENTO_ABRIR_FORMULARIO, { detail: { plano } }),
  )
}

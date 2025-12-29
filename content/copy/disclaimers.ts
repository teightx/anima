// ============================================================================
// Disclaimers Padronizados - Ânima
// ============================================================================
// Disclaimers curtos e institucionais para uso consistente em toda a UI.
// Todos os disclaimers devem ser neutros, descritivos e não prescritivos.

/**
 * Disclaimer para a seção de Observações (antigo Leituras).
 * Usado em cards, listas e páginas de observações.
 */
export const observationDisclaimer =
  'As observações apresentadas são descritivas e não implicam causa, diagnóstico ou recomendação.';

/**
 * Disclaimer para referências científicas.
 * Usado em páginas de referências e links para estudos.
 */
export const referenceDisclaimer =
  'Esta referência é apresentada apenas como fonte de informação e não substitui avaliação profissional.';

/**
 * Disclaimer para a seção de Planos (antigo Protocolos).
 * Usado em cards e páginas de planos/acompanhamentos.
 */
export const planDisclaimer =
  'Planos são ferramentas de apoio ao acompanhamento. Você pode pausar ou encerrar a qualquer momento.';

/**
 * Disclaimer para a seção de Compartilhamento (antigo Modo Terapia).
 * Usado em configurações de compartilhamento com profissionais.
 */
export const sharingDisclaimer =
  'Nada é compartilhado automaticamente. Você controla exatamente o que será visível.';

/**
 * Disclaimer geral para informações educacionais.
 * Usado em contextos gerais que apresentam informações baseadas em dados.
 */
export const educationalDisclaimer =
  'Informação educacional. Não substitui avaliação profissional.';

/**
 * Disclaimer para contexto do dia (antigo Diário).
 * Usado na seção de anotações e contexto do dia.
 */
export const dayContextDisclaimer =
  'Suas anotações são privadas e não são analisadas automaticamente.';

/**
 * Disclaimer para consentimento e controle de dados.
 * Usado em configurações de privacidade e compartilhamento.
 */
export const consentDisclaimer =
  'Você controla quais dados são compartilhados. Nenhuma informação é enviada sem autorização. Acesso pode ser alterado a qualquer momento.';

/**
 * Objeto agregador de todos os disclaimers por contexto.
 */
export const disclaimers = {
  observation: observationDisclaimer,
  reference: referenceDisclaimer,
  plan: planDisclaimer,
  sharing: sharingDisclaimer,
  educational: educationalDisclaimer,
  dayContext: dayContextDisclaimer,
  consent: consentDisclaimer,
} as const;

export type DisclaimerKey = keyof typeof disclaimers;



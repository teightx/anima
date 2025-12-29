// ============================================================================
// Vocabulário Oficial da UI - Ânima
// ============================================================================
// Este arquivo define os termos oficiais permitidos e proibidos em toda a UI.
// Todas as decisões de copy devem respeitar estas definições.

/**
 * Termos permitidos na UI.
 * Estes termos são institucionais, neutros e descritivos.
 */
export const allowedTerms = [
  // Módulos principais
  'hoje',
  'registros',
  'observações',
  'planos',
  'configurações',
  
  // Termos descritivos
  'registro',
  'observação',
  'contexto',
  'contexto do dia',
  'padrão',
  'variação',
  'tendência',
  'período',
  'consistência',
  'compartilhamento',
  'referência',
  'neutralidade',
  
  // Ações neutras
  'registrar',
  'observar',
  'acompanhar',
  'compartilhar',
  'visualizar',
  
  // Estados
  'ativo',
  'inativo',
  'pendente',
  'concluído',
] as const;

/**
 * Termos proibidos e suas substituições.
 * - null significa que o termo não tem substituição direta e deve ser evitado.
 * - string indica o termo substituto recomendado.
 */
export const forbiddenTerms: Record<string, string | null> = {
  // Termos clínicos
  terapia: 'acompanhamento',
  paciente: 'usuário',
  sintomas: 'relatos',
  crise: 'oscilação fora do padrão',
  diagnóstico: null,
  tratamento: null,
  prescrição: null,
  medicação: null,
  doença: null,
  transtorno: null,
  
  // Termos prescritivos
  'recomendamos': 'observa-se',
  'sugerimos': 'observa-se',
  'você deve': null,
  'você precisa': null,
  'faixa ideal': null,
  'ideal': 'esperado',
  'normal': 'típico',
  
  // Termos motivacionais
  'parabéns': null,
  'incrível': null,
  'excelente trabalho': null,
  'continue assim': null,
  'você consegue': null,
  
  // Termos interpretativos
  'porque você': null,
  'isso significa que': null,
  'isso indica que': 'observa-se que',
  
  // Nomes antigos de módulos (não usar mais na UI)
  'leituras': 'observações',
  'protocolos': 'planos',
  'modo terapia': 'compartilhar com profissional',
  'diário': 'contexto do dia',
  'histórico': 'registros',
  'dashboard': 'registros',
};

/**
 * Nomes oficiais dos módulos da UI.
 * Usar SEMPRE estes nomes em navegação, títulos e microcopy.
 */
export const moduleNames = {
  today: 'Hoje',
  records: 'Registros',
  observations: 'Observações',
  plans: 'Planos',
  settings: 'Configurações',
  sharing: 'Compartilhar com profissional',
  dayContext: 'Contexto do dia',
} as const;

/**
 * Mapeamento de rotas para nomes de módulos.
 */
export const routeToModuleName: Record<string, string> = {
  '/today': moduleNames.today,
  '/history': moduleNames.records,
  '/dashboard': moduleNames.records,
  '/readings': moduleNames.observations,
  '/protocols': moduleNames.plans,
  '/anima': moduleNames.settings,
};

export type AllowedTerm = typeof allowedTerms[number];
export type ModuleName = typeof moduleNames[keyof typeof moduleNames];



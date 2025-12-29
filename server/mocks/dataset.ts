import type {
  Baseline,
  DailyCheckIn,
  SleepQuality,
  SymptomEntry,
  JournalEntry,
  Reading,
  ReadingCategory,
  ReadingStatus,
  ReferenceSource,
  ReferenceType,
  Protocol,
  ProtocolRun,
  SharingRule,
  ConfidenceLevel,
  SeverityLevel,
} from '@/server/contracts';

// ============================================================================
// Constants
// ============================================================================

const USER_ID = 'u-00000001-0000-0000-0000-000000000001';
const BASELINE_ID = 'b-00000001-0000-0000-0000-000000000001';

// Base date: 30 days ago from a fixed reference
const BASE_DATE = new Date('2024-12-01');

function getDateISO(daysOffset: number): string {
  const d = new Date(BASE_DATE);
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

function getDateTimeISO(daysOffset: number, hour = 8): string {
  const d = new Date(BASE_DATE);
  d.setDate(d.getDate() + daysOffset);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

function uuid(prefix: string, n: number): string {
  const padded = n.toString().padStart(4, '0');
  return `${prefix}-${padded}-0000-0000-000000000001`;
}

// ============================================================================
// User
// ============================================================================

const user = {
  id: USER_ID,
  name: 'Usuario Demo',
};

// ============================================================================
// Baseline
// ============================================================================

const baseline: Baseline = {
  id: BASELINE_ID,
  userId: USER_ID,
  status: 'completed',
  startedAt: getDateTimeISO(-35),
  completedAt: getDateTimeISO(-34),
  version: 1,
  sections: [
    {
      id: 'demographics',
      name: 'Dados demograficos',
      completed: true,
      completedAt: getDateTimeISO(-35),
      answers: { age: 32, occupation: 'professional' },
    },
    {
      id: 'history',
      name: 'Historico',
      completed: true,
      completedAt: getDateTimeISO(-34, 10),
      answers: { previousSupport: true, yearsMonitoring: 2 },
    },
    {
      id: 'current_state',
      name: 'Estado atual',
      completed: true,
      completedAt: getDateTimeISO(-34, 12),
      answers: {
        avgMood: 6,
        avgEnergy: 6,
        avgSleepHours: 7,
        mainConcerns: ['sleep', 'energy'],
      },
    },
  ],
};

// ============================================================================
// Check-ins (30 days with gaps)
// ============================================================================

// Days without check-in (gaps): 8, 15, 22, 23
const GAPS = [8, 15, 22, 23];

function getSleepQuality(hours: number): SleepQuality {
  if (hours < 5) return 'poor';
  if (hours < 6) return 'fair';
  if (hours < 7.5) return 'good';
  return 'excellent';
}

function generateSymptoms(
  day: number,
  mood: number,
  energy: number
): SymptomEntry[] {
  const symptoms: SymptomEntry[] = [];

  // Week 3 (days 14-20) has more symptoms
  const isUnstableWeek = day >= 14 && day <= 20;

  if (energy < 5 || isUnstableWeek) {
    symptoms.push({
      symptomId: 's-fatigue',
      name: 'Fadiga',
      severity: energy < 4 ? 'medium' : 'low',
    });
  }

  if (mood < 5) {
    symptoms.push({
      symptomId: 's-irritability',
      name: 'Irritabilidade',
      severity: mood < 3 ? 'medium' : 'low',
    });
  }

  if (isUnstableWeek && day % 2 === 0) {
    symptoms.push({
      symptomId: 's-tension',
      name: 'Tensao muscular',
      severity: 'low',
    });
  }

  return symptoms;
}

const checkins: DailyCheckIn[] = [];

for (let day = 0; day < 30; day++) {
  if (GAPS.includes(day)) continue;

  // Pattern:
  // Week 1 (0-6): stable, good
  // Week 2 (7-13): stable, good
  // Week 3 (14-20): unstable, lower energy/mood
  // Week 4 (21-29): recovery

  let baseMood: number;
  let baseEnergy: number;
  let baseSleep: number;

  if (day < 7) {
    // Week 1: stable
    baseMood = 7;
    baseEnergy = 7;
    baseSleep = 7.2;
  } else if (day < 14) {
    // Week 2: stable
    baseMood = 7;
    baseEnergy = 6.5;
    baseSleep = 7.0;
  } else if (day < 21) {
    // Week 3: unstable
    baseMood = 5;
    baseEnergy = 4.5;
    baseSleep = 5.5;
  } else {
    // Week 4: recovery
    const recoveryProgress = (day - 21) / 8;
    baseMood = 5 + recoveryProgress * 2;
    baseEnergy = 5 + recoveryProgress * 2;
    baseSleep = 6 + recoveryProgress * 1;
  }

  // Add daily variation
  const variation = Math.sin(day * 0.7) * 0.8;
  const moodScore = Math.max(1, Math.min(10, Math.round(baseMood + variation)));
  const energyScore = Math.max(
    1,
    Math.min(10, Math.round(baseEnergy + variation * 0.7))
  );
  const sleepHours = Math.max(3.5, Math.min(9, baseSleep + variation * 0.5));
  const sleepQuality = getSleepQuality(sleepHours);

  // Day organization correlates with energy and mood, with some independence
  const orgVariation = Math.cos(day * 0.5) * 0.6;
  const baseOrg = (baseMood + baseEnergy) / 2;
  const dayOrganization = Math.max(
    1,
    Math.min(10, Math.round(baseOrg + orgVariation))
  );

  const date = getDateISO(day);
  const createdAt = getDateTimeISO(day, 8 + Math.floor(Math.random() * 4));

  checkins.push({
    id: uuid('ci', day),
    userId: USER_ID,
    date,
    createdAt,
    updatedAt: createdAt,
    moodScore: moodScore as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    energyScore: energyScore as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    dayOrganization: dayOrganization as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
    sleepQuality,
    sleepHours: Math.round(sleepHours * 10) / 10,
    symptoms: generateSymptoms(day, moodScore, energyScore),
    medicationsTaken: day % 7 !== 0,
    activities: day % 3 === 0 ? ['exercise'] : undefined,
  });
}

// ============================================================================
// Journal Entries (sparse)
// ============================================================================

const journals: JournalEntry[] = [
  {
    id: uuid('je', 1),
    userId: USER_ID,
    type: 'free_write',
    createdAt: getDateTimeISO(3, 21),
    updatedAt: getDateTimeISO(3, 21),
    title: 'Reflexao sobre a semana',
    content:
      'Semana estavel. Consegui manter rotina de sono e exercicios. Notei que dias com mais atividade fisica resultam em melhor disposicao no dia seguinte.',
    mood: 7,
    tags: ['rotina', 'exercicio'],
    isPrivate: true,
  },
  {
    id: uuid('je', 2),
    userId: USER_ID,
    type: 'reflection',
    createdAt: getDateTimeISO(10, 22),
    updatedAt: getDateTimeISO(10, 22),
    content:
      'Percebi que o sono tem sido mais regular. Acordei naturalmente antes do alarme nos ultimos 3 dias.',
    mood: 7,
    tags: ['sono'],
    isPrivate: true,
  },
  {
    id: uuid('je', 3),
    userId: USER_ID,
    type: 'free_write',
    createdAt: getDateTimeISO(17, 23),
    updatedAt: getDateTimeISO(17, 23),
    title: 'Periodo mais dificil',
    content:
      'Ultimos dias com mais dificuldade para dormir. Energia baixa durante o dia. Identifiquei que mudanca de rotina no trabalho pode ter contribuido.',
    mood: 4,
    tags: ['sono', 'trabalho', 'energia'],
    isPrivate: true,
  },
  {
    id: uuid('je', 4),
    userId: USER_ID,
    type: 'gratitude',
    createdAt: getDateTimeISO(25, 20),
    updatedAt: getDateTimeISO(25, 20),
    content:
      'Semana de recuperacao. Retomei rotina de sono regular. Energia melhorando gradualmente.',
    mood: 6,
    tags: ['recuperacao'],
    isPrivate: true,
  },
  {
    id: uuid('je', 5),
    userId: USER_ID,
    type: 'reflection',
    createdAt: getDateTimeISO(29, 19),
    updatedAt: getDateTimeISO(29, 19),
    content:
      'Fim do mes. Olhando para tras, percebo que a terceira semana foi mais dificil, mas a recuperacao veio. Bom ter esse registro para observar padroes.',
    mood: 7,
    tags: ['reflexao', 'padroes'],
    isPrivate: true,
  },
];

// ============================================================================
// Reference Sources (Studies)
// ============================================================================

const references: ReferenceSource[] = [
  {
    id: uuid('ref', 1),
    type: 'meta_analysis',
    title: 'Sleep regularity and mental health outcomes: A systematic review',
    authors: ['Walker, M.', 'Chen, L.', 'Roberts, K.'],
    journal: 'Sleep Medicine Reviews',
    year: 2023,
    doi: '10.1016/j.smrv.2023.001',
    abstract:
      'Analise de 42 estudos sobre regularidade de sono e desfechos em saude mental. Resultados indicam associacao entre variabilidade do horario de sono e sintomas de humor. Regularidade mostrou-se fator independente da duracao total.',
    keyFindings: [
      'Variabilidade de horario superior a 90 minutos associada a piores desfechos',
      'Regularidade de sono como fator protetor independente',
      'Intervencoes comportamentais mostraram eficacia moderada',
    ],
    evidenceLevel: 'high',
    topics: ['sono', 'regularidade', 'saude-mental'],
    createdAt: getDateTimeISO(-60),
  },
  {
    id: uuid('ref', 2),
    type: 'peer_reviewed',
    title:
      'Daily mood variability as indicator of emotional regulation capacity',
    authors: ['Thompson, R.', 'Garcia, S.'],
    journal: 'Journal of Affective Disorders',
    year: 2022,
    doi: '10.1016/j.jad.2022.015',
    abstract:
      'Estudo longitudinal com 1.200 participantes avaliando variabilidade de humor diario. Oscilacoes frequentes foram associadas a menor capacidade de regulacao emocional. Padroes estaveis correlacionaram com melhores desfechos.',
    keyFindings: [
      'Variabilidade diaria acima de 2 pontos em escala 0-10 como marcador',
      'Estabilidade de 7+ dias associada a melhores desfechos',
      'Monitoramento continuo permite identificacao precoce',
    ],
    evidenceLevel: 'medium',
    topics: ['humor', 'variabilidade', 'regulacao-emocional'],
    createdAt: getDateTimeISO(-90),
  },
  {
    id: uuid('ref', 3),
    type: 'guideline',
    title:
      'Behavioral interventions for sleep optimization: Clinical practice guidelines',
    authors: ['American Academy of Sleep Medicine'],
    year: 2023,
    url: 'https://aasm.org/guidelines/behavioral-sleep',
    abstract:
      'Diretrizes clinicas para intervencoes comportamentais em otimizacao do sono. Inclui recomendacoes baseadas em evidencias para higiene do sono, restricao de estimulos e regulacao de horarios.',
    keyFindings: [
      'Horario fixo de despertar como intervencao primaria',
      'Exposicao a luz natural nas primeiras horas',
      'Restricao de telas 60 minutos antes de dormir',
    ],
    evidenceLevel: 'high',
    topics: ['sono', 'intervencao', 'comportamento'],
    createdAt: getDateTimeISO(-120),
  },
  {
    id: uuid('ref', 4),
    type: 'peer_reviewed',
    title: 'Energy levels and circadian rhythm alignment in working adults',
    authors: ['Kim, J.', 'Mueller, T.', 'Santos, P.'],
    journal: 'Chronobiology International',
    year: 2023,
    doi: '10.1080/chron.2023.445',
    abstract:
      'Investigacao sobre niveis de energia e alinhamento circadiano em populacao trabalhadora. Desalinhamentos superiores a 2 horas nos fins de semana foram associados a fadiga persistente durante a semana.',
    keyFindings: [
      'Jet lag social como fator de risco para fadiga',
      'Consistencia de horarios em todos os dias da semana recomendada',
      'Recuperacao de desalinhamento leva 3-5 dias',
    ],
    evidenceLevel: 'medium',
    topics: ['energia', 'circadiano', 'trabalho'],
    createdAt: getDateTimeISO(-80),
  },
  {
    id: uuid('ref', 5),
    type: 'review_article',
    title:
      'Self-monitoring in mental health: Benefits and methodological considerations',
    authors: ['Brown, A.', 'White, C.'],
    journal: 'Clinical Psychology Review',
    year: 2022,
    doi: '10.1016/j.cpr.2022.102',
    abstract:
      'Revisao sobre automonitoramento em saude mental. Discussao de beneficios da autoconsciencia e riscos de ruminacao excessiva. Recomendacoes para frequencia e formato de registros.',
    keyFindings: [
      'Frequencia diaria superior a semanal para deteccao de padroes',
      'Registros estruturados reduzem vieses de memoria',
      'Lacunas ocasionais nao comprometem analise de tendencias',
    ],
    evidenceLevel: 'medium',
    topics: ['automonitoramento', 'registro', 'metodologia'],
    createdAt: getDateTimeISO(-150),
  },
  {
    id: uuid('ref', 6),
    type: 'peer_reviewed',
    title: 'Physical activity and next-day mood: Temporal associations',
    authors: ['Johnson, M.', 'Lee, H.'],
    journal: 'Health Psychology',
    year: 2023,
    doi: '10.1037/hea.2023.033',
    abstract:
      'Estudo com dados de 800 participantes usando monitoramento ambulatorial. Atividade fisica moderada foi associada a melhora de humor no dia seguinte. Efeito mais pronunciado para atividades ao ar livre.',
    keyFindings: [
      'Atividade moderada de 30+ minutos com efeito proximo dia',
      'Exercicio ao ar livre com beneficio adicional',
      'Efeito acumulativo ao longo da semana',
    ],
    evidenceLevel: 'medium',
    topics: ['exercicio', 'humor', 'atividade-fisica'],
    createdAt: getDateTimeISO(-45),
  },
  {
    id: uuid('ref', 7),
    type: 'clinical_trial',
    title: 'Structured behavioral protocols for mood stabilization',
    authors: ['Davis, R.', 'Martinez, L.', 'Patel, K.'],
    journal: 'Behaviour Research and Therapy',
    year: 2022,
    doi: '10.1016/j.brat.2022.104',
    abstract:
      'Ensaio clinico randomizado com 200 participantes avaliando protocolo comportamental estruturado. Grupo intervenção mostrou reducao de 35% na variabilidade de humor apos 8 semanas.',
    keyFindings: [
      'Protocolos estruturados superiores a orientacoes gerais',
      'Aderencia de 70%+ necessaria para resultados',
      'Manutencao de ganhos apos 3 meses de follow-up',
    ],
    evidenceLevel: 'high',
    topics: ['protocolo', 'comportamento', 'estabilidade'],
    createdAt: getDateTimeISO(-200),
  },
  {
    id: uuid('ref', 8),
    type: 'guideline',
    title: 'Data sharing in digital mental health: Ethical framework',
    authors: ['World Health Organization'],
    year: 2023,
    url: 'https://who.int/mental-health/digital-ethics',
    abstract:
      'Diretrizes eticas para compartilhamento de dados em saude mental digital. Enfase em consentimento informado, controle granular pelo usuario e minimizacao de dados.',
    keyFindings: [
      'Usuario deve ter controle total sobre compartilhamento',
      'Opcoes granulares por categoria de dados',
      'Revogacao de acesso a qualquer momento',
    ],
    evidenceLevel: 'high',
    topics: ['privacidade', 'etica', 'compartilhamento'],
    createdAt: getDateTimeISO(-30),
  },
  {
    id: uuid('ref', 9),
    type: 'peer_reviewed',
    title: 'Recovery patterns following periods of mood instability',
    authors: ['Wilson, E.', 'Clark, J.'],
    journal: 'Psychological Medicine',
    year: 2023,
    doi: '10.1017/psm.2023.089',
    abstract:
      'Analise de padroes de recuperacao apos periodos de instabilidade. Identificados marcadores de recuperacao bem-sucedida incluindo retorno de regularidade de sono e energia estavel.',
    keyFindings: [
      'Recuperacao tipicamente leva 5-10 dias',
      'Sono regular como primeiro indicador de melhora',
      'Energia segue melhora de sono em 2-3 dias',
    ],
    evidenceLevel: 'medium',
    topics: ['recuperacao', 'instabilidade', 'padroes'],
    createdAt: getDateTimeISO(-25),
  },
  {
    id: uuid('ref', 10),
    type: 'review_article',
    title: 'Gaps in self-report data: Impact on trend analysis',
    authors: ['Anderson, P.', 'Taylor, S.'],
    journal: 'Assessment',
    year: 2022,
    doi: '10.1177/assess.2022.556',
    abstract:
      'Revisao metodologica sobre impacto de lacunas em dados de autorelato. Lacunas de ate 15% dos dias nao comprometem identificacao de tendencias principais. Padroes de lacunas podem ser informativos.',
    keyFindings: [
      'Ate 4-5 dias de lacuna em 30 dias aceitavel',
      'Lacunas consecutivas mais problematicas que dispersas',
      'Padrao de lacunas pode indicar periodos dificeis',
    ],
    evidenceLevel: 'medium',
    topics: ['metodologia', 'lacunas', 'dados'],
    createdAt: getDateTimeISO(-180),
  },
];

// ============================================================================
// Readings (Insights)
// ============================================================================

const readings: Reading[] = [
  // Sleep readings
  {
    id: uuid('rd', 1),
    userId: USER_ID,
    category: 'sleep_correlation',
    status: 'viewed',
    createdAt: getDateTimeISO(7),
    viewedAt: getDateTimeISO(8),
    title: 'Regularidade de sono nas primeiras semanas',
    summary:
      'Registros indicam horarios de sono consistentes nos primeiros 14 dias. Media de 7.1 horas com variacao inferior a 45 minutos.',
    detail:
      'A regularidade de sono observada esta dentro de parametros associados a bons desfechos em estudos longitudinais. Manter essa consistencia pode contribuir para estabilidade geral.',
    confidence: 'high',
    dataPointsAnalyzed: 12,
    periodStart: getDateISO(0),
    periodEnd: getDateISO(13),
    relatedCheckInIds: checkins.slice(0, 7).map(c => c.id),
    referenceId: uuid('ref', 1),
  },
  {
    id: uuid('rd', 2),
    userId: USER_ID,
    category: 'sleep_correlation',
    status: 'new',
    createdAt: getDateTimeISO(21),
    viewedAt: null,
    title: 'Variacao de sono na terceira semana',
    summary:
      'Observada maior variabilidade de sono entre dias 14-20. Media reduziu para 5.8 horas com variacao de ate 2 horas entre dias.',
    detail:
      'Periodo com maior irregularidade coincide com reducao de energia reportada. Literatura sugere que recuperacao de padroes regulares pode levar 3-5 dias.',
    confidence: 'medium',
    dataPointsAnalyzed: 6,
    periodStart: getDateISO(14),
    periodEnd: getDateISO(20),
    relatedCheckInIds: checkins
      .filter(c => {
        const day = parseInt(c.date.split('-')[2]);
        return day >= 14 && day <= 20;
      })
      .map(c => c.id),
    referenceId: uuid('ref', 1),
  },
  {
    id: uuid('rd', 3),
    userId: USER_ID,
    category: 'sleep_correlation',
    status: 'new',
    createdAt: getDateTimeISO(28),
    viewedAt: null,
    title: 'Retorno a regularidade de sono',
    summary:
      'Ultimos 7 dias mostram recuperacao gradual de padroes de sono. Media subindo para 6.5 horas com menor variabilidade.',
    confidence: 'medium',
    dataPointsAnalyzed: 5,
    periodStart: getDateISO(21),
    periodEnd: getDateISO(28),
  },

  // Mood stability readings
  {
    id: uuid('rd', 4),
    userId: USER_ID,
    category: 'mood_pattern',
    status: 'acknowledged',
    createdAt: getDateTimeISO(14),
    viewedAt: getDateTimeISO(14, 12),
    title: 'Estabilidade de humor inicial',
    summary:
      'Primeiras duas semanas apresentam variacao de humor dentro de 1 ponto na escala. Padrao consistente com boa regulacao.',
    confidence: 'high',
    dataPointsAnalyzed: 12,
    periodStart: getDateISO(0),
    periodEnd: getDateISO(13),
  },
  {
    id: uuid('rd', 5),
    userId: USER_ID,
    category: 'mood_pattern',
    status: 'viewed',
    createdAt: getDateTimeISO(21),
    viewedAt: getDateTimeISO(22),
    title: 'Aumento de variabilidade de humor',
    summary:
      'Terceira semana mostra variacao de humor de ate 3 pontos entre dias consecutivos. Coincide com periodo de sono irregular.',
    detail:
      'Estudos indicam associacao entre regularidade de sono e estabilidade de humor. Periodo atual apresenta caracteristicas compativeis com esse padrao.',
    confidence: 'medium',
    dataPointsAnalyzed: 6,
    periodStart: getDateISO(14),
    periodEnd: getDateISO(20),
    referenceId: uuid('ref', 2),
  },
  {
    id: uuid('rd', 6),
    userId: USER_ID,
    category: 'mood_pattern',
    status: 'new',
    createdAt: getDateTimeISO(29),
    viewedAt: null,
    title: 'Tendencia de recuperacao de humor',
    summary:
      'Ultima semana indica tendencia gradual de melhora. Variacao reduzindo e media subindo progressivamente.',
    confidence: 'medium',
    dataPointsAnalyzed: 5,
    periodStart: getDateISO(22),
    periodEnd: getDateISO(29),
  },

  // Energy readings
  {
    id: uuid('rd', 7),
    userId: USER_ID,
    category: 'activity_impact',
    status: 'viewed',
    createdAt: getDateTimeISO(10),
    viewedAt: getDateTimeISO(11),
    title: 'Relacao entre atividade fisica e energia',
    summary:
      'Dias com registro de exercicio mostram energia media 1.2 pontos maior no dia seguinte comparado a dias sem atividade.',
    confidence: 'low',
    dataPointsAnalyzed: 4,
    periodStart: getDateISO(0),
    periodEnd: getDateISO(10),
  },
  {
    id: uuid('rd', 8),
    userId: USER_ID,
    category: 'symptom_trend',
    status: 'new',
    createdAt: getDateTimeISO(20),
    viewedAt: null,
    title: 'Sintomas de fadiga na terceira semana',
    summary:
      'Registros de fadiga presentes em 5 dos 6 dias da terceira semana. Severidade mantida em nivel baixo a medio.',
    detail:
      'Fadiga reportada coincide com periodo de sono irregular. Padrao e consistente com literatura sobre debito de sono.',
    confidence: 'medium',
    dataPointsAnalyzed: 6,
    periodStart: getDateISO(14),
    periodEnd: getDateISO(20),
  },

  // General insights
  {
    id: uuid('rd', 9),
    userId: USER_ID,
    category: 'general_insight',
    status: 'viewed',
    createdAt: getDateTimeISO(8),
    viewedAt: getDateTimeISO(9),
    title: 'Consistencia de registros',
    summary:
      'Taxa de preenchimento de 87% nos primeiros 8 dias. Frequencia adequada para identificacao de padroes confiaveis.',
    confidence: 'high',
    dataPointsAnalyzed: 7,
    periodStart: getDateISO(0),
    periodEnd: getDateISO(7),
  },
  {
    id: uuid('rd', 10),
    userId: USER_ID,
    category: 'general_insight',
    status: 'new',
    createdAt: getDateTimeISO(16),
    viewedAt: null,
    title: 'Lacuna de registro identificada',
    summary:
      'Dia 15 sem registro. Lacunas isoladas nao comprometem analise de tendencias, mas podem coincidir com dias mais dificeis.',
    confidence: 'low',
    dataPointsAnalyzed: 14,
    periodStart: getDateISO(0),
    periodEnd: getDateISO(15),
  },
  {
    id: uuid('rd', 11),
    userId: USER_ID,
    category: 'general_insight',
    status: 'new',
    createdAt: getDateTimeISO(24),
    viewedAt: null,
    title: 'Lacunas consecutivas observadas',
    summary:
      'Dias 22 e 23 sem registro. Lacunas consecutivas durante periodo de instabilidade podem indicar momento de maior dificuldade.',
    detail:
      'Pesquisas indicam que padroes de lacunas podem ser informativos. Ausencia de registros em periodos dificeis e comum e nao invalida dados existentes.',
    confidence: 'low',
    dataPointsAnalyzed: 20,
    periodStart: getDateISO(0),
    periodEnd: getDateISO(23),
  },
  {
    id: uuid('rd', 12),
    userId: USER_ID,
    category: 'medication_effect',
    status: 'viewed',
    createdAt: getDateTimeISO(14),
    viewedAt: getDateTimeISO(15),
    title: 'Aderencia a medicacao',
    summary:
      'Registro de medicacao em 86% dos dias aplicaveis. Taxa consistente com boa aderencia.',
    confidence: 'high',
    dataPointsAnalyzed: 12,
    periodStart: getDateISO(0),
    periodEnd: getDateISO(13),
  },
];

// ============================================================================
// Protocols
// ============================================================================

const protocols: Protocol[] = [
  {
    id: uuid('prot', 1),
    name: 'Regulacao de Sono',
    description:
      'Protocolo comportamental para estabelecer rotina de sono regular. Inclui ajustes graduais de horario e higiene do sono.',
    category: 'sleep',
    durationDays: 21,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: 'Avaliacao inicial',
        description: 'Registro de horarios atuais de sono por 3 dias',
        durationDays: 3,
        tasks: [
          {
            id: 'task-1-1',
            title: 'Registrar horario de dormir',
            frequency: 'daily',
            isRequired: true,
          },
          {
            id: 'task-1-2',
            title: 'Registrar horario de acordar',
            frequency: 'daily',
            isRequired: true,
          },
        ],
      },
      {
        id: 'step-2',
        order: 2,
        title: 'Ajuste gradual',
        description: 'Adiantar horario de dormir em 15 minutos por semana',
        durationDays: 14,
        tasks: [
          {
            id: 'task-2-1',
            title: 'Manter horario alvo de dormir',
            frequency: 'daily',
            isRequired: true,
          },
          {
            id: 'task-2-2',
            title: 'Evitar telas 60min antes',
            frequency: 'daily',
            isRequired: false,
          },
        ],
      },
      {
        id: 'step-3',
        order: 3,
        title: 'Consolidacao',
        description: 'Manter novos horarios estabelecidos',
        durationDays: 4,
        tasks: [
          {
            id: 'task-3-1',
            title: 'Manter rotina de sono',
            frequency: 'daily',
            isRequired: true,
          },
        ],
      },
    ],
    isActive: true,
    createdAt: getDateTimeISO(-60),
    updatedAt: getDateTimeISO(-60),
    referenceIds: [uuid('ref', 1), uuid('ref', 3)],
  },
  {
    id: uuid('prot', 2),
    name: 'Atividade Fisica Regular',
    description:
      'Introducao gradual de atividade fisica moderada. Foco em consistencia sobre intensidade.',
    category: 'exercise',
    durationDays: 28,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: 'Baseline de atividade',
        description: 'Registro de atividades atuais',
        durationDays: 7,
        tasks: [
          {
            id: 'task-1-1',
            title: 'Registrar atividades realizadas',
            frequency: 'daily',
            isRequired: true,
          },
        ],
      },
      {
        id: 'step-2',
        order: 2,
        title: 'Introducao de caminhadas',
        description: 'Caminhadas de 20 minutos 3x por semana',
        durationDays: 14,
        tasks: [
          {
            id: 'task-2-1',
            title: 'Caminhada de 20 minutos',
            frequency: 'weekly',
            isRequired: true,
          },
        ],
      },
      {
        id: 'step-3',
        order: 3,
        title: 'Manutencao',
        description: 'Manter frequencia estabelecida',
        durationDays: 7,
        tasks: [
          {
            id: 'task-3-1',
            title: 'Manter rotina de atividade',
            frequency: 'weekly',
            isRequired: true,
          },
        ],
      },
    ],
    isActive: true,
    createdAt: getDateTimeISO(-90),
    updatedAt: getDateTimeISO(-90),
    referenceIds: [uuid('ref', 6)],
  },
  {
    id: uuid('prot', 3),
    name: 'Monitoramento Estruturado',
    description:
      'Protocolo de automonitoramento diario para estabelecer baseline e identificar padroes.',
    category: 'lifestyle',
    durationDays: 14,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: 'Registro diario',
        description: 'Check-in diario completo por 14 dias',
        durationDays: 14,
        tasks: [
          {
            id: 'task-1-1',
            title: 'Completar check-in diario',
            frequency: 'daily',
            isRequired: true,
          },
          {
            id: 'task-1-2',
            title: 'Adicionar notas quando relevante',
            frequency: 'as_needed',
            isRequired: false,
          },
        ],
      },
    ],
    isActive: true,
    createdAt: getDateTimeISO(-30),
    updatedAt: getDateTimeISO(-30),
    referenceIds: [uuid('ref', 5)],
  },
];

// ============================================================================
// Protocol Runs
// ============================================================================

const protocolRuns: ProtocolRun[] = [
  {
    id: uuid('run', 1),
    userId: USER_ID,
    protocolId: uuid('prot', 3),
    status: 'completed',
    startedAt: getDateTimeISO(-28),
    pausedAt: null,
    completedAt: getDateTimeISO(-14),
    expectedEndDate: getDateISO(-14),
    currentStepIndex: 0,
    completedTasks: [
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-27) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-26) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-25) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-24) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-23) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-22) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-21) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-20) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-19) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-18) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-17) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-16) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-15) },
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-14) },
    ],
    notes: 'Protocolo concluido com 100% de aderencia',
  },
  {
    id: uuid('run', 2),
    userId: USER_ID,
    protocolId: uuid('prot', 1),
    status: 'active',
    startedAt: getDateTimeISO(-5),
    pausedAt: null,
    completedAt: null,
    expectedEndDate: getDateISO(16),
    currentStepIndex: 0,
    completedTasks: [
      { taskId: 'task-1-1', completedAt: getDateTimeISO(-4) },
      { taskId: 'task-1-2', completedAt: getDateTimeISO(-4) },
    ],
    notes: undefined,
  },
];

// ============================================================================
// Therapy State
// ============================================================================

const therapy = {
  enabled: false,
  currentMode: null as null | 'companion' | 'reflection',
  sessions: [],
  sharingRules: [] as SharingRule[],
};

// ============================================================================
// Dataset Export
// ============================================================================

export const dataset = {
  user,
  baseline,
  checkins,
  journals,
  readings,
  references,
  protocols,
  protocolRuns,
  therapy,
};

export type Dataset = typeof dataset;

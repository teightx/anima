# Documentação de Produto e UX - Ânima

**Versão:** 1.0  
**Data:** 2024  
**Objetivo:** Documentação textual completa que permite reconstruir mentalmente a interface, navegação e estrutura do produto.

---

## 1. MAPA DO PRODUTO (VISÃO GERAL)

### 1.1 Navegação Global (Desktop e Mobile)

#### Layout Shell

O layout principal da aplicação utiliza um componente `Shell` que estrutura a interface em duas variantes:

**Desktop (≥768px):**
- **Sidebar fixa à esquerda:** Largura fixa de 224px (14rem/56 unidades Tailwind), posicionada fixa (`fixed`) na lateral esquerda, altura total da viewport (`inset-y-0`), z-index 40
- **Área de conteúdo:** Margem esquerda de 224px (`md:pl-56`) para compensar a sidebar, padding horizontal responsivo (16px mobile, 24px tablet, 32px desktop), padding vertical de 24px, padding inferior de 24px no mobile e 24px no desktop
- **Container de conteúdo:** Largura máxima de 896px (`max-w-4xl`), centralizado

**Mobile (<768px):**
- **Área de conteúdo:** Sem margem lateral (sidebar oculta), padding inferior de 96px (`pb-24`) para compensar a bottom navigation
- **Bottom Navigation:** Fixa na parte inferior da tela, altura de 64px, z-index 50, com safe area para iOS (`h-[env(safe-area-inset-bottom)]`)

#### Sidebar Desktop (AppSidebar)

**Estrutura:**
- **Cabeçalho (Logo):** Altura 64px, padding horizontal 20px, borda inferior sutil, link clicável para `/today`
  - Texto: "Ânima" (font-semibold, text-lg, tracking-tight)
- **Navegação:** Lista vertical de itens, padding horizontal 12px, padding vertical 20px, espaçamento entre itens de 2px
- **Rodapé:** Padding 16px horizontal e vertical, borda superior, contém toggle de tema

**Itens de Menu (ordem de exibição):**
1. **Hoje** (`/today`)
   - Ícone: CalendarDays (lucide-react), 18x18px
   - Label: "Hoje"
   - Estado ativo: fundo `bg-primary/8`, texto `text-primary`
   - Estado inativo: texto `text-muted-foreground`, hover `hover:bg-muted/50 hover:text-foreground`

2. **Histórico** (`/history`)
   - Ícone: History, 18x18px
   - Label: "Histórico"

3. **Dashboard** (`/dashboard`)
   - Ícone: BarChart3, 18x18px
   - Label: "Dashboard"

4. **Leituras** (`/readings`)
   - Ícone: BookOpen, 18x18px
   - Label: "Leituras"

5. **Protocolos** (`/protocols`)
   - Ícone: FileText, 18x18px
   - Label: "Protocolos"

6. **Ânima** (`/anima`)
   - Ícone: Sparkles, 18x18px
   - Label: "Ânima"

**Estados dos itens:**
- **Ativo:** Fundo `bg-primary/8`, cor de texto `text-primary`, `aria-current="page"`
- **Inativo:** Cor de texto `text-muted-foreground`, hover com fundo `bg-muted/50` e texto `text-foreground`
- **Focus:** Ring de 2px com cor `ring-ring/50`, offset de 2px

**Toggle de Tema (rodapé):**
- Label: "Tema" (text-xs, font-medium, text-muted-foreground)
- Componente: ThemeToggle (posicionado à direita)

#### Bottom Navigation Mobile (MobileNav)

**Estrutura:**
- Container: Fixo na parte inferior, altura 64px, fundo `bg-card`, borda superior `border-t border-border/60`
- Layout: Flex horizontal com `justify-around`, padding horizontal 8px
- Safe area: Espaço adicional na parte inferior para iOS (`h-[env(safe-area-inset-bottom)]`)

**Itens de Menu (mesma ordem da sidebar):**
- Cada item: Flex column, centralizado, gap de 4px, largura mínima 56px, padding 12px horizontal e 8px vertical
- Ícone: 20x20px, stroke mais espesso quando ativo (`stroke-[2.5px]`)
- Label: text-[10px], font-medium, leading-none
- Estados: Mesmos padrões da sidebar (ativo: `text-primary`, inativo: `text-muted-foreground`)

### 1.2 Design System (Tokens)

#### Cores - Light Mode

**Background:**
- `--background`: HSL(210, 30%, 97%) - Off-white frio
- `--foreground`: HSL(215, 22%, 18%) - Texto primário escuro

**Card/Surface:**
- `--card`: HSL(210, 28%, 99%) - Superfície de cards
- `--card-foreground`: HSL(215, 22%, 18%) - Texto em cards

**Primary:**
- `--primary`: HSL(205, 28%, 52%) - Azul acinzentado discreto
- `--primary-foreground`: HSL(210, 30%, 98%) - Texto sobre primary

**Secondary:**
- `--secondary`: HSL(210, 20%, 94%) - Fundo secundário
- `--secondary-foreground`: HSL(215, 18%, 24%) - Texto secundário

**Muted:**
- `--muted`: HSL(210, 18%, 93%) - Fundo muted
- `--muted-foreground`: HSL(215, 15%, 38%) - Texto muted

**Accent:**
- `--accent`: HSL(205, 18%, 90%) - Azul discreto
- `--accent-foreground`: HSL(215, 22%, 18%)

**Destructive:**
- `--destructive`: HSL(0, 50%, 45%) - Vermelho para erros
- `--destructive-foreground`: HSL(210, 30%, 98%)

**Border:**
- `--border`: HSL(214, 18%, 88%) - Bordas padrão
- `--input`: HSL(214, 18%, 88%) - Bordas de inputs

**Ring (focus):**
- `--ring`: HSL(205, 28%, 52%) - Cor do anel de foco

#### Cores - Dark Mode

**Background:**
- `--background`: HSL(220, 18%, 9%) - Cinza azulado profundo
- `--foreground`: HSL(210, 20%, 92%) - Texto claro

**Card/Surface:**
- `--card`: HSL(220, 16%, 12%) - Superfície de cards escura
- `--card-foreground`: HSL(210, 20%, 92%)

**Primary:**
- `--primary`: HSL(205, 28%, 58%) - Azul mais claro para dark
- `--primary-foreground`: HSL(220, 18%, 9%)

**Secondary:**
- `--secondary`: HSL(220, 14%, 16%)
- `--secondary-foreground`: HSL(210, 18%, 88%)

**Muted:**
- `--muted`: HSL(220, 14%, 16%)
- `--muted-foreground`: HSL(210, 12%, 68%)

**Border:**
- `--border`: HSL(220, 12%, 18%)
- `--input`: HSL(220, 12%, 18%)

**Ring:**
- `--ring`: HSL(205, 28%, 58%)

#### Sombras

**Light Mode:**
- `--shadow-xs`: 0 1px 2px 0 hsl(214 25% 50% / 0.03)
- `--shadow-sm`: 0 1px 3px 0 hsl(214 25% 50% / 0.04)
- `--shadow-md`: 0 2px 6px -1px hsl(214 25% 50% / 0.05), 0 1px 3px -1px hsl(214 25% 50% / 0.03)
- `--shadow-lg`: 0 4px 12px -2px hsl(214 25% 50% / 0.06), 0 2px 4px -1px hsl(214 25% 50% / 0.03)

**Dark Mode:**
- `--shadow-xs`: 0 1px 2px 0 hsl(220 40% 6% / 0.15)
- `--shadow-sm`: 0 1px 3px 0 hsl(220 40% 6% / 0.2)
- `--shadow-md`: 0 2px 6px -1px hsl(220 40% 6% / 0.25), 0 1px 3px -1px hsl(220 40% 6% / 0.1)
- `--shadow-lg`: 0 4px 12px -2px hsl(220 40% 6% / 0.3), 0 2px 4px -1px hsl(220 40% 6% / 0.15)

#### Background Atmosférico

**Light Mode:**
- Grain discreto (3% opacity) via SVG inline
- Gradiente radial superior: ellipse 1000px x 600px em 15% -5%, cor primary com 6% opacity
- Gradiente linear: 175deg, primary 3% opacity até transparente em 30%
- `background-attachment: fixed`

**Dark Mode:**
- Grain discreto (4% opacity)
- Gradiente radial superior: ellipse 900px x 500px em 10% -8%, primary 8% opacity
- Gradiente radial secundário: ellipse 600px x 400px em 90% 100%, cinza escuro 40% opacity
- `background-attachment: fixed`

#### Tipografia

**Fontes:**
- `--font-sans`: 'Inter', system-ui, -apple-system, sans-serif (UI base)
- `--font-serif`: 'Source Serif 4', Georgia, 'Times New Roman', serif (conteúdo editorial)

**Hierarquia (Sans):**
- `h1`: 1.75rem (28px), font-weight 600, line-height 1.25, letter-spacing -0.02em
- `h2`: 1.375rem (22px), font-weight 600, line-height 1.3, letter-spacing -0.015em
- `h3`: 1.125rem (18px), font-weight 600, line-height 1.4, letter-spacing -0.01em
- `h4`: 1rem (16px), font-weight 500, line-height 1.5

**Editorial (Serif):**
- `.prose-reading`: 1.0625rem (17px), line-height 1.8, letter-spacing 0.005em
- `.prose-editorial`: 0.9375rem (15px), line-height 1.7, letter-spacing 0.008em
- `.text-editorial-caption`: 0.8125rem (13px), italic, line-height 1.6

**Radius:**
- `--radius`: 0.625rem (10px) - Base
- `--radius-sm`: calc(var(--radius) - 4px) = 6px
- `--radius-md`: calc(var(--radius) - 2px) = 8px
- `--radius-lg`: var(--radius) = 10px
- `--radius-xl`: calc(var(--radius) + 4px) = 14px

#### Componentes shadcn/ui Utilizados

- **Card:** Variantes `default` (hover com shadow-md) e `static` (sem hover, shadow-xs)
- **Button:** Variantes `default`, `outline`, `ghost`, `secondary`; tamanhos `sm`, `default`, `icon`
- **Badge:** Variantes `default`, `secondary`, `outline`, `muted`
- **Skeleton:** Para estados de loading
- **Separator:** Divisor horizontal
- **Toast:** Sistema de notificações (via ToastProvider)
- **Tabs:** [ASSUMIDO] Componente de abas (não encontrado diretamente, mas padrão shadcn)

### 1.3 Padrões de Estados

#### Loading (Skeleton)

**Estrutura padrão:**
- Cards com skeleton: CardHeader com Skeleton para título (h-5 w-32) e descrição (h-4 w-48)
- Listas: Múltiplos Skeleton com alturas variadas (h-4, h-8)
- Componentes específicos: HistorySkeleton, ReadingsSkeleton, ProtocolsSkeleton, ObservabilitySkeleton, ReferenceSkeleton, TherapySkeleton

#### Empty State

**Componente:** `EmptyState`
- Container: Border dashed, fundo `bg-muted/30`, padding 24px vertical e horizontal, centralizado
- Ícone: Círculo 48x48px com fundo muted, ícone padrão FileText 20x20px (ou customizado)
- Título: text-sm, font-medium, margin-top 16px
- Descrição: text-sm, text-muted-foreground, max-width 384px, margin-top 4px
- Ação (opcional): Button variant="outline" size="sm", margin-top 16px

**Textos padrão:**
- Título: "Sem dados" (ou customizado)
- Descrição: "Nenhum registro encontrado neste período." (ou customizado)

#### Error State

**Componente:** `ErrorState`
- Variante `card` (padrão): Card com CardHeader contendo ícone AlertCircle 20x20px, título e descrição; botão de retry no CardContent
- Variante `inline`: Container com fundo `bg-destructive/5`, ícone 32x32px, texto centralizado
- Ícone: AlertCircle, cor `text-destructive/60`
- Título padrão: "Não foi possível carregar"
- Descrição padrão: "Ocorreu um erro ao buscar os dados."
- Botão: "Tentar novamente" (ou customizado)

#### Not Found (404)

**Estrutura:**
- Botão "Voltar" (ghost, sm) com ícone ArrowLeft
- EmptyState com:
  - Ícone: FileQuestion 20x20px
  - Título: "Fonte não encontrada" (ou equivalente)
  - Descrição: "A referência solicitada não existe ou foi removida." (ou equivalente)

---

## 2. ARQUITETURA DE INFORMAÇÃO

### 2.1 Objetos e Conceitos Exibidos no UI

**Baseline:**
- [ASSUMIDO] Dados iniciais coletados no primeiro acesso (não encontrada página dedicada, apenas API `/api/baseline`)

**Check-in (DailyCheckIn):**
- Registro diário com: moodScore (1-10), energyScore (1-10), anxietyLevel (0-10), routineScore (0-10), sleepHours (número), sleepQuality (poor/fair/good/excellent), hadImpulse (boolean), hadCrisis (boolean), notes (string opcional), date (ISO string)

**Diário (JournalEntry):**
- Entrada de texto livre por data: content (string), type ('free_write'), date (ISO string)

**Leitura (Reading):**
- Observação derivada dos dados: id, title, summary, detail (opcional), category (sleep/stability/routine/consistency), confidence (number), severity (number), periodStart, periodEnd, dataPointsAnalyzed, referenceId (opcional), feedback (useful/hidden/not_applicable/null)

**Referência/Estudo (ReferenceSource):**
- Fonte científica: id, title, authors (array), year, journal (opcional), type (systematic_review/meta_analysis/randomized_controlled_trial/cohort_study/case_study/expert_opinion), topics (array), abstract (opcional), keyFindings (array), evidenceLevel (high/moderate/low), limitations (array dinâmico), doi (opcional), url (opcional)

**Protocolo (Protocol):**
- Estrutura de acompanhamento: id, name, description, category (sleep/routine/stability/consistency), durationDays (number), steps (array de Step, cada Step com id, order, title, description, tasks (array de Task, cada Task com id, description))

**Execução de Protocolo (ProtocolRun):**
- Instância ativa de um protocolo: id, protocolId, startedAt (ISO string), completedTasks (array de {taskId, completedAt})

**Terapia (TherapyState):**
- Estado do modo terapia: enabled (boolean), sharingRules (array de regras por recipientId e categories)

**Regras de Compartilhamento:**
- Por categoria de dados: baseline, check_ins, journal_entries, readings, protocols, therapy_sessions (cada uma boolean)

### 2.2 Relações e Links Entre Módulos

**Navegação principal:**
- Sidebar/Bottom Nav → Rotas principais (Hoje, Histórico, Dashboard, Leituras, Protocolos, Ânima)

**Hoje (`/today`):**
- Se há check-in → Exibe CheckinSummary + JournalSection
- Se não há check-in → EmptyState com botão "Registrar" → Abre CheckinWizard
- CheckinWizard → 3 passos → Submete → Retorna para estado "has-data"
- JournalSection → Permite editar/visualizar diário do dia

**Histórico (`/history`):**
- Tabs: Calendário / Lista
- Calendário → Clicar em dia → Navega para `/today?asOf={date}`
- Lista → Clicar em item → [ASSUMIDO] Navega para `/today?asOf={date}` ou `/checkins/{date}`

**Dashboard (`/dashboard`):**
- Toggle: Semana / Mês
- Gráficos de métricas → Dados derivados de check-ins do período

**Leituras (`/readings`):**
- Tabs de categoria: Todas, Sono, Estabilidade, Rotina, Consistência
- Toggle de período: 7 dias / 30 dias
- Toggle "Ver arquivadas" (showHidden)
- ReadingCard → Botão "Fonte" → Navega para `/references/{referenceId}?asOf={asOf}` (preserva asOf)
- Feedback: Botões "Útil", "Não se aplica", "Arquivar"

**Referências (`/references/{id}`):**
- Botão "Voltar" → Retorna para `/readings?asOf={asOf}` (preserva asOf se presente)
- Botão "Ver fonte" (externo) → Abre URL externa (DOI ou URL)

**Protocolos (`/protocols`):**
- Biblioteca → ProtocolCard → Clicar → Abre ProtocolRun (detalhe)
- ProtocolRun → Botão "Voltar" → Retorna para biblioteca
- Se há run ativo → Badge "Em andamento", botão "Continuar"
- Se não há run → Botão "Ver detalhes" ou "Iniciar"

**Ânima (`/anima`):**
- TherapyStatusCard → Toggle ativar/desativar modo terapia
- SharingRulesPanel → Toggles por categoria (habilitado apenas se modo terapia ativo)
- TherapistPreview → Visualização do que o profissional veria

**Parâmetros de Query Preservados:**
- `asOf`: Data de referência (ISO string), preservado em navegações entre leituras e referências
- `delay`: [ASSUMIDO] Para simulação de latência em desenvolvimento
- `error`: [ASSUMIDO] Para simulação de erros em desenvolvimento
- `lang`: Idioma (pt/en), padrão pt-BR

---

## 3. FLUXO COMPLETO DO USUÁRIO (PASSO A PASSO)

### 3.1 Primeiro Acesso

**Página inicial (`/`):**
- Landing page pública com:
  - Hero: Título "Ânima", subtítulo "Acompanhamento contínuo de bem-estar", descrição, botão "Acessar o app" → `/today`
  - Seções: "O que é", "O que não é", "Como funciona", "Princípios", "Status"
  - Footer: Link "Demo" → `/demo`, copyright

**Primeiro acesso ao app:**
- [ASSUMIDO] Baseline wizard pode ser exibido (não encontrada página dedicada, apenas API)
- Usuário acessa `/today` → EmptyState → Clica "Registrar" → CheckinWizard

### 3.2 Uso Diário

**Check-in:**
1. Acessa `/today` (ou clica em dia no calendário)
2. Se não há registro → EmptyState → "Registrar"
3. CheckinWizard abre:
   - **Passo 1 - Estado atual:**
     - Slider "Humor" (1-10): Labels "Baixo" / "Alto"
     - Slider "Energia" (1-10): Labels "Baixa" / "Alta"
     - Slider "Ansiedade" (0-10): Labels "Ausente" / "Presente"
     - Botão "Avançar"
   - **Passo 2 - Estrutura do dia:**
     - Slider "Organização" (0-10): Labels "Estruturado" / "Disperso"
     - Feedback dinâmico baseado no valor (≤3: "Dia com estrutura definida", 4-6: "Estrutura parcial", 7-8: "Estrutura reduzida", >8: "Sem estrutura percebida")
     - Botões "Voltar" / "Avançar"
   - **Passo 3 - Sono e ocorrências:**
     - Input numérico "Duração do sono" (0-24, step 0.5) + label "horas"
     - Radio buttons "Qualidade percebida": Ruim, Regular, Bom, Ótimo
     - Checkboxes: "Impulso ou urgência atípica", "Episódio de instabilidade"
     - Textarea "Observações" (placeholder: "Contexto adicional, se relevante...")
     - Botões "Voltar" / "Registrar"
4. Após submit → CheckinSummary exibido + JournalSection

**Diário:**
- Seção "Anotações" abaixo do check-in
- Se vazio → Botão "Adicionar anotação" (ghost, full width)
- Ao clicar → JournalEditor (textarea, botões "Salvar" / "Cancelar")
- Após salvar → JournalViewer (texto renderizado, botão "Editar")

### 3.3 Revisão

**Histórico (`/history`):**
- Tabs: "Calendário" / "Lista"
- Calendário: Grid 7 colunas, navegação mês anterior/próximo, dias clicáveis → `/today?asOf={date}`
- Lista: Cards ordenados por data (mais recente primeiro), clicáveis → [ASSUMIDO] `/today?asOf={date}`

**Dashboard (`/dashboard`):**
- Toggle: "Semana" / "Mês"
- Gráficos de linha para cada métrica (Humor, Energia, Ansiedade, Organização, Sono)
- Eixo X: Datas, Eixo Y: Escala da métrica
- Tooltip ao hover com data e valor

### 3.4 Exploração

**Leituras (`/readings`):**
- Tabs de categoria com contadores
- Toggle período: "7 dias" / "30 dias"
- Toggle "Ver arquivadas" (com contador de ocultas)
- Lista de ReadingCard:
  - Título, categoria, confiança, período, pontos analisados
  - Resumo (serif), detalhe (se houver)
  - Botões: "Útil", "Não se aplica", "Arquivar"
  - Botão "Fonte" (se houver referenceId) → `/references/{id}?asOf={asOf}`
- Empty state se filtrado: "Sem leituras nesta categoria"

**Referência (`/references/{id}`):**
- Botão "Voltar" → `/readings?asOf={asOf}`
- Botão "Ver fonte" (externo) → Abre URL externa
- Header: Título, autores, ano, journal, badges (tipo, tópicos)
- Seções:
  - Resumo (abstract)
  - Principais observações (keyFindings)
  - Limitações conhecidas (dinâmicas por tipo e evidenceLevel)
  - Metadados (nível de evidência, DOI se houver)
  - Relação com seus registros (determinístico) + disclaimer
  - Disclaimer final: "Informação educacional. Não substitui avaliação profissional."

### 3.5 Ação

**Protocolos (`/protocols`):**
- Biblioteca: Grid de ProtocolCard
- Cada card: Nome, categoria, duração, descrição, badge "Em andamento" (se ativo), progresso (se ativo), botão "Continuar" ou "Ver detalhes"
- Clicar em card → ProtocolRun:
  - Header: Nome, categoria, duração, descrição, badge "Em andamento" (se ativo)
  - Progresso: Barra de progresso, contador de tarefas
  - Checklist: Tarefas com checkboxes (se ativo) ou estrutura do protocolo (se não iniciado)
  - Disclaimer: "Protocolos são ferramentas de apoio e não substituem acompanhamento profissional..."

### 3.6 Opcional - Modo Terapia

**Ânima (`/anima`):**
- TherapyStatusCard:
  - Título: "Modo Terapia"
  - Descrição: "Quando ativo, permite configurar o compartilhamento de dados com profissionais de saúde."
  - Badge: "Ativo" / "Inativo"
  - Botão: "Ativar modo terapia" / "Desativar"
- SharingRulesPanel:
  - Título: "Dados compartilhados"
  - Toggles por categoria (desabilitados se modo terapia inativo):
    - Baseline
    - Check-ins
    - Anotações
    - Leituras
    - Protocolos
    - Sessões de terapia
- TherapistPreview:
  - Título: "Visualização do profissional"
  - Preview do que seria visível baseado nas categorias habilitadas
- Aviso de consentimento: "Você controla quais dados são compartilhados. Nada é enviado sem sua autorização..."

**Preferências:**
- Card "Preferências": Toggle de tema (claro/escuro)

---

## 4. ESPECIFICAÇÃO DE TELAS (UMA A UMA)

### 4.1 Layout Global (Shell)

**A) Nome:** Layout Shell  
**B) Rota:** Aplicado a todas as rotas dentro de `(app)`  
**C) Objetivo:** Estrutura base de navegação e conteúdo

**D) Layout Desktop:**
- **Sidebar (esquerda, fixa):**
  - Logo: "Ânima" (clique → `/today`)
  - 6 itens de menu (ícone + label)
  - Footer: "Tema" + ThemeToggle
- **Área de conteúdo (direita, com margem):**
  - Container centralizado (max-w-4xl)
  - PageHeader (título + descrição)
  - PageContainer (conteúdo da página)

**E) Layout Mobile:**
- **Área de conteúdo (full width):**
  - PageHeader
  - PageContainer
  - Padding inferior para bottom nav
- **Bottom Navigation (fixa, inferior):**
  - 6 itens (ícone + label pequena)

**F) Responsividade:**
- Breakpoint: 768px (md)
- Sidebar oculta em mobile, bottom nav oculta em desktop

**G) Acessibilidade:**
- `aria-label` em navegações
- `aria-current="page"` no item ativo
- Focus visible com ring

---

### 4.2 Página: Hoje (`/today`)

**A) Nome:** Hoje  
**B) Rota:** `/today`  
**C) Objetivo:** Registro do dia atual (ou data selecionada via `asOf`)

**D) PageHeader:**
- Título: "Hoje"
- Descrição: Data formatada (ex: "15 de janeiro de 2024" ou "Hoje" se for hoje)

**E) Estados:**

**E.1) Loading:**
- Card com Skeleton (h-5 w-32 para título, h-4 w-48 para descrição)
- Card com Skeleton (h-4 w-24, h-8 w-full, h-4 w-32)

**E.2) Empty (sem check-in):**
- EmptyState:
  - Título: "Sem registro"
  - Descrição: "Nenhum registro para {data formatada}."
  - Botão: "Registrar" → Abre CheckinWizard

**E.3) Wizard (em progresso):**
- Texto: "Registrando: {data formatada}" (text-[0.8125rem], muted)
- CheckinWizard (Card):
  - Indicador de passos: 3 pontos (2px cada), ativo em `bg-primary`, inativo em `bg-muted`, label "{step}/3"
  - Conteúdo do passo atual (Step1State, Step2Routine ou Step3Sleep)
  - Mensagem de erro (se houver): Card vermelho com texto
  - Footer: Botões "Voltar" (ghost, disabled no passo 1) / "Avançar" ou "Registrar" (no passo 3)

**E.4) Has Data (com check-in):**
- CheckinSummary (Card):
  - Header: Data relativa (ex: "Hoje", "Ontem", "15 de janeiro")
  - Conteúdo: Resumo dos valores registrados (mood, energy, anxiety, routine, sleep)
- JournalSection:
  - Título: "Anotações" (text-[0.8125rem], font-medium, muted)
  - Estados:
    - Loading: Card com Skeleton
    - Empty: Botão "Adicionar anotação" (ghost, full width)
    - Editing: JournalEditor (textarea + botões)
    - Saved: JournalViewer (texto + botão "Editar")

**F) Navegação:**
- Parâmetro `asOf` preservado em navegações
- Clicar em dia no calendário → `/today?asOf={date}`

**G) Responsividade:**
- Cards full width em mobile
- Botões adaptam texto (ex: "Útil" vira só ícone em mobile)

---

### 4.3 Página: Histórico (`/history`)

**A) Nome:** Histórico  
**B) Rota:** `/history`  
**C) Objetivo:** Visualização de registros acumulados (últimos 30 dias)

**D) PageHeader:**
- Título: "Histórico"
- Descrição: "Registros acumulados"

**E) Componentes:**

**E.1) HistoryTabs:**
- Tabs: "Calendário" / "Lista"
- Estilo: Pills com background quando ativo

**E.2) HistoryCalendar (se tab ativa = "calendar"):**
- Card:
  - Header: Botões anterior/próximo (ícones ChevronLeft/Right), label do mês (capitalizado)
  - Content:
    - Grid de cabeçalhos: Dom, Seg, Ter, Qua, Qui, Sex, Sab (text-xs, muted)
    - Grid de dias: DayCell para cada dia do mês
      - Dia sem check-in: Fundo transparente, texto muted, borda sutil
      - Dia com check-in: Fundo primary/8, texto primary, borda primary/20
      - Dia atual (relativo a asOf): Borda mais espessa ou destaque
      - Clicável → `/today?asOf={date}`

**E.3) HistoryList (se tab ativa = "list"):**
- Lista de cards ordenados por data (mais recente primeiro)
- Cada card: [ASSUMIDO] Resumo do check-in, data, link para detalhe

**F) Estados:**
- Loading: HistorySkeleton
- Error: ErrorState
- Empty: EmptyState ("Sem registros neste período")

**G) Responsividade:**
- Calendário: Grid 7 colunas, células adaptam tamanho
- Lista: Cards full width

---

### 4.4 Página: Dashboard (`/dashboard`)

**A) Nome:** Painel  
**B) Rota:** `/dashboard`  
**C) Objetivo:** Visão agregada dos registros com gráficos

**D) PageHeader:**
- Título: "Painel"
- Descrição: "Visão agregada dos registros"

**E) Componentes:**

**E.1) TimeRangeToggle:**
- Toggle: "Semana" / "Mês"
- Estilo: Pills, ativo com background

**E.2) MetricChart (múltiplos):**
- Card variant="static":
  - Header: Título da métrica (ex: "Humor") + unidade se houver (ex: "(1-10)")
  - Content:
    - Gráfico de linha (Recharts):
      - Altura: 112px (h-28)
      - Eixo X: Datas (labels pequenos, muted)
      - Eixo Y: Escala da métrica (labels pequenos, muted)
      - Linha: Cor configurada, stroke-width 1.25, pontos 2px, ponto ativo 3.5px
      - Tooltip: Card com data e valor
    - Se sem dados: Texto "Sem registros neste período"

**F) Métricas exibidas:**
- Humor (1-10)
- Energia (1-10)
- Ansiedade (0-10)
- Organização (0-10)
- Sono (horas)

**G) Estados:**
- Loading: ObservabilitySkeleton
- Error: ErrorState
- Empty: EmptyState com TimeRangeToggle visível

**H) Responsividade:**
- Gráficos: ResponsiveContainer adapta largura
- Cards: Full width em mobile

---

### 4.5 Página: Leituras (`/readings`)

**A) Nome:** Leituras  
**B) Rota:** `/readings`  
**C) Objetivo:** Feed de observações derivadas dos registros

**D) PageHeader:**
- Título: "Leituras"
- Descrição: "Observações derivadas dos seus registros"

**E) Componentes:**

**E.1) CategoryTabs:**
- Tabs: "Todas", "Sono", "Estabilidade", "Rotina", "Consistência"
- Cada tab mostra contador entre parênteses (ex: "Todas (12)")
- Estilo: Pills, ativo com background

**E.2) PeriodToggle:**
- Toggle: "7 dias" / "30 dias"
- Checkbox: "Ver arquivadas" (com contador de ocultas)
- Layout: Flex horizontal, gap

**E.3) ReadingCard (lista):**
- Card:
  - Header:
    - Título (text-base, font-medium)
    - Badge "Oculta" (se feedback = 'hidden')
    - ReadingMeta: Categoria, confiança, período, pontos analisados
  - Content:
    - Resumo (prose-editorial, serif)
    - Detalhe (se houver): text-[0.8125rem], muted, border-l, padding-left
    - Ações:
      - Botões: "Útil" (ThumbsUp), "Não se aplica" (X), "Arquivar" (EyeOff)
      - Botão "Fonte" (se houver referenceId): Link para `/references/{id}?asOf={asOf}`
- Opacidade reduzida se oculta

**F) Estados:**
- Loading: ReadingsSkeleton
- Error: ErrorState
- Empty: EmptyReadings (diferencia se filtrado ou não)

**G) Feedback:**
- Toast ao marcar como útil: "Marcada como útil"
- Toast ao arquivar: "Leitura ocultada"
- Toast de erro: "Não foi possível salvar"

**H) Navegação:**
- Botão "Fonte" → `/references/{id}?asOf={asOf}` (preserva asOf)

**I) Responsividade:**
- Botões de feedback: Texto oculto em mobile, só ícone
- Cards: Full width

---

### 4.6 Página: Referência (`/references/{id}`)

**A) Nome:** Fonte  
**B) Rota:** `/references/{id}`  
**C) Objetivo:** Visualização detalhada de estudo científico

**D) Componentes:**

**D.1) ReferenceHeader:**
- Botão "Voltar" (ghost, sm) com ArrowLeft → `backHref` (geralmente `/readings?asOf={asOf}`)
- Botão "Ver fonte" (outline, sm) com ExternalLink → URL externa (se houver)
- Título: text-xl, font-semibold
- Metadados: Autores, ano, journal (text-sm, muted, separados por "·")
- Badges: Tipo (secondary), Tópicos (outline, até 3 primeiros)

**D.2) ReferenceSummary:**
- Card variant="static":
  - Header: "Resumo" (text-[0.8125rem], font-medium, muted)
  - Content: Abstract (prose-editorial)

**D.3) ReferenceKeyFindings:**
- Card variant="static":
  - Header: "Principais observações" (text-[0.8125rem], font-medium, muted)
  - Content: Lista de keyFindings (prose-editorial)

**D.4) ReferenceLimitations:**
- Card variant="static":
  - Header: "Limitações conhecidas" (text-[0.8125rem], font-medium, muted)
  - Content: Limitações dinâmicas baseadas em type e evidenceLevel (prose-editorial)

**D.5) ReferenceMeta:**
- Card variant="static":
  - Metadados: Nível de evidência, DOI (se houver), tipo de estudo

**D.6) ReferenceUserContext:**
- Card variant="static":
  - Título: "Relação com seus registros"
  - Conteúdo: Análise determinística baseada nos dados do usuário
  - Disclaimer: Texto sobre limitações da análise

**D.7) ReferenceDisclaimer:**
- Texto: "Informação educacional. Não substitui avaliação profissional."
- Estilo: text-[0.8125rem], muted, centralizado ou em card

**E) Estados:**
- Loading: ReferenceSkeleton
- Not Found: EmptyState com FileQuestion, botão "Voltar"
- Error: ErrorState com botão "Voltar"

**F) Navegação:**
- `backHref` preserva `asOf` se presente
- Link externo abre em nova aba

**G) Responsividade:**
- Cards: Full width
- Badges: Wrap em mobile

---

### 4.7 Página: Protocolos (`/protocols`)

**A) Nome:** Protocolos  
**B) Rota:** `/protocols`  
**C) Objetivo:** Biblioteca de protocolos e execução de acompanhamentos estruturados

**D) Estados:**

**D.1) Biblioteca (estado inicial):**
- ProtocolLibrary:
  - Grid de ProtocolCard:
    - Header:
      - Nome (text-[0.9375rem])
      - Badge categoria (muted, text-[0.6875rem])
      - Duração (text-[0.6875rem], muted)
      - Badge "Em andamento" (se houver run ativo)
    - Content:
      - Descrição (line-clamp-2, text-[0.8125rem])
      - Se ativo:
        - Progresso: Label "Progresso" + contador (ex: "3/10"), barra de progresso
        - Botão "Continuar" (ghost, sm, full width)
      - Se não ativo:
        - Texto "{totalTasks} etapas" (text-[0.75rem], muted)
        - Botão "Ver detalhes" (ghost, sm)
    - Clicável → Abre ProtocolRun

**D.2) Detalhe/Execução (ProtocolRun):**
- Botão "Voltar" (ghost, sm) com ArrowLeft → Retorna para biblioteca
- Card Header:
  - Nome (text-lg)
  - Badges: Categoria, duração
  - Badge "Em andamento" (se ativo)
  - Descrição
- Card Progresso (se houver run):
  - ProtocolProgress: Barra de progresso, contador de tarefas
- Card Tarefas (se ativo):
  - ProtocolChecklist: Lista de tarefas com checkboxes, agrupadas por step
  - Ao marcar → Toast "Tarefa concluída"
- Card Estrutura (se não iniciado):
  - Lista de steps com ordem, título, descrição, contador de tarefas
- Disclaimer: "Protocolos são ferramentas de apoio e não substituem acompanhamento profissional..."

**E) Estados:**
- Loading: ProtocolsSkeleton
- Error: ErrorState
- Empty: [ASSUMIDO] EmptyState se não houver protocolos

**F) Navegação:**
- Biblioteca → Clicar em card → ProtocolRun
- ProtocolRun → "Voltar" → Biblioteca

**G) Responsividade:**
- Grid: Responsivo (1 col mobile, 2+ col desktop)
- Cards: Full width em mobile

---

### 4.8 Página: Ânima (`/anima`)

**A) Nome:** Ânima  
**B) Rota:** `/anima`  
**C) Objetivo:** Central de configurações e modo terapia

**D) PageHeader:**
- Título: "Ânima"
- Descrição: "Central de configurações"

**E) Componentes:**

**E.1) TherapyStatusCard:**
- Card:
  - Header:
    - Título: "Modo Terapia" (text-base)
    - Descrição: "Quando ativo, permite configurar o compartilhamento de dados com profissionais de saúde."
    - Badge: "Ativo" (default) ou "Inativo" (secondary)
  - Content:
    - Botão: "Ativar modo terapia" (default) ou "Desativar" (outline)
    - Estado: "Atualizando..." quando `isUpdating`

**E.2) SharingRulesPanel:**
- Card:
  - Título: "Dados compartilhados"
  - Toggles por categoria (desabilitados se `therapyEnabled = false`):
    - Baseline
    - Check-ins
    - Anotações
    - Leituras
    - Protocolos
    - Sessões de terapia
  - Cada toggle: Label + switch

**E.3) TherapistPreview:**
- Card:
  - Título: "Visualização do profissional"
  - Preview do que seria visível baseado nas categorias habilitadas
  - [ASSUMIDO] Lista ou cards mostrando dados que seriam compartilhados

**E.4) Aviso de Consentimento:**
- Container: bg-muted/30, padding 16px, rounded-lg
- Ícone: Info 14x14px, muted
- Título: "Controle e consentimento" (text-[0.75rem], font-medium, muted)
- Descrição: "Você controla quais dados são compartilhados. Nenhuma informação é enviada sem autorização. Acesso pode ser alterado a qualquer momento." (text-[0.75rem], muted/70)

**E.5) Card Preferências:**
- Card variant="static":
  - Header:
    - Título: "Preferências" (text-[0.9375rem])
    - Descrição: "Ajustes de aparência"
  - Content:
    - Row: "Tema" + descrição "Modo claro ou escuro" + ThemeToggle

**F) Estados:**
- Loading: TherapySkeleton
- Error: ErrorState

**G) Responsividade:**
- Cards: Full width
- Botões: Full width em mobile (sm:w-auto)

---

### 4.9 Página: Landing (`/`)

**A) Nome:** Landing Page  
**B) Rota:** `/`  
**C) Objetivo:** Página pública de apresentação do produto

**D) Layout:**

**D.1) Hero:**
- Container: max-w-3xl, centralizado, padding vertical 64px (mobile) / 96px (desktop)
- Título: "Ânima" (text-4xl mobile / text-5xl desktop, font-semibold)
- Subtítulo: "Acompanhamento contínuo de bem-estar" (text-xl, serif)
- Descrição: Texto sobre o produto (text-base, muted, max-w-xl)
- Botão: "Acessar o app" (primary) → `/today`

**D.2) Seções (max-w-2xl, centralizado):**
- **O que é:**
  - Título: "O que é" (text-lg, font-semibold)
  - Parágrafo: Descrição do produto
- **O que não é:**
  - Título: "O que não é"
  - Lista: 4 itens com bullet points (círculo 4px, muted)
- **Como funciona:**
  - Título: "Como funciona"
  - Grid 2 colunas (mobile: 1 col): 4 cards (Registros, Histórico, Observações, Compartilhamento)
- **Princípios:**
  - Título: "Princípios"
  - Lista: 4 itens (Dados pertencem ao usuário, Consentimento explícito, Observação acima de julgamento, Tecnologia como suporte)
- **Status:**
  - Título: "Status"
  - Parágrafo: "Produto em desenvolvimento controlado..."

**D.3) Footer:**
- Border-top
- Layout: Flex column (mobile) / row (desktop), justify-between
- Esquerda: "Ânima" + subtítulo
- Direita: Link "Demo" → `/demo` + Copyright

**E) Responsividade:**
- Hero: Padding adapta
- Grid: 1 col mobile, 2 col desktop
- Footer: Stack mobile, row desktop

---

### 4.10 Página: Demo (`/demo`)

**A) Nome:** Demo  
**B) Rota:** `/demo`  
**C) Objetivo:** [ASSUMIDO] Página de demonstração com links para diferentes partes do app

**D) Estrutura:**
- [ASSUMIDO] Lista de passos ou cards com links para rotas principais com parâmetro `?demo=1`

---

## 5. DETALHES DE INTERAÇÃO E MICRO-COPY

### 5.1 Padrões de Labels

**Navegação:**
- "Voltar": Botão com ícone ArrowLeft
- "Continuar": Botão para avançar em wizards/protocolos
- "Avançar": Botão para próximo passo
- "Registrar": Botão de submit de check-in
- "Salvar": Botão de submit de formulários
- "Cancelar": Botão para cancelar edição
- "Tentar novamente": Botão de retry em erros
- "Ver detalhes": Botão para ver mais informações
- "Ver fonte": Link para referência externa
- "Fonte": Link para referência interna

**Estados:**
- "Registrando...": Loading durante submit de check-in
- "Atualizando...": Loading durante atualização
- "Salvo": Toast de sucesso
- "Não foi possível salvar": Toast de erro
- "Marcada como útil": Toast de feedback positivo
- "Leitura ocultada": Toast de arquivamento
- "Tarefa concluída": Toast de progresso de protocolo

### 5.2 Mensagens de Erro

**Padrão:**
- Título: "Não foi possível carregar" (ou específico)
- Descrição: "Ocorreu um erro ao buscar os dados." (ou mensagem específica)
- Ação: Botão "Tentar novamente" (ou customizado)

**Variantes:**
- ErrorState (card): Card com ícone, título, descrição, botão
- ErrorState (inline): Container com fundo destructive/5, ícone, texto, botão

### 5.3 Empty States

**Padrões:**
- "Sem registro": Quando não há check-in para a data
- "Sem registros neste período": Quando não há dados no período
- "Sem leituras nesta categoria": Quando filtro não retorna resultados
- "Nenhum protocolo disponível": [ASSUMIDO] Quando não há protocolos
- "Fonte não encontrada": Quando referência não existe

### 5.4 Disclaimers

**Posições e Textos:**
1. **Referências (final da página):**
   - "Informação educacional. Não substitui avaliação profissional."

2. **Protocolos:**
   - "Protocolos são ferramentas de apoio e não substituem acompanhamento profissional. Você pode pausar ou encerrar a qualquer momento sem penalidade."

3. **Modo Terapia:**
   - "Você controla quais dados são compartilhados. Nenhuma informação é enviada sem autorização. Acesso pode ser alterado a qualquer momento."

4. **Referências (contexto do usuário):**
   - [ASSUMIDO] Texto sobre limitações da análise determinística

### 5.5 Preservação de Parâmetros de Query

**Parâmetros:**
- `asOf`: Preservado em navegações entre `/readings` e `/references/{id}`
- `delay`: [ASSUMIDO] Para desenvolvimento
- `error`: [ASSUMIDO] Para desenvolvimento
- `lang`: Idioma (pt/en), padrão pt-BR
- `demo`: [ASSUMIDO] Flag para modo demo

**Comportamento:**
- Ao navegar de `/readings` para `/references/{id}`, `asOf` é preservado
- Ao voltar de `/references/{id}` para `/readings`, `asOf` é preservado
- Navegação de calendário para `/today` inclui `asOf={date}`

---

## 6. INVENTÁRIO VISUAL (SEM IMAGENS)

### 6.1 Tipos de Cards

**CheckinSummary:**
- Card padrão
- Header: Data relativa (ex: "Hoje", "Ontem")
- Content: Valores registrados (mood, energy, anxiety, routine, sleep)

**ReadingCard:**
- Card padrão
- Header: Título, badge "Oculta" (se aplicável), ReadingMeta
- Content: Resumo (serif), detalhe (se houver), ações (feedback + fonte)
- Opacidade reduzida se oculta

**ReferenceCard:**
- [ASSUMIDO] Não existe card de referência, apenas página de detalhe

**ProtocolCard:**
- Card padrão, clicável
- Header: Nome, badges (categoria, duração), badge "Em andamento" (se aplicável)
- Content: Descrição, progresso (se ativo) ou contador de etapas, botão

**DayCell (calendário):**
- Célula de calendário
- Fundo transparente (sem check-in) ou primary/8 (com check-in)
- Borda sutil ou primary/20
- Texto muted ou primary
- Borda destacada se for dia atual

### 6.2 Badges

**Tipos:**
- `default`: Primary background, primary-foreground text
- `secondary`: Secondary background, secondary-foreground text
- `outline`: Border, transparent background
- `muted`: [ASSUMIDO] Variante com fundo muted

**Uso:**
- Categorias de protocolos
- Tipos de referências
- Tópicos de referências (até 3)
- Status "Em andamento"
- Status "Oculta"
- Status "Ativo" / "Inativo" (modo terapia)

### 6.3 Chips de Filtro

**CategoryTabs:**
- Pills com background quando ativo
- Contador entre parênteses
- Estilo: tab-pill (custom)

**PeriodToggle:**
- Toggle group com 2 opções
- Estilo: Pills, ativo com background

**TimeRangeToggle:**
- Toggle group com 2 opções (Semana/Mês)
- Estilo: Pills, ativo com background

### 6.4 Tabs

**HistoryTabs:**
- 2 tabs: "Calendário" / "Lista"
- Estilo: Pills, ativo com background

**CategoryTabs:**
- 5 tabs: "Todas", "Sono", "Estabilidade", "Rotina", "Consistência"
- Estilo: Pills, ativo com background
- Contadores entre parênteses

### 6.5 Componentes de Gráfico

**MetricChart:**
- Biblioteca: Recharts
- Tipo: LineChart
- Altura: 112px (h-28)
- Eixo X: Datas (labels 9px, muted)
- Eixo Y: Escala da métrica (labels 9px, muted, width 28px)
- Linha: stroke-width 1.5, cor configurada
- Pontos: r=2, cor configurada
- Ponto ativo: r=3.5
- Tooltip: Card com data e valor
- Margens: top 6, right 6, bottom 6, left -20

**Métricas:**
- Humor (1-10)
- Energia (1-10)
- Ansiedade (0-10)
- Organização (0-10)
- Sono (horas)

### 6.6 Skeletons

**Padrão:**
- Componente Skeleton do shadcn/ui
- Alturas variadas: h-4, h-5, h-8, h-32, etc.
- Larguras variadas: w-24, w-32, w-48, w-full, etc.

**Componentes específicos:**
- HistorySkeleton: [ASSUMIDO] Múltiplos cards skeleton
- ReadingsSkeleton: [ASSUMIDO] Múltiplos ReadingCard skeleton
- ProtocolsSkeleton: [ASSUMIDO] Grid de ProtocolCard skeleton
- ObservabilitySkeleton: [ASSUMIDO] Múltiplos MetricChart skeleton
- ReferenceSkeleton: [ASSUMIDO] Múltiplos cards skeleton
- TherapySkeleton: [ASSUMIDO] Cards skeleton

### 6.7 Toasts

**Sistema:**
- ToastProvider (context)
- Hook: useToast
- Variantes: success, error

**Mensagens:**
- "Salvo" (success)
- "Não foi possível salvar" (error)
- "Marcada como útil" (success)
- "Leitura ocultada" (success)
- "Tarefa concluída" (success)
- "Não foi possível registrar" (error)

**Posição:**
- [ASSUMIDO] Canto superior direito ou inferior (padrão shadcn)

---

## 7. APÊNDICE: DADOS DE EXEMPLO (APENAS PARA ILUSTRAR A UI)

### 7.1 Exemplo: Check-in + Diário

**Data:** 15 de janeiro de 2024

**Check-in:**
- Humor: 7
- Energia: 6
- Ansiedade: 3
- Organização: 4
- Sono: 7.5 horas
- Qualidade do sono: Bom
- Ocorrências: Nenhuma marcada
- Observações: "Dia produtivo, mas com cansaço no final da tarde."

**Diário:**
- "Consegui manter o foco nas tarefas principais. Notei que a ansiedade aumentou levemente após o almoço, mas diminuiu com uma caminhada curta. Vou tentar incluir mais pausas ativas nos próximos dias."

### 7.2 Exemplo: Leitura + Referência

**Leitura:**
- Título: "Padrão de sono consistente observado nos últimos 7 dias"
- Categoria: Sono
- Confiança: 0.85
- Relevância: Média
- Período: 8 a 14 de janeiro de 2024
- Pontos analisados: 6
- Resumo: "Seus registros mostram uma duração média de sono de 7.2 horas nos últimos 7 dias, com qualidade percebida como 'Bom' ou 'Ótimo' na maioria dos dias. Este padrão está dentro da faixa recomendada para adultos."
- Detalhe: "A consistência na duração do sono pode contribuir para melhor regulação do humor e energia ao longo do dia."
- Fonte: Referência ID "sleep-consistency-2023"

**Referência:**
- Título: "Associação entre consistência do sono e bem-estar em adultos: uma revisão sistemática"
- Autores: Silva, A. B., Santos, C. D., Oliveira, E. F.
- Ano: 2023
- Journal: Journal of Sleep Research
- Tipo: Revisão sistemática
- Tópicos: Sono, Consistência, Bem-estar
- Nível de evidência: Alto
- Resumo: "Esta revisão sistemática examina a relação entre consistência na duração do sono e indicadores de bem-estar em adultos. Os resultados sugerem que manter horários regulares de sono está associado a melhor regulação emocional e níveis de energia."
- Principais observações:
  - "Adultos com variação menor que 1 hora na duração do sono apresentaram melhor regulação do humor."
  - "Consistência no sono foi mais preditiva de bem-estar do que duração absoluta isoladamente."
- Limitações: "Estudos incluídos são principalmente observacionais. Necessário mais pesquisas com desenhos experimentais."
- Relação com seus registros: "Seus dados mostram variação de 0.8 horas na duração do sono no período analisado, o que está dentro da faixa associada a melhor bem-estar nos estudos revisados."

### 7.3 Exemplo: Protocolo e Execução

**Protocolo:**
- Nome: "Estabilização de Rotina Semanal"
- Categoria: Rotina
- Duração: 21 dias
- Descrição: "Protocolo para estabelecer e manter uma rotina semanal consistente, com foco em horários regulares para atividades principais."
- Etapas:
  1. "Mapeamento inicial" (3 tarefas)
  2. "Estabelecimento de horários" (4 tarefas)
  3. "Implementação gradual" (5 tarefas)
  4. "Ajustes e manutenção" (3 tarefas)

**Execução (Run):**
- Iniciado em: 10 de janeiro de 2024
- Tarefas concluídas: 8 de 15
- Progresso: 53%
- Tarefas pendentes:
  - Etapa 2: "Definir horário fixo para refeições" (não concluída)
  - Etapa 3: "Implementar horário de trabalho" (não concluída)
  - Etapa 3: "Estabelecer rotina de exercícios" (não concluída)
  - Etapa 4: "Revisar e ajustar horários" (não concluída)
  - Etapa 4: "Documentar desafios encontrados" (não concluída)
  - Etapa 4: "Planejar manutenção a longo prazo" (não concluída)
- Tarefas concluídas:
  - Etapa 1: Todas (3/3)
  - Etapa 2: 3 de 4
  - Etapa 3: 2 de 5

---

**Fim da Documentação**



// ============================================================================
// i18n Types
// ============================================================================

export type Locale = 'pt' | 'en';

export type DictionaryKey =
  // Navigation
  | 'nav.today'
  | 'nav.history'
  | 'nav.readings'
  | 'nav.protocols'
  | 'nav.anima'
  | 'nav.dashboard'

  // Page: Today
  | 'page.today.title'
  | 'page.today.subtitle'

  // Page: History
  | 'page.history.title'
  | 'page.history.subtitle'

  // Page: Readings
  | 'page.readings.title'
  | 'page.readings.subtitle'

  // Page: Protocols
  | 'page.protocols.title'
  | 'page.protocols.subtitle'

  // Page: Anima
  | 'page.anima.title'
  | 'page.anima.subtitle'

  // Page: Dashboard
  | 'page.dashboard.title'
  | 'page.dashboard.subtitle'

  // References
  | 'references.title'
  | 'references.summary'
  | 'references.keyFindings'
  | 'references.limitations'
  | 'references.userContext'
  | 'references.disclaimer'
  | 'references.notFound'
  | 'references.notFoundDescription'
  | 'references.back'
  | 'references.viewSource'

  // Protocols
  | 'protocols.start'
  | 'protocols.inProgress'
  | 'protocols.complete'
  | 'protocols.empty'
  | 'protocols.back'
  | 'protocols.continue'
  | 'protocols.taskCompleted'

  // Therapy
  | 'therapy.status.active'
  | 'therapy.status.inactive'
  | 'therapy.activate'
  | 'therapy.deactivate'
  | 'therapy.sharing.title'
  | 'therapy.preview.title'
  | 'therapy.consent.notice'

  // Common
  | 'common.inDevelopment'
  | 'common.loading'
  | 'common.error'
  | 'common.errorUnknown'
  | 'common.save'
  | 'common.cancel'
  | 'common.confirm'
  | 'common.settings'
  | 'common.theme'
  | 'common.theme.light'
  | 'common.theme.dark'
  | 'common.theme.system'
  | 'common.openMenu'

  // Feedback
  | 'feedback.empty'
  | 'feedback.emptyPeriod'
  | 'feedback.retry'
  | 'feedback.saved'
  | 'feedback.saveError'
  | 'feedback.loadError'
  | 'feedback.noData'

  // Readings
  | 'readings.tabs.all'
  | 'readings.tabs.sleep'
  | 'readings.tabs.stability'
  | 'readings.tabs.routine'
  | 'readings.tabs.consistency'
  | 'readings.period.week'
  | 'readings.period.month'
  | 'readings.showHidden'
  | 'readings.empty.title'
  | 'readings.empty.body'
  | 'readings.actions.useful'
  | 'readings.actions.notApplicable'
  | 'readings.actions.hide'
  | 'readings.meta.confidence'
  | 'readings.meta.severity'
  | 'readings.meta.source'

  // Check-in
  | 'checkin.empty.title'
  | 'checkin.empty.body'
  | 'checkin.empty.cta'

  // Journal
  | 'journal.sectionTitle'
  | 'journal.placeholder';

export type Dictionary = Record<DictionaryKey, string>;

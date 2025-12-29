// ============================================================================
// i18n Types
// ============================================================================

export type Locale = 'pt' | 'en';

export type DictionaryKey =
  // Navigation
  | 'nav.today'
  | 'nav.records'
  | 'nav.observations'
  | 'nav.plans'
  | 'nav.settings'

  // Page: Today
  | 'page.today.title'
  | 'page.today.subtitle'

  // Page: Records (antigo History + Dashboard)
  | 'page.records.title'
  | 'page.records.subtitle'

  // Page: Observations (antigo Readings)
  | 'page.observations.title'
  | 'page.observations.subtitle'

  // Page: Plans (antigo Protocols)
  | 'page.plans.title'
  | 'page.plans.subtitle'

  // Page: Settings (antigo Ânima)
  | 'page.settings.title'
  | 'page.settings.subtitle'

  // Day Context (antigo Journal)
  | 'dayContext.sectionTitle'
  | 'dayContext.placeholder'
  | 'dayContext.add'

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

  // Plans (antigo Protocols)
  | 'plans.start'
  | 'plans.inProgress'
  | 'plans.complete'
  | 'plans.empty'
  | 'plans.back'
  | 'plans.continue'
  | 'plans.taskCompleted'
  | 'plans.disclaimer'

  // Sharing (antigo Therapy)
  | 'sharing.title'
  | 'sharing.status.active'
  | 'sharing.status.inactive'
  | 'sharing.activate'
  | 'sharing.deactivate'
  | 'sharing.dataTitle'
  | 'sharing.preview.title'
  | 'sharing.consent.notice'

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

  // Observations (antigo Readings)
  | 'observations.tabs.all'
  | 'observations.tabs.sleep'
  | 'observations.tabs.stability'
  | 'observations.tabs.routine'
  | 'observations.tabs.consistency'
  | 'observations.period.week'
  | 'observations.period.month'
  | 'observations.showHidden'
  | 'observations.empty.title'
  | 'observations.empty.body'
  | 'observations.actions.useful'
  | 'observations.actions.notApplicable'
  | 'observations.actions.hide'
  | 'observations.meta.confidence'
  | 'observations.meta.severity'
  | 'observations.meta.source'
  | 'observations.disclaimer'

  // Check-in
  | 'checkin.empty.title'
  | 'checkin.empty.body'
  | 'checkin.empty.cta'

  // Day Context (antigo Journal)
  | 'journal.sectionTitle'
  | 'journal.placeholder';

export type Dictionary = Record<DictionaryKey, string>;

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

  // Common
  | 'common.inDevelopment'
  | 'common.loading'
  | 'common.error'
  | 'common.save'
  | 'common.cancel'
  | 'common.confirm'
  | 'common.settings'
  | 'common.theme'
  | 'common.theme.light'
  | 'common.theme.dark'
  | 'common.theme.system';

export type Dictionary = Record<DictionaryKey, string>;

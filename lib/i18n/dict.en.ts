import type { Dictionary } from './types';

export const en: Partial<Dictionary> = {
  // Navigation
  'nav.today': 'Today',
  'nav.history': 'History',
  'nav.readings': 'Readings',
  'nav.protocols': 'Protocols',
  'nav.anima': 'Ânima',

  // Page: Today
  'page.today.title': 'Today',
  'page.today.subtitle': 'Daily record',

  // Page: History
  'page.history.title': 'History',
  'page.history.subtitle': 'Accumulated records',

  // Page: Readings
  'page.readings.title': 'Readings',
  'page.readings.subtitle': 'Observations derived from your records',

  // Page: Protocols
  'page.protocols.title': 'Protocols',
  'page.protocols.subtitle': 'Structured follow-ups',

  // Page: Anima
  'page.anima.title': 'Ânima',
  'page.anima.subtitle': 'Settings hub',

  // Page: Dashboard
  'page.dashboard.title': 'Overview',
  'page.dashboard.subtitle': 'Aggregated view of records',

  // Navigation extras
  'nav.dashboard': 'Overview',

  // References
  'references.title': 'Source',
  'references.summary': 'Summary',
  'references.keyFindings': 'Key observations',
  'references.limitations': 'Known limitations',
  'references.userContext': 'Relation to your records',
  'references.disclaimer':
    'Educational information. Does not replace professional evaluation.',
  'references.notFound': 'Source not found',
  'references.notFoundDescription': 'The requested reference does not exist or has been removed.',
  'references.back': 'Back',
  'references.viewSource': 'View source',

  // Protocols
  'protocols.start': 'Start',
  'protocols.inProgress': 'In progress',
  'protocols.complete': 'Complete',
  'protocols.empty': 'No protocols available',
  'protocols.back': 'Back',
  'protocols.continue': 'Continue',
  'protocols.taskCompleted': 'Task recorded',

  // Therapy
  'therapy.status.active': 'Active',
  'therapy.status.inactive': 'Inactive',
  'therapy.activate': 'Enable sharing',
  'therapy.deactivate': 'Disable',
  'therapy.sharing.title': 'Shared data',
  'therapy.preview.title': 'Professional view',
  'therapy.consent.notice':
    'You control which data is shared. Nothing is sent without your authorization.',

  // Common
  'common.inDevelopment': 'In development',
  'common.loading': 'Loading',
  'common.error': 'An error occurred',
  'common.errorUnknown': 'Unknown error',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.confirm': 'Confirm',
  'common.settings': 'Settings',
  'common.theme': 'Theme',
  'common.theme.light': 'Light',
  'common.theme.dark': 'Dark',
  'common.theme.system': 'System',
  'common.openMenu': 'Open menu',

  // Feedback
  'feedback.empty': 'No records',
  'feedback.emptyPeriod': 'No records in this period.',
  'feedback.retry': 'Try again',
  'feedback.saved': 'Saved',
  'feedback.saveError': 'Could not save',
  'feedback.loadError': 'Could not load',
  'feedback.noData': 'Record when you prefer.',

  // Readings
  'readings.tabs.all': 'All',
  'readings.tabs.sleep': 'Sleep',
  'readings.tabs.stability': 'Stability',
  'readings.tabs.routine': 'Routine',
  'readings.tabs.consistency': 'Consistency',
  'readings.period.week': '7 days',
  'readings.period.month': '30 days',
  'readings.showHidden': 'View archived',
  'readings.empty.title': 'No readings in this category',
  'readings.empty.body': 'Try another category or period.',
  'readings.actions.useful': 'Useful',
  'readings.actions.notApplicable': 'Not applicable',
  'readings.actions.hide': 'Archive',
  'readings.meta.confidence': 'Confidence',
  'readings.meta.severity': 'Relevance',
  'readings.meta.source': 'Source',

  // Check-in
  'checkin.empty.title': 'No record',
  'checkin.empty.body': 'No record for this date.',
  'checkin.empty.cta': 'Record',

  // Journal
  'journal.sectionTitle': 'Notes',
  'journal.placeholder': 'Write your observations...',
};

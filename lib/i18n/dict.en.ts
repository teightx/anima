import type { Dictionary } from './types';

export const en: Partial<Dictionary> = {
  // Navigation
  'nav.today': 'Today',
  'nav.records': 'Records',
  'nav.observations': 'Observations',
  'nav.plans': 'Plans',
  'nav.settings': 'Settings',

  // Page: Today
  'page.today.title': 'Today',
  'page.today.subtitle': 'Daily record',

  // Page: Records (former History + Dashboard)
  'page.records.title': 'Records',
  'page.records.subtitle': 'Your accumulated records',

  // Page: Observations (former Readings)
  'page.observations.title': 'Observations',
  'page.observations.subtitle': 'Observations derived from your records',

  // Page: Plans (former Protocols)
  'page.plans.title': 'Plans',
  'page.plans.subtitle': 'Structured follow-ups',

  // Page: Settings (former Ânima)
  'page.settings.title': 'Settings',
  'page.settings.subtitle': 'Settings hub',

  // Day Context (former Journal)
  'dayContext.sectionTitle': 'Day context',
  'dayContext.placeholder': 'Add context about your day...',
  'dayContext.add': 'Add context',

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

  // Plans (former Protocols)
  'plans.start': 'Start',
  'plans.inProgress': 'In progress',
  'plans.complete': 'Complete',
  'plans.empty': 'No plans available',
  'plans.back': 'Back',
  'plans.continue': 'Continue',
  'plans.taskCompleted': 'Task recorded',
  'plans.disclaimer': 'Plans are support tools for follow-up. You can pause or end at any time.',

  // Sharing (former Therapy)
  'sharing.title': 'Share with professional',
  'sharing.status.active': 'Active',
  'sharing.status.inactive': 'Inactive',
  'sharing.activate': 'Enable sharing',
  'sharing.deactivate': 'Disable',
  'sharing.dataTitle': 'Shared data',
  'sharing.preview.title': 'Professional view',
  'sharing.consent.notice':
    'Nothing is shared automatically. You control exactly what will be visible.',

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

  // Observations (former Readings)
  'observations.tabs.all': 'All',
  'observations.tabs.sleep': 'Sleep',
  'observations.tabs.stability': 'Stability',
  'observations.tabs.routine': 'Routine',
  'observations.tabs.consistency': 'Consistency',
  'observations.period.week': '7 days',
  'observations.period.month': '30 days',
  'observations.showHidden': 'View archived',
  'observations.empty.title': 'No observations in this category',
  'observations.empty.body': 'Try another category or period.',
  'observations.actions.useful': 'Useful',
  'observations.actions.notApplicable': 'Not applicable',
  'observations.actions.hide': 'Archive',
  'observations.meta.confidence': 'Confidence',
  'observations.meta.severity': 'Relevance',
  'observations.meta.source': 'Source',
  'observations.disclaimer': 'Observations are descriptive and do not imply cause, diagnosis or recommendation.',

  // Check-in
  'checkin.empty.title': 'No record',
  'checkin.empty.body': 'No record for this date.',
  'checkin.empty.cta': 'Record',

  // Day Context (former Journal)
  'journal.sectionTitle': 'Day context',
  'journal.placeholder': 'Add context about your day...',
};

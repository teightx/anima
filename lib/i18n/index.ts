import { pt } from './dict.pt';
import { en } from './dict.en';
import type { Locale, DictionaryKey, Dictionary } from './types';

export type { Locale, DictionaryKey, Dictionary };

// ============================================================================
// Dictionaries
// ============================================================================

const dictionaries: Record<Locale, Dictionary | Partial<Dictionary>> = {
  pt,
  en,
};

// ============================================================================
// Helpers
// ============================================================================

/**
 * Get locale from search params or URL
 * @param searchParams - URLSearchParams or Record with lang key
 * @returns Locale ('pt' or 'en')
 */
export function getLangFromSearchParams(
  searchParams?: URLSearchParams | Record<string, string | string[] | undefined>
): Locale {
  if (!searchParams) return 'pt';

  let lang: string | undefined;

  if (searchParams instanceof URLSearchParams) {
    lang = searchParams.get('lang') ?? undefined;
  } else {
    const value = searchParams.lang;
    lang = Array.isArray(value) ? value[0] : value;
  }

  if (lang === 'en') return 'en';
  return 'pt';
}

/**
 * Translate a key to the specified locale
 * Falls back to PT if key not found in target locale
 * @param locale - Target locale
 * @param key - Dictionary key
 * @returns Translated string
 */
export function t(locale: Locale, key: DictionaryKey): string {
  const dict = dictionaries[locale];
  const value = dict[key];

  // If found in target locale, return it
  if (value !== undefined) {
    return value;
  }

  // Fallback to PT
  const fallback = pt[key];
  if (fallback !== undefined) {
    return fallback;
  }

  // If key not found anywhere, return the key itself
  return key;
}

/**
 * Create a bound translator for a specific locale
 * @param locale - Target locale
 * @returns Translator function
 */
export function createTranslator(locale: Locale) {
  return (key: DictionaryKey): string => t(locale, key);
}

/**
 * Get all available locales
 */
export function getAvailableLocales(): Locale[] {
  return ['pt', 'en'];
}

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locale === 'pt' || locale === 'en';
}

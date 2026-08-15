export type LanguageId = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ko' | 'pt' | 'it' | 'ru';

export const DEFAULT_LANGUAGE: LanguageId = 'en';

export const SUPPORTED_LANGUAGES: readonly LanguageId[] = [
  'en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'pt', 'it', 'ru'
] as const;

export function normalizeLanguageId(lang: string | null | undefined): LanguageId {
  if (!lang) return DEFAULT_LANGUAGE;
  const normalized = lang.toLowerCase() as LanguageId;
  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : DEFAULT_LANGUAGE;
}
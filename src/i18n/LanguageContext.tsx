import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Lang } from './translations';

const STORAGE_KEY = 'europhear_lang';

// Recursively replace all leaf types with string so all languages are compatible
type StringLeaves<T> = T extends readonly (infer U)[]
  ? StringLeaves<U>[]
  : T extends object
  ? { [K in keyof T]: StringLeaves<T[K]> }
  : string;

export type TranslationType = StringLeaves<typeof translations['en']>;

const PRIMARY_LANG: Lang = 'pt-PT';

const defaultLang: Lang = (() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && stored in translations) return stored;
    return PRIMARY_LANG;
  } catch {
    return PRIMARY_LANG;
  }
})();

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: defaultLang,
  setLang: () => {},
  t: translations[defaultLang] as unknown as TranslationType,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'pt-PT' ? 'pt-PT' : lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as unknown as TranslationType }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

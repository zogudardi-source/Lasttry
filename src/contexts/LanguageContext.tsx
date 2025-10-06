import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/constants';

type Language = 'de' | 'al';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.de) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'de',
  setLanguage: () => {},
  // Fix: The default `t` function was causing a type error because the inferred return type
  // of `key` was not strictly `string`. Using `String(key)` ensures the return type is correct.
  t: (key) => String(key),
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'de' || savedLang === 'al') ? savedLang : 'de';
  });

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const t = (key: keyof typeof translations.de): string => {
    return translations[language][key] || translations['de'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
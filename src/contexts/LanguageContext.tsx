
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Dashboard
    dashboard: 'Dashboard',
    calls: 'Calls',
    answeredCalls: 'Answered Calls',
    costs: 'Costs',
    callHistory: 'Call History',
    creditBalance: 'Credit Balance',
    available: 'Available',
    buyCredits: 'Buy Credits',
    current: 'Current',
    avgCallsPerDay: 'Avg',
    callsPerDay: 'calls per day',
    total: 'Total',
    callsUnit: 'Calls',
    
    // Months
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
    
    // Weekdays
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
    
    // Account Settings
    accountSettings: 'Account Settings',
    manageAccountPreferences: 'Manage your account preferences and billing information',
    profile: 'Profile',
    billing: 'Billing',
    notifications: 'Notifications',
    language: 'Language',
    selectLanguage: 'Select your preferred language',
    english: 'English',
    german: 'German',
    saveChanges: 'Save Changes',
    savePreferences: 'Save Preferences'
  },
  de: {
    // Dashboard
    dashboard: 'Dashboard',
    calls: 'Anrufe',
    answeredCalls: 'Beantwortete Anrufe',
    costs: 'Kosten',
    callHistory: 'Anrufverlauf',
    creditBalance: 'Guthaben',
    available: 'Verfügbar',
    buyCredits: 'Credits kaufen',
    current: 'Aktuell',
    avgCallsPerDay: 'Ø',
    callsPerDay: 'Anrufe pro Tag',
    total: 'Gesamt',
    callsUnit: 'Anrufe',
    
    // Months
    january: 'Januar',
    february: 'Februar',
    march: 'März',
    april: 'April',
    may: 'Mai',
    june: 'Juni',
    july: 'Juli',
    august: 'August',
    september: 'September',
    october: 'Oktober',
    november: 'November',
    december: 'Dezember',
    
    // Weekdays
    mon: 'Mo',
    tue: 'Di',
    wed: 'Mi',
    thu: 'Do',
    fri: 'Fr',
    sat: 'Sa',
    sun: 'So',
    
    // Account Settings
    accountSettings: 'Kontoeinstellungen',
    manageAccountPreferences: 'Verwalten Sie Ihre Kontopräferenzen und Rechnungsinformationen',
    profile: 'Profil',
    billing: 'Abrechnung',
    notifications: 'Benachrichtigungen',
    language: 'Sprache',
    selectLanguage: 'Wählen Sie Ihre bevorzugte Sprache',
    english: 'Englisch',
    german: 'Deutsch',
    saveChanges: 'Änderungen speichern',
    savePreferences: 'Einstellungen speichern'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

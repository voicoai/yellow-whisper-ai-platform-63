
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
    // Navigation
    dashboard: 'Dashboard',
    agents: 'Agents',
    knowledgeBases: 'Knowledge Bases',
    telephony: 'Telephony',
    callHistory: 'Call History',
    integrations: 'Integrations',
    team: 'Team',
    
    // Dashboard
    calls: 'Calls',
    answeredCalls: 'Answered Calls',
    costs: 'Costs',
    creditBalance: 'Credit Balance',
    available: 'Available',
    buyCredits: 'Buy Credits',
    current: 'Current',
    avgCallsPerDay: 'Avg',
    callsPerDay: 'calls per day',
    total: 'Total',
    callsUnit: 'Calls',
    
    // Agents Page
    aiAgents: 'AI Agents',
    manageVoiceAssistants: 'Manage your voice assistants and their configurations',
    aiAgentsOverview: 'AI Agents Overview',
    createAgent: 'Create Agent',
    agent: 'Agent',
    type: 'Type',
    phoneNumber: 'Phone Number',
    performance: 'Performance',
    languages: 'Languages',
    actions: 'Actions',
    inbound: 'Inbound',
    outbound: 'Outbound',
    view: 'View',
    editAgent: 'Edit Agent',
    configure: 'Configure',
    duplicate: 'Duplicate',
    delete: 'Delete',
    calls: 'calls',
    avg: 'avg',
    min: 'min',
    
    // Telephony Page
    phoneNumbers: 'Phone Numbers',
    manageTelephonyConfig: 'Manage your phone numbers and telephony configuration',
    manageNumbers: 'Manage Numbers',
    buyNumbers: 'Buy Numbers',
    connectSip: 'Connect SIP',
    yourPhoneNumbers: 'Your Phone Numbers',
    manageAssignNumbers: 'Manage and assign your provisioned numbers',
    searchNumbers: 'Search numbers...',
    provider: 'Provider',
    allProviders: 'All Providers',
    country: 'Country',
    assignedTo: 'Assigned To',
    status: 'Status',
    monthly: 'Monthly',
    active: 'Active',
    inactive: 'Inactive',
    unassigned: 'Unassigned',
    edit: 'Edit',
    monthlyTelephonyCost: 'Monthly Telephony Cost',
    totalActiveNumbers: 'Total for all active numbers',
    
    // Team Page
    teamManagement: 'Team Management',
    manageWorkspaceMembers: 'Manage your workspace members and their permissions to collaborate effectively on your AI voice assistant platform.',
    activeMembers: 'Active Members',
    pendingInvitations: 'Pending Invitations',
    inviteMember: 'Invite Member',
    workspaceMembers: 'Workspace Members',
    searchMembers: 'Search members...',
    allRoles: 'All Roles',
    member: 'Member',
    role: 'Role',
    dateAdded: 'Date Added',
    admin: 'Admin',
    manager: 'Manager',
    agent: 'Agent',
    invited: 'Invited',
    rolesAndPermissions: 'Roles and Permissions',
    fullAccess: 'Full Access',
    limitedAccess: 'Limited Access',
    basicAccess: 'Basic Access',
    
    // Integrations Page
    connectExternalServices: 'Connect your agent to external services',
    availableIntegrations: 'Available Integrations',
    createdIntegrations: 'Created Integrations',
    noIntegrationsCreated: 'No integrations created yet',
    createFirstIntegration: 'Create your first integration by selecting from the available integrations tab.',
    allowAgentsSchedule: 'Allow agents to schedule appointments',
    triggerAutomatedWorkflows: 'Trigger automated workflows',
    connectAutomationNodes: 'Connect to your automation nodes',
    sendDataExternalAPIs: 'Send data to external APIs',
    connect: 'Connect',
    
    // Agent Create/Detail Pages
    createNewAgent: 'Create New Agent',
    backToAgents: 'Back to Agents',
    configureNewAgent: 'Configure your new AI agent settings and behavior',
    editAgent: 'Edit Agent',
    configureAgent: 'Configure your AI agent settings and behavior',
    deleteAgent: 'Delete Agent',
    
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
    // Navigation
    dashboard: 'Dashboard',
    agents: 'Agenten',
    knowledgeBases: 'Wissensdatenbanken',
    telephony: 'Telefonie',
    callHistory: 'Anrufverlauf',
    integrations: 'Integrationen',
    team: 'Team',
    
    // Dashboard
    calls: 'Anrufe',
    answeredCalls: 'Beantwortete Anrufe',
    costs: 'Kosten',
    creditBalance: 'Guthaben',
    available: 'Verfügbar',
    buyCredits: 'Credits kaufen',
    current: 'Aktuell',
    avgCallsPerDay: 'Ø',
    callsPerDay: 'Anrufe pro Tag',
    total: 'Gesamt',
    callsUnit: 'Anrufe',
    
    // Agents Page
    aiAgents: 'KI-Agenten',
    manageVoiceAssistants: 'Verwalten Sie Ihre Sprachassistenten und deren Konfigurationen',
    aiAgentsOverview: 'KI-Agenten Übersicht',
    createAgent: 'Agent erstellen',
    agent: 'Agent',
    type: 'Typ',
    phoneNumber: 'Telefonnummer',
    performance: 'Leistung',
    languages: 'Sprachen',
    actions: 'Aktionen',
    inbound: 'Eingehend',
    outbound: 'Ausgehend',
    view: 'Anzeigen',
    editAgent: 'Agent bearbeiten',
    configure: 'Konfigurieren',
    duplicate: 'Duplizieren',
    delete: 'Löschen',
    calls: 'Anrufe',
    avg: 'Ø',
    min: 'Min',
    
    // Telephony Page
    phoneNumbers: 'Telefonnummern',
    manageTelephonyConfig: 'Verwalten Sie Ihre Telefonnummern und Telefonie-Konfiguration',
    manageNumbers: 'Nummern verwalten',
    buyNumbers: 'Nummern kaufen',
    connectSip: 'SIP verbinden',
    yourPhoneNumbers: 'Ihre Telefonnummern',
    manageAssignNumbers: 'Verwalten und zuweisen Ihrer bereitgestellten Nummern',
    searchNumbers: 'Nummern suchen...',
    provider: 'Anbieter',
    allProviders: 'Alle Anbieter',
    country: 'Land',
    assignedTo: 'Zugewiesen an',
    status: 'Status',
    monthly: 'Monatlich',
    active: 'Aktiv',
    inactive: 'Inaktiv',
    unassigned: 'Nicht zugewiesen',
    edit: 'Bearbeiten',
    monthlyTelephonyCost: 'Monatliche Telefoniekosten',
    totalActiveNumbers: 'Gesamt für alle aktiven Nummern',
    
    // Team Page
    teamManagement: 'Team-Verwaltung',
    manageWorkspaceMembers: 'Verwalten Sie Ihre Arbeitsbereich-Mitglieder und deren Berechtigungen für eine effektive Zusammenarbeit auf Ihrer KI-Sprachassistenten-Plattform.',
    activeMembers: 'Aktive Mitglieder',
    pendingInvitations: 'Ausstehende Einladungen',
    inviteMember: 'Mitglied einladen',
    workspaceMembers: 'Arbeitsbereich-Mitglieder',
    searchMembers: 'Mitglieder suchen...',
    allRoles: 'Alle Rollen',
    member: 'Mitglied',
    role: 'Rolle',
    dateAdded: 'Hinzugefügt am',
    admin: 'Administrator',
    manager: 'Manager',
    agent: 'Agent',
    invited: 'Eingeladen',
    rolesAndPermissions: 'Rollen und Berechtigungen',
    fullAccess: 'Vollzugriff',
    limitedAccess: 'Eingeschränkter Zugriff',
    basicAccess: 'Grundzugriff',
    
    // Integrations Page
    connectExternalServices: 'Verbinden Sie Ihren Agenten mit externen Diensten',
    availableIntegrations: 'Verfügbare Integrationen',
    createdIntegrations: 'Erstellte Integrationen',
    noIntegrationsCreated: 'Noch keine Integrationen erstellt',
    createFirstIntegration: 'Erstellen Sie Ihre erste Integration, indem Sie aus dem Tab der verfügbaren Integrationen auswählen.',
    allowAgentsSchedule: 'Agenten erlauben, Termine zu planen',
    triggerAutomatedWorkflows: 'Automatisierte Workflows auslösen',
    connectAutomationNodes: 'Mit Ihren Automatisierungsknoten verbinden',
    sendDataExternalAPIs: 'Daten an externe APIs senden',
    connect: 'Verbinden',
    
    // Agent Create/Detail Pages
    createNewAgent: 'Neuen Agent erstellen',
    backToAgents: 'Zurück zu Agenten',
    configureNewAgent: 'Konfigurieren Sie die Einstellungen und das Verhalten Ihres neuen KI-Agenten',
    editAgent: 'Agent bearbeiten',
    configureAgent: 'Konfigurieren Sie die Einstellungen und das Verhalten Ihres KI-Agenten',
    deleteAgent: 'Agent löschen',
    
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

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SettingsContextType {
  theme: "light" | "dark" | "system";
  fontSize: "small" | "medium" | "large";
  language: "en" | "es" | "fr" | "ar";
  notifications: {
    posts: boolean;
    comments: boolean;
    mentions: boolean;
  };
  privacy: {
    showProfile: boolean;
    allowMessages: boolean;
    showActivity: boolean;
  };
  setTheme: (theme: "light" | "dark" | "system") => void;
  setFontSize: (size: "small" | "medium" | "large") => void;
  setLanguage: (lang: "en" | "es" | "fr" | "ar") => void;
  updateNotifications: (notifications: Partial<SettingsContextType["notifications"]>) => void;
  updatePrivacy: (privacy: Partial<SettingsContextType["privacy"]>) => void;
  resetSettings: () => void;
}

const defaultSettings: Omit<SettingsContextType, "setTheme" | "setFontSize" | "setLanguage" | "updateNotifications" | "updatePrivacy" | "resetSettings"> = {
  theme: "system",
  fontSize: "medium",
  language: "en",
  notifications: {
    posts: true,
    comments: true,
    mentions: true,
  },
  privacy: {
    showProfile: true,
    allowMessages: true,
    showActivity: false,
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">(defaultSettings.theme);
  const [fontSize, setFontSizeState] = useState<"small" | "medium" | "large">(defaultSettings.fontSize);
  const [language, setLanguageState] = useState<"en" | "es" | "fr" | "ar">(defaultSettings.language);
  const [notifications, setNotifications] = useState(defaultSettings.notifications);
  const [privacy, setPrivacy] = useState(defaultSettings.privacy);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("voicesOfChangeSettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setThemeState(parsed.theme || defaultSettings.theme);
        setFontSizeState(parsed.fontSize || defaultSettings.fontSize);
        setLanguageState(parsed.language || defaultSettings.language);
        setNotifications(parsed.notifications || defaultSettings.notifications);
        setPrivacy(parsed.privacy || defaultSettings.privacy);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      theme,
      fontSize,
      language,
      notifications,
      privacy,
    };
    localStorage.setItem("voicesOfChangeSettings", JSON.stringify(settings));
  }, [theme, fontSize, language, notifications, privacy]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const effectiveTheme = theme === "system" ? systemTheme : theme;
    
    if (effectiveTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("text-sm", "text-base", "text-lg");
    
    switch (fontSize) {
      case "small":
        root.classList.add("text-sm");
        break;
      case "large":
        root.classList.add("text-lg");
        break;
      default:
        root.classList.add("text-base");
    }
  }, [fontSize]);

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    setThemeState(newTheme);
  };

  const setFontSize = (size: "small" | "medium" | "large") => {
    setFontSizeState(size);
  };

  const setLanguage = (lang: "en" | "es" | "fr" | "ar") => {
    setLanguageState(lang);
  };

  const updateNotifications = (newNotifications: Partial<SettingsContextType["notifications"]>) => {
    setNotifications(prev => ({ ...prev, ...newNotifications }));
  };

  const updatePrivacy = (newPrivacy: Partial<SettingsContextType["privacy"]>) => {
    setPrivacy(prev => ({ ...prev, ...newPrivacy }));
  };

  const resetSettings = () => {
    setThemeState(defaultSettings.theme);
    setFontSizeState(defaultSettings.fontSize);
    setLanguageState(defaultSettings.language);
    setNotifications(defaultSettings.notifications);
    setPrivacy(defaultSettings.privacy);
    localStorage.removeItem("voicesOfChangeSettings");
  };

  const value: SettingsContextType = {
    theme,
    fontSize,
    language,
    notifications,
    privacy,
    setTheme,
    setFontSize,
    setLanguage,
    updateNotifications,
    updatePrivacy,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
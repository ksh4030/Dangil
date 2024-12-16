import React, { createContext, useContext, useState } from 'react';

export type TabName = 'Calendar' | 'Diary' | 'Mypage';
interface NavigationContextType {
  currentTab: TabName;
  setCurrentTab: (tabName: TabName) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<TabName>('Calendar');

  return <NavigationContext.Provider value={{ currentTab, setCurrentTab }}>{children}</NavigationContext.Provider>;
};

export const useNavigationState = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

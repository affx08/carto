import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('carto-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [accentColor, setAccentColor] = useState(() => {
    const saved = localStorage.getItem('carto-accent-color');
    return saved || '#FF6B35'; // Steam-like orange
  });

  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('carto-currency');
    return saved || 'INR';
  });

  useEffect(() => {
    localStorage.setItem('carto-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('carto-accent-color', accentColor);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem('carto-currency', currency);
  }, [currency]);

  // Enhanced theme colors with glassmorphic effects
  const themeColors = useMemo(() => ({
    light: {
      background: '#f8f9fa',
      surface: '#ffffff',
      primary: '#1a1a1a',
      secondary: '#666666',
      accent: accentColor,
      border: 'rgba(224, 224, 224, 0.6)',
      card: 'rgba(255, 255, 255, 0.7)',
      text: '#1a1a1a',
      textSecondary: '#666666',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      gradient: `linear-gradient(135deg, rgba(248, 249, 250, 0.9) 0%, rgba(233, 236, 239, 0.9) 100%)`,
      shadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      shadowHover: '0 12px 40px rgba(0, 0, 0, 0.15)',
      glass: 'rgba(255, 255, 255, 0.25)',
      glassHover: 'rgba(255, 255, 255, 0.35)',
      glassBorder: 'rgba(255, 255, 255, 0.18)',
      accentAlpha: `${accentColor}20`,
      meshGradient: ''
    },
    dark: {
      background: '#0d1117',
      surface: '#161b22',
      primary: '#ffffff',
      secondary: '#8b949e',
      accent: accentColor,
      border: 'rgba(48, 54, 61, 0.6)',
      card: 'rgba(22, 27, 34, 0.7)',
      text: '#ffffff',
      textSecondary: '#8b949e',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      gradient: `linear-gradient(135deg, rgba(13, 17, 23, 0.9) 0%, rgba(22, 27, 34, 0.9) 100%)`,
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      shadowHover: '0 12px 40px rgba(0, 0, 0, 0.4)',
      glass: 'rgba(22, 27, 34, 0.25)',
      glassHover: 'rgba(22, 27, 34, 0.35)',
      glassBorder: 'rgba(48, 54, 61, 0.3)',
      accentAlpha: `${accentColor}20`,
      meshGradient: ''
    }
  }), [darkMode, accentColor]);

  const currentTheme = darkMode ? themeColors.dark : themeColors.light;

  // Apply theme to document with performance optimizations
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Batch DOM updates for better performance
    const updates = () => {
      // Apply CSS variables
      root.style.setProperty('--theme-background', currentTheme.background);
      root.style.setProperty('--theme-surface', currentTheme.surface);
      root.style.setProperty('--theme-primary', currentTheme.primary);
      root.style.setProperty('--theme-secondary', currentTheme.secondary);
      root.style.setProperty('--theme-accent', currentTheme.accent);
      root.style.setProperty('--theme-border', currentTheme.border);
      root.style.setProperty('--theme-card', currentTheme.card);
      root.style.setProperty('--theme-text', currentTheme.text);
      root.style.setProperty('--theme-text-secondary', currentTheme.textSecondary);
      root.style.setProperty('--theme-success', currentTheme.success);
      root.style.setProperty('--theme-warning', currentTheme.warning);
      root.style.setProperty('--theme-error', currentTheme.error);
      root.style.setProperty('--theme-gradient', currentTheme.gradient);
      root.style.setProperty('--theme-shadow', currentTheme.shadow);
      root.style.setProperty('--theme-shadow-hover', currentTheme.shadowHover);
      root.style.setProperty('--theme-glass', currentTheme.glass);
      root.style.setProperty('--theme-glass-hover', currentTheme.glassHover);
      root.style.setProperty('--theme-glass-border', currentTheme.glassBorder);
      root.style.setProperty('--theme-accent-alpha', currentTheme.accentAlpha);
      root.style.setProperty('--theme-mesh-gradient', currentTheme.meshGradient);
      
      // Apply theme attributes
      root.setAttribute('data-theme', darkMode ? 'dark' : 'light');
      
      // Apply background to body
      body.style.background = currentTheme.background;
      body.style.color = currentTheme.text;
    };

    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(updates);
    
    // Update Electron title bar theme
    if (window.electronAPI && window.electronAPI.updateTitleBarTheme) {
      window.electronAPI.updateTitleBarTheme({
        isDark: darkMode,
        accentColor: accentColor
      });
    }
  }, [darkMode, currentTheme, accentColor]);

  // Currency symbol mapping
  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    CHF: 'CHF',
    CNY: '¥',
    KRW: '₩'
  };

  const currentCurrencySymbol = currencySymbols[currency] || '$';

  const formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  const value = {
    darkMode,
    setDarkMode,
    accentColor,
    setAccentColor,
    currency,
    setCurrency,
    formatCurrency,
    currencySymbol: currentCurrencySymbol,
    theme: currentTheme,
    colors: themeColors
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 
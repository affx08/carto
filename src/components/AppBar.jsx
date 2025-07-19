import React, { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { GlassButton } from './ui/GlassButton';

// Icons
const Icons = {
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9,22 9,12 15,12 15,22"></polyline>
    </svg>
  ),
  Analytics: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  Sun: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  ),
  Moon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ),
};

const AppBar = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, setDarkMode, theme, currencySymbol } = useTheme();

  const navItems = [
    { path: '/', label: 'Home', icon: Icons.Home },
    { path: '/analytics', label: 'Analytics', icon: Icons.Analytics },
    { path: '/settings', label: 'Settings', icon: Icons.Settings },
  ];

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        background: theme.glass,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: `1px solid ${theme.glassBorder}`,
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: theme.shadow
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '1rem'
      }}>
        {/* Logo */}
        <motion.div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }} 
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}80)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: '0.5rem',
            boxShadow: `0 4px 16px ${theme.accent}40`
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {/* Shopping Cart */}
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              {/* Coin overlay */}
              <circle cx="18" cy="8" r="2" fill="currentColor" opacity="0.8"></circle>
              <text x="18" y="10" textAnchor="middle" fontSize="3" fill="white" fontWeight="bold">{currencySymbol}</text>
            </svg>
          </div>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: theme.text,
            textShadow: `0 2px 4px ${theme.accent}20`
          }}>
          Carto
          </span>
        </motion.div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <GlassButton
                  onClick={() => navigate(item.path)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: isActive ? theme.accent : 'transparent',
                    color: isActive ? 'white' : theme.text,
                    border: isActive ? 'none' : `1px solid ${theme.glassBorder}`,
                    fontWeight: isActive ? 'bold' : 'normal',
                    boxShadow: isActive ? `0 4px 16px ${theme.accent}40` : 'none',
                    backdropFilter: isActive ? 'blur(20px) saturate(180%)' : 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: isActive ? 'blur(20px) saturate(180%)' : 'blur(20px) saturate(180%)'
                  }}
                >
                  <item.icon />
                  <span style={{ marginLeft: '0.5rem' }}>{item.label}</span>
                </GlassButton>
              </motion.div>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <motion.div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <GlassButton
            onClick={() => {
              console.log('Toggling dark mode from:', darkMode, 'to:', !darkMode);
              setDarkMode(!darkMode);
            }}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              padding: 0,
              background: 'transparent',
              border: `1px solid ${theme.glassBorder}`,
              color: theme.text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)'
            }}
          >
            {darkMode ? <Icons.Sun /> : <Icons.Moon />}
          </GlassButton>
        </motion.div>
      </div>
    </motion.div>
  );
});

AppBar.displayName = 'AppBar';

export default AppBar; 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { GlassCard } from './ui/GlassCard';
import { GlassButton } from './ui/GlassButton';

// Icons
const Icons = {
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7,10 12,15 17,10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  Upload: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17,8 12,3 7,8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
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
  Palette: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="13.5" cy="6.5" r=".5"></circle>
      <circle cx="17.5" cy="10.5" r=".5"></circle>
      <circle cx="8.5" cy="7.5" r=".5"></circle>
      <circle cx="6.5" cy="12.5" r=".5"></circle>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
    </svg>
  ),
  Key: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"></path>
    </svg>
  ),
};

function SettingsPage() {
  const { darkMode, setDarkMode, theme, accentColor, setAccentColor, currency, setCurrency, formatCurrency } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for global cursor effects
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const accentColors = [
    { name: 'Steam Orange', color: '#FF6B35' },
    { name: 'Purple', color: '#a855f7' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Green', color: '#22c55e' },
    { name: 'Orange', color: '#f97316' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Fuchsia', color: '#FF0053' },
    { name: 'Red', color: '#ef4444' },
    { name: 'Yellow', color: '#eab308' },
    { name: 'Teal', color: '#14b8a6' },
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Cyan', color: '#06b6d4' },
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  ];

  const handleExport = () => {
      const data = {
      products: JSON.parse(localStorage.getItem('carto-products') || '[]'),
      accentColor: localStorage.getItem('carto-accent-color') || '#FF6B35',
      darkMode: localStorage.getItem('carto-dark-mode') || 'false',
      currency: localStorage.getItem('carto-currency') || 'INR',
        exportDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
    a.download = `carto-backup-${new Date().toISOString().split('T')[0]}.carto`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.carto,.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.products) {
              localStorage.setItem('carto-products', JSON.stringify(data.products));
            }
            if (data.accentColor) {
              localStorage.setItem('carto-accent-color', data.accentColor);
              setAccentColor(data.accentColor);
            }
            if (data.darkMode) {
              localStorage.setItem('carto-dark-mode', data.darkMode);
              setDarkMode(JSON.parse(data.darkMode));
            }
            if (data.currency) {
              localStorage.setItem('carto-currency', data.currency);
              setCurrency(data.currency);
            }
            alert('Data imported successfully! Please refresh the page.');
        } catch (error) {
            alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleApiSetup = () => {
    // Clear the API onboarding completion flag to show it again
    localStorage.removeItem('carto-api-onboarding-completed');
    window.location.reload();
  };

  // Animated background with cursor tracking
  const backgroundStyle = {
    background: theme.background,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div style={backgroundStyle}>
      {/* Animated background elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.accent}10 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.accent}10 0%, transparent 50%)`,
        }}
        transition={{ duration: 0.1 }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: theme.text,
              textAlign: 'center'
            }}>
        Settings
            </h1>

            <div style={{ display: 'grid', gap: '2rem' }}>
              
              {/* Appearance Settings */}
              <GlassCard>
                <div style={{ padding: '2rem' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: theme.text
                  }}>
                    <Icons.Palette />
                    <span style={{ marginLeft: '0.5rem' }}>Appearance</span>
                  </h2>

                  {/* Dark Mode Toggle */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: theme.surface,
                    borderRadius: '12px',
                    border: `1px solid ${theme.border}`
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: theme.text,
                        marginBottom: '0.25rem'
                      }}>
                  Dark Mode
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: theme.textSecondary
                      }}>
                        Switch between light and dark themes
                      </p>
                    </div>
                    <GlassButton
                      onClick={() => setDarkMode(!darkMode)}
                      style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        padding: 0,
                        background: 'transparent',
                        border: `2px solid ${theme.border}`,
                        color: theme.text
                      }}
                    >
                      {darkMode ? <Icons.Sun /> : <Icons.Moon />}
                    </GlassButton>
                  </div>

                  {/* Accent Color Selection */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: theme.text,
                      marginBottom: '1rem'
                    }}>
                      Accent Color
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
                      gap: '0.75rem'
                    }}>
                      {accentColors.map((colorOption) => (
                        <button
                          key={colorOption.color}
                          onClick={() => setAccentColor(colorOption.color)}
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            background: colorOption.color,
                            border: accentColor === colorOption.color ? `3px solid ${theme.text}` : `2px solid ${theme.border}`,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            transition: 'all 0.2s ease'
                          }}
                          title={colorOption.name}
                        >
                          {accentColor === colorOption.color && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Currency Selection */}
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: theme.text,
                      marginBottom: '1rem'
                    }}>
                      Currency
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                      gap: '0.75rem'
                    }}>
                      {currencies.map((currencyOption) => (
                        <button
                          key={currencyOption.code}
                          onClick={() => setCurrency(currencyOption.code)}
                          style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            background: currency === currencyOption.code ? theme.accent : theme.surface,
                            border: `2px solid ${currency === currencyOption.code ? theme.accent : theme.border}`,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: currency === currencyOption.code ? 'white' : theme.text,
                            transition: 'all 0.2s ease'
                          }}
                          title={`${currencyOption.name} (${currencyOption.code})`}
                        >
                          <span style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold'
                          }}>
                            {currencyOption.symbol}
                          </span>
                          <span style={{
                            fontSize: '0.8rem',
                            fontWeight: '500'
                          }}>
                            {currencyOption.code}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      background: theme.surface,
                      borderRadius: '8px',
                      border: `1px solid ${theme.border}`
                    }}>
                      <p style={{
                        fontSize: '0.9rem',
                        color: theme.textSecondary,
                        lineHeight: '1.5'
                      }}>
                        Preview: {formatCurrency(99.99)} - This will be used for all price displays in the app.
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>

        {/* Data Management */}
              <GlassCard>
                <div style={{ padding: '2rem' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: theme.text
                  }}>
              Data Management
                  </h2>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    <GlassButton
                onClick={handleExport}
                      icon={<Icons.Download />}
                fullWidth
              >
                Export Data
                    </GlassButton>
                    
                    <GlassButton
                onClick={handleImport}
                      icon={<Icons.Upload />}
                fullWidth
              >
                Import Data
                    </GlassButton>
                  </div>
                </div>
              </GlassCard>

              {/* API Configuration */}
              <GlassCard>
                <div style={{ padding: '2rem' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: theme.text
                  }}>
                    <Icons.Key />
                    <span style={{ marginLeft: '0.5rem' }}>API Configuration</span>
                  </h2>
                  
                  <p style={{ 
                    marginBottom: '1.5rem', 
                    color: theme.textSecondary, 
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    Configure API keys for automatic product data fetching and price tracking from Amazon and Flipkart.
                  </p>
                  
                  <GlassButton 
                    onClick={handleApiSetup} 
                    style={{ 
                      background: theme.accent, 
                      color: 'white',
                      padding: '1rem 2rem'
                    }}
                  >
                    <Icons.Key />
                    Configure API Keys
                  </GlassButton>
                </div>
              </GlassCard>

              {/* App Info */}
              <GlassCard>
                <div style={{ padding: '2rem' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: theme.text
                  }}>
              About Carto
                  </h2>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem 0',
                      borderBottom: `1px solid ${theme.border}`
                    }}>
                      <span style={{
                        color: theme.textSecondary
                      }}>
                        Version
                      </span>
                      <span style={{
                        fontWeight: 'bold',
                        color: theme.text
                      }}>
                        1.0.0
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem 0',
                      borderBottom: `1px solid ${theme.border}`
                    }}>
                      <span style={{
                        color: theme.textSecondary
                      }}>
                        Products
                      </span>
                      <span style={{
                        fontWeight: 'bold',
                        color: theme.text
                      }}>
                        {JSON.parse(localStorage.getItem('carto-products') || '[]').length}
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem 0'
                    }}>
                      <span style={{
                        color: theme.textSecondary
                      }}>
                        Last Updated
                      </span>
                      <span style={{
                        fontWeight: 'bold',
                        color: theme.text
                      }}>
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SettingsPage; 
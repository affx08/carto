import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { GlassCard } from './ui/GlassCard';
import { GlassButton } from './ui/GlassButton';

// Icons
const Icons = {
  Cart: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  ),
  Trending: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
    </svg>
  ),
  Analytics: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  Notifications: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
    </svg>
  ),
  Settings: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22,4 12,14.01 9,11.01"></polyline>
    </svg>
  ),
  Star: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
    </svg>
  ),
};

const steps = [
  'Welcome',
  'Notifications',
  'Features',
  'Get Started'
];

function OnboardingDialog({ open, onComplete }) {
  const { darkMode } = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [notifications, setNotifications] = useState(true);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Save preferences
      localStorage.setItem('notifications', JSON.stringify(notifications));
      onComplete();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    onComplete();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', padding: '2rem 0' }}
          >
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '2rem', 
              color: darkMode ? 'white' : '#1a1a1a',
              opacity: 0.8
            }}>
              <Icons.Cart />
            </div>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: darkMode ? 'white' : '#1a1a1a'
            }}>
              Welcome to Carto!
            </div>
            <div style={{ 
              fontSize: '1.1rem', 
              opacity: 0.8,
              lineHeight: '1.6',
              maxWidth: '400px',
              margin: '0 auto',
              color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'
            }}>
              Your personal e-commerce cart and price tracker for Windows 11.
              Let's get you set up in just a few steps.
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ padding: '2rem 0' }}
          >
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: darkMode ? 'white' : '#1a1a1a'
            }}>
              Notifications
            </div>
            <div style={{ 
              fontSize: '1rem', 
              marginBottom: '2rem',
              opacity: 0.8,
              color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'
            }}>
              Stay informed about price drops and important updates.
            </div>
            
            <GlassCard theme={darkMode ? 'dark' : 'light'} style={{ marginBottom: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
                color: darkMode ? 'white' : '#1a1a1a'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    Enable desktop notifications
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    Get alerts for price drops and reminders
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '3rem', height: '1.5rem' }}>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: notifications ? '#667eea' : '#ccc',
                    transition: '0.4s',
                    borderRadius: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.125rem'
                  }}>
                    <span style={{
                      height: '1.25rem',
                      width: '1.25rem',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      transition: '0.4s',
                      transform: notifications ? 'translateX(1.5rem)' : 'translateX(0)'
                    }} />
                  </span>
                </label>
              </div>
            </GlassCard>
            
            <div style={{ 
              fontSize: '0.875rem', 
              opacity: 0.7,
              color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
            }}>
              You can manage notification preferences in settings later.
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ padding: '2rem 0' }}
          >
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: darkMode ? 'white' : '#1a1a1a'
            }}>
              Key Features
            </div>
            <div style={{ 
              fontSize: '1rem', 
              marginBottom: '2rem',
              opacity: 0.8,
              color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'
            }}>
              Here's what Carto can do for you:
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: <Icons.Cart />, title: 'Product Management', desc: 'Add, edit, and organize your shopping items' },
                { icon: <Icons.Trending />, title: 'Price Tracking', desc: 'Monitor price changes with detailed history' },
                { icon: <Icons.Analytics />, title: 'Analytics Dashboard', desc: 'Visual insights into your shopping patterns' },
                { icon: <Icons.Notifications />, title: 'Smart Notifications', desc: 'Get alerts for price drops and reminders' },
                { icon: <Icons.Settings />, title: 'Data Management', desc: 'Export and import your data safely' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard theme={darkMode ? 'dark' : 'light'}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem',
                      padding: '1rem 1.5rem',
                      color: darkMode ? 'white' : '#1a1a1a'
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem',
                        opacity: 0.8
                      }}>
                        {feature.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                          {feature.title}
                        </div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', padding: '2rem 0' }}
          >
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '2rem', 
              color: '#22c55e',
              opacity: 0.8
            }}>
              <Icons.CheckCircle />
            </div>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: darkMode ? 'white' : '#1a1a1a'
            }}>
              You're All Set!
            </div>
            <div style={{ 
              fontSize: '1.1rem', 
              marginBottom: '2rem',
              opacity: 0.8,
              lineHeight: '1.6',
              maxWidth: '400px',
              margin: '0 auto 2rem',
              color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'
            }}>
              Carto is ready to help you track your shopping items and prices.
              Start by adding your first product!
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '0.5rem'
            }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: star * 0.1 }}
                  style={{ color: '#f59e0b' }}
                >
                  <Icons.Star />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '2rem'
      }}
    >
      <GlassCard 
        theme={darkMode ? 'dark' : 'light'}
        style={{
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '2rem 2rem 1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: darkMode ? 'white' : '#1a1a1a',
            marginBottom: '1.5rem'
          }}>
            Welcome to Carto
          </div>
          
          {/* Progress Steps */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {steps.map((step, index) => (
              <div key={step} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: index <= activeStep ? '#667eea' : 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  {index < activeStep ? '✓' : index + 1}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  textAlign: 'center'
                }}>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div style={{
          padding: '0 2rem',
          overflowY: 'auto',
          maxHeight: '50vh'
        }}>
          {renderStepContent(activeStep)}
        </div>
        
        {/* Actions */}
        <div style={{
          padding: '1.5rem 2rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <GlassButton
            onClick={handleSkip}
            theme={darkMode ? 'dark' : 'light'}
            size="small"
          >
            Skip
          </GlassButton>
          
          <div style={{ flex: 1 }} />
          
          {activeStep > 0 && (
            <GlassButton
              onClick={handleBack}
              theme={darkMode ? 'dark' : 'light'}
              size="small"
            >
              Back
            </GlassButton>
          )}
          
          <GlassButton
            onClick={handleNext}
            theme={darkMode ? 'dark' : 'light'}
            size="small"
          >
            {activeStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </GlassButton>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default OnboardingDialog; 
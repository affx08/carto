import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { GlassCard } from './ui/GlassCard';
import { GlassButton } from './ui/GlassButton';

// Icons
const Icons = {
  Key: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"></path>
    </svg>
  ),
  Shopping: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  CheckCircle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22,4 12,14.01 9,11.01"></polyline>
    </svg>
  ),
  ExternalLink: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15,3 21,3 21,9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  ),
  Copy: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12,5 19,12 12,19"></polyline>
    </svg>
  ),
};

const steps = [
  'Welcome',
  'E-commerce API Setup',
  'Price Tracking API Setup',
  'Complete'
];

const ecommerceApiSteps = [
  {
    title: "1. Visit ScrapingBee",
    description: "Go to ScrapingBee website for easy API key setup",
    url: "https://www.scrapingbee.com/",
    action: "Visit Website"
  },
  {
    title: "2. Quick Sign Up",
    description: "Sign up with email only - no credit card required",
    url: "https://www.scrapingbee.com/register",
    action: "Sign Up"
  },
  {
    title: "3. Get Your API Key",
    description: "Copy your API key from the dashboard (1000 free requests)",
    url: "https://app.scrapingbee.com/dashboard",
    action: "Get API Key"
  }
];

const priceTrackingApiSteps = [
  {
    title: "1. Visit PriceAPI",
    description: "Go to PriceAPI website for free price tracking",
    url: "https://priceapi.com/",
    action: "Visit Website"
  },
  {
    title: "2. Quick Sign Up",
    description: "Sign up with email - 1000 free requests per month",
    url: "https://priceapi.com/signup",
    action: "Sign Up"
  },
  {
    title: "3. Get Your API Key",
    description: "Copy your API key from the dashboard",
    url: "https://priceapi.com/dashboard",
    action: "Get API Key"
  }
];

function ApiOnboardingDialog({ open, onComplete }) {
  const { theme } = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [ecommerceApiKey, setEcommerceApiKey] = useState('');
  const [priceTrackingApiKey, setPriceTrackingApiKey] = useState('');
  const [ecommerceApiKeyValid, setEcommerceApiKeyValid] = useState(false);
  const [priceTrackingApiKeyValid, setPriceTrackingApiKeyValid] = useState(false);

  // Load existing API keys if they exist
  useEffect(() => {
    const savedEcommerceKey = localStorage.getItem('carto-ecommerce-api-key');
    const savedPriceTrackingKey = localStorage.getItem('carto-price-tracking-api-key');
    
    if (savedEcommerceKey) {
      setEcommerceApiKey(savedEcommerceKey);
      setEcommerceApiKeyValid(true);
    }
    
    if (savedPriceTrackingKey) {
      setPriceTrackingApiKey(savedPriceTrackingKey);
      setPriceTrackingApiKeyValid(true);
    }
  }, []);

  const openExternalLink = (url) => {
    if (window.electronAPI && window.electronAPI.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const validateEcommerceApiKey = async () => {
    if (!ecommerceApiKey.trim()) return;
    
    try {
      console.log('Testing ScrapingBee API key...');
      
      // Test the API key with a simple request to a test page
      const response = await fetch(`https://app.scrapingbee.com/api/v1/?api_key=${ecommerceApiKey}&url=https://httpbin.org/html&render_js=false`);
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        console.log('API key is valid!');
        setEcommerceApiKeyValid(true);
        localStorage.setItem('carto-ecommerce-api-key', ecommerceApiKey);
      } else {
        console.log('API key validation failed');
        setEcommerceApiKeyValid(false);
      }
    } catch (error) {
      console.error('API validation error:', error);
      setEcommerceApiKeyValid(false);
    }
  };

  const validatePriceTrackingApiKey = async () => {
    if (!priceTrackingApiKey.trim()) return;
    
    try {
      console.log('Testing PriceAPI key...');
      
      // Test the API key with a simple request
      const response = await fetch(`https://api.priceapi.com/v2/jobs?token=${priceTrackingApiKey}&source=amazon&country=us&topic=search&key=test`);
      
      console.log('PriceAPI response status:', response.status);
      
      if (response.ok) {
        console.log('PriceAPI key is valid!');
        setPriceTrackingApiKeyValid(true);
        localStorage.setItem('carto-price-tracking-api-key', priceTrackingApiKey);
      } else {
        console.log('PriceAPI key validation failed');
        setPriceTrackingApiKeyValid(false);
      }
    } catch (error) {
      console.error('PriceAPI validation error:', error);
      setPriceTrackingApiKeyValid(false);
    }
  };

  const handleComplete = () => {
    // Save API keys to localStorage
    if (ecommerceApiKey) {
      localStorage.setItem('carto-ecommerce-api-key', ecommerceApiKey);
    }
    if (priceTrackingApiKey) {
      localStorage.setItem('carto-price-tracking-api-key', priceTrackingApiKey);
    }
    
    // Mark onboarding as completed
    localStorage.setItem('carto-api-onboarding-completed', 'true');
    
    onComplete();
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: theme.accent }}>
              <Icons.Key />
            </div>
            <h2 style={{ marginBottom: '1rem', color: theme.text }}>API Setup Required</h2>
            <p style={{ marginBottom: '2rem', color: theme.textSecondary, lineHeight: '1.6' }}>
              To enable automatic product data fetching and price tracking, you'll need to set up two free API keys.
              This is a one-time setup process.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ 
                background: theme.surface, 
                padding: '1rem', 
                borderRadius: '12px', 
                border: `1px solid ${theme.border}`,
                textAlign: 'center',
                flex: 1,
                maxWidth: '200px'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: theme.accent }}>
                  <Icons.Shopping />
                </div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: theme.text }}>E-commerce API</h4>
                <p style={{ fontSize: '0.875rem', margin: 0, color: theme.textSecondary }}>
                  For product details & images
                </p>
              </div>
              <div style={{ 
                background: theme.surface, 
                padding: '1rem', 
                borderRadius: '12px', 
                border: `1px solid ${theme.border}`,
                textAlign: 'center',
                flex: 1,
                maxWidth: '200px'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: theme.accent }}>
                  <Icons.Trending />
                </div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: theme.text }}>Price Tracking API</h4>
                <p style={{ fontSize: '0.875rem', margin: 0, color: theme.textSecondary }}>
                  For price history & alerts
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: theme.accent }}>
                <Icons.Shopping />
              </div>
              <h2 style={{ marginBottom: '0.5rem', color: theme.text }}>E-commerce API Setup</h2>
              <p style={{ color: theme.textSecondary }}>
                We'll use ScrapingBee to fetch product details from Amazon and Flipkart
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              {ecommerceApiSteps.map((step, index) => (
                <div key={index} style={{
                  background: theme.surface,
                  padding: '1rem',
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`,
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: theme.accent,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: theme.text }}>{step.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: theme.textSecondary }}>{step.description}</p>
                  </div>
                  <GlassButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openExternalLink(step.url);
                    }}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {step.action}
                    <Icons.ExternalLink />
                  </GlassButton>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.text, fontWeight: '500' }}>
                Paste your ScrapingBee API Key:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="password"
                  value={ecommerceApiKey}
                  onChange={(e) => setEcommerceApiKey(e.target.value)}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${ecommerceApiKeyValid ? '#22c55e' : theme.border}`,
                    background: theme.surface,
                    color: theme.text,
                    fontSize: '0.875rem'
                  }}
                />
                <GlassButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    validateEcommerceApiKey();
                  }}
                  disabled={!ecommerceApiKey.trim()}
                  style={{
                    background: ecommerceApiKeyValid ? '#22c55e' : theme.accent,
                    color: 'white'
                  }}
                >
                  {ecommerceApiKeyValid ? <Icons.CheckCircle /> : 'Test'}
                </GlassButton>
              </div>
              {ecommerceApiKeyValid && (
                <p style={{ margin: '0.5rem 0 0 0', color: '#22c55e', fontSize: '0.875rem' }}>
                  ✓ API key is valid and working!
                </p>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: theme.accent }}>
                <Icons.Trending />
              </div>
              <h2 style={{ marginBottom: '0.5rem', color: theme.text }}>Price Tracking API Setup</h2>
              <p style={{ color: theme.textSecondary }}>
                We'll use PriceAPI to track price history for Amazon and Flipkart
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              {priceTrackingApiSteps.map((step, index) => (
                <div key={index} style={{
                  background: theme.surface,
                  padding: '1rem',
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`,
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: theme.accent,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: theme.text }}>{step.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: theme.textSecondary }}>{step.description}</p>
                  </div>
                  <GlassButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openExternalLink(step.url);
                    }}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {step.action}
                    <Icons.ExternalLink />
                  </GlassButton>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: theme.text, fontWeight: '500' }}>
                Paste your PriceAPI Key:
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="password"
                  value={priceTrackingApiKey}
                  onChange={(e) => setPriceTrackingApiKey(e.target.value)}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: `1px solid ${priceTrackingApiKeyValid ? '#22c55e' : theme.border}`,
                    background: theme.surface,
                    color: theme.text,
                    fontSize: '0.875rem'
                  }}
                />
                <GlassButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    validatePriceTrackingApiKey();
                  }}
                  disabled={!priceTrackingApiKey.trim()}
                  style={{
                    background: priceTrackingApiKeyValid ? '#22c55e' : theme.accent,
                    color: 'white'
                  }}
                >
                  {priceTrackingApiKeyValid ? <Icons.CheckCircle /> : 'Test'}
                </GlassButton>
              </div>
              {priceTrackingApiKeyValid && (
                <p style={{ margin: '0.5rem 0 0 0', color: '#22c55e', fontSize: '0.875rem' }}>
                  ✓ API key is valid and working!
                </p>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#22c55e' }}>
              <Icons.CheckCircle />
            </div>
            <h2 style={{ marginBottom: '1rem', color: theme.text }}>Setup Complete!</h2>
            <p style={{ marginBottom: '2rem', color: theme.textSecondary, lineHeight: '1.6' }}>
              {ecommerceApiKeyValid && priceTrackingApiKeyValid 
                ? "Your API keys have been saved and validated. You can now use automatic product data fetching and price tracking features."
                : "You can start using the app now! API keys can be configured later in Settings for automatic product data fetching."
              }
            </p>
            
            <div style={{ 
              background: theme.surface, 
              padding: '1rem', 
              borderRadius: '12px', 
              border: `1px solid ${theme.border}`,
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: theme.text }}>What you can do now:</h4>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: theme.textSecondary }}>
                <li>Paste Amazon/Flipkart URLs to auto-fill product details</li>
                <li>Track price history and get price drop alerts</li>
                <li>View product images and descriptions automatically</li>
                <li>Monitor price changes over time</li>
              </ul>
            </div>

            <p style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
              You can always update your API keys in the Settings page later.
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ margin: 0, color: theme.text }}>API Setup</h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: theme.textSecondary }}>
                Step {activeStep + 1} of {steps.length}
              </p>
            </div>
            
            {/* Progress Steps */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {steps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    background: index <= activeStep ? theme.accent : theme.border,
                    transition: 'background-color 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{
            padding: '2rem',
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            minHeight: 0
          }}>
            {renderStep()}
          </div>

          {/* Footer */}
          <div style={{
            padding: '1.5rem',
            borderTop: `1px solid ${theme.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <GlassButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveStep(Math.max(0, activeStep - 1));
              }}
              disabled={activeStep === 0}
              style={{
                background: 'transparent',
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
            >
              Back
            </GlassButton>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {activeStep < steps.length - 1 ? (
                <>
                  <GlassButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveStep(activeStep + 1);
                    }}
                    disabled={
                      (activeStep === 1 && !ecommerceApiKeyValid) ||
                      (activeStep === 2 && !priceTrackingApiKeyValid)
                    }
                  >
                    Next
                    <Icons.ArrowRight />
                  </GlassButton>
                  {(activeStep === 1 || activeStep === 2) && (
                    <GlassButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveStep(activeStep + 1);
                      }}
                      style={{
                        background: 'transparent',
                        border: `1px solid ${theme.border}`,
                        color: theme.textSecondary,
                        fontSize: '0.875rem'
                      }}
                    >
                      Skip for now
                    </GlassButton>
                  )}
                </>
              ) : (
                <GlassButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleComplete();
                  }}
                  style={{
                    background: '#22c55e',
                    color: 'white'
                  }}
                >
                  Get Started
                </GlassButton>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ApiOnboardingDialog; 
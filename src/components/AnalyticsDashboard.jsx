import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { GlassCard } from './ui/GlassCard';
import { GlassButton } from './ui/GlassButton';

// Icons
const Icons = {
  Trending: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
    </svg>
  ),
  BarChart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
  ),
  DollarSign: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  ShoppingCart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1,1h4l2.68,13.39a2,2 0 0,0 2,1.61h9.72a2,2 0 0,0 2,-1.61L23,6H6"></path>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22,4 12,14.01 9,11.01"></polyline>
    </svg>
  ),
};

function AnalyticsDashboard({ products }) {
  const { darkMode, theme, formatCurrency } = useTheme();
  const [timeRange, setTimeRange] = useState('30d');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for global cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate analytics
  const totalProducts = products.length;
  const boughtProducts = products.filter(p => p.isBought).length;
  const totalValue = products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0);
  const boughtValue = products.filter(p => p.isBought).reduce((sum, p) => sum + parseFloat(p.price || 0), 0);
  
  // Get products purchased this month
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const thisMonthProducts = products.filter(product => {
    if (!product.purchaseDate) return false;
    const purchaseDate = new Date(product.purchaseDate);
    return purchaseDate.getMonth() === thisMonth && purchaseDate.getFullYear() === thisYear;
  });
  const thisMonthValue = thisMonthProducts.reduce((sum, p) => sum + parseFloat(p.price || 0), 0);

  // Simulate price drops (in a real app, this would come from price tracking APIs)
  const productsWithPriceDrops = products.filter(p => Math.random() > 0.7).slice(0, 3);

  // Generate mock price history data
  const generatePriceHistory = (basePrice) => {
    const history = [];
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
      const price = basePrice * (1 + variation);
      history.push({
        date: date.toISOString(),
        price: Math.round(price * 100) / 100
      });
    }
    return history;
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
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: theme.text
              }}>
                Analytics Dashboard
              </h1>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['7d', '30d', '90d'].map(range => (
                  <GlassButton
                    key={range}
                    onClick={() => setTimeRange(range)}
                    theme={timeRange === range ? 'accent' : 'default'}
                    size="small"
                  >
                    {range}
                  </GlassButton>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <GlassCard>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: theme.accent }}>
                    <Icons.ShoppingCart />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: theme.text }}>
                    {totalProducts}
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7, color: theme.textSecondary }}>
                    Total Products
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: theme.success }}>
                    <Icons.CheckCircle />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: theme.text }}>
                    {boughtProducts}
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7, color: theme.textSecondary }}>
                    Purchased
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: theme.accent }}>
                    <Icons.DollarSign />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: theme.text }}>
                    {formatCurrency(totalValue)}
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7, color: theme.textSecondary }}>
                    Total Value
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: theme.success }}>
                    <Icons.Calendar />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', color: theme.text }}>
                    {formatCurrency(thisMonthValue)}
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7, color: theme.textSecondary }}>
                    This Month
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Price Alerts */}
            {productsWithPriceDrops.length > 0 && (
              <GlassCard theme={darkMode ? 'dark' : 'light'} style={{ marginBottom: '2rem' }}>
                <div style={{ padding: '2rem' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: darkMode ? 'white' : '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Icons.AlertTriangle style={{ color: '#FF9800' }} />
                    Price Drop Alerts
                  </h2>
                  
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {productsWithPriceDrops.map(product => (
                      <div key={product.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <div>
                          <div style={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: darkMode ? 'white' : '#1a1a1a',
                            marginBottom: '0.25rem'
                          }}>
                            {product.name}
                          </div>
                          <div style={{
                            fontSize: '0.875rem',
                            color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                          }}>
                            {product.category}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#4CAF50',
                            marginBottom: '0.25rem'
                          }}>
                            {formatCurrency(product.price * 0.85)}
                          </div>
                          <div style={{
                            fontSize: '0.875rem',
                            color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                            textDecoration: 'line-through'
                          }}>
                            {formatCurrency(product.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Price History Chart */}
            <GlassCard theme={darkMode ? 'dark' : 'light'}>
              <div style={{ padding: '2rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem',
                  color: darkMode ? 'white' : '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Icons.BarChart />
                  Price History (Simulated)
                </h2>
                
                <div style={{
                  height: '300px',
                  display: 'flex',
                  alignItems: 'end',
                  gap: '2px',
                  padding: '1rem 0'
                }}>
                  {generatePriceHistory(5000).map((entry, index) => (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        background: `linear-gradient(to top, ${theme.accent}, ${theme.accent}80)`,
                        height: `${(entry.price / 6000) * 100}%`,
                        minHeight: '4px',
                        borderRadius: '2px 2px 0 0',
                        position: 'relative'
                      }}
                      title={`${formatCurrency(entry.price)} - ${new Date(entry.date).toLocaleDateString()}`}
                    />
                  ))}
                </div>
                
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.75rem',
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  fontSize: '0.875rem',
                  textAlign: 'center'
                }}>
                  💡 <strong>Note:</strong> This is simulated data. For real price tracking, you would need to integrate with price tracking APIs like pricehistory.app
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard; 
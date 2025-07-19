import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { GlassCard } from './ui/GlassCard';
import { GlassButton } from './ui/GlassButton';
import ProductDialog from './ProductDialog';
import { triggerAddProductConfetti, triggerBoughtConfetti } from '../utils/confetti';

// Icons (we'll use simple SVG icons instead of Material UI)
const Icons = {
  Add: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Cart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  ),
  Trending: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
    </svg>
  ),
  Timeline: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
  ),
  Filter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  View: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  Delete: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22,4 12,14.01 9,11.01"></polyline>
    </svg>
  ),
  Star: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
    </svg>
  ),
};

function HomePage({ products, setProducts }) {
  const navigate = useNavigate();
  const { darkMode, theme, formatCurrency } = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setOpenDialog(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setOpenDialog(true);
  };

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...product, priceHistory: [...p.priceHistory, { price: product.price, date: new Date().toISOString() }] }
          : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      // Add new product
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
        priceHistory: [{ price: product.price, date: new Date().toISOString() }],
        purchasingThisMonth: product.purchasingThisMonth || false
    };
    setProducts([...products, newProduct]);
      
      // Trigger confetti celebration
      setTimeout(() => {
        triggerAddProductConfetti();
      }, 100);
    }
    setOpenDialog(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  const handleMarkAsBought = (productId) => {
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        const isBought = !p.isBought;
        return {
          ...p,
          isBought,
          purchaseDate: isBought ? new Date().toISOString() : null,
          boughtDate: isBought ? new Date().toISOString() : null
        };
      }
      return p;
    });
    setProducts(updatedProducts);
    
    // Trigger confetti if marking as bought
    const product = products.find(p => p.id === productId);
    if (product && !product.isBought) {
      setTimeout(() => {
        triggerBoughtConfetti();
      }, 100);
    }
  };

  const handleBatchDelete = () => {
    setProducts(products.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
    setMultiSelectMode(false);
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const toggleMultiSelectMode = () => {
    setMultiSelectMode(!multiSelectMode);
    if (multiSelectMode) {
      setSelectedProducts([]);
    }
  };

  const getPurchasingThisMonth = () => {
    return products.filter(product => product.purchasingThisMonth === true);
  };

  const purchasingThisMonth = getPurchasingThisMonth();

  return (
    <div style={{
      background: theme.background,
      minHeight: '100vh',
      padding: '2rem',
      color: theme.text
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Multi-select toolbar */}
        <AnimatePresence>
      {multiSelectMode && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ marginBottom: '2rem' }}
            >
              <div style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: theme.shadow
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontWeight: 'bold', color: theme.text }}>
              {selectedProducts.length} selected
                  </span>
                  {selectedProducts.length > 0 && (
                    <span style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
                      Total: {formatCurrency(
                        products
                          .filter(p => selectedProducts.includes(p.id))
                          .reduce((sum, p) => sum + parseFloat(p.price || 0), 0)
                      )}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <GlassButton
              onClick={handleBatchDelete}
              disabled={selectedProducts.length === 0}
                    style={{
                      background: theme.error,
                      color: 'white',
                      border: 'none'
                    }}
            >
                    <Icons.Delete />
              Delete
                  </GlassButton>
                  <GlassButton
              onClick={toggleMultiSelectMode}
                    style={{
                      background: 'transparent',
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
            >
              Cancel
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <motion.div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: '0.75rem', 
            marginBottom: '1.5rem' 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center',
            boxShadow: theme.shadow
          }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: theme.accent }}>
              <Icons.Cart />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.25rem 0', color: theme.text }}>
              {products.length}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, color: theme.textSecondary }}>Total Products</div>
          </div>

          <div style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center',
            boxShadow: theme.shadow
          }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: theme.accent }}>
              <Icons.Timeline />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.25rem 0', color: theme.text }}>
              {purchasingThisMonth.length}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, color: theme.textSecondary }}>Purchasing This Month</div>
          </div>

          <div style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center',
            boxShadow: theme.shadow
          }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: theme.accent }}>
              <Icons.Trending />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.25rem 0', color: theme.accent }}>
              {formatCurrency(products.reduce((sum, p) => sum + parseFloat(p.price || 0), 0))}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8, color: theme.textSecondary }}>Total Value</div>
          </div>
        </motion.div>

      {/* Purchasing This Month Section */}
      {purchasingThisMonth.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '3rem' }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1.5rem',
              color: theme.text,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              <Icons.Star />
            Purchasing This Month
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {purchasingThisMonth.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div 
                    style={{
                      background: theme.surface,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '12px',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      boxShadow: theme.shadow,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0)'
                    }}
                    onClick={() => navigate(`/product/${product.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = theme.shadow;
                    }}
                  >
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: theme.text }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: theme.accent }}>
                      {formatCurrency(product.price)}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{
                        background: theme.glass,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        border: `1px solid ${theme.glassBorder}`
                      }}>
                        {product.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
      )}

      {/* All Products Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          color: theme.text
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            <Icons.Filter />
          All Products ({products.length})
          </div>
          <GlassButton
          onClick={toggleMultiSelectMode}
            style={{
              background: 'transparent',
              border: `1px solid ${theme.border}`,
              color: theme.text
            }}
          >
            <Icons.Edit />
          {multiSelectMode ? 'Cancel Selection' : 'Multi-Select'}
          </GlassButton>
        </div>

      {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', padding: '4rem 2rem' }}
          >
            <div style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              padding: '4rem 2rem',
              boxShadow: theme.shadow
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '2rem', opacity: 0.6, color: theme.accent }}>
                <Icons.Cart />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: theme.text }}>
                Welcome to Carto
              </div>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem', opacity: 0.8, color: theme.textSecondary }}>
                Your smart shopping companion
              </div>
              <div style={{ 
                maxWidth: '400px', 
                margin: '0 auto 3rem', 
                opacity: 0.7,
                lineHeight: '1.6',
                color: theme.textSecondary
              }}>
                Start by adding your first product to track prices and never miss a deal again
              </div>
              <GlassButton
                onClick={handleAddProduct}
                style={{
                  background: theme.accent,
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: 'bold'
                }}
              >
                <Icons.Add />
            Add Your First Product
              </GlassButton>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '1.5rem' 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div 
                  style={{
                    background: theme.surface,
                    border: `1px solid ${selectedProducts.includes(product.id) ? theme.accent : theme.border}`,
                    borderRadius: '12px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: selectedProducts.includes(product.id) ? `0 0 0 2px ${theme.accent}40` : theme.shadow,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    transform: 'translateY(0)'
                  }}
                  onClick={() => {
                    if (multiSelectMode) {
                      handleProductSelect(product.id);
                    } else {
                      navigate(`/product/${product.id}`);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = theme.shadow;
                  }}
                >
                {multiSelectMode && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '1rem', 
                      right: '1rem', 
                      zIndex: 10 
                    }}>
                      <input
                        type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductSelect(product.id)}
                        style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          accentColor: theme.accent
                        }}
                      />
                    </div>
                  )}
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: theme.text }}>
                    {product.name}
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1rem',
                    color: theme.accent
                  }}>
                    {formatCurrency(product.price)}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    <span style={{
                      background: theme.glass,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      border: `1px solid ${theme.glassBorder}`
                    }}>
                      {product.category}
                    </span>

                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <GlassButton
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                        style={{
                          background: 'transparent',
                          border: `1px solid ${theme.border}`,
                          color: theme.text,
                          padding: '0.5rem',
                          borderRadius: '50%',
                          width: '2.5rem',
                          height: '2.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icons.View />
                      </GlassButton>
                      <GlassButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProduct(product);
                        }}
                        style={{
                          background: 'transparent',
                          border: `1px solid ${theme.border}`,
                          color: theme.text,
                          padding: '0.5rem',
                          borderRadius: '50%',
                          width: '2.5rem',
                          height: '2.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icons.Edit />
                      </GlassButton>
                      <GlassButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsBought(product.id);
                        }}
                        style={{
                          background: product.isBought ? theme.success : 'transparent',
                          border: `1px solid ${product.isBought ? theme.success : theme.border}`,
                          color: product.isBought ? 'white' : theme.text,
                          padding: '0.5rem',
                          borderRadius: '50%',
                          width: '2.5rem',
                          height: '2.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icons.CheckCircle />
                      </GlassButton>
                    </div>
                    <GlassButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProduct(product.id);
                      }}
                      style={{
                        background: theme.error,
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        width: '2.5rem',
                        height: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icons.Delete />
                    </GlassButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
              )}

        {/* Bought Items Section */}
        {products.filter(p => p.isBought).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '3rem' }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1.5rem',
              color: theme.text,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              <Icons.CheckCircle />
              Bought Items
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {products.filter(p => p.isBought).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div 
                    style={{
                      background: theme.surface,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '12px',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      boxShadow: theme.shadow,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateY(0)'
                    }}
                    onClick={() => navigate(`/product/${product.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = theme.shadow;
                    }}
                  >
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: theme.text }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: theme.accent }}>
                      {formatCurrency(product.price)}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      <span style={{
                        background: theme.glass,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        border: `1px solid ${theme.glassBorder}`
                      }}>
                        {product.category}
                      </span>
                      <span style={{
                        background: theme.success,
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontWeight: 'bold'
                      }}>
                        <Icons.CheckCircle />
                        Bought on {new Date(product.boughtDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
      )}

      {/* Floating Action Button */}
        <motion.div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <GlassButton
        onClick={handleAddProduct}
            style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              padding: 0,
              background: theme.accent,
              border: 'none',
              boxShadow: `0 8px 32px ${theme.accent}40`,
              color: 'white',
              fontSize: '1.5rem'
            }}
          >
            <Icons.Add />
          </GlassButton>
        </motion.div>
      </div>

      {/* Product Dialog */}
      <ProductDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}

export default HomePage; 
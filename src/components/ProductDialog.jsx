import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { Icons } from "./ui/Icons";
import { GlassCard } from "./ui/GlassCard";
import { GlassButton } from "./ui/GlassButton";
import { Toggle } from "./ui/Toggle";
import productApiService from '../services/productApi';

function ProductDialog({ open, onClose, onSave, product, onShowApiOnboarding }) {
  const { theme, formatCurrency } = useTheme();
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    price: '',
    category: 'Electronics',
    notes: '',
    isBought: false,
    purchasingThisMonth: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (product) {
        // Editing existing product
        setFormData({
          url: product.url || '',
          name: product.name || '',
          price: product.price ? product.price.toString() : '',
          category: product.category || 'Electronics',
          notes: product.notes || '',
          isBought: product.isBought || false,
          purchasingThisMonth: product.purchasingThisMonth || false
        });
      } else {
        // Adding new product
    setFormData({
          url: '',
          name: '',
          price: '',
          category: 'Electronics',
          notes: '',
          isBought: false,
          purchasingThisMonth: false
        });
      }
      setErrors({});
    }
  }, [open, product]);

  const extractProductInfo = async (url) => {
    setIsLoading(true);
    try {
      const extractedData = await productApiService.extractProductInfo(url);
      
      setFormData(prev => ({
        ...prev,
        name: extractedData.name,
        price: extractedData.price.toString(),
        category: extractedData.category,
        image: extractedData.image
      }));
    } catch (error) {
      console.error('Error extracting product info:', error);
      setErrors({ url: error.message || 'Failed to extract product information' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Auto-extract product info when URL changes
    if (field === 'url' && value && value.includes('http')) {
      extractProductInfo(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      purchaseDate: formData.isBought ? new Date().toISOString() : null,
      boughtDate: formData.isBought ? new Date().toISOString() : null
    };
    
    onSave(productData);
  };

  const categories = [
    'Electronics',
    'Fashion',
    'Beauty',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys',
    'Automotive',
    'Health',
    'Food',
    'Other'
  ];

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
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: theme.shadow
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 2rem',
            borderBottom: `1px solid ${theme.border}`,
            background: theme.glass
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                background: theme.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Icons.Add />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: theme.text }}>
        {product ? 'Edit Product' : 'Add New Product'}
                </div>
                <div style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
                  {product ? 'Edit product details' : 'Add a new product to your cart'}
                </div>
              </div>
            </div>
            <GlassButton
              onClick={onClose}
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                padding: 0,
                background: 'transparent',
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
            >
              <Icons.Close />
            </GlassButton>
          </div>

          {/* Content */}
          <div style={{ padding: '2rem', overflowY: 'auto', maxHeight: 'calc(90vh - 120px)' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Left Column - Image */}
                <div>
                  <div style={{
                    width: '100%',
                    height: '300px',
                    background: theme.glass,
                    border: `2px dashed ${theme.border}`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    {formData.image ? (
                      <img 
                        src={formData.image} 
                        alt="Product" 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '100%', 
                          objectFit: 'contain',
                          borderRadius: '8px'
                        }} 
                      />
                    ) : (
                      <div style={{ textAlign: 'center', color: theme.textSecondary }}>
                        <Icons.Image style={{ fontSize: '3rem', marginBottom: '1rem' }} />
                        <div>Product Image</div>
                        <div style={{ fontSize: '0.875rem' }}>Will be loaded automatically</div>
                      </div>
                    )}
                  </div>
                  
                  {isLoading && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1rem',
                      background: theme.glass,
                      borderRadius: '8px',
                      color: theme.textSecondary
                    }}>
                      <div style={{ animation: 'spin 1s linear infinite' }}>
                        <Icons.Loading />
                      </div>
                      Extracting product information...
                    </div>
                  )}
                </div>

                {/* Right Column - Form */}
                <div>
                  {/* Product Link */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: theme.text
                    }}>
                      Product Link *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: theme.textSecondary
                      }}>
                        <Icons.Link />
                      </div>
                      <input
                        type="url"
                        value={formData.url}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        placeholder="https://amazon.in/product..."
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem 0.75rem 2.5rem',
                          border: `1px solid ${errors.url ? theme.error : theme.border}`,
                          borderRadius: '8px',
                          background: theme.glass,
                          color: theme.text,
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    {errors.url && (
                      <div style={{ color: theme.error, fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.url}
                      </div>
                    )}
                    {!productApiService.isConfigured() && (
                      <div style={{ 
                        margin: '0.5rem 0 0 0', 
                        padding: '0.75rem', 
                        background: `${theme.accent}10`, 
                        border: `1px solid ${theme.accent}30`,
                        borderRadius: '8px',
                        fontSize: '0.875rem'
                      }}>
                        <p style={{ margin: '0 0 0.5rem 0', color: theme.text }}>
                          💡 <strong>Enable Auto-fill:</strong> Set up API keys to automatically fetch product details
                        </p>
                        <GlassButton
                          onClick={onShowApiOnboarding}
                          style={{ 
                            background: theme.accent, 
                            color: 'white',
                            fontSize: '0.75rem',
                            padding: '0.5rem 1rem'
                          }}
                        >
                          Set Up API Keys
                        </GlassButton>
                      </div>
                    )}
                  </div>

                  {/* Product Name */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: theme.text
                    }}>
                      Product Name *
                    </label>
                    <input
                      type="text"
            value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter product name..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: `1px solid ${errors.name ? theme.error : theme.border}`,
                        borderRadius: '8px',
                        background: theme.glass,
                        color: theme.text,
                        fontSize: '1rem'
                      }}
                    />
                    {errors.name && (
                      <div style={{ color: theme.error, fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Price and Category */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: theme.text
                      }}>
                        Price *
                      </label>
                      <input
            type="number"
            value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: `1px solid ${errors.price ? theme.error : theme.border}`,
                          borderRadius: '8px',
                          background: theme.glass,
                          color: theme.text,
                          fontSize: '1rem'
                        }}
                      />
                      {errors.price && (
                        <div style={{ color: theme.error, fontSize: '0.875rem', marginTop: '0.25rem' }}>
                          {errors.price}
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: theme.text
                      }}>
                        Category
                      </label>
                      <select
              value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          border: `1px solid ${theme.border}`,
                          borderRadius: '8px',
                          background: theme.glass,
                          color: theme.text,
                          fontSize: '1rem'
                        }}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      color: theme.text
                    }}>
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Add any notes about this product..."
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        background: theme.glass,
                        color: theme.text,
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  {/* Mark as Purchased */}
                  <div style={{ marginBottom: '1rem' }}>
                    <Toggle
                      checked={formData.isBought}
                      onChange={(value) => handleInputChange('isBought', value)}
                      label="Mark as purchased"
                    />
                  </div>

                  {/* Purchasing This Month */}
                  <div style={{ marginBottom: '2rem' }}>
                    <Toggle
                      checked={formData.purchasingThisMonth}
                      onChange={(value) => handleInputChange('purchasingThisMonth', value)}
                      label="Purchasing this month"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: `1px solid ${theme.border}`
              }}>
                <GlassButton
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    border: `1px solid ${theme.border}`,
                    color: theme.text,
                    padding: '0.75rem 1.5rem'
                  }}
                >
                  Cancel
                </GlassButton>
                <GlassButton
                  type="submit"
                  disabled={isLoading}
                  style={{
                    background: theme.accent,
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ animation: 'spin 1s linear infinite' }}>
                        <Icons.Loading />
                      </div>
                      Extracting...
                    </div>
                  ) : (
                    product ? 'Update Product' : 'Add Product'
                  )}
                </GlassButton>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProductDialog; 
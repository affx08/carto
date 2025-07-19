import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { GlassCard } from './ui/GlassCard';
import { GlassButton } from './ui/GlassButton';
import { triggerBoughtConfetti } from '../utils/confetti';

// Icons
const Icons = {
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12,19 5,12 12,5"></polyline>
    </svg>
  ),
  Edit: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Delete: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22,4 12,14.01 9,11.01"></polyline>
    </svg>
  ),
  Trending: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
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
  Tag: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  ),
};

function ProductDetail({ products, onUpdateProduct, onDeleteProduct, onMarkAsBought }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, accentColor, formatCurrency } = useTheme();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setEditData(foundProduct);
    } else {
      navigate('/');
    }
  }, [id, products, navigate]);

  // Track mouse position for global cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSave = () => {
    onUpdateProduct(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(product);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(id);
      navigate('/');
    }
  };

  if (!product) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: darkMode ? 'white' : '#1a1a1a'
      }}>
        Loading...
      </div>
    );
  }

  // Animated background with cursor tracking
  const backgroundStyle = {
    background: darkMode ? '#000000' : '#ffffff',
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
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${accentColor}10 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${accentColor}10 0%, transparent 50%)`,
        }}
        transition={{ duration: 0.1 }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
      {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <GlassButton
                onClick={() => navigate('/')}
                theme={darkMode ? 'dark' : 'light'}
                icon={<Icons.ArrowLeft />}
              >
                Back
              </GlassButton>
              
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: darkMode ? 'white' : '#1a1a1a',
                flex: 1
              }}>
                {isEditing ? 'Edit Product' : product.name}
              </h1>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {!isEditing && (
                  <GlassButton
                    onClick={() => setIsEditing(true)}
                    theme={darkMode ? 'dark' : 'light'}
                    icon={<Icons.Edit />}
                  >
                    Edit
                  </GlassButton>
                )}
                <GlassButton
                  onClick={handleDelete}
                  theme="red"
                  icon={<Icons.Delete />}
                >
                  Delete
                </GlassButton>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              
              {/* Product Image */}
              <GlassCard theme={darkMode ? 'dark' : 'light'}>
                <div style={{ padding: '2rem' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: darkMode ? 'white' : '#1a1a1a'
                  }}>
                    Product Image
                  </h2>
                  
                  <div style={{
                    width: '100%',
                    height: '300px',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div style={{
                      display: product.image ? 'none' : 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                    }}>
                      <div style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '50%',
                        background: accentColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem'
                      }}>
                        📦
                      </div>
                      <span>No image available</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Product Details */}
              <GlassCard theme={darkMode ? 'dark' : 'light'}>
                <div style={{ padding: '2rem' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: darkMode ? 'white' : '#1a1a1a'
                  }}>
                    Product Details
                  </h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Product Name */}
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: darkMode ? 'white' : '#1a1a1a'
                      }}>
                        Product Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.name || ''}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '1rem',
                            border: 'none',
                            borderRadius: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: darkMode ? 'white' : '#1a1a1a',
                            fontSize: '1rem'
                          }}
                        />
                      ) : (
                        <div style={{
                          padding: '1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '0.75rem',
                          color: darkMode ? 'white' : '#1a1a1a',
                          fontSize: '1rem'
                        }}>
                          {product.name}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: darkMode ? 'white' : '#1a1a1a'
                      }}>
                        Price
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editData.price || ''}
                          onChange={(e) => setEditData({...editData, price: e.target.value})}
                          step="0.01"
                          style={{
                            width: '100%',
                            padding: '1rem',
                            border: 'none',
                            borderRadius: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: darkMode ? 'white' : '#1a1a1a',
                            fontSize: '1rem'
                          }}
                        />
                      ) : (
                        <div style={{
                          padding: '1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '0.75rem',
                          color: accentColor,
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }}>
                          {formatCurrency(product.price)}
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: darkMode ? 'white' : '#1a1a1a'
                      }}>
                        Category
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.category || ''}
                          onChange={(e) => setEditData({...editData, category: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '1rem',
                            border: 'none',
                            borderRadius: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: darkMode ? 'white' : '#1a1a1a',
                            fontSize: '1rem'
                          }}
                        />
                      ) : (
                        <div style={{
                          padding: '1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '0.75rem',
                          color: darkMode ? 'white' : '#1a1a1a',
                          fontSize: '1rem'
                        }}>
                          {product.category || 'No category'}
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 'bold',
                        color: darkMode ? 'white' : '#1a1a1a'
                      }}>
                        Notes
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editData.notes || ''}
                          onChange={(e) => setEditData({...editData, notes: e.target.value})}
                          rows="3"
                          style={{
                            width: '100%',
                            padding: '1rem',
                            border: 'none',
                            borderRadius: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: darkMode ? 'white' : '#1a1a1a',
                            fontSize: '1rem',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                          }}
                        />
                      ) : (
                        <div style={{
                          padding: '1rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '0.75rem',
                          color: darkMode ? 'white' : '#1a1a1a',
                          fontSize: '1rem',
                          minHeight: '4rem'
                        }}>
                          {product.notes || 'No notes'}
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <GlassButton
                        onClick={() => {
                          onMarkAsBought(product.id);
                          if (!product.isBought) {
                            setTimeout(() => {
                              triggerBoughtConfetti();
                            }, 100);
                          }
                        }}
                        theme={product.isBought ? 'green' : (darkMode ? 'dark' : 'light')}
                        icon={<Icons.CheckCircle />}
                      >
                        {product.isBought ? 'Bought' : 'Mark as Bought'}
                      </GlassButton>
                      
                      {product.isBought && (
                        <span style={{
                          fontSize: '0.875rem',
                          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                        }}>
                          Bought on {new Date(product.boughtDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {/* Edit Actions */}
                    {isEditing && (
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '1rem'
                      }}>
                        <GlassButton
                          onClick={handleSave}
                          theme={darkMode ? 'dark' : 'light'}
              fullWidth
                        >
                          Save Changes
                        </GlassButton>
                        <GlassButton
                          onClick={handleCancel}
                          theme="red"
              fullWidth
                        >
                          Cancel
                        </GlassButton>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Price History */}
            <GlassCard theme={darkMode ? 'dark' : 'light'} style={{ marginTop: '2rem' }}>
              <div style={{ padding: '2rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem',
                  color: darkMode ? 'white' : '#1a1a1a'
                }}>
                  Price History
                </h2>
                
                {product.priceHistory && product.priceHistory.length > 0 ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    {product.priceHistory.map((entry, index) => (
                      <div key={index} style={{
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          color: accentColor,
                          marginBottom: '0.5rem'
                        }}>
                          {formatCurrency(entry.price)}
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                        }}>
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
                  }}>
                    No price history available
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetail; 
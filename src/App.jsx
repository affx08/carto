import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import HomePage from './components/HomePage';
import ProductDetail from './components/ProductDetail';
import SettingsPage from './components/SettingsPage';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AppBar from './components/AppBar';
import OnboardingDialog from './components/OnboardingDialog';
import ApiOnboardingDialog from './components/ApiOnboardingDialog';
import ProductDialog from './components/ProductDialog';
import './App.css';

// Theme wrapper component to apply theme to document
function ThemeWrapper({ children }) {
  const { darkMode, theme } = useTheme();

  // Theme is now applied in ThemeContext, so we just need to render children
  return children;
}

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('carto-products');
    return saved ? JSON.parse(saved) : [];
  });

  const [showOnboarding, setShowOnboarding] = useState(() => {
    const saved = localStorage.getItem('carto-onboarding-completed');
    return saved ? false : true;
  });

  const [showApiOnboarding, setShowApiOnboarding] = useState(() => {
    const saved = localStorage.getItem('carto-api-onboarding-completed');
    return saved ? false : true;
  });

  const [openProductDialog, setOpenProductDialog] = useState(false);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('carto-products', JSON.stringify(products));
  }, [products]);

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('carto-onboarding-completed', 'true');
  };

  const handleCompleteApiOnboarding = () => {
    setShowApiOnboarding(false);
    localStorage.setItem('carto-api-onboarding-completed', 'true');
  };

  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      priceHistory: [{ price: product.price, date: new Date().toISOString() }]
    };
    setProducts([...products, newProduct]);
    setOpenProductDialog(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleMarkAsBought = (productId) => {
    setProducts(products.map(p => {
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
    }));
  };

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Router>
          <div 
            className="App"
            style={{
              background: 'var(--theme-background)',
              minHeight: '100vh',
              transition: 'all 0.3s ease',
              color: 'var(--theme-text)'
            }}
          >
            <AppBar />
            
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    products={products} 
                    setProducts={setProducts}
                    onAddProduct={() => setOpenProductDialog(true)}
                  />
                } 
              />
              <Route 
                path="/product/:id" 
                element={
                  <ProductDetail 
                    products={products}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                    onMarkAsBought={handleMarkAsBought}
                  />
                } 
              />
              <Route 
                path="/settings" 
                element={<SettingsPage />} 
              />
              <Route 
                path="/analytics" 
                element={<AnalyticsDashboard products={products} />} 
              />
            </Routes>

            <OnboardingDialog 
              open={showOnboarding} 
              onComplete={handleCompleteOnboarding} 
            />
            <ApiOnboardingDialog 
              open={showApiOnboarding} 
              onComplete={handleCompleteApiOnboarding} 
            />

            <ProductDialog
              open={openProductDialog}
              onClose={() => setOpenProductDialog(false)}
              onSave={handleAddProduct}
              product={null}
              onShowApiOnboarding={() => setShowApiOnboarding(true)}
            />
          </div>
        </Router>
      </ThemeWrapper>
    </ThemeProvider>
  );
}

export default App;

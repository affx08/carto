// Price tracking service for real-time product data
class PriceTrackingService {
  constructor() {
    // Use import.meta.env instead of process.env for Vite compatibility
    this.apiKey = import.meta.env.VITE_SCRAPER_API_KEY || 'YOUR_API_KEY';
    this.baseUrl = 'https://api.scraperapi.com';
  }

  // Extract product info from URL
  async extractProductInfo(url) {
    try {
      // For demo purposes, we'll use a simulated API response
      // In production, you'd use the actual ScraperAPI or similar service
      
      const domain = this.extractDomain(url);
      const productId = this.extractProductId(url);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return simulated data based on domain and product ID
      return this.getSimulatedProductData(domain, productId, url);
    } catch (error) {
      console.error('Error extracting product info:', error);
      return this.getFallbackData(url);
    }
  }

  // Extract domain from URL
  extractDomain(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.toLowerCase();
    } catch {
      return 'unknown';
    }
  }

  // Extract product ID from various e-commerce URLs
  extractProductId(url) {
    // Amazon
    const amazonMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
    if (amazonMatch) return amazonMatch[1];
    
    // Flipkart
    const flipkartMatch = url.match(/\/p\/[^\/]+\/([a-zA-Z0-9]+)/);
    if (flipkartMatch) return flipkartMatch[1];
    
    // Myntra
    const myntraMatch = url.match(/\/p\/[^\/]+\/([a-zA-Z0-9]+)/);
    if (myntraMatch) return myntraMatch[1];
    
    // Nykaa
    const nykaaMatch = url.match(/\/p\/[^\/]+\/([a-zA-Z0-9]+)/);
    if (nykaaMatch) return nykaaMatch[1];
    
    return 'unknown';
  }

  // Get simulated product data based on domain and product ID
  getSimulatedProductData(domain, productId, url) {
    const domainData = {
      'amazon.in': {
        'B0BXXPG6FP': {
          name: 'Sony WH-CH720N Wireless Noise Cancelling Headphones',
          price: 8999,
          image: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UY218_.jpg',
          category: 'Electronics',
          rating: 4.2,
          reviews: 1247,
          availability: 'In Stock',
          originalPrice: 12999,
          discount: 31
        },
        'B08N5WRWNW': {
          name: 'Echo Dot (4th Gen) | Smart speaker with Alexa',
          price: 4499,
          image: 'https://m.media-amazon.com/images/I/714Rq4k05UL._AC_UY218_.jpg',
          category: 'Electronics',
          rating: 4.1,
          reviews: 2341,
          availability: 'In Stock',
          originalPrice: 5999,
          discount: 25
        },
        'B08C7KG5LP': {
          name: 'Samsung Galaxy Tab A7 10.4-inch Tablet',
          price: 15999,
          image: 'https://m.media-amazon.com/images/I/71LJJrKbezL._AC_UY218_.jpg',
          category: 'Electronics',
          rating: 4.3,
          reviews: 892,
          availability: 'In Stock',
          originalPrice: 19999,
          discount: 20
        },
        'B0CWVX1GNX': {
          name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
          price: 24999,
          image: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UY218_.jpg',
          category: 'Electronics',
          rating: 4.5,
          reviews: 567,
          availability: 'In Stock',
          originalPrice: 29999,
          discount: 17
        }
      },
      'flipkart.com': {
        'default': {
          name: 'Flipkart Product',
          price: Math.floor(Math.random() * 5000) + 500,
          image: 'https://via.placeholder.com/300x300/22c55e/ffffff?text=Flipkart+Product',
          category: 'General',
          rating: 4.0,
          reviews: Math.floor(Math.random() * 1000) + 100,
          availability: 'In Stock',
          originalPrice: null,
          discount: 0
        }
      },
      'myntra.com': {
        'default': {
          name: 'Myntra Fashion Product',
          price: Math.floor(Math.random() * 3000) + 200,
          image: 'https://via.placeholder.com/300x300/f97316/ffffff?text=Myntra+Product',
          category: 'Fashion',
          rating: 4.1,
          reviews: Math.floor(Math.random() * 500) + 50,
          availability: 'In Stock',
          originalPrice: null,
          discount: 0
        }
      },
      'nykaa.com': {
        'default': {
          name: 'Nykaa Beauty Product',
          price: Math.floor(Math.random() * 2000) + 100,
          image: 'https://via.placeholder.com/300x300/ec4899/ffffff?text=Nykaa+Product',
          category: 'Beauty',
          rating: 4.2,
          reviews: Math.floor(Math.random() * 300) + 30,
          availability: 'In Stock',
          originalPrice: null,
          discount: 0
        }
      }
    };

    // Get data for specific domain
    const domainProducts = domainData[domain] || domainData['amazon.in'];
    
    // Get specific product or default
    const productData = domainProducts[productId] || domainProducts['default'] || {
      name: `Product from ${domain}`,
      price: Math.floor(Math.random() * 2000) + 100,
      image: 'https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Product+Image',
      category: 'General',
      rating: 4.0,
      reviews: Math.floor(Math.random() * 100) + 10,
      availability: 'In Stock',
      originalPrice: null,
      discount: 0
    };

    return {
      ...productData,
      url,
      extractedAt: new Date().toISOString(),
      source: domain
    };
  }

  // Get fallback data when extraction fails
  getFallbackData(url) {
    const domain = this.extractDomain(url);
    const productName = domain.includes('.') ? domain.split('.')[0] : 'Product';
    
    return {
      name: `${productName.charAt(0).toUpperCase() + productName.slice(1)} Product`,
      price: Math.floor(Math.random() * 2000) + 100,
      image: 'https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Product+Image',
      category: 'General',
      rating: 4.0,
      reviews: Math.floor(Math.random() * 100) + 10,
      availability: 'In Stock',
      originalPrice: null,
      discount: 0,
      url,
      extractedAt: new Date().toISOString(),
      source: domain
    };
  }

  // Track price changes over time
  async trackPriceHistory(productId, url) {
    try {
      // In a real implementation, you'd store price history in a database
      // For now, we'll simulate price tracking
      const currentPrice = Math.floor(Math.random() * 1000) + 100;
      const priceHistory = [
        { price: currentPrice + 50, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
        { price: currentPrice + 25, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
        { price: currentPrice, date: new Date().toISOString() }
      ];

      return {
        productId,
        currentPrice,
        priceHistory,
        priceChange: -25,
        priceChangePercent: -5.5,
        lowestPrice: currentPrice,
        highestPrice: currentPrice + 50
      };
    } catch (error) {
      console.error('Error tracking price history:', error);
      return null;
    }
  }

  // Get price alerts for products
  async getPriceAlerts(products) {
    try {
      const alerts = [];
      
      for (const product of products) {
        const priceHistory = await this.trackPriceHistory(product.id, product.url);
        if (priceHistory && priceHistory.priceChange < -10) {
          alerts.push({
            productId: product.id,
            productName: product.name,
            oldPrice: priceHistory.currentPrice - priceHistory.priceChange,
            newPrice: priceHistory.currentPrice,
            priceChange: priceHistory.priceChange,
            priceChangePercent: priceHistory.priceChangePercent
          });
        }
      }
      
      return alerts;
    } catch (error) {
      console.error('Error getting price alerts:', error);
      return [];
    }
  }
}

export default new PriceTrackingService(); 
class ProductApiService {
  constructor() {
    this.ecommerceApiKey = localStorage.getItem('carto-ecommerce-api-key');
    this.priceTrackingApiKey = localStorage.getItem('carto-price-tracking-api-key');
  }

  // Extract product information from URL using ScrapingBee API
  async extractProductInfo(url) {
    if (!this.ecommerceApiKey) {
      throw new Error('E-commerce API key not configured. Please set up your API keys in the onboarding.');
    }

    try {
      const response = await fetch(`https://app.scrapingbee.com/api/v1/?api_key=${this.ecommerceApiKey}&url=${encodeURIComponent(url)}&render_js=false&premium_proxy=true&country_code=us`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const html = await response.text();
      
      // Parse the HTML to extract product information
      const productInfo = this.parseProductFromHTML(html, url);
      
      if (productInfo.name) {
        return productInfo;
      } else {
        throw new Error('Failed to extract product information from the page');
      }
    } catch (error) {
      console.error('Error extracting product info:', error);
      throw new Error('Failed to fetch product information. Please check your API key and try again.');
    }
  }

  // Parse product information from HTML
  parseProductFromHTML(html, url) {
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extract product information based on common selectors
    const productInfo = {
      name: '',
      price: 0,
      currency: 'USD',
      image: '',
      description: '',
      category: 'Electronics',
      rating: 0,
      reviews: 0,
      availability: 'Unknown',
      url: url
    };

    // Amazon selectors
    if (url.includes('amazon')) {
      productInfo.name = this.extractText(doc, [
        '#productTitle',
        'h1.a-size-large',
        '.a-size-large.a-spacing-none',
        'h1'
      ]);
      
      productInfo.price = this.extractPrice(doc, [
        '.a-price-whole',
        '.a-price .a-offscreen',
        '.a-price-current .a-offscreen',
        '.a-price-current .a-price-whole'
      ]);
      
      productInfo.image = this.extractImage(doc, [
        '#landingImage',
        '#imgBlkFront',
        '.a-dynamic-image',
        'img[data-old-hires]'
      ]);
      
      productInfo.description = this.extractText(doc, [
        '#productDescription',
        '.a-expander-content',
        '.a-section.a-spacing-medium'
      ]);
      
      productInfo.rating = this.extractRating(doc, [
        '.a-icon-alt',
        '.a-star-rating-text'
      ]);
    }
    
    // Flipkart selectors
    else if (url.includes('flipkart')) {
      productInfo.name = this.extractText(doc, [
        'h1[class*="title"]',
        '.B_NuCI',
        'h1'
      ]);
      
      productInfo.price = this.extractPrice(doc, [
        '._30jeq3',
        '._16Jk6d',
        '.a-price-whole'
      ]);
      
      productInfo.image = this.extractImage(doc, [
        'img[class*="product-image"]',
        'img[class*="image"]',
        'img'
      ]);
      
      productInfo.description = this.extractText(doc, [
        '._1mXcCf',
        '.a-section'
      ]);
    }

    // Set category based on product name
    if (productInfo.name) {
      productInfo.category = this.detectCategory(productInfo.name);
    }

    return productInfo;
  }

  // Helper methods for extracting data
  extractText(doc, selectors) {
    for (const selector of selectors) {
      const element = doc.querySelector(selector);
      if (element && element.textContent.trim()) {
        return element.textContent.trim();
      }
    }
    return '';
  }

  extractPrice(doc, selectors) {
    for (const selector of selectors) {
      const element = doc.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        const price = parseFloat(text.replace(/[^\d.]/g, ''));
        if (!isNaN(price)) {
          return price;
        }
      }
    }
    return 0;
  }

  extractImage(doc, selectors) {
    for (const selector of selectors) {
      const element = doc.querySelector(selector);
      if (element) {
        const src = element.getAttribute('src') || element.getAttribute('data-src');
        if (src && src.startsWith('http')) {
          return src;
        }
      }
    }
    return '';
  }

  extractRating(doc, selectors) {
    for (const selector of selectors) {
      const element = doc.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        const rating = parseFloat(text.match(/(\d+(?:\.\d+)?)/)?.[1] || '0');
        if (!isNaN(rating)) {
          return rating;
        }
      }
    }
    return 0;
  }

  // Get price history using PriceAPI
  async getPriceHistory(productUrl) {
    if (!this.priceTrackingApiKey) {
      throw new Error('Price tracking API key not configured. Please set up your API keys in the onboarding.');
    }

    try {
      // Create a price tracking job
      const createJobResponse = await fetch(`https://api.priceapi.com/v2/jobs?token=${this.priceTrackingApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: this.detectSource(productUrl),
          country: 'us',
          topic: 'search',
          key: productUrl,
          max_age: 86400 // 24 hours
        })
      });
      
      if (!createJobResponse.ok) {
        throw new Error(`API request failed: ${createJobResponse.status}`);
      }

      const jobData = await createJobResponse.json();
      
      if (jobData.status === 'error') {
        throw new Error(jobData.message || 'Failed to create price tracking job');
      }

      // Wait for job completion and get results
      return await this.waitForJobCompletion(jobData.id);
    } catch (error) {
      console.error('Error fetching price history:', error);
      throw new Error('Failed to fetch price history. Please check your API key and try again.');
    }
  }

  // Wait for job completion and get results
  async waitForJobCompletion(jobId, maxAttempts = 10) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await fetch(`https://api.priceapi.com/v2/jobs/${jobId}?token=${this.priceTrackingApiKey}`);
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.status === 'finished') {
          return this.parsePriceAPIData(data);
        } else if (data.status === 'error') {
          throw new Error(data.message || 'Job failed');
        }
        
        // Wait 2 seconds before next attempt
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error checking job status:', error);
        throw error;
      }
    }
    
    throw new Error('Job timeout - price tracking is taking longer than expected');
  }

  // Parse PriceAPI response
  parsePriceAPIData(data) {
    const priceHistory = [];
    
    if (data.content && data.content.length > 0) {
      const product = data.content[0];
      
      if (product.price) {
        priceHistory.push({
          price: parseFloat(product.price),
          date: new Date().toISOString(),
          type: 'current'
        });
      }
      
      if (product.price_history && product.price_history.length > 0) {
        product.price_history.forEach(entry => {
          priceHistory.push({
            price: parseFloat(entry.price),
            date: entry.date,
            type: 'historical'
          });
        });
      }
    }

    return {
      priceHistory,
      lowestPrice: Math.min(...priceHistory.map(p => p.price)),
      highestPrice: Math.max(...priceHistory.map(p => p.price)),
      averagePrice: priceHistory.reduce((sum, p) => sum + p.price, 0) / priceHistory.length
    };
  }

  // Detect source from URL
  detectSource(url) {
    if (url.includes('amazon')) {
      return 'amazon';
    } else if (url.includes('flipkart')) {
      return 'flipkart';
    } else {
      return 'amazon'; // default
    }
  }



  // Detect product category from title
  detectCategory(title) {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('phone') || lowerTitle.includes('mobile') || lowerTitle.includes('smartphone')) {
      return 'Mobile Phones';
    } else if (lowerTitle.includes('laptop') || lowerTitle.includes('computer') || lowerTitle.includes('pc')) {
      return 'Computers';
    } else if (lowerTitle.includes('headphone') || lowerTitle.includes('earphone') || lowerTitle.includes('speaker')) {
      return 'Audio';
    } else if (lowerTitle.includes('camera') || lowerTitle.includes('photo') || lowerTitle.includes('video')) {
      return 'Cameras';
    } else if (lowerTitle.includes('book') || lowerTitle.includes('novel') || lowerTitle.includes('textbook')) {
      return 'Books';
    } else if (lowerTitle.includes('shirt') || lowerTitle.includes('dress') || lowerTitle.includes('clothing')) {
      return 'Fashion';
    } else if (lowerTitle.includes('game') || lowerTitle.includes('console') || lowerTitle.includes('playstation') || lowerTitle.includes('xbox')) {
      return 'Gaming';
    } else if (lowerTitle.includes('watch') || lowerTitle.includes('clock') || lowerTitle.includes('timepiece')) {
      return 'Watches';
    } else if (lowerTitle.includes('shoe') || lowerTitle.includes('sneaker') || lowerTitle.includes('footwear')) {
      return 'Footwear';
    } else if (lowerTitle.includes('bag') || lowerTitle.includes('backpack') || lowerTitle.includes('purse')) {
      return 'Bags';
    } else {
      return 'Electronics';
    }
  }

  // Extract ASIN from Amazon URL
  extractAsin(url) {
    const match = url.match(/\/dp\/([A-Z0-9]{10})/);
    return match ? match[1] : null;
  }

  // Check if API keys are configured
  isConfigured() {
    return !!(this.ecommerceApiKey && this.priceTrackingApiKey);
  }

  // Get configuration status
  getConfigurationStatus() {
    return {
      ecommerceApiKey: !!this.ecommerceApiKey,
      priceTrackingApiKey: !!this.priceTrackingApiKey,
      fullyConfigured: this.isConfigured()
    };
  }

  // Update API keys
  updateApiKeys(ecommerceKey, priceTrackingKey) {
    this.ecommerceApiKey = ecommerceKey;
    this.priceTrackingApiKey = priceTrackingKey;
    
    if (ecommerceKey) {
      localStorage.setItem('carto-ecommerce-api-key', ecommerceKey);
    }
    if (priceTrackingKey) {
      localStorage.setItem('carto-price-tracking-api-key', priceTrackingKey);
    }
  }
}

// Create singleton instance
const productApiService = new ProductApiService();

export default productApiService; 
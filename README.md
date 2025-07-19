# Carto - E-commerce Cart & Price Tracker

A modern Windows 11 desktop application for managing your e-commerce shopping cart and tracking product prices across multiple platforms.

![Carto App](assets/icon.svg)

## 🚀 Features

- **Smart Cart Management**: Add, organize, and manage products from multiple e-commerce platforms
- **Price Tracking**: Monitor price changes for your favorite products
- **Analytics Dashboard**: Visualize your shopping patterns and price trends
- **Modern UI**: Beautiful glass-morphism design with smooth animations
- **Cross-Platform Support**: Track prices from Amazon, Flipkart, and more
- **Desktop Notifications**: Get alerts when prices drop
- **Export/Import**: Save and share your cart data

## 📦 Installation

### For Users
1. Download the latest release from the [Releases page](https://github.com/yourusername/carto/releases)
2. Run `Carto Setup 1.0.0.exe`
3. Follow the installation wizard
4. Launch Carto from your desktop or Start Menu

### For Developers

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

#### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/carto.git
cd carto

# Install dependencies
npm install

# Start development server
npm run electron-dev
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build React app for production
- `npm run electron` - Run Electron app
- `npm run electron-dev` - Start development with hot reload
- `npm run electron-pack` - Build executable installer

### Project Structure

```
carto/
├── src/                    # React application source
│   ├── components/         # React components
│   ├── contexts/          # React contexts
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── electron/              # Electron main process
├── assets/                # App icons and assets
├── public/                # Static files
└── dist-electron/         # Build output (gitignored)
```

## 🎨 Tech Stack

- **Frontend**: React 18, Vite
- **Desktop**: Electron 24
- **UI Framework**: Material-UI (MUI)
- **Styling**: Emotion, CSS-in-JS
- **Animations**: Framer Motion, React Spring
- **Charts**: Chart.js, React Chart.js 2
- **Build Tool**: Electron Builder

## 📱 Screenshots

*Add screenshots of your app here*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using React and Electron
- Icons from Material-UI
- Glass-morphism design inspiration from modern UI trends

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the [Wiki](https://github.com/yourusername/carto/wiki) for documentation

---

**Made with ❤️ by the Carto Team**

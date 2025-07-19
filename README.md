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

## 💻 System Requirements

- **Operating System**: Windows 10/11 (64-bit)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Internet**: Required for price tracking and updates

## 📦 Installation

### 🚀 Quick Install (Recommended)
**For most users, this is the easiest way to get started:**

1. **Download the latest release** from the [Releases page](https://github.com/affx08/carto/releases)
2. **Run the installer** (`Carto Setup 1.0.0.exe`)
3. **Follow the installation wizard** - it will guide you through the setup
4. **Launch Carto** from your desktop or Start Menu

That's it! Carto is now ready to use. 🎉

### For Developers

> **Note**: If you just want to use Carto, use the [Quick Install](#-quick-install-recommended) method above. This section is for developers who want to contribute or modify the code.

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

#### Setup
```bash
# Clone the repository
git clone https://github.com/affx08/carto.git
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

## 🔧 Troubleshooting

### Common Issues

**Installation fails:**
- Make sure you're running Windows 10/11 (64-bit)
- Try running the installer as Administrator
- Disable antivirus temporarily if it blocks the installation

**App won't start:**
- Check if you have sufficient RAM (4GB minimum)
- Ensure you have internet connection for initial setup
- Try reinstalling from the latest release

**Price tracking not working:**
- Verify your internet connection
- Check if the e-commerce sites are accessible
- Restart the application

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/affx08/carto/issues)
- Check the [Releases page](https://github.com/affx08/carto/releases) for the latest version
- Make sure you're using the latest release before reporting issues

---

**Made with ❤️ by the Carto Team**

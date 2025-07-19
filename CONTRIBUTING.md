# Contributing to Carto

Thank you for your interest in contributing to Carto! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Basic knowledge of React and Electron

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/carto.git`
3. Install dependencies: `npm install`
4. Start development: `npm run electron-dev`

## 📝 Code Style

### JavaScript/React
- Use ES6+ features
- Prefer functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow the existing code style in the project

### CSS/Styling
- Use Material-UI components when possible
- Follow the glass-morphism design theme
- Use CSS-in-JS with Emotion for custom styles
- Maintain responsive design principles

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- System information (OS, Node.js version, etc.)

## 💡 Feature Requests

For feature requests:
- Describe the feature clearly
- Explain why it would be useful
- Provide examples if possible
- Consider the impact on existing functionality

## 🔧 Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the code style
3. **Test thoroughly** - ensure the app builds and runs correctly
4. **Update documentation** if needed
5. **Commit with clear messages** using conventional commits
6. **Push to your fork** and create a pull request
7. **Wait for review** and address any feedback

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(cart): add bulk delete functionality`
- `fix(ui): resolve button alignment issue`
- `docs(readme): update installation instructions`

## 🧪 Testing

Before submitting a PR:
- [ ] App builds successfully (`npm run build`)
- [ ] Electron app runs without errors (`npm run electron`)
- [ ] Development mode works (`npm run electron-dev`)
- [ ] No console errors or warnings
- [ ] UI looks correct on different screen sizes

## 📋 Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the project's code of conduct

## 📞 Getting Help

- Check existing issues and discussions
- Join our community discussions
- Ask questions in issues with the `question` label

Thank you for contributing to Carto! 🎉 
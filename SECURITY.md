# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

### 1. **DO NOT** create a public GitHub issue
Security vulnerabilities should be reported privately to avoid potential exploitation.

### 2. Email us directly
Send an email to [your-email@example.com] with the following information:

- **Subject**: `[SECURITY] Carto Vulnerability Report`
- **Description**: Clear description of the vulnerability
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Impact**: Potential impact of the vulnerability
- **Suggested fix**: If you have any suggestions for fixing the issue

### 3. What happens next?
- We will acknowledge receipt within 48 hours
- We will investigate and provide updates on our progress
- We will work with you to validate the fix
- We will coordinate the disclosure timeline

### 4. Responsible disclosure
- We ask for reasonable time to fix the issue before public disclosure
- We will credit you in our security advisories (unless you prefer to remain anonymous)
- We will work with you to ensure the fix is properly tested

## Security Best Practices

### For Users
- Keep your Carto app updated to the latest version
- Don't share sensitive information in public repositories
- Use strong, unique passwords for your accounts
- Enable two-factor authentication where available

### For Developers
- Follow secure coding practices
- Validate all user inputs
- Use HTTPS for all external communications
- Keep dependencies updated
- Review code for potential security issues

## Security Features

Carto implements several security measures:

- **Input Validation**: All user inputs are validated and sanitized
- **Secure Storage**: Sensitive data is encrypted when stored locally
- **HTTPS Only**: All external API calls use HTTPS
- **No Remote Code Execution**: The app doesn't execute remote code
- **Regular Updates**: Security patches are released regularly

## Known Issues

Currently, there are no known security vulnerabilities in Carto.

## Security Updates

Security updates are released as patch versions (e.g., 1.0.1, 1.0.2). Users are encouraged to update as soon as possible when security patches are available.

---

Thank you for helping keep Carto secure! 🔒 
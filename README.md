# QR Meal Authentication System

A comprehensive Angular-based frontend application for managing meal authentication using QR codes in institutional settings (e.g., universities, cafeterias). The system enables students to generate encrypted QR codes for meal verification, while administrators can scan and validate these codes.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Known Issues](#known-issues)
- [Security Considerations](#security-considerations)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Project Overview

The QR Meal Authentication System is designed to digitize and secure meal distribution in institutional cafeterias. It replaces traditional paper-based or card-based meal systems with a secure, QR-code-based authentication mechanism.

### Use Cases

1. **Students/Users**: Register, log in, view meal plans, generate encrypted QR codes for meal redemption, and track meal history.
2. **Administrators**: Scan and validate QR codes, search for users, and manage meal distributions.

## ✨ Features

### User Features
- **User Registration & Authentication**: Secure registration with email, password, name, and matriculation number
- **Dashboard**: View personal information, meal plan details, meals remaining, and meals used
- **QR Code Generation**: Generate encrypted, signed QR codes for meal authentication
- **Meal History**: View complete history of consumed meals with timestamps

### Admin Features
- **Admin Dashboard**: Overview of meal requests and active users
- **QR Code Scanner**: Real-time QR code scanning using device camera
- **QR Validation**: Decrypt, verify signatures, and validate meal eligibility
- **User Search**: Search and view user details by matriculation number
- **Meal Time Detection**: Automatic meal type assignment (breakfast, lunch, supper) based on scan time

### Security Features
- **AES Encryption**: QR code data is encrypted using AES encryption
- **HMAC Signing**: Data integrity verification using HMAC-SHA256 signatures
- **JWT Authentication**: Bearer token-based API authentication
- **Duplicate Scan Prevention**: Prevents the same QR code from being scanned multiple times

## 🛠 Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Angular 19.2.0 |
| UI Components | Angular Material 19.2.2 |
| QR Code Generation | ng-qrcode 19.0.1 |
| QR Code Scanning | @zxing/ngx-scanner 19.0.0 |
| Encryption | crypto-js 4.2.0 |
| HTTP Client | Angular HttpClient |
| Routing | Angular Router |
| Forms | Reactive Forms |
| State Management | RxJS 7.8.0 |
| Testing | Jasmine + Karma |
| Deployment | Netlify |

## 🏗 Architecture

### Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     Landing Page                             │
│                  (Public - Unauthenticated)                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
┌───────────────┐           ┌───────────────┐
│    Login      │           │   Register    │
└───────┬───────┘           └───────────────┘
        │
        ▼ (Role-based routing)
┌───────────────────────────────────────────────────────────┐
│                                                           │
│  ┌─────────────────────┐    ┌─────────────────────────┐  │
│  │   User Dashboard    │    │    Admin Dashboard      │  │
│  │  - View Meal Plan   │    │  - Scan QR Codes        │  │
│  │  - Generate QR      │    │  - Validate Meals       │  │
│  │  - Meal History     │    │  - Search Users         │  │
│  └─────────────────────┘    └─────────────────────────┘  │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### QR Code Flow

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   User Data      │ ──▶ │   HMAC Sign      │ ──▶ │   AES Encrypt    │
│   + Timestamp    │     │   (Integrity)    │     │   (Security)     │
└──────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                           │
                                                           ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Validate &     │ ◀── │   Verify HMAC    │ ◀── │   AES Decrypt    │
│   Consume Meal   │     │   Signature      │     │   QR Code        │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

### Meal Plans

| Meal ID | Plan Description |
|---------|------------------|
| 1 | Breakfast & Lunch |
| 2 | Breakfast & Supper |
| 3 | Lunch & Supper |
| 4 | Breakfast, Lunch & Supper |

### Meal Time Windows

| Meal Type | Time Range |
|-----------|------------|
| Breakfast | 6:30 AM - 10:00 AM |
| Lunch | 12:00 PM - 3:00 PM |
| Supper | 5:00 PM - 8:00 PM |

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- Angular CLI 19.2.0

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qr-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## ⚙️ Configuration

### Environment Files

The application uses environment-specific configuration files:

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://qr-auth-backend-iv1n.onrender.com'
};
```

### Encryption Keys

> ⚠️ **SECURITY WARNING**: The encryption keys in the codebase are placeholder values and must be changed before production deployment.

Located in:
- `src/app/user/user-dashboard/user-dashboard.component.ts`
- `src/app/admin/qr-scanner/qr-scanner.component.ts`

```typescript
const secretKey = 'your-encryption-key';  // Change this!
const hmacKey = 'your-signing-key';       // Change this!
```

## 🚀 Usage

### For Users

1. **Register**: Navigate to `/register` and create an account with your email, name, matriculation number, and password.
2. **Login**: Sign in at `/login` with your credentials.
3. **View Dashboard**: See your meal plan, remaining meals, and meal history.
4. **Generate QR Code**: Click "Generate QR Code" to create an encrypted QR code for meal verification.
5. **Present QR Code**: Show the QR code to cafeteria staff for scanning.

### For Administrators

1. **Login**: Sign in with admin credentials.
2. **Scan QR Codes**: Click "Scan QR Code" to activate the camera scanner.
3. **Validate Meals**: The system automatically validates, decrypts, and processes the QR code.
4. **Search Users**: Use the user search feature to look up users by matriculation number.

## 🔌 API Endpoints

The frontend communicates with a backend API. Key endpoints include:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | User registration |
| POST | `/api/v1/auth/login` | User authentication |
| GET | `/api/v1/auth/curr-user` | Get current user details |
| GET | `/api/v1/meal/history/{userId}` | Get user's meal history |
| GET | `/api/v1/user-meal/user-meal-status` | Get meals left/used status |
| POST | `/api/v1/meal/consume` | Record meal consumption |
| GET | `/api/v1/users` | Get all users (admin) |
| POST | `/api/v1/user-meal/get-user-meal-by-mat-no` | Search user by matric number |

## 📁 Project Structure

```
qr-frontend/
├── src/
│   ├── app/
│   │   ├── admin/                    # Admin-specific components
│   │   │   ├── admin-dashboard/      # Admin main dashboard
│   │   │   ├── admin-user-search/    # User search functionality
│   │   │   └── qr-scanner/           # QR code scanning component
│   │   │
│   │   ├── auth/                     # Authentication module
│   │   │   ├── login/                # Login component
│   │   │   ├── register/             # Registration component
│   │   │   └── auth.service.ts       # Authentication service
│   │   │
│   │   ├── intro/                    # Public pages
│   │   │   ├── landing-page/         # Landing page component
│   │   │   └── images/               # Landing page images
│   │   │
│   │   ├── user/                     # User-specific components
│   │   │   ├── user-dashboard/       # User main dashboard
│   │   │   ├── qr-generation/        # QR code generation
│   │   │   ├── qr-history/           # Meal history view
│   │   │   └── user.service.ts       # User service
│   │   │
│   │   ├── app-routing.module.ts     # Application routes
│   │   ├── app.module.ts             # Main application module
│   │   └── app.component.*           # Root component
│   │
│   ├── environments/                 # Environment configurations
│   └── index.html                    # Main HTML file
│
├── angular.json                      # Angular CLI configuration
├── package.json                      # NPM dependencies
├── netlify.toml                      # Netlify deployment config
└── tsconfig.json                     # TypeScript configuration
```

## ⚠️ Known Issues & Resolved Items

### ✅ Resolved Issues

The following issues have been identified and fixed:

1. **Git Merge Conflicts** - ✅ RESOLVED
   - All merge conflicts across 20+ files have been resolved
   - Files affected: `angular.json`, `app.module.ts`, `app-routing.module.ts`, `app.component.*`, auth components, user components, config files, and CSS files

2. **Hardcoded Encryption Keys** - ✅ RESOLVED
   - Encryption keys moved to environment configuration files
   - Location: `src/environments/environment.ts` and `src/environments/environment.prod.ts`
   - Components updated: `user-dashboard.component.ts`, `qr-scanner.component.ts`

3. **Missing Route Guards** - ✅ RESOLVED
   - Added `AuthGuard` for authentication protection
   - Added `AdminGuard` for role-based access control
   - Protected routes: `/user-dashboard`, `/qr-history`, `/admin-dashboard`, `/scan`, `/user-search`
   - Location: `src/app/auth/guards/`

4. **Missing Wildcard Route** - ✅ RESOLVED
   - Added `{ path: '**', redirectTo: '' }` for 404 handling

5. **Unused Imports** - ✅ RESOLVED
   - Cleaned up `app.module.ts` - removed `HttpBackend`, `FormBuilder`, `FormGroup`, `Validators`
   - Cleaned up `user-dashboard.component.ts` - removed `HostListener`, `QrGenerationComponent`

6. **README Duplication** - ✅ RESOLVED
   - Replaced duplicated content with comprehensive documentation

### Remaining Considerations

1. **Client-Side Encryption**
   - Issue: Encryption/decryption occurs on the client side
   - Risk: **MEDIUM** - Keys are exposed in browser JavaScript
   - Recommendation: Consider server-side QR code generation/validation for enhanced security

2. **Token Storage in localStorage**
   - Issue: JWT tokens stored in localStorage are vulnerable to XSS attacks
   - Recommendation: Consider using httpOnly cookies or more secure storage mechanisms

3. **Landing Page HTML Structure**
   - Contains full HTML document structure (`<!DOCTYPE>`, `<html>`, `<head>`, `<body>`) within a component template
   - Should only contain component-specific HTML

4. **DOM Manipulation in Component**
   - `app.component.ts` uses direct DOM manipulation (`document.getElementById`, `classList`)
   - Recommendation: Use Angular's built-in mechanisms (ViewChild, Renderer2, or template bindings)

## 🔐 Security Considerations

### Recommended Security Improvements

1. **Implement Route Guards**
   ```typescript
   // auth.guard.ts
   @Injectable({ providedIn: 'root' })
   export class AuthGuard implements CanActivate {
     canActivate(): boolean {
       return !!localStorage.getItem('token');
     }
   }
   ```

2. **Move Encryption to Backend**
   - Generate QR codes server-side
   - Validate QR codes server-side only

3. **Implement Token Refresh**
   - Add automatic token refresh mechanism
   - Handle token expiration gracefully

4. **Add Input Validation**
   - Sanitize all user inputs
   - Implement proper error handling

## 🌐 Deployment

### Netlify (Current Configuration)

The project is configured for Netlify deployment via `netlify.toml`:

```toml
[build]
  base = "./"
  command = "npm run build"
  publish = "dist/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Build Commands

```bash
# Development build
ng build

# Production build
ng build --configuration production

# Run tests
ng test

# Run with watch mode
ng build --watch --configuration development
```

## 🧪 Testing

```bash
# Run unit tests
ng test

# Run e2e tests (requires additional setup)
ng e2e
```

## 🤝 Contributing

1. Fork the repository
2. **Resolve all merge conflicts first**
3. Create a feature branch (`git checkout -b feature/amazing-feature`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

**Note**: This project requires a compatible backend API server. The production backend is hosted at `https://qr-auth-backend-iv1n.onrender.com`.

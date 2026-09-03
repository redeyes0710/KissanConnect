# KissanConnect — Frontend Source
> Exported from the Google AI Studio project ZIP. This document contains the project's text/source files as code blocks, organized by their original paths. The code is preserved as exported; no functional code changes were made during conversion.
## Purpose
This Markdown file is intended to let the KissanConnect team review and use the existing frontend while implementing backend APIs, authentication, database integration, AI demand forecasting, and logistics services.
## Project files included
- `README.md`- `package.json`- `tsconfig.json`- `vite.config.ts`- `index.html`- `.gitignore`- `.env.example`- `metadata.json`- `src/App.tsx`- `src/components/auth/AuthLayout.tsx`- `src/components/auth/AuthSuccessPage.tsx`- `src/components/auth/BuyerRegisterPage.tsx`- `src/components/auth/BuyerSignInPage.tsx`- `src/components/auth/CreateAccountPage.tsx`- `src/components/auth/FarmerRegisterPage.tsx`- `src/components/auth/FarmerSignInPage.tsx`- `src/components/auth/RegisterRolePage.tsx`- `src/components/auth/SignInEntryPage.tsx`- `src/components/auth/index.ts`- `src/components/buyer/BuyerDashboard.tsx`- `src/components/buyer/BuyerOrders.tsx`- `src/components/buyer/BuyerPortal.tsx`- `src/components/buyer/Marketplace.tsx`- `src/components/buyer/ProductDetailsModal.tsx`- `src/components/common/Badge.tsx`- `src/components/common/Button.tsx`- `src/components/common/Card.tsx`- `src/components/common/DemoBanner.tsx`- `src/components/common/EmptyState.tsx`- `src/components/common/Footer.tsx`- `src/components/common/Modal.tsx`- `src/components/common/Navbar.tsx`- `src/components/common/Sidebar.tsx`- `src/components/common/Toast.tsx`- `src/components/farmer/AddProductForm.tsx`- `src/components/farmer/DemandIntelligence.tsx`- `src/components/farmer/FarmerDashboard.tsx`- `src/components/farmer/FarmerOrders.tsx`- `src/components/farmer/FarmerPortal.tsx`- `src/components/farmer/MyProducts.tsx`- `src/components/landing/LandingPage.tsx`- `src/components/logistics/LogisticsPage.tsx`- `src/context/AppContext.tsx`- `src/data/indiaLocations.ts`- `src/data/syntheticData.ts`- `src/index.css`- `src/main.tsx`- `src/services/authService.ts`- `src/services/demandService.ts`- `src/services/logisticsService.ts`- `src/services/orderService.ts`- `src/services/productService.ts`- `src/types/index.ts`
---
## `README.md`
````markdown
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/3ce5c79a-48bc-495a-bde9-45868e1b27d2

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
````

---
## `package.json`
````json
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "lucide-react": "^0.546.0",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^6.2.3",
    "express": "^4.21.2",
    "dotenv": "^17.2.3",
    "motion": "^12.23.24"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.3",
    "@types/express": "^4.17.21"
  }
}
````

---
## `tsconfig.json`
````json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
````

---
## `vite.config.ts`
````ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// LINT.IfChange(aistudio_media_plugin)
function aistudioMediaPlugin(): Plugin {
  return {
    name: 'vite-plugin-aistudio-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/aistudio/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const decodedPath = decodeURIComponent(rawPath);
            const relativePath = decodedPath.replace(/^\//, '');
            const aistudioDir = path.resolve(
              __dirname,
              'public',
              'assets',
              'aistudio',
            );
            const filePath = path.resolve(__dirname, 'public', relativePath);
            if (
              filePath.startsWith(aistudioDir + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.bmp': 'image/bmp',
                '.ico': 'image/x-icon',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.ogv': 'video/ogg',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.pdf': 'application/pdf',
              };
              res.setHeader(
                'Content-Type',
                mimeMap[ext] || 'application/octet-stream',
              );
              res.setHeader('Cache-Control', 'no-cache');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if URI decoding or file access fails
          }
        }
        next();
      });
    },
  };
}
// LINT.ThenChange(//depot/google3/java/com/google/alkali/boq/makersuite/applet_dev_service/templates/initializers/react_theme/vite.config.ts:aistudio_media_plugin)

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aistudioMediaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
````

---
## `index.html`
````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KissanConnect - Direct Farmer to Buyer Digital Marketplace</title>
    <meta name="description" content="Connect farmers directly with buyers, simplify produce trading, understand demand, and improve delivery." />
    <meta property="og:title" content="KissanConnect - Direct Farmer to Buyer Marketplace" />
    <meta property="og:description" content="Connect farmers directly with buyers, simplify produce trading, understand demand, and improve delivery." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

---
## `.gitignore`
````text
node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
````

---
## `.env.example`
````text
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"
````

---
## `metadata.json`
````json
{
  "name": "KissanConnect",
  "description": "Digital marketplace connecting farmers and FPOs directly with bulk buyers, featuring produce listings, order tracking, synthetic demand intelligence, and delivery route optimization.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}
````

---
## `src/App.tsx`
````tsx
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { LandingPage } from './components/landing/LandingPage';
import { FarmerPortal } from './components/farmer/FarmerPortal';
import { BuyerPortal } from './components/buyer/BuyerPortal';
import { LogisticsPage } from './components/logistics/LogisticsPage';
import {
  SignInEntryPage,
  FarmerSignInPage,
  BuyerSignInPage,
  RegisterRolePage,
  CreateAccountPage,
  FarmerRegisterPage,
  BuyerRegisterPage,
  AuthSuccessPage,
} from './components/auth';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      // Authentication Routes
      case 'auth-signin':
        return <SignInEntryPage />;
      case 'auth-farmer-signin':
      case 'farmer-login':
        return <FarmerSignInPage />;
      case 'auth-buyer-signin':
      case 'buyer-login':
        return <BuyerSignInPage />;
      case 'auth-register-role':
        return <CreateAccountPage />;
      case 'auth-farmer-register':
        return <FarmerRegisterPage />;
      case 'auth-buyer-register':
        return <BuyerRegisterPage />;
      case 'auth-success':
        return <AuthSuccessPage />;
      // Farmer Portal Routes
      case 'farmer-dashboard':
      case 'farmer-add-product':
      case 'farmer-products':
      case 'farmer-product-details':
      case 'farmer-orders':
      case 'farmer-demand':
        return <FarmerPortal />;
      // Buyer Portal Routes
      case 'buyer-dashboard':
      case 'buyer-marketplace':
      case 'buyer-product-details':
      case 'buyer-orders':
        return <BuyerPortal />;
      // Logistics
      case 'logistics':
        return <LogisticsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-950 font-sans antialiased">
      <Navbar />
      <div className="flex-1">{renderCurrentView()}</div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
````

---
## `src/components/auth/AuthLayout.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackToLanding?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackToLanding = true,
}) => {
  const { navigate, setRole } = useApp();

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-lg">
        {/* Top brand header */}
        <div className="text-center mb-6">
          <button
            onClick={() => {
              setRole('guest');
              navigate('landing');
            }}
            className="inline-flex items-center gap-2.5 group cursor-pointer focus:outline-none mb-3"
          >
            <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center shadow-xs group-hover:bg-emerald-900 transition-colors">
              <div className="w-5 h-5 bg-emerald-200 rounded-xs rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-800 rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-emerald-950 font-sans">
              KissanConnect
            </span>
          </button>

          {title && (
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Auth Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {children}
        </div>

        {/* Back to Home & Architecture Footnote */}
        <div className="mt-6 flex flex-col items-center gap-3 text-xs text-slate-500">
          {showBackToLanding && (
            <button
              onClick={() => {
                setRole('guest');
                navigate('landing');
              }}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-emerald-800 font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to KissanConnect Overview</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-2 border-t border-slate-200/60 w-full justify-center text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Prototype Phase • Architecture prepared for Supabase Auth & PostgreSQL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
````

---
## `src/components/auth/AuthSuccessPage.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../common/Button';
import { AuthService } from '../../services/authService';
import { CheckCircle2, ArrowRight, ShieldCheck, Database } from 'lucide-react';

export const AuthSuccessPage: React.FC = () => {
  const { navigate, lastRegisteredRole } = useApp();
  const lastRegistered = AuthService.getLastRegistered();
  const targetRole = lastRegistered.role || lastRegisteredRole;

  const handleContinue = () => {
    if (targetRole === 'farmer') {
      navigate('auth-farmer-signin');
    } else if (targetRole === 'buyer') {
      navigate('auth-buyer-signin');
    } else {
      navigate('auth-signin');
    }
  };

  return (
    <AuthLayout showBackToLanding={false}>
      <div className="text-center space-y-6 py-2">
        {/* Animated Checkmark Circle */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Account created successfully
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            {lastRegistered.name
              ? `Welcome to KissanConnect, ${lastRegistered.name}! Your account has been initialized.`
              : 'Your KissanConnect account has been created and verified for the prototype.'}
          </p>
        </div>

        {/* Architecture Note */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Database className="w-4 h-4 text-emerald-700" />
            <span>Supabase Auth & Database Readiness</span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            In this prototype, your profile was loaded into client session memory. In the production deployment, this submission connects directly to Supabase Auth (`supabase.auth.signUp`) and stores encrypted credentials with Row Level Security (RLS) on Supabase PostgreSQL.
          </p>
        </div>

        {/* Primary Action */}
        <div>
          <Button
            id="continue-to-signin-btn"
            type="button"
            variant="primary"
            size="lg"
            onClick={handleContinue}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
          >
            Continue to Sign In
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
````

---
## `src/components/auth/BuyerRegisterPage.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../common/Button';
import { AuthService } from '../../services/authService';
import {
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Building2,
  Lock,
  User,
  MapPin,
  ArrowLeft,
  Globe,
} from 'lucide-react';
import { ALL_INDIAN_STATES, getDistrictsForState } from '../../data/indiaLocations';

export const BuyerRegisterPage: React.FC = () => {
  const { navigate, goBack, showToast, setLastRegisteredRole } = useApp();

  // Personal / Business Details
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  // Address (India-Wide Structure)
  const [country] = useState('India');
  const [addressLine, setAddressLine] = useState('');
  const [cityTown, setCityTown] = useState(''); // Optional: City / Town
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [customDistrict, setCustomDistrict] = useState('');
  const [pinCode, setPinCode] = useState('');

  // Account Security
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validation
  const passwordRules = AuthService.validatePassword(password);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!orgName.trim()) newErrors.orgName = 'Organization / Company Name is required.';

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required.';
    } else if (!AuthService.validateMobile(mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number starting with 6-9.';
    }

    if (email.trim() && !AuthService.validateEmail(email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    // Mandatory address validation (Country: India, State & District mandatory, Full Address mandatory, City NOT mandatory)
    const effectiveDistrict = district === 'Other' ? customDistrict.trim() : district.trim();

    if (!addressLine.trim()) newErrors.addressLine = 'Full Address is required.';
    if (!state.trim()) newErrors.state = 'Please select your State / Union Territory.';
    if (!effectiveDistrict.trim()) newErrors.district = 'Please select or enter your District.';

    if (!pinCode.trim()) {
      newErrors.pinCode = 'PIN Code is mandatory.';
    } else if (!AuthService.validatePinCode(pinCode)) {
      newErrors.pinCode = 'Enter a valid 6-digit Indian PIN code.';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordRules.isValid) {
      newErrors.password = 'Password does not meet all security requirements.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('error', 'Incomplete Form', 'Please correct the highlighted fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const effectiveDistrict = district === 'Other' ? customDistrict.trim() : district.trim();

      AuthService.registerBuyer({
        fullName,
        orgName,
        mobile,
        email: email.trim() || undefined,
        addressLine,
        cityTown: cityTown.trim() || effectiveDistrict,
        district: effectiveDistrict,
        state,
        pinCode,
        password,
      });

      setLastRegisteredRole('buyer');
      showToast('success', 'Account Prepared', 'Buyer account created in prototype state.');
      navigate('auth-success');
    }, 500);
  };

  return (
    <AuthLayout
      title="Create Buyer Account"
      subtitle="Register your wholesale, retail, or food processing company to source bulk produce directly."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: PERSONAL / BUSINESS DETAILS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              1. Personal / Business Details
            </h2>
          </div>

          <div className="space-y-1">
            <label htmlFor="buyer-fullname" className="block text-xs font-semibold text-slate-800">
              Full Name <span className="text-rose-600">*</span>
            </label>
            <input
              id="buyer-fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Vikram Mehta"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.fullName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.fullName && <p className="text-[11px] text-rose-600 font-medium">{errors.fullName}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="buyer-orgname" className="block text-xs font-semibold text-slate-800">
              Organization / Company Name <span className="text-rose-600">*</span>
            </label>
            <input
              id="buyer-orgname"
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. FreshBazaar Retail & Supermarkets Ltd."
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.orgName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.orgName && <p className="text-[11px] text-rose-600 font-medium">{errors.orgName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="buyer-mobile" className="block text-xs font-semibold text-slate-800">
                Mobile Number <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                  +91
                </span>
                <input
                  id="buyer-mobile"
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="9890155678"
                  className={`w-full pl-11 pr-3 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                    errors.mobile ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-[11px] text-rose-600 font-medium">{errors.mobile}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="buyer-email" className="block text-xs font-semibold text-slate-800">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="buyer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="procurement@freshbazaar.com"
                className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.email ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* SECTION 2: MANDATORY ADDRESS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Business Address <span className="text-rose-600">*</span>
              </h2>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-700" /> All-India Coverage
            </span>
          </div>

          {/* Country & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="buyer-country" className="block text-xs font-semibold text-slate-800">
                Country <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="buyer-country"
                  type="text"
                  readOnly
                  value="India"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700 cursor-not-allowed select-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                  🇮🇳 Domestic
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="buyer-state" className="block text-xs font-semibold text-slate-800">
                State / Union Territory <span className="text-rose-600">*</span>
              </label>
              <select
                id="buyer-state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setDistrict('');
                  setCustomDistrict('');
                }}
                className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-900 bg-white transition-colors cursor-pointer ${
                  errors.state
                    ? 'border-rose-400 bg-rose-50/40'
                    : 'border-slate-300 focus:border-emerald-600'
                }`}
              >
                <option value="">-- Select State / UT --</option>
                {ALL_INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.state}</p>
              )}
            </div>
          </div>

          {/* District & City/Town (City is NOT mandatory) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="buyer-district" className="block text-xs font-semibold text-slate-800">
                District <span className="text-rose-600">*</span>
              </label>
              <select
                id="buyer-district"
                disabled={!state}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-900 bg-white transition-colors ${
                  !state
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                    : errors.district
                    ? 'border-rose-400 bg-rose-50/40 cursor-pointer'
                    : 'border-slate-300 focus:border-emerald-600 cursor-pointer'
                }`}
              >
                <option value="">
                  {state ? '-- Select District --' : 'Select State first'}
                </option>
                {state &&
                  getDistrictsForState(state).map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                {state && <option value="Other">Other / Not Listed</option>}
              </select>
              {district === 'Other' && (
                <input
                  id="buyer-custom-district"
                  type="text"
                  placeholder="Enter your district name"
                  value={customDistrict}
                  onChange={(e) => setCustomDistrict(e.target.value)}
                  className="w-full mt-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:border-emerald-600"
                />
              )}
              {errors.district && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.district}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="buyer-city" className="block text-xs font-semibold text-slate-800">
                City / Town <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="buyer-city"
                type="text"
                value={cityTown}
                onChange={(e) => setCityTown(e.target.value)}
                placeholder="e.g. Navi Mumbai / Ahmedabad / Ludhiana"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-600 transition-colors"
              />
              <p className="text-[10px] text-slate-400">Optional commercial center or market name.</p>
            </div>
          </div>

          {/* Full Address Line */}
          <div className="space-y-1">
            <label htmlFor="buyer-address" className="block text-xs font-semibold text-slate-800">
              Full Business Address (Premises / Plot / Street){' '}
              <span className="text-rose-600">*</span>
            </label>
            <input
              id="buyer-address"
              type="text"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="e.g. Plot 58, APMC Commercial Complex, Sector 19"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.addressLine ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.addressLine && <p className="text-[11px] text-rose-600 font-medium">{errors.addressLine}</p>}
          </div>

          {/* PIN Code */}
          <div className="space-y-1">
            <label htmlFor="buyer-pincode" className="block text-xs font-semibold text-slate-800">
              Postal PIN Code <span className="text-rose-600">*</span>
            </label>
            <input
              id="buyer-pincode"
              type="text"
              maxLength={6}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="e.g. 400703 or 110033"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.pinCode ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.pinCode && <p className="text-[11px] text-rose-600 font-medium">{errors.pinCode}</p>}
          </div>
        </div>

        {/* SECTION 3: ACCOUNT SECURITY */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
            <Lock className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              3. Account Security
            </h2>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="buyer-password" className="block text-xs font-semibold text-slate-800">
              Password <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                id="buyer-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters with upper, lower, number, special"
                className={`w-full px-3.5 py-2 pr-10 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.password ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="mt-2 space-y-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-600">Password Strength:</span>
                  <span className={`font-bold ${passwordRules.isValid ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {passwordRules.strengthText}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordRules.strengthColor}`}
                    style={{ width: `${(passwordRules.score / 5) * 100}%` }}
                  ></div>
                </div>

                {/* Requirements Checklist */}
                <div className="grid grid-cols-2 gap-1 pt-1 text-[11px]">
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasMinLength ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasMinLength ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>At least 8 chars</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasUppercase ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasUppercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>1 Uppercase (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasLowercase ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasLowercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>1 Lowercase (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasNumber ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasNumber ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>1 Number (0-9)</span>
                  </div>
                  <div className={`col-span-2 flex items-center gap-1.5 ${passwordRules.hasSpecialChar ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasSpecialChar ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>1 Special Character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>
            )}
            {errors.password && <p className="text-[11px] text-rose-600 font-medium">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label htmlFor="buyer-confirm-password" className="block text-xs font-semibold text-slate-800">
              Confirm Password <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                id="buyer-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full px-3.5 py-2 pr-10 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.confirmPassword ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-[11px] text-rose-600 font-medium">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            id="create-buyer-account-submit-btn"
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold"
          >
            Create Buyer Account
          </Button>
        </div>

        {/* Already have an account */}
        <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('auth-buyer-signin')}
            className="font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
          >
            Sign In
          </button>
        </div>

        {/* Back button */}
        <div className="text-center pt-2">
          <button
            type="button"
            id="buyer-register-back-btn"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back</span>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};
````

---
## `src/components/auth/BuyerSignInPage.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../common/Button';
import { Store, Eye, EyeOff, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { AuthService } from '../../services/authService';
import { DEMO_BUYER_PROFILES } from '../../data/syntheticData';

export const BuyerSignInPage: React.FC = () => {
  const { navigate, goBack, login, showToast } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your email address or mobile number.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Match entered identifier against registered demo profiles, or fall back to primary buyer profile
      const all = AuthService.getAllBuyers();
      const match = all.find(
        (b) =>
          b.phone?.includes(identifier.trim()) ||
          b.email?.toLowerCase() === identifier.trim().toLowerCase()
      );
      const activeProfile = match || DEMO_BUYER_PROFILES[0];

      login('buyer', activeProfile.id);
      showToast(
        'success',
        'Signed In (Demo)',
        `Welcome back, ${activeProfile.name} (${activeProfile.orgName})`
      );
      navigate('buyer-dashboard');
    }, 450);
  };

  const handleForgotPassword = () => {
    showToast(
      'info',
      'Password Reset (Demo)',
      'In production, a password reset link will be sent to your registered email or mobile.'
    );
  };

  return (
    <AuthLayout
      title="Sign In as Buyer"
      subtitle="Source verified bulk produce directly from FPOs across Maharashtra."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role badge */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
            <Store className="w-4 h-4 text-emerald-700" />
            <span>Buyer & Retailer Portal</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Demo Mode</span>
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
            {errorMessage}
          </div>
        )}

        {/* Email or Mobile */}
        <div className="space-y-1.5">
          <label
            htmlFor="buyer-identifier-input"
            className="block text-xs font-semibold text-slate-800"
          >
            Mobile Number or Email
          </label>
          <input
            id="buyer-identifier-input"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. vmehta@freshbazaar.com or 9890155678"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="buyer-password-input"
              className="block text-xs font-semibold text-slate-800"
            >
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
            >
              Forgot Password
            </button>
          </div>
          <div className="relative">
            <input
              id="buyer-password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer"
            />
            <span className="text-xs text-slate-600">Remember me</span>
          </label>
        </div>

        {/* Sign In Button */}
        <Button
          id="buyer-signin-submit-btn"
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          leftIcon={<KeyRound className="w-4 h-4" />}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer"
        >
          Sign In
        </Button>

        {/* Don't have a KissanConnect account? */}
        <div className="pt-3 border-t border-slate-100 text-center space-y-2">
          <p className="text-xs text-slate-500">Don't have a KissanConnect account?</p>
          <button
            type="button"
            id="buyer-create-account-link"
            onClick={() => navigate('auth-register-role')}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
          >
            Create an Account
          </button>
        </div>

        {/* Back */}
        <div className="text-center pt-2">
          <button
            type="button"
            id="buyer-signin-back-btn"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back</span>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};
````

---
## `src/components/auth/CreateAccountPage.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../common/Button';
import { AuthService } from '../../services/authService';
import {
  Tractor,
  Store,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
  User,
  MapPin,
  IdCard,
  Building2,
  Info,
  Check,
  Globe,
} from 'lucide-react';
import { ALL_INDIAN_STATES, getDistrictsForState } from '../../data/indiaLocations';

type SelectedRole = 'farmer' | 'buyer';

export const CreateAccountPage: React.FC = () => {
  const { navigate, goBack, showToast, setLastRegisteredRole } = useApp();

  // 1. Account Type Selection (Farmer / FPO or Buyer)
  const [selectedRole, setSelectedRole] = useState<SelectedRole>('farmer');

  // 2. Basic Registration Fields (All initially empty for manual testing)
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState(''); // For Buyer / FPO

  // Farmer / FPO specific: Aadhaar Prototype placeholder
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false);

  // Address (India-Wide Structure)
  const [country] = useState('India');
  const [addressLine, setAddressLine] = useState('');
  const [villageTownCity, setVillageTownCity] = useState(''); // Optional: Village / Town / City
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [customDistrict, setCustomDistrict] = useState('');
  const [pinCode, setPinCode] = useState('');

  // Password & Security
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validation analysis
  const passwordRules = AuthService.validatePassword(password);

  // Prototype Aadhaar simulation (UI only — no real backend or verification)
  const handlePrototypeVerifyAadhaar = () => {
    const cleaned = aadhaarNumber.replace(/[^0-9]/g, '');
    if (cleaned.length < 4) {
      setErrors((prev) => ({
        ...prev,
        aadhaar: 'Please enter at least the last 4 digits for this demo prototype.',
      }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.aadhaar;
      return next;
    });

    setIsVerifyingAadhaar(true);
    setTimeout(() => {
      setIsVerifyingAadhaar(false);
      setIsAadhaarVerified(true);
      showToast(
        'info',
        'Prototype Simulation',
        'Demo identity verified for UI testing. Production connects to authorized verification service.'
      );
    }, 500);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Mandatory Full Name
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    // Buyer Organization Name
    if (selectedRole === 'buyer' && !orgName.trim()) {
      newErrors.orgName = 'Business or Organization Name is required.';
    }

    // Mandatory Mobile Number
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required.';
    } else if (!AuthService.validateMobile(mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number (e.g. 9822012345).';
    }

    // Optional Email
    if (email.trim() && !AuthService.validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Mandatory Address Fields (Country: India, State & District mandatory, Full Address mandatory, City NOT mandatory)
    const effectiveDistrict = district === 'Other' ? customDistrict.trim() : district.trim();

    if (!addressLine.trim()) {
      newErrors.addressLine = 'Full Address is required.';
    }
    if (!state.trim()) {
      newErrors.state = 'Please select your State / Union Territory.';
    }
    if (!effectiveDistrict.trim()) {
      newErrors.district = 'Please select or enter your District.';
    }
    // City / Town / Village is optional and NOT mandatory

    if (!pinCode.trim()) {
      newErrors.pinCode = 'PIN Code is required.';
    } else if (!AuthService.validatePinCode(pinCode)) {
      newErrors.pinCode = 'Enter a valid 6-digit Indian PIN code.';
    }

    // Farmer Aadhaar prototype check
    if (selectedRole === 'farmer' && !aadhaarNumber.trim()) {
      newErrors.aadhaar = 'Aadhaar number (or last 4 digits) is required for prototype farmer registration.';
    }

    // Password requirements
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordRules.isValid) {
      newErrors.password =
        'Password must meet all complexity requirements (8+ chars, upper, lower, number, special).';
    }

    // Confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('error', 'Form Incomplete', 'Please fill in all mandatory fields correctly.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const effectiveDistrict = district === 'Other' ? customDistrict.trim() : district.trim();

      if (selectedRole === 'farmer') {
        const cleanedAadhaar = aadhaarNumber.replace(/[^0-9]/g, '').slice(-4) || '1234';
        AuthService.registerFarmer({
          fullName,
          mobile,
          email: email.trim() || undefined,
          dateOfBirth: '1985-05-15',
          gender: 'Male',
          aadhaarLastFour: cleanedAadhaar,
          isAadhaarVerified: true,
          addressLine,
          villageTownCity: villageTownCity.trim() || effectiveDistrict,
          district: effectiveDistrict,
          state,
          pinCode,
          password,
        });
        setLastRegisteredRole('farmer');
      } else {
        AuthService.registerBuyer({
          fullName,
          orgName: orgName.trim() || `${fullName}'s Trading Co.`,
          mobile,
          email: email.trim() || undefined,
          addressLine,
          cityTown: villageTownCity.trim() || effectiveDistrict,
          district: effectiveDistrict,
          state,
          pinCode,
          password,
        });
        setLastRegisteredRole('buyer');
      }

      showToast(
        'success',
        'Account Created (Demo)',
        `Welcome to KissanConnect! Please sign in with your credentials.`
      );
      navigate('auth-success');
    }, 550);
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join KissanConnect to buy or sell bulk agricultural produce directly across India."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ========================================= */}
        {/* STEP 1: ACCOUNT TYPE SELECTION            */}
        {/* ========================================= */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            1. Select Account Type <span className="text-rose-600">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* Farmer / FPO Option */}
            <button
              type="button"
              id="select-role-farmer-tab"
              onClick={() => {
                setSelectedRole('farmer');
                setErrors({});
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedRole === 'farmer'
                  ? 'border-emerald-700 bg-emerald-50/70 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    selectedRole === 'farmer'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Tractor className="w-4 h-4" />
                </div>
                {selectedRole === 'farmer' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                )}
              </div>
              <div className="mt-2.5">
                <div className="text-xs font-bold text-slate-900">Farmer / FPO</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  Growers, clusters & cooperatives
                </div>
              </div>
            </button>

            {/* Buyer Option */}
            <button
              type="button"
              id="select-role-buyer-tab"
              onClick={() => {
                setSelectedRole('buyer');
                setErrors({});
              }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedRole === 'buyer'
                  ? 'border-slate-900 bg-slate-100 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    selectedRole === 'buyer'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Store className="w-4 h-4" />
                </div>
                {selectedRole === 'buyer' && (
                  <CheckCircle2 className="w-4 h-4 text-slate-900" />
                )}
              </div>
              <div className="mt-2.5">
                <div className="text-xs font-bold text-slate-900">Buyer</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  Wholesalers, retailers & businesses
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================= */}
        {/* STEP 2: BASIC REGISTRATION DETAILS        */}
        {/* ========================================= */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-1">
            <User className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              2. Basic Information
            </h2>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="reg-full-name" className="block text-xs font-semibold text-slate-800">
              Full Name <span className="text-rose-600">*</span>
            </label>
            <input
              id="reg-full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ramesh Patil"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.fullName
                  ? 'border-rose-400 bg-rose-50/40'
                  : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.fullName && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Business / Company Name for Buyer */}
          {selectedRole === 'buyer' && (
            <div className="space-y-1">
              <label htmlFor="reg-org-name" className="block text-xs font-semibold text-slate-800">
                Business / Organization Name <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="reg-org-name"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. FreshBazaar Supermarkets Ltd."
                  className={`w-full pl-10 pr-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                    errors.orgName
                      ? 'border-rose-400 bg-rose-50/40'
                      : 'border-slate-300 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.orgName && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.orgName}</p>
              )}
            </div>
          )}

          {/* Mobile Number & Email Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Mobile */}
            <div className="space-y-1">
              <label htmlFor="reg-mobile" className="block text-xs font-semibold text-slate-800">
                Mobile Number <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                  +91
                </span>
                <input
                  id="reg-mobile"
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="9822012345"
                  className={`w-full pl-11 pr-3 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                    errors.mobile
                      ? 'border-rose-400 bg-rose-50/40'
                      : 'border-slate-300 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.mobile && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.mobile}</p>
              )}
            </div>

            {/* Email (Optional, not assumed available for every user) */}
            <div className="space-y-1">
              <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-800">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.email
                    ? 'border-rose-400 bg-rose-50/40'
                    : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* STEP 3: FARMER AADHAAR (PROTOTYPE ONLY)   */}
        {/* ========================================= */}
        {selectedRole === 'farmer' && (
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <IdCard className="w-4 h-4 text-emerald-700" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  3. Aadhaar Verification <span className="text-rose-600">*</span>
                </h2>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Prototype Placeholder
              </span>
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-aadhaar" className="block text-xs font-semibold text-slate-800">
                Aadhaar Number
              </label>

              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center bg-white rounded-xl border border-slate-300 px-3 py-2 font-mono text-sm">
                  <span className="text-slate-400 select-none mr-2">XXXX XXXX</span>
                  <input
                    id="reg-aadhaar"
                    type="text"
                    maxLength={4}
                    value={aadhaarNumber}
                    onChange={(e) => {
                      setAadhaarNumber(e.target.value.replace(/[^0-9]/g, ''));
                      setIsAadhaarVerified(false);
                    }}
                    placeholder="1234"
                    className="w-20 outline-none text-slate-900 font-bold tracking-wider"
                  />
                </div>

                <Button
                  id="reg-aadhaar-verify-btn"
                  type="button"
                  variant={isAadhaarVerified ? 'secondary' : 'primary'}
                  size="md"
                  isLoading={isVerifyingAadhaar}
                  onClick={handlePrototypeVerifyAadhaar}
                  className={
                    isAadhaarVerified
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 cursor-pointer'
                      : 'bg-emerald-700 hover:bg-emerald-800 cursor-pointer'
                  }
                >
                  {isAadhaarVerified ? '✓ Verified (Demo)' : 'Verify Demo'}
                </Button>
              </div>

              {errors.aadhaar && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.aadhaar}</p>
              )}

              {/* Prototype Notice */}
              <div className="flex items-start gap-1.5 p-2 bg-amber-50/70 border border-amber-200/80 rounded-lg text-[11px] text-amber-900 leading-snug">
                <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Simulation Only:</strong> The Aadhaar field is a frontend UI placeholder
                  for the future verified registration system. Real Aadhaar numbers are never collected,
                  verified against UIDAI, or stored.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* STEP 4: MANDATORY ADDRESS SECTION (INDIA) */}
        {/* ========================================= */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {selectedRole === 'farmer' ? '4.' : '3.'} Address Details{' '}
                <span className="text-rose-600">*</span>
              </h2>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-700" /> All-India Coverage
            </span>
          </div>

          {/* Country & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="reg-country" className="block text-xs font-semibold text-slate-800">
                Country <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-country"
                  type="text"
                  readOnly
                  value="India"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700 cursor-not-allowed select-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                  🇮🇳 Domestic
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-state" className="block text-xs font-semibold text-slate-800">
                State / Union Territory <span className="text-rose-600">*</span>
              </label>
              <select
                id="reg-state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setDistrict('');
                  setCustomDistrict('');
                }}
                className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-900 bg-white transition-colors cursor-pointer ${
                  errors.state
                    ? 'border-rose-400 bg-rose-50/40'
                    : 'border-slate-300 focus:border-emerald-600'
                }`}
              >
                <option value="">-- Select State / UT --</option>
                {ALL_INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.state}</p>
              )}
            </div>
          </div>

          {/* District & City/Town (City is NOT mandatory) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="reg-district" className="block text-xs font-semibold text-slate-800">
                District <span className="text-rose-600">*</span>
              </label>
              <select
                id="reg-district"
                disabled={!state}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-900 bg-white transition-colors ${
                  !state
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                    : errors.district
                    ? 'border-rose-400 bg-rose-50/40 cursor-pointer'
                    : 'border-slate-300 focus:border-emerald-600 cursor-pointer'
                }`}
              >
                <option value="">
                  {state ? '-- Select District --' : 'Select State first'}
                </option>
                {state &&
                  getDistrictsForState(state).map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                {state && <option value="Other">Other / Not Listed</option>}
              </select>
              {district === 'Other' && (
                <input
                  id="reg-custom-district"
                  type="text"
                  placeholder="Enter your district name"
                  value={customDistrict}
                  onChange={(e) => setCustomDistrict(e.target.value)}
                  className="w-full mt-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:border-emerald-600"
                />
              )}
              {errors.district && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.district}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-village-city" className="block text-xs font-semibold text-slate-800">
                Village / Town / City <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="reg-village-city"
                type="text"
                value={villageTownCity}
                onChange={(e) => setVillageTownCity(e.target.value)}
                placeholder="e.g. Dindori / Khanna / Anand"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-600 transition-colors"
              />
              <p className="text-[10px] text-slate-400">Optional detail for local route optimization.</p>
            </div>
          </div>

          {/* Full Address Line */}
          <div className="space-y-1">
            <label htmlFor="reg-address-line" className="block text-xs font-semibold text-slate-800">
              Full Address (Street / Gat No. / Farm / Business Unit){' '}
              <span className="text-rose-600">*</span>
            </label>
            <input
              id="reg-address-line"
              type="text"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="e.g. Gat No. 142, Post Dindori, Near APMC Market"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.addressLine
                  ? 'border-rose-400 bg-rose-50/40'
                  : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.addressLine && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.addressLine}</p>
            )}
          </div>

          {/* PIN Code */}
          <div className="space-y-1">
            <label htmlFor="reg-pincode" className="block text-xs font-semibold text-slate-800">
              Postal PIN Code <span className="text-rose-600">*</span>
            </label>
            <input
              id="reg-pincode"
              type="text"
              maxLength={6}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="e.g. 422202 or 141001"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.pinCode
                  ? 'border-rose-400 bg-rose-50/40'
                  : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.pinCode && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.pinCode}</p>
            )}
          </div>
        </div>

        {/* ========================================= */}
        {/* STEP 5: ACCOUNT SECURITY & PASSWORD       */}
        {/* ========================================= */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-1">
            <Lock className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {selectedRole === 'farmer' ? '5.' : '4.'} Account Password{' '}
              <span className="text-rose-600">*</span>
            </h2>
          </div>

          {/* Password Input with Toggle */}
          <div className="space-y-1">
            <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-800">
              Password <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a secure password"
                className={`w-full px-3.5 py-2 pr-10 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.password
                    ? 'border-rose-400 bg-rose-50/40'
                    : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Live Password Requirements Checklist */}
            {password.length > 0 && (
              <div className="mt-2 space-y-1.5 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-600">Password Strength:</span>
                  <span
                    className={`font-bold ${
                      passwordRules.isValid ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {passwordRules.strengthText}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordRules.strengthColor}`}
                    style={{ width: `${(passwordRules.score / 5) * 100}%` }}
                  ></div>
                </div>

                {/* Requirements Checklist */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  <div
                    className={`flex items-center gap-1.5 ${
                      passwordRules.hasMinLength ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {passwordRules.hasMinLength ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-slate-300" />
                    )}
                    <span>8+ characters</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 ${
                      passwordRules.hasUppercase ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {passwordRules.hasUppercase ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-slate-300" />
                    )}
                    <span>1 Uppercase (A-Z)</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 ${
                      passwordRules.hasLowercase ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {passwordRules.hasLowercase ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-slate-300" />
                    )}
                    <span>1 Lowercase (a-z)</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 ${
                      passwordRules.hasNumber ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {passwordRules.hasNumber ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-slate-300" />
                    )}
                    <span>1 Number (0-9)</span>
                  </div>
                  <div
                    className={`col-span-2 flex items-center gap-1.5 ${
                      passwordRules.hasSpecialChar ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {passwordRules.hasSpecialChar ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-slate-300" />
                    )}
                    <span>1 Special Character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <label htmlFor="reg-confirm-password" className="block text-xs font-semibold text-slate-800">
              Confirm Password <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                id="reg-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full px-3.5 py-2 pr-10 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.confirmPassword
                    ? 'border-rose-400 bg-rose-50/40'
                    : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-rose-600 font-medium">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* ========================================= */}
        {/* SUBMIT BUTTON                             */}
        {/* ========================================= */}
        <div className="pt-2">
          <Button
            id="create-account-submit-btn"
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className={`w-full font-semibold cursor-pointer ${
              selectedRole === 'farmer'
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            Create Account as {selectedRole === 'farmer' ? 'Farmer / FPO' : 'Buyer'}
          </Button>
        </div>

        {/* Already have an account link */}
        <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() =>
              navigate(selectedRole === 'farmer' ? 'auth-farmer-signin' : 'auth-buyer-signin')
            }
            className="font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
          >
            Sign In
          </button>
        </div>

        {/* Clean Back Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            id="create-account-back-btn"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back</span>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};
````

---
## `src/components/auth/FarmerRegisterPage.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../common/Button';
import { AuthService } from '../../services/authService';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  Building2,
  Lock,
  User,
  MapPin,
  IdCard,
  ArrowLeft,
  Globe,
} from 'lucide-react';
import { ALL_INDIAN_STATES, getDistrictsForState } from '../../data/indiaLocations';

export const FarmerRegisterPage: React.FC = () => {
  const { navigate, goBack, showToast, setLastRegisteredRole } = useApp();

  // Personal Details
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');

  // Aadhaar Demo Verification
  const [aadhaarLastFour, setAadhaarLastFour] = useState('');
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false);

  // Address (India-Wide Structure)
  const [country] = useState('India');
  const [addressLine, setAddressLine] = useState('');
  const [villageTownCity, setVillageTownCity] = useState(''); // Optional: Village / Town / City
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [customDistrict, setCustomDistrict] = useState('');
  const [pinCode, setPinCode] = useState('');

  // Account Security
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI state
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validation state
  const passwordRules = AuthService.validatePassword(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  // Simulate Aadhaar verification
  const handleVerifyAadhaar = () => {
    if (!aadhaarLastFour.trim() || aadhaarLastFour.replace(/[^0-9]/g, '').length !== 4) {
      setErrors((prev) => ({
        ...prev,
        aadhaar: 'Please enter 4 digits for the demo masked Aadhaar (e.g. 7890).',
      }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.aadhaar;
      return next;
    });

    setIsVerifyingAadhaar(true);
    setTimeout(() => {
      setIsVerifyingAadhaar(false);
      setIsAadhaarVerified(true);
      showToast('success', 'Aadhaar Verified (Demo)', 'Identity verified for prototype simulation.');
    }, 600);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required.';
    } else if (!AuthService.validateMobile(mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number starting with 6-9.';
    }

    if (email.trim() && !AuthService.validateEmail(email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required.';
    if (!gender) newErrors.gender = 'Gender is required.';

    // Mandatory address validation (Country: India, State & District mandatory, Full Address mandatory, City NOT mandatory)
    const effectiveDistrict = district === 'Other' ? customDistrict.trim() : district.trim();

    if (!addressLine.trim()) newErrors.addressLine = 'Full Address is required.';
    if (!state.trim()) newErrors.state = 'Please select your State / Union Territory.';
    if (!effectiveDistrict.trim()) newErrors.district = 'Please select or enter your District.';

    if (!pinCode.trim()) {
      newErrors.pinCode = 'PIN Code is mandatory.';
    } else if (!AuthService.validatePinCode(pinCode)) {
      newErrors.pinCode = 'Enter a valid 6-digit Indian PIN code.';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!passwordRules.isValid) {
      newErrors.password = 'Password does not meet all security requirements.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedOnce(true);

    if (!validateForm()) {
      showToast('error', 'Incomplete Form', 'Please correct the highlighted fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const effectiveDistrict = district === 'Other' ? customDistrict.trim() : district.trim();

      AuthService.registerFarmer({
        fullName,
        mobile,
        email: email.trim() || undefined,
        dateOfBirth,
        gender,
        aadhaarLastFour: aadhaarLastFour.replace(/[^0-9]/g, '').slice(-4),
        isAadhaarVerified,
        addressLine,
        villageTownCity: villageTownCity.trim() || effectiveDistrict,
        district: effectiveDistrict,
        state,
        pinCode,
        password,
      });

      setLastRegisteredRole('farmer');
      showToast('success', 'Account Prepared', 'Farmer profile created in prototype state.');
      navigate('auth-success');
    }, 500);
  };

  return (
    <AuthLayout
      title="Create Farmer / FPO Account"
      subtitle="Join India's direct agricultural network to list produce and trade with bulk buyers nationwide."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: PERSONAL DETAILS */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
            <User className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              1. Personal Details
            </h2>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="farmer-name" className="block text-xs font-semibold text-slate-800">
              Full Name <span className="text-rose-600">*</span>
            </label>
            <input
              id="farmer-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ramesh Patil"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.fullName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.fullName && <p className="text-[11px] text-rose-600 font-medium">{errors.fullName}</p>}
          </div>

          {/* Mobile & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="farmer-mobile" className="block text-xs font-semibold text-slate-800">
                Mobile Number <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                  +91
                </span>
                <input
                  id="farmer-mobile"
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="9822044123"
                  className={`w-full pl-11 pr-3 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                    errors.mobile ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-[11px] text-rose-600 font-medium">{errors.mobile}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="farmer-email" className="block text-xs font-semibold text-slate-800">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="farmer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ramesh@sahyadrifpo.in"
                className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.email ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
            </div>
          </div>

          {/* DOB & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="farmer-dob" className="block text-xs font-semibold text-slate-800">
                Date of Birth <span className="text-rose-600">*</span>
              </label>
              <input
                id="farmer-dob"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.dateOfBirth ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              {errors.dateOfBirth && <p className="text-[11px] text-rose-600 font-medium">{errors.dateOfBirth}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="farmer-gender" className="block text-xs font-semibold text-slate-800">
                Gender <span className="text-rose-600">*</span>
              </label>
              <select
                id="farmer-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-600 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: IDENTITY VERIFICATION (AADHAAR PROTOTYPE) */}
        <div className="space-y-3 p-4 bg-slate-50/90 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <IdCard className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Identity Verification
              </h2>
            </div>
            <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded">
              Prototype Mock
            </span>
          </div>

          <div className="space-y-2">
            <label htmlFor="farmer-aadhaar-input" className="block text-xs font-semibold text-slate-800">
              Aadhaar Verification
            </label>

            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center bg-white rounded-xl border border-slate-300 px-3 py-2 font-mono text-sm">
                <span className="text-slate-400 select-none mr-2">XXXX XXXX</span>
                <input
                  id="farmer-aadhaar-input"
                  type="text"
                  maxLength={4}
                  value={aadhaarLastFour}
                  onChange={(e) => {
                    setAadhaarLastFour(e.target.value.replace(/[^0-9]/g, ''));
                    setIsAadhaarVerified(false);
                  }}
                  placeholder="1234"
                  className="w-16 outline-none text-slate-900 font-bold"
                />
              </div>

              <Button
                id="verify-aadhaar-btn"
                type="button"
                variant={isAadhaarVerified ? 'secondary' : 'primary'}
                size="md"
                isLoading={isVerifyingAadhaar}
                onClick={handleVerifyAadhaar}
                className={isAadhaarVerified ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-700'}
              >
                {isAadhaarVerified ? 'Verify Aadhaar' : 'Verify Aadhaar'}
              </Button>
            </div>

            {errors.aadhaar && <p className="text-[11px] text-rose-600 font-medium">{errors.aadhaar}</p>}

            {/* Verification Status Badge */}
            {isAadhaarVerified ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 p-2 bg-emerald-100/60 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>✓ Aadhaar verification completed — DEMO</span>
                </div>
                <p className="text-[11px] text-slate-500 italic px-1">
                  Production version will use an authorized identity-verification service.
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-1.5 text-[11px] text-slate-500 leading-tight">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Production version will use an authorized identity-verification service.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: MANDATORY ADDRESS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Farm / Residence Address <span className="text-rose-600">*</span>
              </h2>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-700" /> All-India Coverage
            </span>
          </div>

          {/* Country & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="farmer-country" className="block text-xs font-semibold text-slate-800">
                Country <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="farmer-country"
                  type="text"
                  readOnly
                  value="India"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700 cursor-not-allowed select-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                  🇮🇳 Domestic
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="farmer-state" className="block text-xs font-semibold text-slate-800">
                State / Union Territory <span className="text-rose-600">*</span>
              </label>
              <select
                id="farmer-state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setDistrict('');
                  setCustomDistrict('');
                }}
                className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-900 bg-white transition-colors cursor-pointer ${
                  errors.state
                    ? 'border-rose-400 bg-rose-50/40'
                    : 'border-slate-300 focus:border-emerald-600'
                }`}
              >
                <option value="">-- Select State / UT --</option>
                {ALL_INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.state}</p>
              )}
            </div>
          </div>

          {/* District & City/Town (City is NOT mandatory) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="farmer-district" className="block text-xs font-semibold text-slate-800">
                District <span className="text-rose-600">*</span>
              </label>
              <select
                id="farmer-district"
                disabled={!state}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-900 bg-white transition-colors ${
                  !state
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200'
                    : errors.district
                    ? 'border-rose-400 bg-rose-50/40 cursor-pointer'
                    : 'border-slate-300 focus:border-emerald-600 cursor-pointer'
                }`}
              >
                <option value="">
                  {state ? '-- Select District --' : 'Select State first'}
                </option>
                {state &&
                  getDistrictsForState(state).map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                {state && <option value="Other">Other / Not Listed</option>}
              </select>
              {district === 'Other' && (
                <input
                  id="farmer-custom-district"
                  type="text"
                  placeholder="Enter your district name"
                  value={customDistrict}
                  onChange={(e) => setCustomDistrict(e.target.value)}
                  className="w-full mt-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:border-emerald-600"
                />
              )}
              {errors.district && (
                <p className="text-[11px] text-rose-600 font-medium">{errors.district}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="farmer-village" className="block text-xs font-semibold text-slate-800">
                Village / Town / City <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="farmer-village"
                type="text"
                value={villageTownCity}
                onChange={(e) => setVillageTownCity(e.target.value)}
                placeholder="e.g. Dindori / Khanna / Anand"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-600 transition-colors"
              />
              <p className="text-[10px] text-slate-400">Optional village or local area name.</p>
            </div>
          </div>

          {/* Full Address Line */}
          <div className="space-y-1">
            <label htmlFor="farmer-address-line" className="block text-xs font-semibold text-slate-800">
              Full Address (Gat No. / Survey No. / Farm Locality){' '}
              <span className="text-rose-600">*</span>
            </label>
            <input
              id="farmer-address-line"
              type="text"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="e.g. Gat No. 142, Post Dindori, Near Sub-Market"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.addressLine ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.addressLine && <p className="text-[11px] text-rose-600 font-medium">{errors.addressLine}</p>}
          </div>

          {/* PIN Code */}
          <div className="space-y-1">
            <label htmlFor="farmer-pincode" className="block text-xs font-semibold text-slate-800">
              Postal PIN Code <span className="text-rose-600">*</span>
            </label>
            <input
              id="farmer-pincode"
              type="text"
              maxLength={6}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="e.g. 422202 or 141001"
              className={`w-full px-3.5 py-2 rounded-xl border text-sm text-slate-900 transition-colors ${
                errors.pinCode ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
              }`}
            />
            {errors.pinCode && <p className="text-[11px] text-rose-600 font-medium">{errors.pinCode}</p>}
          </div>
        </div>

        {/* SECTION 4: ACCOUNT SECURITY */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
            <Lock className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              4. Account Security
            </h2>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="farmer-password" className="block text-xs font-semibold text-slate-800">
              Password <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                id="farmer-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters with upper, lower, number, special"
                className={`w-full px-3.5 py-2 pr-10 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.password ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="mt-2 space-y-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-600">Password Strength:</span>
                  <span className={`font-bold ${passwordRules.isValid ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {passwordRules.strengthText}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordRules.strengthColor}`}
                    style={{ width: `${(passwordRules.score / 5) * 100}%` }}
                  ></div>
                </div>

                {/* Requirements Checklist */}
                <div className="grid grid-cols-2 gap-1 pt-1 text-[11px]">
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasMinLength ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasMinLength ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>At least 8 chars</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasUppercase ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasUppercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>1 Uppercase (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasLowercase ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasLowercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>1 Lowercase (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasNumber ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasNumber ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>1 Number (0-9)</span>
                  </div>
                  <div className={`col-span-2 flex items-center gap-1.5 ${passwordRules.hasSpecialChar ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                    {passwordRules.hasSpecialChar ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5 text-slate-300" />}
                    <span>1 Special Character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>
            )}
            {errors.password && <p className="text-[11px] text-rose-600 font-medium">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label htmlFor="farmer-confirm-password" className="block text-xs font-semibold text-slate-800">
              Confirm Password <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <input
                id="farmer-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full px-3.5 py-2 pr-10 rounded-xl border text-sm text-slate-900 transition-colors ${
                  errors.confirmPassword ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-[11px] text-rose-600 font-medium">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            id="create-farmer-account-submit-btn"
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
          >
            Create Farmer Account
          </Button>
        </div>

        {/* Already have an account */}
        <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('auth-farmer-signin')}
            className="font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
          >
            Sign In
          </button>
        </div>

        {/* Back button */}
        <div className="text-center pt-2">
          <button
            type="button"
            id="farmer-register-back-btn"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back</span>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};
````

---
## `src/components/auth/FarmerSignInPage.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../common/Button';
import { Tractor, Eye, EyeOff, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { AuthService } from '../../services/authService';
import { DEMO_FARMER_PROFILES } from '../../data/syntheticData';

export const FarmerSignInPage: React.FC = () => {
  const { navigate, goBack, login, showToast } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Please enter your mobile number or email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Simulated demo auth
    setTimeout(() => {
      setIsLoading(false);
      // Match entered identifier against registered demo profiles, or fall back to primary farmer profile
      const all = AuthService.getAllFarmers();
      const match = all.find(
        (f) =>
          f.phone?.includes(identifier.trim()) ||
          f.email?.toLowerCase() === identifier.trim().toLowerCase()
      );
      const activeProfile = match || DEMO_FARMER_PROFILES[0];

      login('farmer', activeProfile.id);
      showToast(
        'success',
        'Signed In (Demo)',
        `Welcome back, ${activeProfile.name} (${activeProfile.orgName})`
      );
      navigate('farmer-dashboard');
    }, 450);
  };

  const handleForgotPassword = () => {
    showToast(
      'info',
      'Password Reset (Demo)',
      'In production, an SMS OTP / verification link will be sent to your registered contact.'
    );
  };

  return (
    <AuthLayout
      title="Sign In as Farmer / FPO"
      subtitle="Access your agricultural dashboard, list harvest produce, and track buyer requests."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role badge */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Tractor className="w-4 h-4 text-emerald-700" />
            <span>Farmer / FPO Portal</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Demo Mode</span>
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs">
            {errorMessage}
          </div>
        )}

        {/* Mobile Number or Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="farmer-identifier-input"
            className="block text-xs font-semibold text-slate-800"
          >
            Mobile Number or Email
          </label>
          <input
            id="farmer-identifier-input"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. 9822044123 or ramesh@sahyadrifpo.in"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="farmer-password-input"
              className="block text-xs font-semibold text-slate-800"
            >
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
            >
              Forgot Password
            </button>
          </div>
          <div className="relative">
            <input
              id="farmer-password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer"
            />
            <span className="text-xs text-slate-600">Remember me</span>
          </label>
        </div>

        {/* Sign In Button */}
        <Button
          id="farmer-signin-submit-btn"
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          leftIcon={<KeyRound className="w-4 h-4" />}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold cursor-pointer"
        >
          Sign In
        </Button>

        {/* Don't have a KissanConnect account? */}
        <div className="pt-3 border-t border-slate-100 text-center space-y-2">
          <p className="text-xs text-slate-500">Don't have a KissanConnect account?</p>
          <button
            type="button"
            id="farmer-create-account-link"
            onClick={() => navigate('auth-register-role')}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-emerald-800 transition-colors cursor-pointer"
          >
            Create an Account
          </button>
        </div>

        {/* Back button */}
        <div className="text-center pt-2">
          <button
            type="button"
            id="farmer-signin-back-btn"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back</span>
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};
````

---
## `src/components/auth/RegisterRolePage.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { Tractor, Store, ArrowRight, ArrowLeft } from 'lucide-react';

export const RegisterRolePage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <AuthLayout
      title="Create your KissanConnect account"
      subtitle="Join Maharashtra's direct agricultural network to transform wholesale crop trade."
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 text-center">
            Choose your account type
          </h2>
          <p className="text-xs text-slate-500 text-center mt-1">
            Select the profile that best describes your agricultural or business operations.
          </p>
        </div>

        {/* The Two Roles */}
        <div className="space-y-3">
          {/* Farmer / FPO */}
          <button
            id="register-role-farmer-btn"
            onClick={() => navigate('auth-farmer-register')}
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-700 bg-white hover:bg-emerald-50/40 text-slate-900 transition-all group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Tractor className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-900">
                  Farmer / FPO
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Individual farmers, clusters, cooperatives, and Farmer Producer Organizations.
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>

          {/* Buyer */}
          <button
            id="register-role-buyer-btn"
            onClick={() => navigate('auth-buyer-register')}
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-700 bg-white hover:bg-slate-50 text-slate-900 transition-all group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-900">
                  Buyer
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Wholesalers, retailers, food processors, exporters, and institution buyers.
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        </div>

        {/* Already have an account? */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-3">
          <div className="text-xs text-slate-500">
            Already have an account?{' '}
            <button
              id="register-signin-link"
              onClick={() => navigate('auth-signin')}
              className="font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
            >
              Sign In
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => navigate('auth-signin')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Sign In Options</span>
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
````

---
## `src/components/auth/SignInEntryPage.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { Tractor, Store, ArrowRight, UserPlus, ArrowLeft } from 'lucide-react';

export const SignInEntryPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <AuthLayout
      title="Welcome to KissanConnect"
      subtitle="Maharashtra's direct agricultural marketplace connecting farmers, FPOs, and bulk buyers."
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 text-center">
            How do you want to sign in?
          </h2>
          <p className="text-xs text-slate-500 text-center mt-1">
            Choose your account role to access your personalized portal.
          </p>
        </div>

        {/* The Two Main Choices */}
        <div className="space-y-3">
          {/* Sign in as Farmer / FPO */}
          <button
            id="signin-role-farmer-btn"
            onClick={() => navigate('auth-farmer-signin')}
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-emerald-700/30 hover:border-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 text-slate-900 transition-all group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Tractor className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-900">
                  Sign in as Farmer / FPO
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Manage crop listings, forward contracts, and dispatch logistics.
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>

          {/* Sign in as Buyer */}
          <button
            id="signin-role-buyer-btn"
            onClick={() => navigate('auth-buyer-signin')}
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-700 bg-white hover:bg-slate-50 text-slate-900 transition-all group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-900">
                  Sign in as Buyer
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Source fresh lots directly, place bulk orders, and trace shipments.
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        </div>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-slate-500 font-medium">
              Don't have an account?
            </span>
          </div>
        </div>

        {/* Create Account Button */}
        <div>
          <button
            id="signin-create-account-btn"
            onClick={() => navigate('auth-register-role')}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <UserPlus className="w-4 h-4 text-emerald-700" />
            <span>Create an Account</span>
          </button>
        </div>

        {/* Back button */}
        <div className="text-center pt-2">
          <button
            type="button"
            id="signin-entry-back-btn"
            onClick={() => navigate('landing')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
````

---
## `src/components/auth/index.ts`
````ts
export { AuthLayout } from './AuthLayout';
export { SignInEntryPage } from './SignInEntryPage';
export { FarmerSignInPage } from './FarmerSignInPage';
export { BuyerSignInPage } from './BuyerSignInPage';
export { RegisterRolePage } from './RegisterRolePage';
export { CreateAccountPage } from './CreateAccountPage';
export { FarmerRegisterPage } from './FarmerRegisterPage';
export { BuyerRegisterPage } from './BuyerRegisterPage';
export { AuthSuccessPage } from './AuthSuccessPage';
````

---
## `src/components/buyer/BuyerDashboard.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Store,
  Truck,
  CheckCircle2,
  ArrowRight,
  Package,
} from 'lucide-react';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/Badge';

export const BuyerDashboard: React.FC = () => {
  const { buyerProfile, orders, products, navigate, setMarketplaceFilter } = useApp();

  const buyerOrders = orders.filter((o) => o.buyerId === buyerProfile.id);
  const activeOrders = buyerOrders.filter(
    (o) => o.status === 'Pending' || o.status === 'Approved' || o.status === 'Shipped'
  );
  const completedOrders = buyerOrders.filter((o) => o.status === 'Delivered');

  const totalSpent = buyerOrders.reduce((acc, o) => acc + o.totalPrice, 0);
  const totalVolume = buyerOrders.reduce((acc, o) => acc + o.quantity, 0);

  const recentOrders = buyerOrders.slice(0, 5);

  const categories = [
    { name: 'Vegetables', count: products.filter((p) => p.category === 'Vegetables' && p.isActive).length },
    { name: 'Fruits', count: products.filter((p) => p.category === 'Fruits' && p.isActive).length },
    { name: 'Grains & Pulses', count: products.filter((p) => p.category === 'Grains & Pulses' && p.isActive).length },
    { name: 'Spices', count: products.filter((p) => p.category === 'Spices' && p.isActive).length },
    { name: 'Oilseeds', count: products.filter((p) => p.category === 'Oilseeds' && p.isActive).length },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Welcome, {buyerProfile.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {buyerProfile.orgName} • {buyerProfile.location}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            id="buyer-dash-marketplace-btn"
            variant="primary"
            size="sm"
            onClick={() => navigate('buyer-marketplace')}
            leftIcon={<Store className="w-4 h-4" />}
          >
            Browse Marketplace
          </Button>
          <Button
            id="buyer-dash-orders-btn"
            variant="outline"
            size="sm"
            onClick={() => navigate('buyer-orders')}
          >
            My Orders ({buyerOrders.length})
          </Button>
        </div>
      </div>

      {/* 2. 4 Important Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium block">Active Orders</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {activeOrders.length}
          </div>
          <span className="text-xs text-slate-400 mt-0.5 block">
            {activeOrders.filter((o) => o.status === 'Shipped').length} in transit
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium block">Volume Procured</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {totalVolume}{' '}
            <span className="text-xs font-normal text-slate-500">Quintals</span>
          </div>
          <span className="text-xs text-slate-400 mt-0.5 block">From verified FPOs</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium block">Total Spend</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            ₹{totalSpent.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 mt-0.5 block">Direct procurement</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium block">Completed Orders</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {completedOrders.length}
          </div>
          <span className="text-xs text-emerald-700 font-medium mt-0.5 block">
            Delivered successfully
          </span>
        </div>
      </div>

      {/* 3. Main Content: Orders & 4. Secondary Information: Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Orders List */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Purchase Orders</h2>
              <p className="text-xs text-slate-500 mt-0.5">Track your ongoing wholesale orders</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate('buyer-orders')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View All
            </Button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No orders placed yet. Browse the marketplace to source produce directly.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{order.productName}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-slate-600">
                      Seller: <span className="font-medium text-slate-800">{order.fpoName || order.farmerName}</span>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {order.quantity} {order.unit}s • ₹{order.totalPrice.toLocaleString('en-IN')} • Delivery: {order.deliveryDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate('buyer-orders')}
                    >
                      Track Order
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Secondary: Produce Categories */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Browse by Category
            </h2>
            <div className="space-y-1.5">
              {categories.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setMarketplaceFilter((prev) => ({ ...prev, category: c.name }));
                    navigate('buyer-marketplace');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{c.name}</span>
                  <span className="text-slate-400 text-[11px] font-normal">{c.count} lots</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
              Logistics & Support
            </h2>
            <button
              onClick={() => navigate('logistics')}
              className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>View Route Optimization</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
````

---
## `src/components/buyer/BuyerOrders.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';

export const BuyerOrders: React.FC = () => {
  const { buyerProfile, orders, navigate } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const buyerOrders = orders.filter((o) => o.buyerId === buyerProfile.id);

  const filteredOrders = buyerOrders.filter((order) => {
    if (statusFilter !== 'All' && order.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSeller =
        (order.fpoName && order.fpoName.toLowerCase().includes(q)) ||
        order.farmerName.toLowerCase().includes(q);
      const matchProd = order.productName.toLowerCase().includes(q);
      const matchId = order.id.toLowerCase().includes(q);
      if (!matchSeller && !matchProd && !matchId) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            My Purchase Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track order approvals, dispatches, and incoming wholesale deliveries.
          </p>
        </div>

        <Button
          id="buyer-orders-browse-btn"
          variant="primary"
          size="sm"
          onClick={() => navigate('buyer-marketplace')}
        >
          Browse Marketplace
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="search-buyer-orders"
            type="text"
            placeholder="Search by Order ID, Producer FPO, or Crop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Pending', 'Approved', 'Shipped', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          title="No Orders Found"
          description="You don't have any purchase orders matching the current filter."
          actionLabel="Browse Marketplace"
          onAction={() => navigate('buyer-marketplace')}
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl border border-slate-200 space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    #{order.id}
                  </span>
                  <span className="font-bold text-sm text-slate-900">
                    {order.productName}
                  </span>
                  <StatusBadge status={order.status} />
                </div>

                <div className="text-sm font-bold text-slate-900">
                  ₹{order.totalPrice.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">Producer / FPO</span>
                  <span className="font-medium text-slate-800">
                    {order.fpoName || order.farmerName}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Quantity & Price</span>
                  <span className="font-medium text-slate-800">
                    {order.quantity} {order.unit}s @ ₹{order.pricePerUnit}/{order.unit}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Delivery Expected</span>
                  <span className="font-medium text-slate-800">
                    {order.deliveryDate}
                  </span>
                </div>
              </div>

              {/* Destination & Tracking */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{order.deliveryLocation}</span>
                </div>

                {order.trackingNumber && (
                  <div className="font-mono text-emerald-800 font-medium">
                    Route Code: {order.trackingNumber}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
````

---
## `src/components/buyer/BuyerPortal.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { BuyerDashboard } from './BuyerDashboard';
import { Marketplace } from './Marketplace';
import { BuyerOrders } from './BuyerOrders';
import { ProductDetailsModal } from './ProductDetailsModal';
import { DemoBanner } from '../common/DemoBanner';

export const BuyerPortal: React.FC = () => {
  const { currentView, selectedProductId, navigate } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'buyer-marketplace':
      case 'buyer-product-details':
        return <Marketplace />;
      case 'buyer-orders':
        return <BuyerOrders />;
      case 'buyer-dashboard':
      default:
        return <BuyerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <Sidebar role="buyer" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        <DemoBanner
          moduleTitle="Buyer Procurement & Marketplace Portal"
          futureIntegration="Supabase Tables & Secure Escrow Payment Gateway APIs"
          details="Browse live harvest batches, filter by regional agri-corridors, and place synthetic bulk procurement orders with instant live inventory deduction."
        />
        {renderView()}

        {/* Product Details Modal if active */}
        {selectedProductId && (
          <ProductDetailsModal
            productId={selectedProductId}
            onClose={() => navigate('buyer-marketplace', undefined)}
          />
        )}
      </main>
    </div>
  );
};
````

---
## `src/components/buyer/Marketplace.tsx`
````tsx
import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductService } from '../../services/productService';
import {
  Search,
  MapPin,
  Building2,
  RotateCcw,
} from 'lucide-react';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';

export const Marketplace: React.FC = () => {
  const { products, marketplaceFilter, setMarketplaceFilter, resetMarketplaceFilter, navigate } = useApp();

  // Extract unique locations and categories for filter dropdowns
  const uniqueLocations = useMemo(() => {
    const locs = Array.from(new Set(products.map((p) => p.location)));
    return ['All', ...locs];
  }, [products]);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains & Pulses', 'Spices', 'Oilseeds'];

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return ProductService.filterProducts(products, marketplaceFilter);
  }, [products, marketplaceFilter]);

  return (
    <div className="space-y-8">
      {/* 5. SEARCH AREA (Prominent & Spacious at the top) */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 text-center max-w-4xl mx-auto shadow-xs">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 mb-3 border border-emerald-100">
          <Search className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Search Fresh Produce
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Find quality produce from verified farmers and FPOs
        </p>

        {/* Large Prominent Search Input */}
        <div className="mt-5 max-w-2xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            id="marketplace-search-input"
            type="text"
            placeholder="Search crops, categories, farmers, or locations..."
            value={marketplaceFilter.searchQuery}
            onChange={(e) =>
              setMarketplaceFilter((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
          />
        </div>
      </section>

      {/* 6. HORIZONTAL FILTERS ROW */}
      <section className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-center">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Category
            </label>
            <select
              id="marketplace-category-select"
              value={marketplaceFilter.category}
              onChange={(e) =>
                setMarketplaceFilter((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Location
            </label>
            <select
              id="marketplace-location-select"
              value={marketplaceFilter.location}
              onChange={(e) =>
                setMarketplaceFilter((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Locations' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Price Range
            </label>
            <select
              id="marketplace-price-range-select"
              value={marketplaceFilter.maxPrice}
              onChange={(e) =>
                setMarketplaceFilter((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="20000">Any Price</option>
              <option value="2000">Up to ₹2,000 / unit</option>
              <option value="5000">Up to ₹5,000 / unit</option>
              <option value="10000">Up to ₹10,000 / unit</option>
              <option value="15000">Up to ₹15,000 / unit</option>
            </select>
          </div>

          {/* Availability / Sort Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Sort & Availability
            </label>
            <select
              id="marketplace-sort-select"
              value={marketplaceFilter.sortBy}
              onChange={(e) =>
                setMarketplaceFilter((prev) => ({
                  ...prev,
                  sortBy: e.target.value as any,
                }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="recent">Latest Listed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="qty-desc">Available: High to Low</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="col-span-2 sm:col-span-1 flex items-end">
            <button
              id="marketplace-reset-filters-btn"
              onClick={resetMarketplaceFilter}
              className="w-full py-2 px-3 text-xs font-medium text-slate-700 hover:text-emerald-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. AVAILABLE PRODUCE SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Available Produce
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredProducts.length} results
          </span>
        </div>

        {/* 8 & 9. PRODUCT GRID (Desktop 4 columns, clean essential info) */}
        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No Produce Found"
            description="No crops match your current search or filter criteria."
            actionLabel="Reset Filters"
            onAction={resetMarketplaceFilter}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  {/* 1. Product Image (consistent aspect ratio) */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details Section */}
                  <div className="p-4 space-y-2">
                    {/* 2. Product Name */}
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {product.name}
                    </h3>

                    {/* 3. Farmer / FPO */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate font-medium">
                        {product.fpoName || product.farmerName}
                      </span>
                    </div>

                    {/* 4. Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{product.location}</span>
                    </div>

                    {/* 5. Price & 6. Available Quantity */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Price</span>
                        <span className="font-bold text-slate-900 text-sm">
                          ₹{product.pricePerUnit.toLocaleString('en-IN')}/{product.unit}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Available</span>
                        <span className="font-semibold text-emerald-800">
                          {product.quantity} {product.unit}s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 7. View Details Button */}
                <div className="p-4 pt-0">
                  <Button
                    id={`marketplace-view-details-${product.id}`}
                    size="sm"
                    variant="primary"
                    className="w-full"
                    onClick={() => navigate('buyer-product-details', product.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
````

---
## `src/components/buyer/ProductDetailsModal.tsx`
````tsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductService } from '../../services/productService';
import {
  X,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  ShoppingBag,
  Plus,
  Minus,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '../common/Button';
import { GradeBadge } from '../common/Badge';

interface ProductDetailsModalProps {
  productId: string;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  productId,
  onClose,
}) => {
  const { buyerProfile, placeOrder, navigate, goBack } = useApp();
  const product = ProductService.getById(productId);

  const [orderQuantity, setOrderQuantity] = useState<number>(5);
  const [deliveryAddress, setDeliveryAddress] = useState(
    `${buyerProfile.orgName} Warehouse, ${buyerProfile.location}`
  );
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0]
  );
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  // Close on Escape key & prevent body scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (orderSuccess) {
          setOrderSuccess(null);
        } else {
          onClose();
        }
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, orderSuccess]);

  // Set initial quantity to minOrderQuantity or default
  useEffect(() => {
    if (product) {
      const min = product.minOrderQuantity || 1;
      const initial = Math.min(product.quantity, Math.max(min, 5));
      setOrderQuantity(initial);
    }
  }, [product]);

  if (!product) {
    return null;
  }

  // Cost calculation
  const produceCost = orderQuantity * product.pricePerUnit;
  const handlingFeePerUnit = product.unit === 'kg' ? 2 : 40;
  const estHandlingCost = orderQuantity * handlingFeePerUnit;
  const totalAmount = produceCost + estHandlingCost;

  const handleIncrease = () => {
    if (orderQuantity < product.quantity) {
      setOrderQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    const min = product.minOrderQuantity || 1;
    if (orderQuantity > min) {
      setOrderQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setOrderQuantity(product.minOrderQuantity || 1);
      return;
    }
    const clamped = Math.max(
      product.minOrderQuantity || 1,
      Math.min(product.quantity, num)
    );
    setOrderQuantity(clamped);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuantity <= 0 || orderQuantity > product.quantity) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const createdOrder = placeOrder({
        productId: product.id,
        productName: product.name,
        category: product.category,
        farmerId: product.farmerId,
        farmerName: product.farmerName,
        fpoName: product.fpoName,
        buyerId: buyerProfile.id,
        buyerName: buyerProfile.name,
        buyerCompany: buyerProfile.orgName,
        buyerPhone: buyerProfile.phone,
        quantity: orderQuantity,
        unit: product.unit,
        pricePerUnit: product.pricePerUnit,
        totalPrice: totalAmount,
        handlingFee: estHandlingCost,
        deliveryLocation: deliveryAddress,
        deliveryDate,
        paymentStatus: 'Escrow Secured (Demo)',
        notes: orderNotes.trim() || undefined,
      });

      setIsSubmitting(false);
      setOrderSuccess(createdOrder);
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Clickable Backdrop */}
      <div
        id="modal-backdrop"
        className="fixed inset-0 bg-slate-900/60 transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div
        className="relative bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-3xl overflow-hidden z-10 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <button
              id="back-product-details-modal-btn"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back</span>
            </button>
            <div className="h-4 w-px bg-slate-200" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {orderSuccess ? 'Order Confirmation' : 'Order Produce'}
              </h2>
              <p className="text-xs text-slate-500">
                {orderSuccess
                  ? `Order #${orderSuccess.id}`
                  : `${product.name} • ₹${product.pricePerUnit.toLocaleString('en-IN')} / ${product.unit}`}
              </p>
            </div>
          </div>
          <button
            id="close-product-details-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 p-2 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSuccess ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Order Placed Successfully
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your order for <strong>{orderQuantity} {product.unit}s</strong> of {product.name} from <strong>{product.fpoName || product.farmerName}</strong> has been confirmed.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-lg bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Produce Value</span>
                <span className="font-semibold text-slate-800">₹{produceCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Handling Fee</span>
                <span className="font-semibold text-slate-800">₹{estHandlingCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900 text-sm">
                <span>Total Amount</span>
                <span className="text-emerald-700">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={() => {
                  onClose();
                  navigate('buyer-orders');
                }}
              >
                View My Orders
              </Button>
              <Button
                variant="secondary"
                onClick={() => setOrderSuccess(null)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Product Details
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
              >
                Back to Marketplace
              </Button>
            </div>
          </div>
        ) : (
          /* Product Details & Ordering Form */
          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[75vh] overflow-y-auto">
            {/* Left: Product Info */}
            <div className="p-6 space-y-4 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50">
              <div className="h-44 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">{product.name}</h3>
                  {product.grade && <GradeBadge grade={product.grade} />}
                </div>
                {product.variety && (
                  <p className="text-xs text-slate-500 mt-0.5">Variety: {product.variety}</p>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="font-medium text-slate-800">{product.fpoName || product.farmerName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Ready for dispatch: {product.availableDate}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                {product.description}
              </p>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between text-xs">
                <span className="text-slate-500">Available Stock:</span>
                <span className="font-bold text-emerald-800">{product.quantity} {product.unit}s</span>
              </div>
            </div>

            {/* Right: Order Form */}
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Order Details
              </h3>

              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                {/* Quantity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <label className="font-semibold text-slate-700">
                      Quantity ({product.unit}s)
                    </label>
                    <span className="text-slate-400 text-[11px]">
                      Min: {product.minOrderQuantity || 1} • Max: {product.quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={orderQuantity <= (product.minOrderQuantity || 1)}
                      className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      id="order-quantity-input"
                      type="number"
                      min={product.minOrderQuantity || 1}
                      max={product.quantity}
                      value={orderQuantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="flex-1 text-center font-bold text-base py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={handleIncrease}
                      disabled={orderQuantity >= product.quantity}
                      className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">
                    Delivery Address
                  </label>
                  <input
                    id="order-delivery-address-input"
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {/* Delivery Date */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">
                    Expected Delivery Date
                  </label>
                  <input
                    id="order-delivery-date-input"
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">
                    Special Notes (Optional)
                  </label>
                  <input
                    id="order-notes-input"
                    type="text"
                    placeholder="e.g. Unloading instructions"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {/* Cost Calculation */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Produce ({orderQuantity} {product.unit}s @ ₹{product.pricePerUnit})</span>
                    <span>₹{produceCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Handling Fee</span>
                    <span>₹{estHandlingCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-slate-200 font-bold text-slate-900 text-sm">
                    <span>Total</span>
                    <span className="text-emerald-700">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  id="confirm-place-order-btn"
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  className="w-full"
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                >
                  Place Order (₹{totalAmount.toLocaleString('en-IN')})
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
````

---
## `src/components/common/Badge.tsx`
````tsx
import React from 'react';
import { OrderStatus, ProduceGrade, ProduceCategory } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  const variantClasses = {
    default: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  }[variant];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border whitespace-nowrap ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  switch (status) {
    case 'Pending':
      return <Badge variant="warning">Pending</Badge>;
    case 'Approved':
      return <Badge variant="info">Approved</Badge>;
    case 'Shipped':
      return <Badge variant="info">Shipped</Badge>;
    case 'Delivered':
      return <Badge variant="success">Delivered</Badge>;
    case 'Cancelled':
      return <Badge variant="danger">Cancelled</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};

export const CategoryBadge: React.FC<{ category: ProduceCategory | string }> = ({ category }) => {
  return <Badge variant="neutral">{category}</Badge>;
};

export const GradeBadge: React.FC<{ grade?: ProduceGrade }> = ({ grade }) => {
  if (!grade) return null;
  if (grade === 'Organic Certified') {
    return <Badge variant="success">Organic</Badge>;
  }
  if (grade === 'Grade A+' || grade === 'Grade A') {
    return <Badge variant="default">{grade}</Badge>;
  }
  return <Badge variant="neutral">{grade}</Badge>;
};
````

---
## `src/components/common/Button.tsx`
````tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size];

  const variantClasses = {
    primary:
      'bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white shadow-sm font-semibold focus:ring-2 focus:ring-emerald-600/30 border border-transparent',
    secondary:
      'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-semibold border border-slate-200/80',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 shadow-xs hover:border-slate-300',
    blue:
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm font-semibold focus:ring-2 focus:ring-blue-500/30 border border-transparent',
    danger:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold border border-transparent',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 font-medium',
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center rounded-xl transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2 shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2 shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
````

---
## `src/components/common/Card.tsx`
````tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, id }) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${
        onClick ? 'cursor-pointer hover:border-slate-300 hover:shadow-md transition-all' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`p-5 border-b border-slate-100 flex items-start justify-between gap-4 ${className}`}>
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`p-4 bg-slate-50/80 border-t border-slate-100 rounded-b-2xl ${className}`}>{children}</div>;
};
````

---
## `src/components/common/DemoBanner.tsx`
````tsx
import React, { useState } from 'react';
import { Info, Cpu, Database, ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface DemoBannerProps {
  moduleTitle: string;
  futureIntegration: string;
  details?: string;
  className?: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  moduleTitle,
  futureIntegration,
  details,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1 rounded-md bg-slate-200 text-slate-700 shrink-0 mt-0.5">
            <Info className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-900 text-xs">
                {moduleTitle}
              </span>
              <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                Foundation Phase
              </span>
            </div>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Operating with realistic demo data. Future architecture target: <span className="font-semibold text-slate-900">{futureIntegration}</span>.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1 shrink-0 p-1 rounded hover:bg-slate-200/60 transition-colors cursor-pointer text-xs"
        >
          <span>{isExpanded ? 'Hide Details' : 'Architecture'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
          <div className="flex items-start gap-2">
            <Database className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Database Layer</span>
              <span className="text-[11px] text-slate-500">Structured service layer ready for PostgreSQL/database connector.</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Cpu className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Forecasting API</span>
              <span className="text-[11px] text-slate-500">REST endpoint schema ready for demand model integration.</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Layers className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Routing Engine</span>
              <span className="text-[11px] text-slate-500">Vehicle routing data model ready for optimization engine.</span>
            </div>
          </div>
          {details && (
            <div className="md:col-span-3 text-slate-500 pt-1 border-t border-slate-100 text-[11px]">
              Note: {details}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
````

---
## `src/components/common/EmptyState.tsx`
````tsx
import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <PackageOpen className="w-10 h-10 text-slate-400" />,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 text-slate-500 border border-slate-100">
        {icon}
      </div>
      <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Loading platform records...',
}) => {
  return (
    <div className="p-12 text-center flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-xs font-semibold text-slate-600">{message}</p>
    </div>
  );
};
````

---
## `src/components/common/Footer.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigate, isAuthenticated } = useApp();

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-100 text-xs">
          {/* Brand */}
          <div className="space-y-2 lg:col-span-1">
            <span className="font-bold text-base text-emerald-900">
              KissanConnect
            </span>
            <p className="text-slate-500 leading-relaxed">
              Direct digital agriculture marketplace connecting Maharashtra farmers & FPOs with verified bulk wholesale buyers.
            </p>
          </div>

          {/* Portals */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
              Platform Access
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button
                  onClick={() => {
                    if (isAuthenticated) navigate('farmer-dashboard');
                    else navigate('auth-farmer-signin');
                  }}
                  className="hover:text-emerald-700 cursor-pointer"
                >
                  Farmer / FPO Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (isAuthenticated) navigate('buyer-dashboard');
                    else navigate('auth-buyer-signin');
                  }}
                  className="hover:text-emerald-700 cursor-pointer"
                >
                  Wholesale Buyer Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('auth-register-role')}
                  className="hover:text-emerald-700 cursor-pointer"
                >
                  Create Account
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Features */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
              Features & Marketplace
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <button
                  onClick={() => navigate('buyer-marketplace')}
                  className="hover:text-emerald-700 cursor-pointer"
                >
                  Produce Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('farmer-demand')}
                  className="hover:text-emerald-700 cursor-pointer"
                >
                  Demand Intelligence
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('logistics')}
                  className="hover:text-emerald-700 cursor-pointer"
                >
                  Corridor Logistics
                </button>
              </li>
            </ul>
          </div>

          {/* Foundation Phase Status */}
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 text-[11px]">
              Smart India Hackathon Prototype
            </h4>
            <p className="text-slate-500 leading-relaxed">
              Interactive prototype demonstrating multi-farm consolidation, forward demand discovery, and direct FPO-retailer trade across Maharashtra.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} KissanConnect. All rights reserved.</p>
          <p>Digital Agriculture Marketplace & Route Optimization Engine</p>
        </div>
      </div>
    </footer>
  );
};
````

---
## `src/components/common/Modal.tsx`
````tsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full ${maxWidthClasses} overflow-hidden transform transition-all z-10 my-8`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
````

---
## `src/components/common/Navbar.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  ChevronDown,
  Building2,
  Store,
  Menu,
  X,
  RotateCcw,
  Sparkles,
  Check,
  Bell,
  Globe,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  Package,
  PlusCircle,
  ClipboardList,
  TrendingUp,
  Truck,
  ShoppingBag,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    isAuthenticated,
    currentRole,
    currentView,
    navigate,
    logout,
    farmerProfile,
    buyerProfile,
    switchFarmer,
    switchBuyer,
    allFarmers,
    allBuyers,
    resetAllDemoData,
    orders,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isFarmer = currentRole === 'farmer';
  const isBuyer = currentRole === 'buyer';
  const activeProfile = isFarmer ? farmerProfile : buyerProfile;

  const pendingFarmerOrders = orders.filter(
    (o) => o.farmerId === farmerProfile.id && o.status === 'Pending'
  ).length;

  const activeBuyerOrders = orders.filter(
    (o) =>
      o.buyerId === buyerProfile.id &&
      (o.status === 'Pending' || o.status === 'Approved' || o.status === 'Shipped')
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro announcement bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/60">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Foundation Phase Prototype
          </span>
          <span className="hidden md:inline text-emerald-300/70">|</span>
          <span className="hidden md:inline text-emerald-200">
            {isAuthenticated
              ? isFarmer
                ? `Logged in as Farmer: ${farmerProfile.name} (${farmerProfile.orgName})`
                : `Logged in as Buyer: ${buyerProfile.name} (${buyerProfile.orgName})`
              : 'Direct wholesale agriculture marketplace connecting Indian farmers & bulk buyers nationwide'}
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto text-[11px]">
          <button
            id="nav-reset-data-btn"
            onClick={resetAllDemoData}
            title="Reset demo data to initial factory state"
            className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-emerald-800"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Data</span>
          </button>
          {!isAuthenticated && (
            <>
              <span className="text-emerald-500/50">|</span>
              <button
                id="nav-topbar-signin-btn"
                onClick={() => navigate('auth-signin')}
                className="flex items-center gap-1.5 text-emerald-100 hover:text-white font-semibold transition-colors cursor-pointer px-2.5 py-0.5 rounded bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/40"
              >
                <LogIn className="w-3 h-3 text-emerald-300" />
                <span>Sign In</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* LEFT: KissanConnect Logo + Name */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={() => {
                if (isAuthenticated) {
                  if (isFarmer) navigate('farmer-dashboard');
                  else navigate('buyer-dashboard');
                } else {
                  navigate('landing');
                }
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none shrink-0"
            >
              <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center shadow-xs group-hover:bg-emerald-800 transition-colors">
                <div className="w-4 h-4 bg-emerald-200 rounded-xs rotate-45 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-emerald-900 font-sans">
                KissanConnect
              </span>
            </button>

            {/* If AUTHENTICATED: Show role-based navigation */}
            {isAuthenticated && isFarmer && (
              <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs xl:text-sm font-medium whitespace-nowrap">
                <button
                  id="nav-farmer-dashboard"
                  onClick={() => navigate('farmer-dashboard')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'farmer-dashboard'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
                <button
                  id="nav-farmer-products"
                  onClick={() => navigate('farmer-products')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'farmer-products' || currentView === 'farmer-product-details'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>My Products</span>
                </button>
                <button
                  id="nav-farmer-add-product"
                  onClick={() => navigate('farmer-add-product')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'farmer-add-product'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
                <button
                  id="nav-farmer-orders"
                  onClick={() => navigate('farmer-orders')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'farmer-orders'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>Orders</span>
                  {pendingFarmerOrders > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-100 text-amber-800">
                      {pendingFarmerOrders}
                    </span>
                  )}
                </button>
                <button
                  id="nav-farmer-demand"
                  onClick={() => navigate('farmer-demand')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'farmer-demand'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Demand Intelligence</span>
                </button>
                <button
                  id="nav-farmer-marketplace"
                  onClick={() => navigate('buyer-marketplace')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'buyer-marketplace'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Marketplace</span>
                </button>
                <button
                  id="nav-farmer-logistics"
                  onClick={() => navigate('logistics')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'logistics'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Logistics</span>
                </button>
              </nav>
            )}

            {/* If AUTHENTICATED: Buyer navigation */}
            {isAuthenticated && isBuyer && (
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium whitespace-nowrap">
                <button
                  id="nav-buyer-dashboard"
                  onClick={() => navigate('buyer-dashboard')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'buyer-dashboard'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>
                <button
                  id="nav-buyer-marketplace"
                  onClick={() => navigate('buyer-marketplace')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'buyer-marketplace' || currentView === 'buyer-product-details'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Produce Marketplace</span>
                </button>
                <button
                  id="nav-buyer-orders"
                  onClick={() => navigate('buyer-orders')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'buyer-orders'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>My Orders</span>
                  {activeBuyerOrders > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-amber-100 text-amber-800">
                      {activeBuyerOrders}
                    </span>
                  )}
                </button>
                <button
                  id="nav-buyer-logistics"
                  onClick={() => navigate('logistics')}
                  className={`py-1 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'logistics'
                      ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Logistics</span>
                </button>
              </nav>
            )}
          </div>

          {/* RIGHT: Authenticated Controls OR Simple Public Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
                {/* Settings Icon Button */}
                <div className="relative">
                  <button
                    id="header-settings-btn"
                    onClick={() => {
                      setSettingsOpen(!settingsOpen);
                      setProfileDropdownOpen(false);
                    }}
                    title="Settings"
                    className={`p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer ${
                      settingsOpen ? 'bg-slate-100 text-slate-900' : ''
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                  </button>

                  {/* Settings Dropdown Popover */}
                  {settingsOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-3 z-50 text-xs">
                      <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-slate-900">Platform Settings</span>
                        <button
                          onClick={() => setSettingsOpen(false)}
                          className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="px-4 py-2 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Globe className="w-4 h-4 text-emerald-700" />
                            <span>Active Region</span>
                          </div>
                          <span className="font-semibold text-slate-900">Maharashtra</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Bell className="w-4 h-4 text-emerald-700" />
                            <span>SMS Alerts</span>
                          </div>
                          <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                            Enabled
                          </span>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <button
                            onClick={() => {
                              resetAllDemoData();
                              setSettingsOpen(false);
                            }}
                            className="w-full text-left py-1.5 px-2 rounded text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                            <span>Reset Demo State</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Button (Avatar + Name) */}
                <div className="relative">
                  <button
                    id="header-profile-btn"
                    onClick={() => {
                      setProfileDropdownOpen(!profileDropdownOpen);
                      setSettingsOpen(false);
                    }}
                    className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs text-slate-800 font-medium transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      {activeProfile.avatarText}
                    </div>
                    <span className="hidden sm:inline max-w-[110px] xl:max-w-[140px] truncate font-semibold">
                      {activeProfile.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 text-xs">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900">
                          {isFarmer ? 'Switch Farmer Profile' : 'Switch Buyer Profile'}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          Select simulated account within {isFarmer ? 'Farmer' : 'Buyer'} role
                        </p>
                      </div>

                      {isFarmer ? (
                        <div className="py-1">
                          {allFarmers.map((f) => (
                            <button
                              key={f.id}
                              onClick={() => {
                                switchFarmer(f.id);
                                setProfileDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 flex items-start gap-2 hover:bg-slate-50 cursor-pointer ${
                                farmerProfile.id === f.id
                                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                                  : 'text-slate-700'
                              }`}
                            >
                              <Building2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                              <div className="flex-1">
                                <div>{f.name}</div>
                                <div className="text-[11px] text-slate-500 font-normal">{f.orgName}</div>
                              </div>
                              {farmerProfile.id === f.id && (
                                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="py-1">
                          {allBuyers.map((b) => (
                            <button
                              key={b.id}
                              onClick={() => {
                                switchBuyer(b.id);
                                setProfileDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 flex items-start gap-2 hover:bg-slate-50 cursor-pointer ${
                                buyerProfile.id === b.id
                                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                                  : 'text-slate-700'
                              }`}
                            >
                              <Store className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                              <div className="flex-1">
                                <div>{b.name}</div>
                                <div className="text-[11px] text-slate-500 font-normal">{b.orgName}</div>
                              </div>
                              {buyerProfile.id === b.id && (
                                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="border-t border-slate-100 pt-1 px-2">
                        <button
                          id="nav-dropdown-signout-btn"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-3 py-2 rounded text-xs font-semibold text-rose-700 hover:bg-rose-50 flex items-center justify-between cursor-pointer"
                        >
                          <span>Sign Out</span>
                          <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Prominent Sign Out Button in Header */}
                <button
                  id="nav-header-signout-btn"
                  onClick={logout}
                  title="Sign out and return to public homepage"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              /* Public Header Right Actions: Clean Sign In & Create Account */
              <div className="flex items-center gap-2">
                <button
                  id="nav-public-signin-btn"
                  onClick={() => navigate('auth-signin')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-emerald-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  id="nav-public-register-btn"
                  onClick={() => navigate('auth-register-role')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs transition-colors cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Mobile / Tablet hamburger button (only if authenticated or on small screens) */}
            <div className="flex lg:hidden items-center ml-1">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setSettingsOpen(false);
                  setProfileDropdownOpen(false);
                }}
                aria-label="Toggle Navigation Menu"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-md animate-in slide-in-from-top-2 duration-150">
          {isAuthenticated ? (
            isFarmer ? (
              <>
                <div className="px-3 py-2 mb-2 bg-emerald-50 rounded-lg text-xs">
                  <div className="font-bold text-emerald-900">{farmerProfile.name}</div>
                  <div className="text-emerald-700">{farmerProfile.orgName} • Farmer / FPO</div>
                </div>
                <button
                  onClick={() => {
                    navigate('farmer-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'farmer-dashboard'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('farmer-products');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'farmer-products'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  My Products
                </button>
                <button
                  onClick={() => {
                    navigate('farmer-add-product');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'farmer-add-product'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Add Product
                </button>
                <button
                  onClick={() => {
                    navigate('farmer-orders');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'farmer-orders'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Orders {pendingFarmerOrders > 0 ? `(${pendingFarmerOrders})` : ''}
                </button>
                <button
                  onClick={() => {
                    navigate('farmer-demand');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'farmer-demand'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Demand Intelligence
                </button>
                <button
                  onClick={() => {
                    navigate('buyer-marketplace');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'buyer-marketplace'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Marketplace
                </button>
                <button
                  onClick={() => {
                    navigate('logistics');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'logistics'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Logistics
                </button>
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-rose-700 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="px-3 py-2 mb-2 bg-emerald-50 rounded-lg text-xs">
                  <div className="font-bold text-emerald-900">{buyerProfile.name}</div>
                  <div className="text-emerald-700">{buyerProfile.orgName} • Wholesale Buyer</div>
                </div>
                <button
                  onClick={() => {
                    navigate('buyer-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'buyer-dashboard'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('buyer-marketplace');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'buyer-marketplace'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Produce Marketplace
                </button>
                <button
                  onClick={() => {
                    navigate('buyer-orders');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'buyer-orders'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  My Orders {activeBuyerOrders > 0 ? `(${activeBuyerOrders})` : ''}
                </button>
                <button
                  onClick={() => {
                    navigate('logistics');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'logistics'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Logistics
                </button>
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-rose-700 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )
          ) : (
            <div className="space-y-2 py-2">
              <button
                onClick={() => {
                  navigate('auth-farmer-signin');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-600" />
                <span>Sign In as Farmer / FPO</span>
              </button>
              <button
                onClick={() => {
                  navigate('auth-buyer-signin');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-600" />
                <span>Sign In as Buyer</span>
              </button>
              <button
                onClick={() => {
                  navigate('auth-register-role');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create an Account</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
````

---
## `src/components/common/Sidebar.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../types';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  TrendingUp,
  ShoppingBag,
  Store,
  Truck,
  LogOut,
  PlusCircle,
} from 'lucide-react';

interface SidebarProps {
  role: 'farmer' | 'buyer';
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const {
    currentView,
    navigate,
    logout,
    farmerProfile,
    buyerProfile,
    orders,
  } = useApp();

  const isFarmer = role === 'farmer';
  const profile = isFarmer ? farmerProfile : buyerProfile;

  const pendingFarmerOrders = orders.filter(
    (o) => o.farmerId === farmerProfile.id && o.status === 'Pending'
  ).length;

  const activeBuyerOrders = orders.filter(
    (o) => o.buyerId === buyerProfile.id && (o.status === 'Pending' || o.status === 'Approved' || o.status === 'Shipped')
  ).length;

  interface NavItem {
    id: AppView;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }

  // Farmer portal navigation: Dashboard, My Products, Add Product, Orders, Demand, Marketplace, Logistics
  const farmerNavItems: NavItem[] = [
    {
      id: 'farmer-dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'farmer-products',
      label: 'My Products',
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: 'farmer-add-product',
      label: 'Add Product',
      icon: <PlusCircle className="w-4 h-4" />,
    },
    {
      id: 'farmer-orders',
      label: 'Orders',
      icon: <ClipboardList className="w-4 h-4" />,
      badge: pendingFarmerOrders > 0 ? pendingFarmerOrders : undefined,
    },
    {
      id: 'farmer-demand',
      label: 'Demand Intelligence',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: 'buyer-marketplace',
      label: 'Marketplace',
      icon: <Store className="w-4 h-4" />,
    },
    {
      id: 'logistics',
      label: 'Logistics',
      icon: <Truck className="w-4 h-4" />,
    },
  ];

  // Buyer navigation: Dashboard, Marketplace, My Orders, Logistics
  const buyerNavItems: NavItem[] = [
    {
      id: 'buyer-dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'buyer-marketplace',
      label: 'Produce Marketplace',
      icon: <Store className="w-4 h-4" />,
    },
    {
      id: 'buyer-orders',
      label: 'My Orders',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: activeBuyerOrders > 0 ? activeBuyerOrders : undefined,
    },
    {
      id: 'logistics',
      label: 'Logistics',
      icon: <Truck className="w-4 h-4" />,
    },
  ];

  const navItems = isFarmer ? farmerNavItems : buyerNavItems;

  return (
    <aside className="w-full lg:w-60 border-r border-slate-200 bg-white p-5 flex flex-col justify-between shrink-0">
      <div className="space-y-5">
        {/* Profile Snapshot */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
            {profile.avatarText}
          </div>
          <div className="overflow-hidden text-xs">
            <h3 className="font-bold text-slate-900 truncate">{profile.name}</h3>
            <p className="text-slate-500 text-[11px] truncate">{isFarmer ? 'Farmer / FPO' : 'Wholesale Buyer'}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              currentView === item.id ||
              (item.id === 'buyer-marketplace' && currentView === 'buyer-product-details') ||
              (item.id === 'farmer-products' && currentView === 'farmer-product-details');
            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-emerald-800 text-white'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sign Out / Exit to Home */}
      <div className="pt-4 border-t border-slate-100">
        <button
          id="sidebar-signout-btn"
          onClick={logout}
          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer flex items-center gap-2"
        >
          <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
````

---
## `src/components/common/Toast.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const icon = {
          success: <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
        }[toast.type];

        const borderClasses = {
          success: 'border-emerald-200 bg-emerald-50/95 text-emerald-950',
          error: 'border-rose-200 bg-rose-50/95 text-rose-950',
          warning: 'border-amber-200 bg-amber-50/95 text-amber-950',
          info: 'border-blue-200 bg-blue-50/95 text-blue-950',
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-lg backdrop-blur-md flex items-start gap-3 transition-all ${borderClasses}`}
          >
            {icon}
            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-xs font-bold tracking-tight">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
````

---
## `src/components/farmer/AddProductForm.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProduceCategory, ProduceUnit, ProduceGrade } from '../../types';
import {
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export const AddProductForm: React.FC = () => {
  const { farmerProfile, addProduct, navigate } = useApp();

  // Form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProduceCategory>('Vegetables');
  const [variety, setVariety] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [unit, setUnit] = useState<ProduceUnit>('quintal');
  const [pricePerUnit, setPricePerUnit] = useState<number | ''>('');
  const [location, setLocation] = useState(farmerProfile.location.split(',')[0].trim());
  const [availableDate, setAvailableDate] = useState(
    new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
  );
  const [harvestDate, setHarvestDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [grade, setGrade] = useState<ProduceGrade>('Grade A');
  const [description, setDescription] = useState('');
  const [minOrderQty, setMinOrderQty] = useState<number | ''>(2);
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCategoryChange = (newCat: ProduceCategory) => {
    setCategory(newCat);
    if (newCat === 'Vegetables') {
      setImageUrl('https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80');
    } else if (newCat === 'Fruits') {
      setImageUrl('https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80');
    } else if (newCat === 'Grains & Pulses') {
      setImageUrl('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80');
    } else if (newCat === 'Spices') {
      setImageUrl('https://images.unsplash.com/photo-1615485290176-963b65288593?auto=format&fit=crop&w=800&q=80');
    } else if (newCat === 'Oilseeds') {
      setImageUrl('https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80');
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = 'Product name is required';
    if (!quantity || Number(quantity) <= 0) errs.quantity = 'Enter a valid quantity';
    if (!pricePerUnit || Number(pricePerUnit) <= 0) errs.pricePerUnit = 'Enter a valid price';
    if (!location.trim()) errs.location = 'Location is required';
    if (!availableDate) errs.availableDate = 'Ready date is required';
    if (!description.trim()) errs.description = 'Please provide a short description';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      addProduct({
        name: name.trim(),
        category,
        variety: variety.trim() || undefined,
        quantity: Number(quantity),
        unit,
        pricePerUnit: Number(pricePerUnit),
        location: location.trim(),
        state: 'Maharashtra',
        farmerId: farmerProfile.id,
        farmerName: farmerProfile.name,
        fpoName: farmerProfile.orgName,
        farmerPhone: farmerProfile.phone,
        availableDate,
        harvestDate,
        grade,
        description: description.trim(),
        isActive: true,
        image: imageUrl,
        minOrderQuantity: minOrderQty ? Number(minOrderQty) : 1,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl border border-slate-200 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Produce Listed Successfully
          </h2>
          <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
            {name} ({quantity} {unit}s @ ₹{Number(pricePerUnit).toLocaleString('en-IN')}/{unit}) is now live on the marketplace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            onClick={() => navigate('farmer-products')}
          >
            View My Products
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsSuccess(false);
              setName('');
              setQuantity('');
              setPricePerUnit('');
              setDescription('');
            }}
          >
            Add Another Batch
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Add Product Listing
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            List produce to receive orders from wholesale buyers.
          </p>
        </div>
        <Button
          id="add-product-back-btn"
          size="sm"
          variant="ghost"
          onClick={() => navigate('farmer-dashboard')}
          leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          className="cursor-pointer"
        >
          ← Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 space-y-5">
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
            1. Crop Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Product Name *
              </label>
              <input
                id="input-product-name"
                type="text"
                placeholder="e.g. Red Onions"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600 ${
                  errors.name ? 'border-rose-300' : 'border-slate-200'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                id="select-product-category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as ProduceCategory)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains & Pulses">Grains & Pulses</option>
                <option value="Spices">Spices</option>
                <option value="Oilseeds">Oilseeds</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Variety / Cultivar
              </label>
              <input
                id="input-product-variety"
                type="text"
                placeholder="e.g. Garwa / Hybrid"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quality Grade
              </label>
              <select
                id="select-product-grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value as ProduceGrade)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="Grade A+">Grade A+ (Premium)</option>
                <option value="Grade A">Grade A (Standard)</option>
                <option value="Grade B">Grade B (Bulk)</option>
                <option value="Organic Certified">Organic Certified</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Quantity */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
            2. Quantity & Pricing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quantity *
              </label>
              <input
                id="input-product-quantity"
                type="number"
                min="1"
                placeholder="e.g. 50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600 ${
                  errors.quantity ? 'border-rose-300' : 'border-slate-200'
                }`}
              />
              {errors.quantity && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Unit *
              </label>
              <select
                id="select-product-unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as ProduceUnit)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="quintal">Quintal</option>
                <option value="ton">Metric Ton</option>
                <option value="kg">Kilogram (kg)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Price per {unit} (₹) *
              </label>
              <input
                id="input-product-price"
                type="number"
                min="1"
                placeholder="e.g. 2400"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value ? Number(e.target.value) : '')}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600 ${
                  errors.pricePerUnit ? 'border-rose-300' : 'border-slate-200'
                }`}
              />
              {errors.pricePerUnit && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.pricePerUnit}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location *
              </label>
              <input
                id="input-product-location"
                type="text"
                placeholder="e.g. Nashik"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600 ${
                  errors.location ? 'border-rose-300' : 'border-slate-200'
                }`}
              />
              {errors.location && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ready for Dispatch Date *
              </label>
              <input
                id="input-product-available-date"
                type="date"
                value={availableDate}
                onChange={(e) => setAvailableDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
            3. Details & Description
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description & Packaging *
            </label>
            <textarea
              id="textarea-product-description"
              rows={3}
              placeholder="Provide information on packaging, storage, quality, or loading assistance..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600 ${
                errors.description ? 'border-rose-300' : 'border-slate-200'
              }`}
            />
            {errors.description && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('farmer-products')}
          >
            Cancel
          </Button>
          <Button
            id="submit-product-listing-btn"
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Publish Listing
          </Button>
        </div>
      </form>
    </div>
  );
};
````

---
## `src/components/farmer/DemandIntelligence.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DemandService } from '../../services/demandService';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Calendar,
  Search,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../common/Button';
import { DemoBanner } from '../common/DemoBanner';

export const DemandIntelligence: React.FC = () => {
  const { navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allForecasts = DemandService.getAllForecasts();

  const filteredForecasts = allForecasts.filter((f) => {
    if (selectedCategory !== 'All' && f.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !f.product.toLowerCase().includes(q) &&
        !f.location.toLowerCase().includes(q) &&
        !f.targetMarket.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Demand Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Wholesale demand projections and reference price trends across regional hubs.
          </p>
        </div>
        <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
          {filteredForecasts.length} Active Forecasts
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="search-demand-forecast"
            type="text"
            placeholder="Search crop, hub, or target market..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Vegetables', 'Fruits', 'Grains & Pulses', 'Oilseeds'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Forecast Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredForecasts.map((forecast) => {
          const isRising = forecast.trend === 'rising';
          const isFalling = forecast.trend === 'falling';

          return (
            <div
              key={forecast.id}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900">{forecast.product}</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                      isRising
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : isFalling
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isRising && <TrendingUp className="w-3.5 h-3.5" />}
                    {isFalling && <TrendingDown className="w-3.5 h-3.5" />}
                    {!isRising && !isFalling && <Minus className="w-3.5 h-3.5" />}
                    {isRising
                      ? `+${forecast.trendPercentage}% Demand`
                      : isFalling
                      ? `${forecast.trendPercentage}% Dip`
                      : 'Stable'}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Market</span>
                    <span className="font-medium text-slate-800">{forecast.targetMarket}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Reference Price</span>
                    <span className="font-bold text-slate-900">{forecast.referencePriceRange}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Suggested Volume</span>
                    <span className="font-medium text-emerald-800">
                      {forecast.recommendedListingQuantity}
                    </span>
                  </div>
                </div>

                {forecast.keyFactors && forecast.keyFactors.length > 0 && (
                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-medium text-slate-700 block text-[11px] mb-1">Key Factors:</span>
                    <ul className="list-disc pl-3.5 space-y-0.5 text-[11px] text-slate-500">
                      {forecast.keyFactors.slice(0, 2).map((factor, i) => (
                        <li key={i}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Peak Window: {forecast.nextPeakWindow}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('farmer-add-product')}
                >
                  List Crop
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <DemoBanner
        moduleTitle="Demand Intelligence Engine"
        futureIntegration="Python / FastAPI Machine Learning microservice (Agmarknet datasets)"
      />
    </div>
  );
};
````

---
## `src/components/farmer/FarmerDashboard.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  Layers,
  Clock,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  IndianRupee,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { StatusBadge } from '../common/Badge';
import { DemandService } from '../../services/demandService';

export const FarmerDashboard: React.FC = () => {
  const { farmerProfile, products, orders, navigate, updateOrderStatus } = useApp();

  const farmerProducts = products.filter((p) => p.farmerId === farmerProfile.id);
  const activeProducts = farmerProducts.filter((p) => p.isActive);
  const totalQuantityQuintals = activeProducts.reduce((acc, p) => {
    if (p.unit === 'quintal') return acc + p.quantity;
    if (p.unit === 'ton') return acc + p.quantity * 10;
    return acc + Math.round(p.quantity / 100);
  }, 0);

  const farmerOrders = orders.filter((o) => o.farmerId === farmerProfile.id);
  const pendingOrders = farmerOrders.filter((o) => o.status === 'Pending');
  const recentOrders = farmerOrders.slice(0, 5);

  const demandHighlights = DemandService.getHighDemandForecasts().slice(0, 2);

  return (
    <div className="space-y-6">
      {/* 1. Page Title & Short Description */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Welcome back, {farmerProfile.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {farmerProfile.orgName} • {farmerProfile.location}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            id="farmer-dash-add-product-btn"
            variant="primary"
            size="sm"
            onClick={() => navigate('farmer-add-product')}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Add Product
          </Button>
          <Button
            id="farmer-dash-view-orders-btn"
            variant="outline"
            size="sm"
            onClick={() => navigate('farmer-orders')}
          >
            View Orders ({farmerOrders.length})
          </Button>
        </div>
      </div>

      {/* 2. 4 Important Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium block">Active Listings</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {activeProducts.length}
          </div>
          <span className="text-xs text-slate-400 mt-0.5 block">
            {farmerProducts.length} total crops
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium block">Stock on Hand</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {totalQuantityQuintals.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-normal text-slate-500">Quintals</span>
          </div>
          <span className="text-xs text-slate-400 mt-0.5 block">Ready for delivery</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium block">Pending Orders</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {pendingOrders.length}
          </div>
          <span className="text-xs text-amber-700 font-medium mt-0.5 block">
            {pendingOrders.length > 0 ? 'Requires confirmation' : 'All caught up'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium block">Total Sales</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            ₹{farmerOrders.reduce((acc, o) => acc + o.totalPrice, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 mt-0.5 block">
            Across {farmerOrders.length} orders
          </span>
        </div>
      </div>

      {/* 3. Main Content: Orders & 4. Secondary Information: Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Orders</h2>
              <p className="text-xs text-slate-500 mt-0.5">Wholesale orders placed by institutional buyers</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => navigate('farmer-orders')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View All
            </Button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No orders placed yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{order.productName}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-slate-600">
                      Buyer: <span className="font-medium text-slate-800">{order.buyerCompany}</span>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      {order.quantity} {order.unit}s • ₹{order.totalPrice.toLocaleString('en-IN')} • {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {order.status === 'Pending' && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => updateOrderStatus(order.id, 'Approved')}
                      >
                        Approve
                      </Button>
                    )}
                    {order.status === 'Approved' && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => updateOrderStatus(order.id, 'Shipped')}
                      >
                        Ship
                      </Button>
                    )}
                    {order.status === 'Shipped' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                      >
                        Mark Delivered
                      </Button>
                    )}
                    {order.status === 'Delivered' && (
                      <span className="text-xs font-medium text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Delivered
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Secondary: Demand Intelligence Signals & Navigation */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Demand Signals
              </h2>
              <button
                onClick={() => navigate('farmer-demand')}
                className="text-xs font-medium text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                View Details
              </button>
            </div>

            <div className="space-y-2">
              {demandHighlights.map((f) => (
                <div key={f.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-slate-800">
                    <span>{f.product}</span>
                    <span className="text-emerald-700 font-bold">+{f.trendPercentage}%</span>
                  </div>
                  <div className="text-slate-500 text-[11px] flex justify-between">
                    <span>Target: {f.targetMarket.split('&')[0]}</span>
                    <span>Ref: {f.referencePriceRange}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
              Quick Actions
            </h2>
            <button
              onClick={() => navigate('farmer-add-product')}
              className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Add New Produce Listing</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => navigate('farmer-products')}
              className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Manage My Products</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => navigate('logistics')}
              className="w-full text-left px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>View Logistics Routes</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
````

---
## `src/components/farmer/FarmerOrders.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ClipboardList,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { Button } from '../common/Button';
import { StatusBadge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';

export const FarmerOrders: React.FC = () => {
  const { farmerProfile, orders, updateOrderStatus } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const farmerOrders = orders.filter((o) => o.farmerId === farmerProfile.id);

  const filteredOrders = farmerOrders.filter((order) => {
    if (statusFilter !== 'All' && order.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchBuyer =
        order.buyerCompany.toLowerCase().includes(q) ||
        order.buyerName.toLowerCase().includes(q);
      const matchProd = order.productName.toLowerCase().includes(q);
      const matchId = order.id.toLowerCase().includes(q);
      if (!matchBuyer && !matchProd && !matchId) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Incoming Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage buyer orders, approve batches, and track delivery progress.
          </p>
        </div>
        <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
          {farmerOrders.length} Total Orders
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="search-farmer-orders"
            type="text"
            placeholder="Search by Order ID, Buyer, or Produce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Pending', 'Approved', 'Shipped', 'Delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          title="No Orders Found"
          description="No orders match the current search or status filter."
          actionLabel="Clear Filter"
          onAction={() => {
            setStatusFilter('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl border border-slate-200 space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    #{order.id}
                  </span>
                  <span className="font-bold text-sm text-slate-900">
                    {order.productName}
                  </span>
                  <StatusBadge status={order.status} />
                </div>

                <div className="text-sm font-bold text-slate-900">
                  ₹{order.totalPrice.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">Buyer</span>
                  <span className="font-medium text-slate-800">{order.buyerCompany}</span>
                  <p className="text-[11px] text-slate-500">{order.buyerName}</p>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Quantity & Price</span>
                  <span className="font-medium text-slate-800">
                    {order.quantity} {order.unit}s @ ₹{order.pricePerUnit}/{order.unit}
                  </span>
                  <p className="text-[11px] text-slate-500">Delivery: {order.deliveryDate}</p>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Destination</span>
                  <span className="font-medium text-slate-800 line-clamp-1">
                    {order.deliveryLocation}
                  </span>
                  {order.trackingNumber && (
                    <p className="text-[11px] text-emerald-800 font-mono">
                      Route: {order.trackingNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Controls */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  Ordered on {new Date(order.orderDate).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  {order.status === 'Pending' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => updateOrderStatus(order.id, 'Approved')}
                    >
                      Approve Order
                    </Button>
                  )}
                  {order.status === 'Approved' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => updateOrderStatus(order.id, 'Shipped')}
                    >
                      Mark Shipped
                    </Button>
                  )}
                  {order.status === 'Shipped' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateOrderStatus(order.id, 'Delivered')}
                    >
                      Confirm Delivered
                    </Button>
                  )}
                  {order.status === 'Delivered' && (
                    <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
````

---
## `src/components/farmer/FarmerPortal.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { FarmerDashboard } from './FarmerDashboard';
import { AddProductForm } from './AddProductForm';
import { MyProducts } from './MyProducts';
import { FarmerOrders } from './FarmerOrders';
import { DemandIntelligence } from './DemandIntelligence';
import { DemoBanner } from '../common/DemoBanner';
import { ProductDetailsModal } from '../buyer/ProductDetailsModal';

export const FarmerPortal: React.FC = () => {
  const { currentView, selectedProductId, navigate } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'farmer-add-product':
        return <AddProductForm />;
      case 'farmer-products':
      case 'farmer-product-details':
        return <MyProducts />;
      case 'farmer-orders':
        return <FarmerOrders />;
      case 'farmer-demand':
        return <DemandIntelligence />;
      case 'farmer-dashboard':
      default:
        return <FarmerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <Sidebar role="farmer" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        <DemoBanner
          moduleTitle="Farmer & FPO Management Interface"
          futureIntegration="Supabase PostgreSQL Auth & RLS policies with Python FastAPI Analytics"
          details="All product submissions and order status modifications are dynamically stored in frontend session storage."
        />
        {renderView()}

        {/* Product Details Modal if active */}
        {selectedProductId && (
          <ProductDetailsModal
            productId={selectedProductId}
            onClose={() => navigate('farmer-products', undefined)}
          />
        )}
      </main>
    </div>
  );
};
````

---
## `src/components/farmer/MyProducts.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  Trash2,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { GradeBadge } from '../common/Badge';

export const MyProducts: React.FC = () => {
  const {
    farmerProfile,
    products,
    toggleProductStatus,
    deleteProduct,
    navigate,
  } = useApp();

  const myProducts = products.filter((p) => p.farmerId === farmerProfile.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            My Product Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your harvest listings and availability for wholesale buyers.
          </p>
        </div>

        <Button
          id="my-products-add-btn"
          variant="primary"
          size="sm"
          onClick={() => navigate('farmer-add-product')}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Add Product
        </Button>
      </div>

      {myProducts.length === 0 ? (
        <EmptyState
          title="No Produce Listed Yet"
          description="You have no active crop listings. Add a listing to start receiving wholesale orders."
          actionLabel="Add Product"
          onAction={() => navigate('farmer-add-product')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl border overflow-hidden flex flex-col justify-between transition-colors ${
                product.isActive ? 'border-slate-200' : 'border-slate-200 opacity-70 bg-slate-50'
              }`}
            >
              <div>
                <div className="relative h-40 bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <GradeBadge grade={product.grade} />
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        product.isActive
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      {product.isActive ? 'Active' : 'Paused'}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {product.name}
                    </h3>
                    {product.variety && (
                      <p className="text-xs text-slate-500 truncate">
                        Variety: {product.variety}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Price</span>
                      <span className="font-bold text-slate-900">
                        ₹{product.pricePerUnit.toLocaleString('en-IN')} / {product.unit}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[11px]">Quantity</span>
                      <span className="font-semibold text-emerald-800">
                        {product.quantity} {product.unit}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  id={`toggle-product-${product.id}`}
                  onClick={() => toggleProductStatus(product.id)}
                  className="flex items-center gap-1.5 font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  {product.isActive ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-700" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-slate-400" />
                      <span>Paused</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('buyer-product-details', product.id)}
                    className="text-slate-500 hover:text-slate-900 cursor-pointer flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  <button
                    id={`delete-product-${product.id}`}
                    onClick={() => {
                      if (confirm(`Remove listing for "${product.name}"?`)) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="text-rose-600 hover:text-rose-800 cursor-pointer p-1 rounded"
                    aria-label="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
````

---
## `src/components/landing/LandingPage.tsx`
````tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tractor,
  Store,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
  Truck,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  DollarSign,
  Clock,
  Check,
} from 'lucide-react';
import { Button } from '../common/Button';
import { DemoBanner } from '../common/DemoBanner';

export const LandingPage: React.FC = () => {
  const { navigate, products, isAuthenticated, currentRole } = useApp();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* ==================================================
          1. MAIN HERO SECTION
          ================================================== */}
      <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-sm">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital Agriculture Marketplace & Logistics Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Connect Farmers Directly with Bulk Buyers
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed">
            KissanConnect streamlines wholesale produce trading across India by connecting FPOs directly with commercial buyers, providing forward demand signals, and optimizing multi-farm delivery routes.
          </p>

          {/* EXACT THREE PRIMARY HERO ACTIONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              id="hero-signin-farmer-btn"
              size="lg"
              variant="primary"
              onClick={() => navigate('auth-farmer-signin')}
              leftIcon={<Tractor className="w-5 h-5" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer shadow-xs"
            >
              Sign In as Farmer
            </Button>

            <Button
              id="hero-signin-buyer-btn"
              size="lg"
              variant="outline"
              onClick={() => navigate('auth-buyer-signin')}
              leftIcon={<Store className="w-5 h-5" />}
              className="bg-white text-slate-900 border-white hover:bg-slate-100 font-semibold cursor-pointer shadow-xs"
            >
              Sign In as Buyer
            </Button>

            <Button
              id="hero-create-account-btn"
              size="lg"
              variant="outline"
              onClick={() => navigate('auth-register-role')}
              leftIcon={<UserPlus className="w-5 h-5 text-emerald-800" />}
              className="bg-white text-emerald-900 border-white hover:bg-emerald-50 hover:text-emerald-950 font-semibold cursor-pointer shadow-xs"
            >
              Create an Account
            </Button>
          </div>

          {/* Key Trust Signals */}
          <div className="pt-6 border-t border-emerald-800/80 flex flex-wrap items-center gap-6 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct FPO Sourcing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transparent Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Aggregated Route Logistics</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. KEY STATISTICS & VALUE AT A GLANCE
          ================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-1.5 shadow-2xs">
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">500+</div>
          <div className="text-sm font-semibold text-emerald-800">Verified Farmers & FPOs</div>
          <p className="text-xs text-slate-500">Active agricultural cooperatives and producer organizations nationwide</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-1.5 shadow-2xs">
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">₹4.8 Cr+</div>
          <div className="text-sm font-semibold text-emerald-800">Direct Wholesale Volume</div>
          <p className="text-xs text-slate-500">Transacted directly with zero middleman fee</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-1.5 shadow-2xs">
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">24-48 Hr</div>
          <div className="text-sm font-semibold text-emerald-800">Farm-to-Hub Delivery</div>
          <p className="text-xs text-slate-500">Consolidated multi-stop pickup and dispatch corridors</p>
        </div>
      </section>

      {/* ==================================================
          3. WHAT IS KISSANCONNECT?
          ================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Platform Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            What is KissanConnect?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            KissanConnect is an agricultural technology marketplace engineered to eliminate intermediary layers in commercial crop procurement across India. By aggregating smallholder farmers through Farmer Producer Organizations (FPOs) and connecting them with retail chains, food processors, and wholesale merchants, KissanConnect delivers price transparency, guaranteed market access, and coordinated freight logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
              Direct Digital Contracting
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wholesale buyers place direct orders with FPOs with binding delivery terms, eliminating speculative APMC commissions.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
              Forward Price Intelligence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Farmers receive forward demand signals before harvesting, allowing informed price negotiation and scheduling.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
              Corridor Aggregation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidates less-than-truckload (LTL) farm pickups along primary transit corridors into full truckload (FTL) routes.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. THE PROBLEM BEING SOLVED
          ================================================== */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            The Challenges in Wholesale Agriculture
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Why direct digital trade is essential for Indian farmers and bulk food buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">4-6 Intermediary Tiers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional supply chains route produce through village aggregators, commission agents, and wholesale mandi distributors. Farmers only receive 30–45% of the final consumer value.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">25–30% Post-Harvest Loss</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unplanned aggregation and delays in mandi auctions cause severe spoilage in perishable crops like tomatoes, onions, and grapes before they reach urban distribution hubs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Price Opacity & Distress Sales</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Producers lack visibility into real-time retail demand and mandi rates in neighboring districts, resulting in forced panic selling during peak harvest arrivals.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. HOW KISSANCONNECT WORKS (4-STEP PROCESS)
          ================================================== */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>Operational Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How KissanConnect Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A seamless digital flow connecting farm gates to distribution centers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">Produce Lot Listing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              FPOs and farmers list harvest batches specifying quantity, grade, location, and minimum price.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">Demand Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bulk buyers search catalog by variety, grade, and harvest date, placing direct volume purchase orders.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">Direct Contract Settlement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prices and delivery specs are locked in digital escrow contracts, ensuring guaranteed payment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
              4
            </div>
            <h3 className="text-sm font-bold text-slate-900">Optimized Corridor Transit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multi-farm pickups are grouped along regional transit routes, dispatching directly to buyer hubs.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. DIRECT PRODUCE MARKETPLACE PREVIEW
          ================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Featured Produce on Marketplace
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Live harvest lots ready for immediate procurement across India.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (isAuthenticated) {
                navigate('buyer-marketplace');
              } else {
                navigate('auth-signin');
              }
            }}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Explore Catalog ({products.length} Lots)
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors shadow-2xs"
            >
              <div>
                <div className="h-44 bg-slate-100 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-emerald-900/80 backdrop-blur-xs text-emerald-100 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                    Grade {p.grade}
                  </div>
                </div>
                <div className="p-4 space-y-2.5">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{p.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{p.fpoName || p.farmerName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{p.location}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Price</span>
                      <span className="font-bold text-slate-900">₹{p.pricePerUnit}/{p.unit}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[11px]">Available</span>
                      <span className="font-semibold text-emerald-800">{p.quantity} {p.unit}s</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
                  onClick={() => {
                    if (isAuthenticated && currentRole === 'buyer') {
                      navigate('buyer-product-details', p.id);
                    } else if (isAuthenticated && currentRole === 'farmer') {
                      navigate('buyer-marketplace');
                    } else {
                      navigate('auth-signin');
                    }
                  }}
                >
                  View Details & Trade
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          7. DEMAND INTELLIGENCE & ROUTE OPTIMIZATION PILLARS
          ================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Demand Intelligence Card */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Demand Intelligence Engine</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Eliminates speculation by aggregating forward purchase requirements from organized retailers, supermarket chains, and food processors. Farmers see expected price curves and volumetric demand across major consumption hubs weeks in advance.
          </p>
          <ul className="space-y-2 pt-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Forward price trend indicators across primary national and regional APMC mandis</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Recommended harvest windows based on projected supply gluts</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Direct contract request notifications matching active FPO acreage</span>
            </li>
          </ul>
        </div>

        {/* Route Optimization Card */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Consolidated Corridor Logistics</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Solves the high cost of rural freight by bundling small and medium farm-gate lots along shared geographic routes. Vehicles collect orders across adjacent FPOs for consolidated delivery to city distribution centers.
          </p>
          <ul className="space-y-2 pt-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Multi-stop pickup scheduling along primary state corridors</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>30–35% reduction in freight costs per quintal</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Real-time delivery confirmation and digital proof-of-dispatch</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ==================================================
          8. BENEFITS FOR FARMERS & BUYERS
          ================================================== */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Mutual Value Across the Agricultural Chain
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered to create a balanced, equitable marketplace for both producers and commercial buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Farmers Benefit Column */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Tractor className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Benefits for Farmers & FPOs</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>15–25% Higher Realization:</strong> Direct sales remove multiple commission agent cuts and unauthorized deductions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Guaranteed Escrow Settlement:</strong> Payment is secured in digital escrow upon order confirmation, eliminating delayed credit.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Advance Demand Visibility:</strong> Plan harvest schedules based on verified corporate buyer demand instead of volatile spot markets.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Shared Transit Cost:</strong> Clustered pickup routes ensure small lots travel at bulk freight rates.</span>
              </li>
            </ul>
          </div>

          {/* Buyers Benefit Column */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Benefits for Bulk Buyers</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Direct Farm-Gate Traceability:</strong> Verify origin district, cooperative credentials, and quality grades prior to purchase.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Unified Multi-FPO Catalog:</strong> Procure large aggregate quantities from multiple certified clusters in a single transaction.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Predictable Supply Cycles:</strong> Secure supply contracts in advance with defined harvest and dispatch schedules.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span><strong>Standardized Per-Quintal Rates:</strong> Transparent digital invoicing without hidden mandi charges or unloading surcharges.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. GOVERNMENT & SMART INDIA HACKATHON CONTEXT
          ================================================== */}
      <section className="bg-emerald-950 text-emerald-100 rounded-3xl p-8 sm:p-10 border border-emerald-900 space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Award className="w-4 h-4 text-emerald-300" />
          <span>Smart India Hackathon Innovation Initiative</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Aligned with National Digital Agriculture Frameworks
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed max-w-4xl">
          KissanConnect is designed to integrate with Government of India digital public infrastructure, complementing e-NAM (National Agriculture Market) principles, State Agricultural Marketing Boards, and national FPO empowerment mandates. The platform addresses post-harvest logistics bottlenecks and market fragmentation through technology-driven aggregation.
        </p>
      </section>

      {/* ==================================================
          10. PUBLIC CALL TO ACTION
          ================================================== */}
      <section className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xs">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ready to experience KissanConnect?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Choose your profile to test the interactive foundation prototype, browse live produce listings, or simulate forward wholesale contracts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            id="cta-farmer-signin-btn"
            size="lg"
            variant="primary"
            onClick={() => navigate('auth-farmer-signin')}
            leftIcon={<Tractor className="w-5 h-5" />}
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold"
          >
            Sign In as Farmer / FPO
          </Button>
          <Button
            id="cta-buyer-signin-btn"
            size="lg"
            variant="outline"
            onClick={() => navigate('auth-buyer-signin')}
            leftIcon={<Store className="w-5 h-5" />}
            className="w-full sm:w-auto text-slate-900 border-slate-300 hover:bg-slate-50 font-semibold"
          >
            Sign In as Buyer
          </Button>
          <Button
            id="cta-register-btn"
            size="lg"
            variant="ghost"
            onClick={() => navigate('auth-register-role')}
            leftIcon={<UserPlus className="w-5 h-5" />}
            className="w-full sm:w-auto text-emerald-800 hover:bg-emerald-50 font-semibold"
          >
            Create an Account
          </Button>
        </div>
      </section>

      {/* Foundation Prototype Technical Context Banner */}
      <DemoBanner
        moduleTitle="KissanConnect Web Platform"
        futureIntegration="PostgreSQL DB, FastAPI Machine Learning, and OR-Tools Routing"
        details="Interactive frontend prototype featuring role-based workflows for farmers, FPOs, and bulk wholesale buyers."
      />
    </div>
  );
};
````

---
## `src/components/logistics/LogisticsPage.tsx`
````tsx
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LogisticsService } from '../../services/logisticsService';
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  Compass,
} from 'lucide-react';
import { Button } from '../common/Button';
import { DemoBanner } from '../common/DemoBanner';

export const LogisticsPage: React.FC = () => {
  const { navigate } = useApp();
  const allRoutes = LogisticsService.getAllRoutes();
  const [selectedRouteId, setSelectedRouteId] = useState<string>(allRoutes[0]?.id || '');

  const activeRoute = allRoutes.find((r) => r.id === selectedRouteId) || allRoutes[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Logistics & Route Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Consolidated multi-farm transport corridors and delivery schedule tracking.
          </p>
        </div>
        <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
          {allRoutes.length} Active Corridors
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Route Selector */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 space-y-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Transport Corridors
          </h2>

          <div className="space-y-2.5">
            {allRoutes.map((route) => {
              const isSelected = route.id === activeRoute?.id;
              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-colors space-y-2 ${
                    isSelected
                      ? 'bg-emerald-50/60 border-emerald-600 ring-1 ring-emerald-600'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">
                      {route.routeCode}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        route.status === 'In Transit'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : route.status === 'Scheduled'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {route.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {route.origin} → {route.destination}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {route.vehicleType} • {route.driverName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-600">
                    <span>{route.totalDistanceKm} km</span>
                    <span>{route.estTransitTime}</span>
                    <span className="font-medium text-emerald-800">
                      {route.currentLoad}/{route.vehicleCapacity} {route.capacityUnit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Route Details */}
        <div className="lg:col-span-8 space-y-6">
          {activeRoute && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {activeRoute.routeCode}
                    </span>
                    <h2 className="text-base font-bold text-slate-900">
                      {activeRoute.origin} to {activeRoute.destination}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Vehicle: {activeRoute.vehicleType} ({activeRoute.vehicleId})
                  </p>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Driver: {activeRoute.driverName} ({activeRoute.driverPhone})</span>
                </div>
              </div>

              {/* Metric Boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Distance</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {activeRoute.totalDistanceKm} km
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Transit Time</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {activeRoute.estTransitTime}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Current Payload</span>
                  <span className="font-bold text-emerald-800 text-sm">
                    {activeRoute.currentLoad} {activeRoute.capacityUnit}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="text-[11px] text-emerald-800 block">Carbon Saved</span>
                  <span className="font-bold text-emerald-900 text-sm">
                    {activeRoute.carbonSavedKg || 45} kg CO₂
                  </span>
                </div>
              </div>

              {/* Stops Schedule */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Route Stops & Pickup Schedule
                </h3>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                  {activeRoute.stops.map((stop, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px]">
                          {stop.sequence}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                                stop.type === 'Pickup'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-blue-50 text-blue-800 border border-blue-200'
                              }`}
                            >
                              {stop.type}
                            </span>
                            <span className="font-bold text-slate-900">
                              {stop.locationName}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {stop.action} • {stop.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-right">
                        <span className="text-slate-600 font-medium">ETA: {stop.eta}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            stop.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-800'
                              : stop.status === 'Current'
                              ? 'bg-amber-50 text-amber-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {stop.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <DemoBanner
        moduleTitle="Logistics Optimization Engine"
        futureIntegration="Google OR-Tools Vehicle Routing Problem (VRP) & Maps APIs"
      />
    </div>
  );
};
````

---
## `src/context/AppContext.tsx`
````tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Order,
  AppRole,
  AppView,
  UserProfile,
  MarketplaceFilter,
  OrderStatus,
} from '../types';
import { DEMO_FARMER_PROFILES, DEMO_BUYER_PROFILES } from '../data/syntheticData';
import { ProductService } from '../services/productService';
import { OrderService } from '../services/orderService';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  currentRole: AppRole;
  currentView: AppView;
  selectedProductId: string | null;
  farmerProfile: UserProfile;
  buyerProfile: UserProfile;
  allFarmers: UserProfile[];
  allBuyers: UserProfile[];
  products: Product[];
  orders: Order[];
  marketplaceFilter: MarketplaceFilter;
  toasts: ToastMessage[];
  lastRegisteredRole: 'farmer' | 'buyer' | null;

  // Actions
  navigate: (view: AppView, productId?: string, replace?: boolean) => void;
  goBack: () => void;
  setRole: (role: AppRole) => void;
  login: (role: 'farmer' | 'buyer', profileId?: string) => void;
  logout: () => void;
  setLastRegisteredRole: (role: 'farmer' | 'buyer' | null) => void;
  switchFarmer: (farmerId: string) => void;
  switchBuyer: (buyerId: string) => void;
  setMarketplaceFilter: React.Dispatch<React.SetStateAction<MarketplaceFilter>>;
  resetMarketplaceFilter: () => void;

  // Product Operations
  addProduct: (productData: Omit<Product, 'id' | 'createdAt'>) => Product;
  toggleProductStatus: (id: string) => void;
  deleteProduct: (id: string) => void;

  // Order Operations
  placeOrder: (orderData: Omit<Order, 'id' | 'orderDate' | 'status' | 'trackingNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Utilities
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  dismissToast: (id: string) => void;
  resetAllDemoData: () => void;
}

const defaultFilter: MarketplaceFilter = {
  searchQuery: '',
  category: 'All',
  location: 'All',
  maxPrice: 15000,
  availabilityOnly: false,
  sortBy: 'recent',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<AppRole>('guest');
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [lastRegisteredRole, setLastRegisteredRole] = useState<'farmer' | 'buyer' | null>(null);

  const [farmerProfile, setFarmerProfile] = useState<UserProfile>(DEMO_FARMER_PROFILES[0]);
  const [buyerProfile, setBuyerProfile] = useState<UserProfile>(DEMO_BUYER_PROFILES[0]);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [marketplaceFilter, setMarketplaceFilter] = useState<MarketplaceFilter>(defaultFilter);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronous refs for window event listeners and navigation guards
  const isAuthenticatedRef = React.useRef(isAuthenticated);
  isAuthenticatedRef.current = isAuthenticated;

  const currentRoleRef = React.useRef(currentRole);
  currentRoleRef.current = currentRole;

  // Initialize data on mount
  useEffect(() => {
    setProducts(ProductService.getAll());
    setOrders(OrderService.getAll());
  }, []);

  const [historyStack, setHistoryStack] = useState<{ view: AppView; productId?: string | null }[]>([
    { view: 'landing', productId: null },
  ]);

  const isFarmerProtectedView = (view: AppView): boolean => {
    return [
      'farmer-dashboard',
      'farmer-add-product',
      'farmer-products',
      'farmer-product-details',
      'farmer-orders',
      'farmer-demand',
    ].includes(view);
  };

  const isBuyerProtectedView = (view: AppView): boolean => {
    return ['buyer-dashboard', 'buyer-orders'].includes(view);
  };

  const isSharedProtectedView = (view: AppView): boolean => {
    return ['buyer-marketplace', 'buyer-product-details', 'logistics'].includes(view);
  };

  const resolveGuardedView = (
    targetView: AppView,
    auth: boolean,
    role: AppRole
  ): { view: AppView; redirected: boolean; reason?: string } => {
    if (!auth) {
      if (isFarmerProtectedView(targetView)) {
        return {
          view: 'auth-farmer-signin',
          redirected: true,
          reason: 'Please sign in to access the Farmer / FPO portal.',
        };
      }
      if (isBuyerProtectedView(targetView)) {
        return {
          view: 'auth-buyer-signin',
          redirected: true,
          reason: 'Please sign in to access the Buyer portal.',
        };
      }
      if (isSharedProtectedView(targetView)) {
        return {
          view: 'auth-signin',
          redirected: true,
          reason: 'Please sign in as Farmer or Buyer to access this feature.',
        };
      }
      return { view: targetView, redirected: false };
    }

    // Role-based access constraints when authenticated
    if (role === 'farmer') {
      if (isBuyerProtectedView(targetView)) {
        return {
          view: 'farmer-dashboard',
          redirected: true,
          reason: 'Buyer Dashboard is restricted to buyer accounts.',
        };
      }
      return { view: targetView, redirected: false };
    }

    if (role === 'buyer') {
      if (isFarmerProtectedView(targetView)) {
        return {
          view: 'buyer-dashboard',
          redirected: true,
          reason: 'Farmer Portal is restricted to farmer & FPO accounts.',
        };
      }
      return { view: targetView, redirected: false };
    }

    return { view: targetView, redirected: false };
  };

  // Handle browser popstate (back/forward buttons)
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ view: 'landing', productId: null }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      const rawView: AppView = event.state?.view || 'landing';
      const rawProductId = event.state?.productId ?? null;
      const resolved = resolveGuardedView(
        rawView,
        isAuthenticatedRef.current,
        currentRoleRef.current
      );

      setCurrentView(resolved.view);
      setSelectedProductId(resolved.redirected ? null : rawProductId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = (
    view: AppView,
    productId?: string,
    replace: boolean = false,
    bypassGuard: boolean = false
  ) => {
    const prodId = productId !== undefined ? productId : null;

    let targetView = view;
    if (!bypassGuard) {
      const resolved = resolveGuardedView(
        view,
        isAuthenticatedRef.current,
        currentRoleRef.current
      );
      targetView = resolved.view;
      if (resolved.redirected && resolved.reason) {
        showToast('info', 'Authentication Required', resolved.reason);
      }
    }

    // Avoid duplicate state pushing if navigating to exact same view and product
    if (currentView === targetView && selectedProductId === prodId) {
      return;
    }

    setSelectedProductId(prodId);
    setCurrentView(targetView);

    if (replace) {
      window.history.replaceState({ view: targetView, productId: prodId }, '');
      setHistoryStack((prev) => {
        const next = [...prev];
        if (next.length > 0) {
          next[next.length - 1] = { view: targetView, productId: prodId };
        } else {
          next.push({ view: targetView, productId: prodId });
        }
        return next;
      });
    } else {
      window.history.pushState({ view: targetView, productId: prodId }, '');
      setHistoryStack((prev) => [...prev, { view: targetView, productId: prodId }]);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (historyStack.length > 1) {
      const nextStack = [...historyStack];
      nextStack.pop(); // remove current
      const prev = nextStack[nextStack.length - 1];
      setHistoryStack(nextStack);
      navigate(prev.view, prev.productId || undefined, true);
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback
      if (isAuthenticated) {
        if (currentRole === 'farmer') {
          navigate('farmer-dashboard', undefined, true);
        } else {
          navigate('buyer-dashboard', undefined, true);
        }
      } else {
        navigate('landing', undefined, true);
      }
    }
  };

  const login = (role: 'farmer' | 'buyer', profileId?: string) => {
    setIsAuthenticated(true);
    setCurrentRole(role);
    isAuthenticatedRef.current = true;
    currentRoleRef.current = role;

    if (role === 'farmer') {
      if (profileId) {
        const found = DEMO_FARMER_PROFILES.find((f) => f.id === profileId);
        if (found) setFarmerProfile(found);
      }
      navigate('farmer-dashboard', undefined, false, true);
    } else if (role === 'buyer') {
      if (profileId) {
        const found = DEMO_BUYER_PROFILES.find((b) => b.id === profileId);
        if (found) setBuyerProfile(found);
      }
      navigate('buyer-dashboard', undefined, false, true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentRole('guest');
    setSelectedProductId(null);
    isAuthenticatedRef.current = false;
    currentRoleRef.current = 'guest';

    showToast('info', 'Signed Out', 'You have been returned to the public homepage.');
    navigate('landing', undefined, true, true);
  };

  const setRole = (role: AppRole) => {
    if (role === 'farmer') {
      login('farmer');
    } else if (role === 'buyer') {
      login('buyer');
    } else {
      logout();
    }
  };

  const switchFarmer = (farmerId: string) => {
    const found = DEMO_FARMER_PROFILES.find((f) => f.id === farmerId);
    if (found) {
      setFarmerProfile(found);
      showToast('info', 'Farmer Switched', `Logged in as ${found.name} (${found.orgName})`);
    }
  };

  const switchBuyer = (buyerId: string) => {
    const found = DEMO_BUYER_PROFILES.find((b) => b.id === buyerId);
    if (found) {
      setBuyerProfile(found);
      showToast('info', 'Buyer Switched', `Logged in as ${found.name} (${found.orgName})`);
    }
  };

  const resetMarketplaceFilter = () => {
    setMarketplaceFilter(defaultFilter);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProd = ProductService.create(productData);
    setProducts(ProductService.getAll());
    showToast('success', 'Listing Created', `${newProd.name} is now live in the marketplace.`);
    return newProd;
  };

  const toggleProductStatus = (id: string) => {
    const updated = ProductService.toggleStatus(id);
    if (updated) {
      setProducts(ProductService.getAll());
      showToast(
        'info',
        'Status Changed',
        `${updated.name} listing is now ${updated.isActive ? 'Active' : 'Paused'}.`
      );
    }
  };

  const deleteProduct = (id: string) => {
    const prod = ProductService.getById(id);
    const success = ProductService.delete(id);
    if (success) {
      setProducts(ProductService.getAll());
      showToast('warning', 'Listing Removed', `${prod?.name || 'Product'} has been deleted.`);
    }
  };

  const placeOrder = (
    orderData: Omit<Order, 'id' | 'orderDate' | 'status' | 'trackingNumber'>
  ): Order => {
    const newOrder = OrderService.placeOrder(orderData);
    setOrders(OrderService.getAll());
    // Also deduct quantity from product
    const product = ProductService.getById(orderData.productId);
    if (product) {
      const remainingQty = Math.max(0, product.quantity - orderData.quantity);
      ProductService.update(orderData.productId, {
        quantity: remainingQty,
        isActive: remainingQty > 0 ? product.isActive : false,
      });
      setProducts(ProductService.getAll());
    }

    showToast(
      'success',
      'Order Placed Successfully!',
      `Order #${newOrder.id} sent to ${orderData.farmerName}. Farmer notified for fulfillment.`
    );
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = OrderService.updateStatus(orderId, status);
    if (updated) {
      setOrders(OrderService.getAll());
      showToast(
        'info',
        'Order Status Updated',
        `Order #${orderId} changed to "${status}".`
      );
    }
  };

  const resetAllDemoData = () => {
    ProductService.resetToDefaults();
    OrderService.resetToDefaults();
    setProducts(ProductService.getAll());
    setOrders(OrderService.getAll());
    setMarketplaceFilter(defaultFilter);
    showToast('info', 'Reset Complete', 'All synthetic products and orders reset to factory demo values.');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentRole,
        currentView,
        selectedProductId,
        farmerProfile,
        buyerProfile,
        allFarmers: DEMO_FARMER_PROFILES,
        allBuyers: DEMO_BUYER_PROFILES,
        products,
        orders,
        marketplaceFilter,
        toasts,
        lastRegisteredRole,
        navigate,
        goBack,
        setRole,
        login,
        logout,
        setLastRegisteredRole,
        switchFarmer,
        switchBuyer,
        setMarketplaceFilter,
        resetMarketplaceFilter,
        addProduct,
        toggleProductStatus,
        deleteProduct,
        placeOrder,
        updateOrderStatus,
        showToast,
        dismissToast,
        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
````

---
## `src/data/indiaLocations.ts`
````ts
/**
 * India-Wide Location Dataset for KissanConnect
 * Supports all 28 States and 8 Union Territories with representative districts.
 * Designed for modular frontend cascading selection, with extensible backend schema support.
 */

export interface StateDistrictMapping {
  state: string;
  districts: string[];
}

export const INDIA_STATES_AND_UTS: StateDistrictMapping[] = [
  // 28 States
  {
    state: 'Andhra Pradesh',
    districts: [
      'Anantapur',
      'Chittoor',
      'East Godavari',
      'Guntur',
      'Krishna',
      'Kurnool',
      'Nellore',
      'Prakasam',
      'Srikakulam',
      'Visakhapatnam',
      'Vizianagaram',
      'West Godavari',
      'YSR Kadapa',
    ],
  },
  {
    state: 'Arunachal Pradesh',
    districts: ['Changlang', 'East Siang', 'Lohit', 'Papum Pare', 'Tawang', 'West Kameng'],
  },
  {
    state: 'Assam',
    districts: [
      'Barpeta',
      'Cachar',
      'Darrang',
      'Dibrugarh',
      'Golaghat',
      'Jorhat',
      'Kamrup',
      'Kamrup Metropolitan',
      'Nagaon',
      'Sivasagar',
      'Sonitpur',
      'Tinsukia',
    ],
  },
  {
    state: 'Bihar',
    districts: [
      'Bhagalpur',
      'Darbhanga',
      'Gaya',
      'Muzaffarpur',
      'Nalanda',
      'Patna',
      'Purnia',
      'Rohtas',
      'Samastipur',
      'Saran',
      'Vaishali',
    ],
  },
  {
    state: 'Chhattisgarh',
    districts: [
      'Bastar',
      'Bilaspur',
      'Dhamtari',
      'Durg',
      'Janjgir-Champa',
      'Korba',
      'Raigarh',
      'Raipur',
      'Rajnandgaon',
    ],
  },
  {
    state: 'Goa',
    districts: ['North Goa', 'South Goa'],
  },
  {
    state: 'Gujarat',
    districts: [
      'Ahmedabad',
      'Amreli',
      'Anand',
      'Banaskantha',
      'Bharuch',
      'Bhavnagar',
      'Gandhinagar',
      'Jamnagar',
      'Junagadh',
      'Kheda',
      'Kutch',
      'Mehsana',
      'Navsari',
      'Patan',
      'Rajkot',
      'Sabarkantha',
      'Surat',
      'Surendranagar',
      'Vadodara',
      'Valsad',
    ],
  },
  {
    state: 'Haryana',
    districts: [
      'Ambala',
      'Bhiwani',
      'Faridabad',
      'Fatehabad',
      'Gurugram',
      'Hisar',
      'Jhajjar',
      'Jind',
      'Kaithal',
      'Karnal',
      'Kurukshetra',
      'Panipat',
      'Rohtak',
      'Sirsa',
      'Sonipat',
      'Yamunanagar',
    ],
  },
  {
    state: 'Himachal Pradesh',
    districts: [
      'Bilaspur',
      'Chamba',
      'Hamirpur',
      'Kangra',
      'Kinnaur',
      'Kullu',
      'Mandi',
      'Shimla',
      'Sirmaur',
      'Solan',
      'Una',
    ],
  },
  {
    state: 'Jharkhand',
    districts: [
      'Bokaro',
      'Deoghar',
      'Dhanbad',
      'Dumka',
      'East Singhbhum',
      'Hazaribagh',
      'Palamu',
      'Ranchi',
      'West Singhbhum',
    ],
  },
  {
    state: 'Karnataka',
    districts: [
      'Bagalkote',
      'Ballari',
      'Belagavi',
      'Bengaluru Rural',
      'Bengaluru Urban',
      'Bidar',
      'Chamarajanagar',
      'Chikkamagaluru',
      'Chitradurga',
      'Dakshina Kannada',
      'Davanagere',
      'Dharwad',
      'Hassan',
      'Haveri',
      'Kalaburagi',
      'Kodagu (Coorg)',
      'Kolar',
      'Koppal',
      'Mandya',
      'Mysuru',
      'Raichur',
      'Shivamogga',
      'Tumakuru',
      'Udupi',
      'Uttara Kannada',
      'Vijayapura',
    ],
  },
  {
    state: 'Kerala',
    districts: [
      'Alappuzha',
      'Ernakulam',
      'Idukki',
      'Kannur',
      'Kasaragod',
      'Kollam',
      'Kottayam',
      'Kozhikode',
      'Malappuram',
      'Palakkad',
      'Pathanamthitta',
      'Thiruvananthapuram',
      'Thrissur',
      'Wayanad',
    ],
  },
  {
    state: 'Madhya Pradesh',
    districts: [
      'Bhopal',
      'Chhindwara',
      'Dewas',
      'Dhar',
      'Gwalior',
      'Hoshangabad (Narmadapuram)',
      'Indore',
      'Jabalpur',
      'Khargone',
      'Mandsaur',
      'Morena',
      'Ratlam',
      'Rewa',
      'Sagar',
      'Satna',
      'Sehore',
      'Ujjain',
      'Vidisha',
    ],
  },
  {
    state: 'Maharashtra',
    districts: [
      'Ahmednagar (Ahilyanagar)',
      'Akola',
      'Amravati',
      'Aurangabad (Chhatrapati Sambhajinagar)',
      'Beed',
      'Bhandara',
      'Buldhana',
      'Chandrapur',
      'Dhule',
      'Gadchiroli',
      'Gondia',
      'Hingoli',
      'Jalgaon',
      'Jalna',
      'Kolhapur',
      'Latur',
      'Mumbai City',
      'Mumbai Suburban',
      'Nagpur',
      'Nanded',
      'Nandurbar',
      'Nashik',
      'Osmanabad (Dharashiv)',
      'Palghar',
      'Parbhani',
      'Pune',
      'Raigad',
      'Ratnagiri',
      'Sangli',
      'Satara',
      'Sindhudurg',
      'Solapur',
      'Thane',
      'Wardha',
      'Washim',
      'Yavatmal',
    ],
  },
  {
    state: 'Manipur',
    districts: ['Bishnupur', 'Churachandpur', 'Imphal East', 'Imphal West', 'Thoubal'],
  },
  {
    state: 'Meghalaya',
    districts: ['East Garo Hills', 'East Khasi Hills', 'Jaintia Hills', 'Ri-Bhoi', 'West Garo Hills'],
  },
  {
    state: 'Mizoram',
    districts: ['Aizawl', 'Champhai', 'Kolasib', 'Lunglei', 'Serchhip'],
  },
  {
    state: 'Nagaland',
    districts: ['Dimapur', 'Kohima', 'Mokokchung', 'Mon', 'Wokha'],
  },
  {
    state: 'Odisha',
    districts: [
      'Balasore',
      'Bargarh',
      'Bhadrak',
      'Cuttack',
      'Ganjam',
      'Jajpur',
      'Kalahandi',
      'Khordha',
      'Koraput',
      'Mayurbhanj',
      'Puri',
      'Sambalpur',
    ],
  },
  {
    state: 'Punjab',
    districts: [
      'Amritsar',
      'Barnala',
      'Bathinda',
      'Faridkot',
      'Fatehgarh Sahib',
      'Fazilka',
      'Firozpur',
      'Gurdaspur',
      'Hoshiarpur',
      'Jalandhar',
      'Kapurthala',
      'Ludhiana',
      'Mansa',
      'Moga',
      'Muktsar',
      'Pathankot',
      'Patiala',
      'Rupnagar',
      'Sangrur',
      'SAS Nagar (Mohali)',
      'Tarn Taran',
    ],
  },
  {
    state: 'Rajasthan',
    districts: [
      'Ajmer',
      'Alwar',
      'Barmer',
      'Bharatpur',
      'Bhilwara',
      'Bikaner',
      'Chittorgarh',
      'Churu',
      'Ganganagar',
      'Hanumangarh',
      'Jaipur',
      'Jaisalmer',
      'Jalore',
      'Jhalawar',
      'Jhunjhunu',
      'Jodhpur',
      'Kota',
      'Nagaur',
      'Pali',
      'Sikar',
      'Tonk',
      'Udaipur',
    ],
  },
  {
    state: 'Sikkim',
    districts: ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
  },
  {
    state: 'Tamil Nadu',
    districts: [
      'Ariyalur',
      'Chengalpattu',
      'Chennai',
      'Coimbatore',
      'Cuddalore',
      'Dharmapuri',
      'Dindigul',
      'Erode',
      'Kanchipuram',
      'Kanyakumari',
      'Karur',
      'Madurai',
      'Nagapattinam',
      'Namakkal',
      'Nilgiris',
      'Perambalur',
      'Pudukkottai',
      'Ramanathapuram',
      'Salem',
      'Sivaganga',
      'Thanjavur',
      'Theni',
      'Thoothukudi',
      'Tiruchirappalli',
      'Tirunelveli',
      'Tirupathur',
      'Tiruppur',
      'Tiruvallur',
      'Tiruvannamalai',
      'Tiruvarur',
      'Vellore',
      'Viluppuram',
      'Virudhunagar',
    ],
  },
  {
    state: 'Telangana',
    districts: [
      'Adilabad',
      'Bhadradri Kothagudem',
      'Hyderabad',
      'Jagtial',
      'Jangaon',
      'Karimnagar',
      'Khammam',
      'Mahabubnagar',
      'Mancherial',
      'Medak',
      'Medchal-Malkajgiri',
      'Nalgonda',
      'Nizamabad',
      'Peddapalli',
      'Rangareddy',
      'Sangareddy',
      'Siddipet',
      'Suryapet',
      'Vikarabad',
      'Warangal',
    ],
  },
  {
    state: 'Tripura',
    districts: ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'South Tripura', 'West Tripura'],
  },
  {
    state: 'Uttar Pradesh',
    districts: [
      'Agra',
      'Aligarh',
      'Ambedkar Nagar',
      'Amethi',
      'Amroha',
      'Auraiya',
      'Ayodhya',
      'Azamgarh',
      'Baghpat',
      'Bahraich',
      'Ballia',
      'Balrampur',
      'Banda',
      'Barabanki',
      'Bareilly',
      'Basti',
      'Bhadohi',
      'Bijnor',
      'Budaun',
      'Bulandshahr',
      'Chandauli',
      'Chitrakoot',
      'Deoria',
      'Etah',
      'Etawah',
      'Farrukhabad',
      'Fatehpur',
      'Firozabad',
      'Gautam Buddha Nagar (Noida)',
      'Ghaziabad',
      'Ghazipur',
      'Gonda',
      'Gorakhpur',
      'Hapur',
      'Hardoi',
      'Hathras',
      'Jalaun',
      'Jaunpur',
      'Jhansi',
      'Kannauj',
      'Kanpur Dehat',
      'Kanpur Nagar',
      'Kasganj',
      'Kaushambi',
      'Kheri',
      'Kushinagar',
      'Lalitpur',
      'Lucknow',
      'Maharajganj',
      'Mahoba',
      'Mainpuri',
      'Mathura',
      'Mau',
      'Meerut',
      'Mirzapur',
      'Moradabad',
      'Muzaffarnagar',
      'Pilibhit',
      'Pratapgarh',
      'Prayagraj',
      'Raebareli',
      'Rampur',
      'Saharanpur',
      'Sambhal',
      'Sant Kabir Nagar',
      'Shahjahanpur',
      'Shamli',
      'Shravasti',
      'Siddharthnagar',
      'Sitapur',
      'Sonbhadra',
      'Sultanpur',
      'Unnao',
      'Varanasi',
    ],
  },
  {
    state: 'Uttarakhand',
    districts: [
      'Almora',
      'Bageshwar',
      'Chamoli',
      'Champawat',
      'Dehradun',
      'Haridwar',
      'Nainital',
      'Pauri Garhwal',
      'Pithoragarh',
      'Rudraprayag',
      'Tehri Garhwal',
      'Udham Singh Nagar',
      'Uttarkashi',
    ],
  },
  {
    state: 'West Bengal',
    districts: [
      'Alipurduar',
      'Bankura',
      'Birbhum',
      'Cooch Behar',
      'Dakshin Dinajpur',
      'Darjeeling',
      'Hooghly',
      'Howrah',
      'Jalpaiguri',
      'Jhargram',
      'Kalimpong',
      'Kolkata',
      'Malda',
      'Murshidabad',
      'Nadia',
      'North 24 Parganas',
      'Paschim Bardhaman',
      'Paschim Medinipur',
      'Purba Bardhaman',
      'Purba Medinipur',
      'Purulia',
      'South 24 Parganas',
      'Uttar Dinajpur',
    ],
  },

  // 8 Union Territories
  {
    state: 'Andaman and Nicobar Islands',
    districts: ['Nicobar', 'North and Middle Andaman', 'South Andaman'],
  },
  {
    state: 'Chandigarh',
    districts: ['Chandigarh'],
  },
  {
    state: 'Dadra and Nagar Haveli and Daman and Diu',
    districts: ['Dadra and Nagar Haveli', 'Daman', 'Diu'],
  },
  {
    state: 'Delhi (NCT)',
    districts: [
      'Central Delhi',
      'East Delhi',
      'New Delhi',
      'North Delhi',
      'North East Delhi',
      'North West Delhi',
      'Shahdara',
      'South Delhi',
      'South East Delhi',
      'South West Delhi',
      'West Delhi',
    ],
  },
  {
    state: 'Jammu and Kashmir',
    districts: [
      'Anantnag',
      'Bandipora',
      'Baramulla',
      'Budgam',
      'Doda',
      'Ganderbal',
      'Jammu',
      'Kathua',
      'Kishtwar',
      'Kulgam',
      'Kupwara',
      'Poonch',
      'Pulwama',
      'Rajouri',
      'Ramban',
      'Reasi',
      'Samba',
      'Shopian',
      'Srinagar',
      'Udhampur',
    ],
  },
  {
    state: 'Ladakh',
    districts: ['Kargil', 'Leh'],
  },
  {
    state: 'Lakshadweep',
    districts: ['Lakshadweep'],
  },
  {
    state: 'Puducherry',
    districts: ['Karaikal', 'Mahe', 'Puducherry', 'Yanam'],
  },
];

export const ALL_INDIAN_STATES = INDIA_STATES_AND_UTS.map((s) => s.state).sort();

export function getDistrictsForState(stateName: string): string[] {
  const found = INDIA_STATES_AND_UTS.find(
    (s) => s.state.toLowerCase() === stateName.trim().toLowerCase()
  );
  return found ? found.districts : [];
}
````

---
## `src/data/syntheticData.ts`
````ts
/**
 * KissanConnect Synthetic & Demo Dataset (India-Wide Foundation Phase)
 *
 * IMPORTANT NOTE:
 * All records in this file represent synthetic/demo prototype data created to simulate
 * platform functionality across India. They do NOT represent real-world commercial transactions,
 * actual registered farmers, or live banking movements.
 */

import {
  Product,
  Order,
  DemandForecast,
  DeliveryRoute,
  UserProfile,
} from '../types';

export const DEMO_FARMER_PROFILES: UserProfile[] = [
  {
    id: 'farmer-1',
    name: 'Ramesh Patil',
    role: 'farmer',
    orgName: 'Sahyadri Agro Farmers Producer Co. Ltd.',
    location: 'Nashik, Maharashtra',
    phone: '+91 98220 44123',
    email: 'ramesh.patil@sahyadrifpo.in',
    avatarText: 'RP',
    verified: true,
  },
  {
    id: 'farmer-2',
    name: 'Gurpreet Singh',
    role: 'farmer',
    orgName: 'Malwa Progressive Kisan Producer Co.',
    location: 'Ludhiana, Punjab',
    phone: '+91 98140 33219',
    email: 'gurpreet@malwakisan.org',
    avatarText: 'GS',
    verified: true,
  },
  {
    id: 'farmer-3',
    name: 'Rajesh Verma',
    role: 'farmer',
    orgName: 'Awadh Agro Producer Cooperative',
    location: 'Agra, Uttar Pradesh',
    phone: '+91 94120 77890',
    email: 'rverma@awadhagro.in',
    avatarText: 'RV',
    verified: true,
  },
];

export const DEMO_BUYER_PROFILES: UserProfile[] = [
  {
    id: 'buyer-1',
    name: 'Vikram Mehta',
    role: 'buyer',
    orgName: 'FreshBazaar Retail & Supermarkets Ltd.',
    location: 'Pune, Maharashtra',
    phone: '+91 98901 55678',
    email: 'vmehta@freshbazaar.com',
    avatarText: 'FB',
    verified: true,
  },
  {
    id: 'buyer-2',
    name: 'Anita Shenoy',
    role: 'buyer',
    orgName: 'AgroMart Wholesale & Processing Corp.',
    location: 'Mumbai, Maharashtra',
    phone: '+91 98200 99451',
    email: 'procurement@agromart.in',
    avatarText: 'AM',
    verified: true,
  },
  {
    id: 'buyer-3',
    name: 'Harish Sharma',
    role: 'buyer',
    orgName: 'Bharat Agri Logistics & Supermarket Chain',
    location: 'New Delhi, Delhi (NCT)',
    phone: '+91 98110 88234',
    email: 'hsharma@bharatagri.com',
    avatarText: 'HS',
    verified: true,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-101',
    name: 'Nashik Red Onions (Garwa)',
    category: 'Vegetables',
    variety: 'Nashik Lal / Garwa Variety (Medium-Large Bulb)',
    quantity: 120,
    unit: 'quintal',
    pricePerUnit: 2450,
    location: 'Nashik',
    state: 'Maharashtra',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Patil',
    fpoName: 'Sahyadri Agro Farmers Producer Co. Ltd.',
    farmerPhone: '+91 98220 44123',
    availableDate: '2026-09-05',
    harvestDate: '2026-08-28',
    grade: 'Grade A+',
    description:
      'High dry matter, well-cured Nashik Red Onions with tight skins. Optimal for wholesale distribution, hotels, and long shelf-life retail storage. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 5,
    createdAt: '2026-09-01T08:30:00Z',
  },
  {
    id: 'prod-102',
    name: 'Sharbati Premium Golden Wheat',
    category: 'Grains & Pulses',
    variety: 'C-306 MP / Punjab Sharbati Grain',
    quantity: 320,
    unit: 'quintal',
    pricePerUnit: 3450,
    location: 'Ludhiana',
    state: 'Punjab',
    farmerId: 'farmer-2',
    farmerName: 'Gurpreet Singh',
    fpoName: 'Malwa Progressive Kisan Producer Co.',
    farmerPhone: '+91 98140 33219',
    availableDate: '2026-09-08',
    harvestDate: '2026-08-15',
    grade: 'Grade A+',
    description:
      'Heavy, golden luster grains rich in protein and moisture content. Triple-cleaned, destoned, and packaged in food-grade 50kg jute bags. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 10,
    createdAt: '2026-08-30T11:00:00Z',
  },
  {
    id: 'prod-103',
    name: 'Kufri Jyoti Processing Potatoes',
    category: 'Vegetables',
    variety: 'Kufri Jyoti / Chipsona Tubers',
    quantity: 240,
    unit: 'quintal',
    pricePerUnit: 1680,
    location: 'Agra',
    state: 'Uttar Pradesh',
    farmerId: 'farmer-3',
    farmerName: 'Rajesh Verma',
    fpoName: 'Awadh Agro Producer Cooperative',
    farmerPhone: '+91 94120 77890',
    availableDate: '2026-09-04',
    harvestDate: '2026-08-25',
    grade: 'Grade A',
    description:
      'Low sugar content, high solids potato tubers ideal for food processing, restaurant fryers, and high-volume grocery retailing. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 8,
    createdAt: '2026-09-01T14:20:00Z',
  },
  {
    id: 'prod-104',
    name: 'Hybrid Table Tomatoes (Himsona)',
    category: 'Vegetables',
    variety: 'Himsona / Abhinav Round Red',
    quantity: 85,
    unit: 'quintal',
    pricePerUnit: 1850,
    location: 'Pune',
    state: 'Maharashtra',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Patil',
    fpoName: 'Sahyadri Agro Farmers Producer Co. Ltd.',
    farmerPhone: '+91 98220 44123',
    availableDate: '2026-09-03',
    harvestDate: '2026-09-01',
    grade: 'Grade A',
    description:
      'Uniform firm red tomatoes, 80-100g average fruit weight. Freshly hand-picked from drip-irrigated polyhouse farm in Junnar. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 4,
    createdAt: '2026-09-01T09:15:00Z',
  },
  {
    id: 'prod-105',
    name: 'Shankar-6 Long Staple Raw Cotton',
    category: 'Oilseeds',
    variety: 'Shankar-6 (28-29mm Staple Length)',
    quantity: 190,
    unit: 'quintal',
    pricePerUnit: 6850,
    location: 'Rajkot',
    state: 'Gujarat',
    farmerId: 'farmer-2',
    farmerName: 'Gurpreet Singh',
    fpoName: 'Saurashtra Kisan Producer Federation',
    farmerPhone: '+91 98140 33219',
    availableDate: '2026-09-12',
    harvestDate: '2026-08-20',
    grade: 'Grade A+',
    description:
      'High-grade Shankar-6 raw seed cotton with low moisture and minimal trash content. Certified for textile spinning mills. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 10,
    createdAt: '2026-09-01T12:00:00Z',
  },
  {
    id: 'prod-106',
    name: 'Gobindobhog Premium Aromatic Rice',
    category: 'Grains & Pulses',
    variety: 'Traditional Aromatic Gobindobhog Short Grain',
    quantity: 140,
    unit: 'quintal',
    pricePerUnit: 5200,
    location: 'Burdwan (Purba Bardhaman)',
    state: 'West Bengal',
    farmerId: 'farmer-3',
    farmerName: 'Rajesh Verma',
    fpoName: 'Bengal Rice Farmers Collective',
    farmerPhone: '+91 94120 77890',
    availableDate: '2026-09-10',
    harvestDate: '2026-08-10',
    grade: 'Organic Certified',
    description:
      'Fragrant, small-grain rice renowned for festive delicacies and sweet dishes. Aged 12 months in certified humidity-regulated grain silos. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 5,
    createdAt: '2026-08-29T16:00:00Z',
  },
  {
    id: 'prod-107',
    name: 'Coorg Arabica Plantation Coffee Beans',
    category: 'Spices',
    variety: 'Plantation A Washed Arabica',
    quantity: 45,
    unit: 'quintal',
    pricePerUnit: 28500,
    location: 'Kodagu (Coorg)',
    state: 'Karnataka',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Patil',
    fpoName: 'Western Ghats Agro Collective',
    farmerPhone: '+91 98220 44123',
    availableDate: '2026-09-14',
    harvestDate: '2026-08-05',
    grade: 'Grade A+',
    description:
      'Shade-grown, wet-processed high elevation Arabica beans. Clean cup, balanced citrus acidity and chocolate aroma notes. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 2,
    createdAt: '2026-09-02T05:30:00Z',
  },
  {
    id: 'prod-108',
    name: 'Bhagwa Export-Quality Pomegranate',
    category: 'Fruits',
    variety: 'Bhagwa / Sindhuri Dark Red Arils',
    quantity: 65,
    unit: 'quintal',
    pricePerUnit: 9200,
    location: 'Solapur',
    state: 'Maharashtra',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Patil',
    fpoName: 'Sahyadri Agro Farmers Producer Co. Ltd.',
    farmerPhone: '+91 98220 44123',
    availableDate: '2026-09-06',
    harvestDate: '2026-08-31',
    grade: 'Organic Certified',
    description:
      'Glossy deep red skin with soft, sweet arils. GlobalGAP certified farming protocol, zero chemical residue detected in batch lab testing. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 2,
    createdAt: '2026-09-02T06:00:00Z',
  },
  {
    id: 'prod-109',
    name: 'Salem Golden High-Curcumin Turmeric',
    category: 'Spices',
    variety: 'Salem / Waigaon Whole Finger (5.4% Curcumin)',
    quantity: 50,
    unit: 'quintal',
    pricePerUnit: 14800,
    location: 'Nizamabad',
    state: 'Telangana',
    farmerId: 'farmer-2',
    farmerName: 'Gurpreet Singh',
    fpoName: 'Telangana Spices & Turmeric Hub',
    farmerPhone: '+91 98140 33219',
    availableDate: '2026-09-11',
    harvestDate: '2026-08-12',
    grade: 'Organic Certified',
    description:
      'Traditional sun-dried polished turmeric fingers with certified 5.4% natural curcumin content. High aroma and intense yellow color. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1615485290176-963b65288593?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 1,
    createdAt: '2026-08-29T10:00:00Z',
  },
  {
    id: 'prod-110',
    name: 'Yellow Mustard Seed (Brassica)',
    category: 'Oilseeds',
    variety: 'Pusa Bold / Yellow Sarson (38% Oil Yield)',
    quantity: 210,
    unit: 'quintal',
    pricePerUnit: 5400,
    location: 'Alwar',
    state: 'Rajasthan',
    farmerId: 'farmer-3',
    farmerName: 'Rajesh Verma',
    fpoName: 'Rajasthan Mustard Farmers Union',
    farmerPhone: '+91 94120 77890',
    availableDate: '2026-09-09',
    harvestDate: '2026-08-18',
    grade: 'Grade A',
    description:
      'Uniformly sized bold mustard seeds with verified 38% natural oil recovery. Destoned and pre-cleaned for bulk expelling. (Demo Listing)',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=800&q=80',
    minOrderQuantity: 6,
    createdAt: '2026-08-31T15:30:00Z',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-8801',
    productId: 'prod-101',
    productName: 'Nashik Red Onions (Garwa)',
    category: 'Vegetables',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Patil',
    fpoName: 'Sahyadri Agro Farmers Producer Co. Ltd.',
    buyerId: 'buyer-1',
    buyerName: 'Vikram Mehta',
    buyerCompany: 'FreshBazaar Retail & Supermarkets Ltd.',
    buyerPhone: '+91 98901 55678',
    quantity: 25,
    unit: 'quintal',
    pricePerUnit: 2450,
    totalPrice: 61250,
    handlingFee: 1200,
    orderDate: '2026-09-01T10:30:00Z',
    deliveryLocation: 'FreshBazaar Central Warehouse, Hadapsar, Pune, Maharashtra',
    deliveryDate: '2026-09-04',
    status: 'Approved',
    paymentStatus: 'Escrow Secured (Demo)',
    trackingNumber: 'KC-TRK-7712',
    notes: 'Please dispatch in 50kg branded mesh bags with calibration tag. (Demo Order)',
  },
  {
    id: 'ORD-2026-8802',
    productId: 'prod-102',
    productName: 'Sharbati Premium Golden Wheat',
    category: 'Grains & Pulses',
    farmerId: 'farmer-2',
    farmerName: 'Gurpreet Singh',
    fpoName: 'Malwa Progressive Kisan Producer Co.',
    buyerId: 'buyer-3',
    buyerName: 'Harish Sharma',
    buyerCompany: 'Bharat Agri Logistics & Supermarket Chain',
    buyerPhone: '+91 98110 88234',
    quantity: 80,
    unit: 'quintal',
    pricePerUnit: 3450,
    totalPrice: 276000,
    handlingFee: 3500,
    orderDate: '2026-09-01T14:45:00Z',
    deliveryLocation: 'Bharat Agro Logistics Hub, Kundli Industrial Corridor, Delhi NCR',
    deliveryDate: '2026-09-05',
    status: 'Shipped',
    paymentStatus: 'Escrow Secured (Demo)',
    trackingNumber: 'KC-TRK-7719',
    notes: 'Direct delivery dock #2, palletized unload requested. (Demo Order)',
  },
  {
    id: 'ORD-2026-8803',
    productId: 'prod-103',
    productName: 'Kufri Jyoti Processing Potatoes',
    category: 'Vegetables',
    farmerId: 'farmer-3',
    farmerName: 'Rajesh Verma',
    fpoName: 'Awadh Agro Producer Cooperative',
    buyerId: 'buyer-2',
    buyerName: 'Anita Shenoy',
    buyerCompany: 'AgroMart Wholesale & Processing Corp.',
    buyerPhone: '+91 98200 99451',
    quantity: 40,
    unit: 'quintal',
    pricePerUnit: 1680,
    totalPrice: 67200,
    handlingFee: 1400,
    orderDate: '2026-09-02T04:15:00Z',
    deliveryLocation: 'AgroMart Processing Terminal, Vashi APMC, Navi Mumbai, Maharashtra',
    deliveryDate: '2026-09-06',
    status: 'Pending',
    paymentStatus: 'Escrow Secured (Demo)',
    trackingNumber: 'KC-TRK-7724',
    notes: 'Inter-state transit with digital e-way bill. (Demo Order)',
  },
  {
    id: 'ORD-2026-8790',
    productId: 'prod-108',
    productName: 'Bhagwa Export-Quality Pomegranate',
    category: 'Fruits',
    farmerId: 'farmer-1',
    farmerName: 'Ramesh Patil',
    fpoName: 'Sahyadri Agro Farmers Producer Co. Ltd.',
    buyerId: 'buyer-2',
    buyerName: 'Anita Shenoy',
    buyerCompany: 'AgroMart Wholesale & Processing Corp.',
    buyerPhone: '+91 98200 99451',
    quantity: 15,
    unit: 'quintal',
    pricePerUnit: 9200,
    totalPrice: 138000,
    handlingFee: 2200,
    orderDate: '2026-08-28T09:00:00Z',
    deliveryLocation: 'AgroMart Cold Hub, Turbhe, Navi Mumbai, Maharashtra',
    deliveryDate: '2026-08-30',
    status: 'Delivered',
    paymentStatus: 'Completed',
    trackingNumber: 'KC-TRK-7650',
    notes: 'Delivered successfully at temperature 4°C with intact batch seal. (Demo Order)',
  },
];

export const DEMO_DEMAND_FORECASTS: DemandForecast[] = [
  {
    id: 'f-1',
    product: 'Nashik Red Onions (Garwa)',
    category: 'Vegetables',
    location: 'Nashik Hub (Maharashtra)',
    targetMarket: 'Mumbai, Pune & National Wholesale Mandis',
    currentDemandIndex: 92,
    forecastDemand: '4,850 Quintals (+24%)',
    forecastDemandNumber: 4850,
    recommendedListingQuantity: '60 - 150 Quintals',
    referencePriceRange: '₹2,400 - ₹2,750 / quintal',
    minPrice: 2400,
    maxPrice: 2750,
    trend: 'rising',
    trendPercentage: 24,
    confidenceScore: '91% (Synthetic)',
    nextPeakWindow: 'Next 10 - 20 Days (Festival Demand Spike)',
    keyFactors: [
      'Seasonal festival stockpiling by urban supermarket chains across metros',
      'Lower acreage in neighboring southern belts tightening mandi arrivals',
      'Strong forward wholesale contracting requests from northern consumption hubs',
    ],
    isSynthetic: true,
  },
  {
    id: 'f-2',
    product: 'Sharbati Premium Golden Wheat',
    category: 'Grains & Pulses',
    location: 'Ludhiana Hub (Punjab)',
    targetMarket: 'Delhi NCR, Kanpur & National Flour Millers',
    currentDemandIndex: 88,
    forecastDemand: '7,600 Quintals (+19%)',
    forecastDemandNumber: 7600,
    recommendedListingQuantity: '100 - 350 Quintals',
    referencePriceRange: '₹3,400 - ₹3,650 / quintal',
    minPrice: 3400,
    maxPrice: 3650,
    trend: 'rising',
    trendPercentage: 19,
    confidenceScore: '94% (Synthetic)',
    nextPeakWindow: 'Next 15 - 30 Days',
    keyFactors: [
      'High consumer demand for single-origin chakki fresh atta brands',
      'Institutional procurement tenders opening for regional buffer reserves',
      'Inter-state freight corridors operating with regular rake and reefer capacity',
    ],
    isSynthetic: true,
  },
  {
    id: 'f-3',
    product: 'Kufri Jyoti Processing Potatoes',
    category: 'Vegetables',
    location: 'Agra Hub (Uttar Pradesh)',
    targetMarket: 'Food Processing Plants & Cold Storage Chains',
    currentDemandIndex: 72,
    forecastDemand: '6,200 Quintals (+6%)',
    forecastDemandNumber: 6200,
    recommendedListingQuantity: '80 - 220 Quintals',
    referencePriceRange: '₹1,600 - ₹1,780 / quintal',
    minPrice: 1600,
    maxPrice: 1780,
    trend: 'stable',
    trendPercentage: 6,
    confidenceScore: '89% (Synthetic)',
    nextPeakWindow: 'Next 25 - 40 Days (Steady Baseline)',
    keyFactors: [
      'Adequate cold storage reserves in northern belts maintaining price equilibrium',
      'Contractual institutional demand from snack & chip manufacturers remains firm',
      'Staggered harvest schedules preventing regional oversupply',
    ],
    isSynthetic: true,
  },
  {
    id: 'f-4',
    product: 'Coorg Arabica Plantation Coffee',
    category: 'Spices',
    location: 'Kodagu Hub (Karnataka)',
    targetMarket: 'Specialty Roasters & Beverage Chains (Bengaluru, Mumbai, Delhi)',
    currentDemandIndex: 86,
    forecastDemand: '1,400 Quintals (+22%)',
    forecastDemandNumber: 1400,
    recommendedListingQuantity: '15 - 40 Quintals',
    referencePriceRange: '₹27,500 - ₹30,000 / quintal',
    minPrice: 27500,
    maxPrice: 30000,
    trend: 'rising',
    trendPercentage: 22,
    confidenceScore: '92% (Synthetic)',
    nextPeakWindow: 'Next 14 - 28 Days',
    keyFactors: [
      'Expanding specialty cafe chains driving premium farm-origin purchases',
      'Export parity pricing stabilizing domestic premium coffee bean lots',
      'Direct FPO roaster contracts commanding 18% margin over general auction',
    ],
    isSynthetic: true,
  },
  {
    id: 'f-5',
    product: 'Shankar-6 Raw Cotton',
    category: 'Oilseeds',
    location: 'Rajkot Hub (Gujarat)',
    targetMarket: 'Textile Mills & Ginning Clusters (Gujarat, Maharashtra, Tamil Nadu)',
    currentDemandIndex: 80,
    forecastDemand: '5,800 Quintals (+12%)',
    forecastDemandNumber: 5800,
    recommendedListingQuantity: '50 - 150 Quintals',
    referencePriceRange: '₹6,700 - ₹7,100 / quintal',
    minPrice: 6700,
    maxPrice: 7100,
    trend: 'rising',
    trendPercentage: 12,
    confidenceScore: '88% (Synthetic)',
    nextPeakWindow: 'Next 20 - 35 Days',
    keyFactors: [
      'Domestic spinning mills restocking inventory ahead of peak production quarter',
      'Stable ginning conversion margins encouraging farm-gate lot consolidation',
      'Export inquiry momentum picking up across major ports',
    ],
    isSynthetic: true,
  },
  {
    id: 'f-6',
    product: 'Yellow Mustard Seed (Brassica)',
    category: 'Oilseeds',
    location: 'Alwar Hub (Rajasthan)',
    targetMarket: 'Edible Oil Refineries & Wholesale Markets',
    currentDemandIndex: 68,
    forecastDemand: '3,900 Quintals (-2%)',
    forecastDemandNumber: 3900,
    recommendedListingQuantity: '60 - 140 Quintals',
    referencePriceRange: '₹5,300 - ₹5,600 / quintal',
    minPrice: 5300,
    maxPrice: 5600,
    trend: 'stable',
    trendPercentage: -2,
    confidenceScore: '85% (Synthetic)',
    nextPeakWindow: 'Next 30 Days',
    keyFactors: [
      'Stable crushing margins at regional mustard oil processing mills',
      'Arrivals from northern desert belts tracking close to 5-year averages',
      'Consistent consumer demand for kachi ghani unrefined mustard oil',
    ],
    isSynthetic: true,
  },
];

export const DEMO_LOGISTICS_ROUTES: DeliveryRoute[] = [
  {
    id: 'route-01',
    routeCode: 'KC-RT-WEST-01',
    vehicleId: 'MH-15-EG-4482',
    vehicleType: 'Eicher Pro 2049 (4.5 Ton Multi-Temp Reefer)',
    vehicleCapacity: 45, // in quintals
    capacityUnit: 'quintals',
    currentLoad: 35, // 77.8% utilization
    driverName: 'Dilip Gaikwad',
    driverPhone: '+91 97654 22019',
    status: 'In Transit',
    origin: 'Sahyadri FPO Cluster, Dindori (Nashik, Maharashtra)',
    destination: 'Vashi APMC Hub & Turbhe Cold Storage (Navi Mumbai, Maharashtra)',
    totalDistanceKm: 184,
    estTransitTime: '4 hrs 45 mins',
    estFuelConsumption: '22.5 Liters Diesel',
    carbonSavedKg: 42.8,
    stops: [
      {
        sequence: 1,
        locationName: 'Sahyadri FPO Central Depot, Dindori',
        type: 'Pickup',
        action: 'Load 25 Quintals Red Onions (Garwa)',
        eta: '06:00 AM (Completed)',
        status: 'Completed',
        address: 'Gate 2, Agro Processing Zone, Dindori, Nashik, Maharashtra',
        contactPerson: 'Ramesh Patil (FPO Lead)',
      },
      {
        sequence: 2,
        locationName: 'Ozar Cold Chain Aggregation Node',
        type: 'Pickup',
        action: 'Load 10 Quintals Organic Pomegranates',
        eta: '07:30 AM (Completed)',
        status: 'Completed',
        address: 'National Highway 848, Ozar Airport Corridor, Maharashtra',
        contactPerson: 'Kailash Wagh (Hub Manager)',
      },
      {
        sequence: 3,
        locationName: 'Kasara Ghat Transit Checkpoint',
        type: 'Transit Hub',
        action: 'Digital E-way Bill Scan & Reefer Temperature Log',
        eta: '09:45 AM (Passed)',
        status: 'Completed',
        address: 'NH 160 Express Toll Plaza, Kasara, Maharashtra',
      },
      {
        sequence: 4,
        locationName: 'FreshBazaar Distribution Bay, Thane West',
        type: 'Drop-off',
        action: 'Unload 15 Quintals Onions + 5 Quintals Pomegranates',
        eta: '11:15 AM (Next Stop)',
        status: 'Current',
        address: 'Ghodbunder Logistics Park, Thane West, Maharashtra 400607',
        contactPerson: 'Vikram Mehta / Inward Manager',
      },
      {
        sequence: 5,
        locationName: 'AgroMart Central Wholesale Dock, Vashi APMC',
        type: 'Drop-off',
        action: 'Unload Remaining 10 Quintals Onions + 5 Quintals Pomegranates',
        eta: '12:45 PM (Est.)',
        status: 'Pending',
        address: 'Sector 19, Market II, Turbhe-Vashi APMC, Navi Mumbai, Maharashtra',
        contactPerson: 'Anita Shenoy / Bay Dock 4',
      },
    ],
    associatedOrderIds: ['ORD-2026-8801', 'ORD-2026-8790'],
  },
  {
    id: 'route-02',
    routeCode: 'KC-RT-NORTH-02',
    vehicleId: 'PB-10-CZ-8821',
    vehicleType: 'Tata Ultra T.11 (7.5 Ton Heavy Ag Cargo Deck)',
    vehicleCapacity: 75,
    capacityUnit: 'quintals',
    currentLoad: 60, // 80% utilization
    driverName: 'Harbhajan Sandhu',
    driverPhone: '+91 98761 55421',
    status: 'In Transit',
    origin: 'Malwa FPO Cluster, Ludhiana / Sangrur (Punjab)',
    destination: 'Bharat Agri Logistics Hub, Kundli & Azadpur Mandi (Delhi NCR)',
    totalDistanceKm: 310,
    estTransitTime: '6 hrs 15 mins',
    estFuelConsumption: '38.0 Liters Diesel',
    carbonSavedKg: 74.2,
    stops: [
      {
        sequence: 1,
        locationName: 'Malwa Grain Silos, Ludhiana District',
        type: 'Pickup',
        action: 'Load 45 Quintals Sharbati Golden Wheat',
        eta: '04:30 AM (Completed)',
        status: 'Completed',
        address: 'GT Road Grain Terminal, Ludhiana, Punjab 141001',
        contactPerson: 'Gurpreet Singh (FPO Lead)',
      },
      {
        sequence: 2,
        locationName: 'Khanna Grain Consolidation Depot',
        type: 'Pickup',
        action: 'Load 15 Quintals Additional Graded Wheat Lots',
        eta: '06:00 AM (Completed)',
        status: 'Completed',
        address: 'Asia Largest Grain Market Complex, Khanna, Punjab',
        contactPerson: 'Amarjit Singh (Depot Supervisor)',
      },
      {
        sequence: 3,
        locationName: 'Shambhu Inter-State Transit Gate',
        type: 'Transit Hub',
        action: 'National E-Way Bill Verification & Electronic Weight Slip',
        eta: '08:30 AM (Passed)',
        status: 'Completed',
        address: 'NH 44 Border Checkpoint, Punjab-Haryana Border',
      },
      {
        sequence: 4,
        locationName: 'Bharat Agri Cold & Dry Depot, Kundli Industrial Corridor',
        type: 'Drop-off',
        action: 'Unload 40 Quintals Golden Wheat for Retail Packaging',
        eta: '12:00 PM (Current)',
        status: 'Current',
        address: 'Phase IV, Kundli Logistics Estate, Sonipat / Delhi NCR 131028',
        contactPerson: 'Harish Sharma / Inward Logistics',
      },
      {
        sequence: 5,
        locationName: 'Azadpur Wholesale Terminal Bay #8, Delhi',
        type: 'Drop-off',
        action: 'Unload Remaining 20 Quintals Wheat Lots',
        eta: '02:15 PM (Est.)',
        status: 'Pending',
        address: 'Gate 3, Azadpur Mandi, New Delhi 110033',
        contactPerson: 'Mandi Inward Clearing Agent',
      },
    ],
    associatedOrderIds: ['ORD-2026-8802'],
  },
  {
    id: 'route-03',
    routeCode: 'KC-RT-SOUTH-03',
    vehicleId: 'KA-05-MN-3419',
    vehicleType: 'Ashok Leyland Partner (4.0 Ton Insulated Cargo)',
    vehicleCapacity: 40,
    capacityUnit: 'quintals',
    currentLoad: 32, // 80% utilization
    driverName: 'M. Venkatesh',
    driverPhone: '+91 94480 66219',
    status: 'Scheduled',
    origin: 'Western Ghats Agro Hub, Kodagu / Hassan (Karnataka)',
    destination: 'Yeshwanthpur Wholesale Market & Whitefield Hub (Bengaluru, Karnataka)',
    totalDistanceKm: 235,
    estTransitTime: '5 hrs 20 mins',
    estFuelConsumption: '26.0 Liters Diesel',
    carbonSavedKg: 52.0,
    stops: [
      {
        sequence: 1,
        locationName: 'Coorg Planters Processing Shed, Madikeri',
        type: 'Pickup',
        action: 'Load 18 Quintals Arabica Plantation Coffee',
        eta: '01:00 PM (Scheduled)',
        status: 'Pending',
        address: 'Plantation Access Road, Madikeri, Kodagu, Karnataka 571201',
        contactPerson: 'Bopanna K. (Field Manager)',
      },
      {
        sequence: 2,
        locationName: 'Hassan Spices Aggregation Node',
        type: 'Pickup',
        action: 'Load 14 Quintals High-Curcumin Spices & Ginger',
        eta: '03:30 PM (Scheduled)',
        status: 'Pending',
        address: 'Industrial Growth Centre, Hassan, Karnataka 573201',
        contactPerson: 'Naveen Gowda',
      },
      {
        sequence: 3,
        locationName: 'Yeshwanthpur APMC Yard Dock #12, Bengaluru',
        type: 'Drop-off',
        action: 'Unload Coffee & Spices for Roasters & Supermarket Distribution',
        eta: '07:30 PM (Est.)',
        status: 'Pending',
        address: 'APMC Market Yard, Yeshwanthpur, Bengaluru, Karnataka 560022',
        contactPerson: 'Wholesale Procurement Desk',
      },
    ],
    associatedOrderIds: ['ORD-2026-8803'],
  },
];
````

---
## `src/index.css`
````css
@import "tailwindcss";

@layer base {
  body {
    background-color: #F9FAFB;
    color: #0f172a;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
}
````

---
## `src/main.tsx`
````tsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
````

---
## `src/services/authService.ts`
````ts
/**
 * KissanConnect Authentication Service (Prototype Architecture)
 * 
 * NOTE FOR SUPABASE INTEGRATION:
 * This service provides the local prototype state and validation layer.
 * In the production release, the methods in this file will connect directly to:
 * - Supabase Auth (`supabase.auth.signUp`, `supabase.auth.signInWithPassword`)
 * - Supabase PostgreSQL tables: `public.farmers`, `public.buyers`, `public.user_profiles`
 * with Row Level Security (RLS) policies.
 */

import { FarmerRegistrationInput, BuyerRegistrationInput, UserProfile } from '../types';
import { DEMO_FARMER_PROFILES, DEMO_BUYER_PROFILES } from '../data/syntheticData';

export interface PasswordValidationResult {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isValid: boolean;
  score: number; // 0 to 5
  strengthText: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  strengthColor: string;
}

export class AuthService {
  private static registeredFarmers: UserProfile[] = [...DEMO_FARMER_PROFILES];
  private static registeredBuyers: UserProfile[] = [...DEMO_BUYER_PROFILES];

  // Store last registered account context for post-registration onboarding
  private static lastRegisteredRole: 'farmer' | 'buyer' | null = null;
  private static lastRegisteredName: string = '';

  /**
   * Evaluates strong password rules:
   * - Minimum 8 characters
   * - At least one uppercase letter (A-Z)
   * - At least one lowercase letter (a-z)
   * - At least one number (0-9)
   * - At least one special character (!@#$%^&*...)
   */
  public static validatePassword(password: string): PasswordValidationResult {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    const checks = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar];
    const score = checks.filter(Boolean).length;

    let strengthText: PasswordValidationResult['strengthText'] = 'Very Weak';
    let strengthColor = 'bg-rose-500';

    if (score <= 1) {
      strengthText = 'Very Weak';
      strengthColor = 'bg-rose-500';
    } else if (score === 2) {
      strengthText = 'Weak';
      strengthColor = 'bg-amber-500';
    } else if (score === 3) {
      strengthText = 'Medium';
      strengthColor = 'bg-yellow-500';
    } else if (score === 4) {
      strengthText = 'Strong';
      strengthColor = 'bg-emerald-500';
    } else {
      strengthText = 'Very Strong';
      strengthColor = 'bg-emerald-600';
    }

    return {
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      isValid: hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar,
      score,
      strengthText,
      strengthColor,
    };
  }

  /**
   * Validates standard 10-digit Indian mobile number
   */
  public static validateMobile(mobile: string): boolean {
    const cleaned = mobile.replace(/[^0-9]/g, '');
    return cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned);
  }

  /**
   * Validates standard 6-digit Indian PIN code
   */
  public static validatePinCode(pin: string): boolean {
    const cleaned = pin.replace(/[^0-9]/g, '');
    return cleaned.length === 6 && /^[1-9]\d{5}$/.test(cleaned);
  }

  /**
   * Validates email format if entered
   */
  public static validateEmail(email: string): boolean {
    if (!email.trim()) return true; // Optional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  /**
   * Simulates Demo Aadhaar formatting.
   * Only the last 4 digits are accepted/retained. Full Aadhaar is NEVER stored.
   */
  public static formatMaskedAadhaar(input: string): string {
    const cleaned = input.replace(/[^0-9]/g, '');
    const lastFour = cleaned.slice(-4);
    if (lastFour.length === 0) return 'XXXX XXXX ';
    return `XXXX XXXX ${lastFour}`;
  }

  /**
   * Registers a Farmer / FPO account in demo state
   */
  public static registerFarmer(input: FarmerRegistrationInput): UserProfile {
    const initials = input.fullName
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'FA';

    const newProfile: UserProfile = {
      id: `farmer-${Date.now()}`,
      name: input.fullName.trim(),
      role: 'farmer',
      orgName: `${input.fullName.trim()}'s Agricultural Enterprise`,
      location: `${input.district}, ${input.state}`,
      phone: `+91 ${input.mobile}`,
      email: input.email ? input.email.trim() : `${input.mobile}@kissanconnect.local`,
      avatarText: initials,
      verified: input.isAadhaarVerified,
    };

    this.registeredFarmers.unshift(newProfile);
    this.lastRegisteredRole = 'farmer';
    this.lastRegisteredName = input.fullName;

    return newProfile;
  }

  /**
   * Registers a Buyer account in demo state
   */
  public static registerBuyer(input: BuyerRegistrationInput): UserProfile {
    const initials = input.orgName
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'BY';

    const newProfile: UserProfile = {
      id: `buyer-${Date.now()}`,
      name: input.fullName.trim(),
      role: 'buyer',
      orgName: input.orgName.trim(),
      location: `${input.district}, ${input.state}`,
      phone: `+91 ${input.mobile}`,
      email: input.email ? input.email.trim() : `${input.mobile}@kissanconnect.local`,
      avatarText: initials,
      verified: true,
    };

    this.registeredBuyers.unshift(newProfile);
    this.lastRegisteredRole = 'buyer';
    this.lastRegisteredName = input.fullName;

    return newProfile;
  }

  public static getLastRegistered(): { role: 'farmer' | 'buyer' | null; name: string } {
    return {
      role: this.lastRegisteredRole,
      name: this.lastRegisteredName,
    };
  }

  public static getAllFarmers(): UserProfile[] {
    return this.registeredFarmers;
  }

  public static getAllBuyers(): UserProfile[] {
    return this.registeredBuyers;
  }
}
````

---
## `src/services/demandService.ts`
````ts
/**
 * Demand Intelligence Service Layer (Foundation Phase: Synthetic Demo Data)
 *
 * Notice: This is synthetic demo data only.
 * Future Architecture Integration:
 * - Direct HTTP proxy to Python / FastAPI Machine Learning microservice
 * - Time-series ARIMA / XGBoost regional mandi price forecasting models
 */

import { DemandForecast, ProduceCategory } from '../types';
import { DEMO_DEMAND_FORECASTS } from '../data/syntheticData';

export class DemandService {
  static getAllForecasts(): DemandForecast[] {
    return DEMO_DEMAND_FORECASTS;
  }

  static getForecastByProduct(productName: string): DemandForecast | undefined {
    return DEMO_DEMAND_FORECASTS.find((f) =>
      f.product.toLowerCase().includes(productName.toLowerCase())
    );
  }

  static getForecastsByCategory(category: ProduceCategory): DemandForecast[] {
    return DEMO_DEMAND_FORECASTS.filter((f) => f.category === category);
  }

  static getHighDemandForecasts(): DemandForecast[] {
    return DEMO_DEMAND_FORECASTS.filter((f) => f.trend === 'rising');
  }
}
````

---
## `src/services/logisticsService.ts`
````ts
/**
 * Logistics & Routing Service Layer (Foundation Phase: Synthetic Demo Data)
 *
 * Notice: This is prototype demo data only.
 * Future Architecture Integration:
 * - Google OR-Tools Vehicle Routing Problem (VRP) solver with capacity constraints
 * - Leaflet / OpenStreetMap or Google Maps Platform route geometry visualization
 */

import { DeliveryRoute } from '../types';
import { DEMO_LOGISTICS_ROUTES } from '../data/syntheticData';

export class LogisticsService {
  static getAllRoutes(): DeliveryRoute[] {
    return DEMO_LOGISTICS_ROUTES;
  }

  static getRouteById(id: string): DeliveryRoute | undefined {
    return DEMO_LOGISTICS_ROUTES.find((r) => r.id === id);
  }

  static getActiveRoutes(): DeliveryRoute[] {
    return DEMO_LOGISTICS_ROUTES.filter(
      (r) => r.status === 'In Transit' || r.status === 'Scheduled'
    );
  }

  static calculateFleetStats() {
    const routes = DEMO_LOGISTICS_ROUTES;
    const totalVehicles = routes.length;
    const activeVehicles = routes.filter((r) => r.status === 'In Transit').length;
    const totalCapacityQuintals = routes.reduce((acc, r) => acc + r.vehicleCapacity, 0);
    const totalLoadedQuintals = routes.reduce((acc, r) => acc + r.currentLoad, 0);
    const avgUtilizationPercent = totalCapacityQuintals > 0
      ? Math.round((totalLoadedQuintals / totalCapacityQuintals) * 100)
      : 0;
    const totalDistance = routes.reduce((acc, r) => acc + r.totalDistanceKm, 0);
    const totalCarbonSaved = routes.reduce((acc, r) => acc + (r.carbonSavedKg || 0), 0);

    return {
      totalVehicles,
      activeVehicles,
      totalCapacityQuintals,
      totalLoadedQuintals,
      avgUtilizationPercent,
      totalDistance,
      totalCarbonSaved,
    };
  }
}
````

---
## `src/services/orderService.ts`
````ts
/**
 * Order Service Layer (Foundation Phase: Mock / Synthetic State)
 *
 * Future Architecture Integration:
 * - Replace mock state operations with Supabase PostgreSQL tables ('orders')
 * - Integrate event webhooks triggering Python/FastAPI forecasting & OR-Tools logistics routes
 */

import { Order, OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../data/syntheticData';

const STORAGE_KEY = 'kissanconnect_orders_v1';

export class OrderService {
  private static loadOrders(): Order[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  }

  private static saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // storage unavailable
    }
  }

  static getAll(): Order[] {
    return this.loadOrders();
  }

  static getById(id: string): Order | undefined {
    return this.loadOrders().find((o) => o.id === id);
  }

  static getByFarmer(farmerId: string): Order[] {
    return this.loadOrders().filter((o) => o.farmerId === farmerId);
  }

  static getByBuyer(buyerId: string): Order[] {
    return this.loadOrders().filter((o) => o.buyerId === buyerId);
  }

  static placeOrder(orderData: Omit<Order, 'id' | 'orderDate' | 'status' | 'trackingNumber'>): Order {
    const orders = this.loadOrders();
    const newOrder: Order = {
      ...orderData,
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      orderDate: new Date().toISOString(),
      status: 'Pending',
      paymentStatus: 'Escrow Secured (Demo)',
      trackingNumber: `KC-TRK-${Math.floor(7000 + Math.random() * 2000)}`,
    };
    const updated = [newOrder, ...orders];
    this.saveOrders(updated);
    return newOrder;
  }

  static updateStatus(orderId: string, newStatus: OrderStatus): Order | null {
    const orders = this.loadOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    orders[index] = {
      ...orders[index],
      status: newStatus,
      paymentStatus: newStatus === 'Delivered' ? 'Completed' : orders[index].paymentStatus,
    };
    this.saveOrders(orders);
    return orders[index];
  }

  static resetToDefaults(): void {
    this.saveOrders(INITIAL_ORDERS);
  }
}
````

---
## `src/services/productService.ts`
````ts
/**
 * Product Service Layer (Foundation Phase: Mock / Synthetic State)
 *
 * Future Architecture Integration:
 * - Replace mock methods with Supabase PostgreSQL client calls:
 *   e.g. supabase.from('products').select('*').eq('is_active', true)
 */

import { Product, MarketplaceFilter } from '../types';
import { INITIAL_PRODUCTS } from '../data/syntheticData';

const STORAGE_KEY = 'kissanconnect_products_v1';

export class ProductService {
  private static loadProducts(): Product[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  }

  private static saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // storage unavailable
    }
  }

  static getAll(): Product[] {
    return this.loadProducts();
  }

  static getActive(): Product[] {
    return this.loadProducts().filter((p) => p.isActive);
  }

  static getById(id: string): Product | undefined {
    return this.loadProducts().find((p) => p.id === id);
  }

  static getByFarmer(farmerId: string): Product[] {
    return this.loadProducts().filter((p) => p.farmerId === farmerId);
  }

  static create(productData: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.loadProducts();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newProduct, ...products];
    this.saveProducts(updated);
    return newProduct;
  }

  static update(id: string, updates: Partial<Product>): Product | null {
    const products = this.loadProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    this.saveProducts(products);
    return products[index];
  }

  static toggleStatus(id: string): Product | null {
    const products = this.loadProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index].isActive = !products[index].isActive;
    this.saveProducts(products);
    return products[index];
  }

  static delete(id: string): boolean {
    const products = this.loadProducts();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length !== products.length) {
      this.saveProducts(filtered);
      return true;
    }
    return false;
  }

  static filterProducts(
    products: Product[],
    filters: MarketplaceFilter
  ): Product[] {
    return products.filter((p) => {
      // Active filter
      if (filters.availabilityOnly && !p.isActive) return false;

      // Category filter
      if (filters.category && filters.category !== 'All' && p.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location && filters.location !== 'All' && p.location !== filters.location) {
        return false;
      }

      // Price filter
      if (filters.maxPrice > 0 && p.pricePerUnit > filters.maxPrice) {
        return false;
      }

      // Search query (name, variety, seller, location, category)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        const matchLocation = p.location.toLowerCase().includes(query);
        const matchFarmer = p.farmerName.toLowerCase().includes(query);
        const matchFPO = p.fpoName?.toLowerCase().includes(query) ?? false;
        const matchVariety = p.variety?.toLowerCase().includes(query) ?? false;
        if (!matchName && !matchCategory && !matchLocation && !matchFarmer && !matchFPO && !matchVariety) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.pricePerUnit - b.pricePerUnit;
      if (filters.sortBy === 'price-desc') return b.pricePerUnit - a.pricePerUnit;
      if (filters.sortBy === 'qty-desc') return b.quantity - a.quantity;
      // default 'recent'
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  static resetToDefaults(): void {
    this.saveProducts(INITIAL_PRODUCTS);
  }
}
````

---
## `src/types/index.ts`
````ts
export type ProduceCategory =
  | 'Vegetables'
  | 'Fruits'
  | 'Grains & Pulses'
  | 'Spices'
  | 'Oilseeds';

export type ProduceUnit = 'kg' | 'quintal' | 'ton';

export type OrderStatus =
  | 'Pending'
  | 'Approved'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type ProduceGrade =
  | 'Grade A+'
  | 'Grade A'
  | 'Grade B'
  | 'Organic Certified';

export interface Product {
  id: string;
  name: string;
  category: ProduceCategory;
  variety?: string;
  quantity: number;
  unit: ProduceUnit;
  pricePerUnit: number;
  location: string;
  state?: string;
  farmerId: string;
  farmerName: string;
  fpoName?: string;
  farmerPhone?: string;
  availableDate: string;
  harvestDate?: string;
  grade?: ProduceGrade;
  description: string;
  isActive: boolean;
  image: string;
  minOrderQuantity?: number;
  createdAt: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  category: ProduceCategory;
  farmerId: string;
  farmerName: string;
  fpoName?: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerPhone?: string;
  quantity: number;
  unit: ProduceUnit;
  pricePerUnit: number;
  totalPrice: number;
  handlingFee?: number;
  orderDate: string;
  deliveryLocation: string;
  deliveryDate: string;
  status: OrderStatus;
  paymentStatus: 'Escrow Secured (Demo)' | 'Pending' | 'Completed';
  trackingNumber?: string;
  notes?: string;
}

export interface DemandForecast {
  id: string;
  product: string;
  category: ProduceCategory;
  location: string;
  targetMarket: string;
  currentDemandIndex: number; // 1 to 100
  forecastDemand: string;
  forecastDemandNumber: number;
  recommendedListingQuantity: string;
  referencePriceRange: string;
  minPrice: number;
  maxPrice: number;
  trend: 'rising' | 'stable' | 'falling';
  trendPercentage: number;
  confidenceScore: string;
  nextPeakWindow: string;
  keyFactors: string[];
  isSynthetic: true;
}

export interface RouteStop {
  sequence: number;
  locationName: string;
  type: 'Pickup' | 'Transit Hub' | 'Drop-off';
  action: string;
  eta: string;
  status: 'Completed' | 'Current' | 'Pending';
  address: string;
  contactPerson?: string;
}

export interface DeliveryRoute {
  id: string;
  routeCode: string;
  vehicleId: string;
  vehicleType: string;
  vehicleCapacity: number; // in quintals
  capacityUnit: string;
  currentLoad: number;
  driverName: string;
  driverPhone: string;
  status: 'Scheduled' | 'In Transit' | 'Delivered' | 'Optimized';
  origin: string;
  destination: string;
  totalDistanceKm: number;
  estTransitTime: string;
  estFuelConsumption: string;
  stops: RouteStop[];
  associatedOrderIds: string[];
  carbonSavedKg?: number;
}

export type AppRole = 'guest' | 'farmer' | 'buyer';

export type AppView =
  | 'landing'
  | 'logistics'
  | 'auth-signin'
  | 'auth-farmer-signin'
  | 'auth-buyer-signin'
  | 'auth-register-role'
  | 'auth-farmer-register'
  | 'auth-buyer-register'
  | 'auth-success'
  | 'farmer-login'
  | 'farmer-dashboard'
  | 'farmer-add-product'
  | 'farmer-products'
  | 'farmer-product-details'
  | 'farmer-orders'
  | 'farmer-demand'
  | 'buyer-login'
  | 'buyer-dashboard'
  | 'buyer-marketplace'
  | 'buyer-product-details'
  | 'buyer-orders';

export interface FarmerRegistrationInput {
  fullName: string;
  mobile: string;
  email?: string;
  dateOfBirth: string;
  gender: string;
  aadhaarLastFour: string;
  isAadhaarVerified: boolean;
  addressLine: string;
  villageTownCity: string;
  district: string;
  state: string;
  pinCode: string;
  password: string;
}

export interface BuyerRegistrationInput {
  fullName: string;
  orgName: string;
  mobile: string;
  email?: string;
  addressLine: string;
  cityTown: string;
  district: string;
  state: string;
  pinCode: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'farmer' | 'buyer';
  orgName: string;
  location: string;
  phone: string;
  email: string;
  avatarText: string;
  verified: boolean;
}

export interface MarketplaceFilter {
  searchQuery: string;
  category: string;
  location: string;
  maxPrice: number;
  availabilityOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'qty-desc' | 'recent';
}
````

---

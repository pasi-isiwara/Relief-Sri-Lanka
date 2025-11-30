# Flood Relief Sri Lanka

A web application to help coordinate relief efforts during flood disasters in Sri Lanka. Users can request relief materials and view active relief requests in real-time.

## Features

- 🌍 Multi-language support (English, Sinhala, Tamil)
- 📍 GPS location capture for relief requests
- 📱 Real-time relief request updates
- 🎯 Material selection from predefined categories
- 📞 Multiple contact numbers support
- 🔐 Secure Firebase backend integration

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore)
- **Deployment**: Vercel

## Local Development

### Prerequisites

- Node.js 16+ installed
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/pasi-isiwara/Relief-Sri-Lanka.git
cd Relief-Sri-Lanka
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Create `.env.local` file with Firebase credentials:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5173/`

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and set environment variables in the Vercel dashboard

### Option 2: GitHub Integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Configure build settings:
   - **Framework**: Vite
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/dist`
5. Add Environment Variables in project settings with your Firebase credentials
6. Deploy

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pasi-isiwara/Relief-Sri-Lanka)

## Environment Variables

Set these in your Vercel project settings:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Create a Firestore database in test mode
3. Create a collection named `relief_requests`
4. Update your `.env.local` with Firebase credentials

## Production Build

```bash
cd frontend
npm run build
npm run preview
```

## License

MIT

## Emergency Contacts

- Emergency Hotline: 117 | 119
- Disaster Management Centre: 011-2-136136

---

For issues or contributions, please open an issue or submit a pull request on [GitHub](https://github.com/pasi-isiwara/Relief-Sri-Lanka).

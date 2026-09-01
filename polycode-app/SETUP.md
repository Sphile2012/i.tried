# Frontend Setup Guide

## Prerequisites
- Backend must be running on port 3001
- Node.js 18+ installed

## Quick Start

### 1. Install Dependencies
```powershell
npm install
```

### 2. Verify Environment
Check that `.env` exists with:
```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Polycode Learning Platform
```

### 3. Start Development Server
```powershell
npm run dev
```

### 4. Open Browser
Visit: http://localhost:5173/

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality

## API Configuration

The frontend connects to the backend via the `VITE_API_URL` environment variable.

**Default**: `http://localhost:3001/api`

To change:
1. Edit `.env` file
2. Update `VITE_API_URL`
3. Restart dev server

## Technology Stack

- **React 19** - UI Framework
- **TypeScript 6** - Type Safety
- **Vite 8** - Build Tool
- **Oxlint** - Fast Linter

## Project Structure

```
polycode-app/
├── src/
│   ├── assets/      # Images, icons
│   ├── App.tsx      # Main app component
│   ├── main.tsx     # Entry point
│   └── index.css    # Global styles
├── public/          # Static assets
├── .env             # Environment variables
└── vite.config.ts   # Vite configuration
```

## Next Steps

1. ✅ Start frontend: `npm run dev`
2. 🔗 Connect to backend API
3. 🎨 Build your UI components
4. 📱 Test authentication flow
5. 📚 Display lessons from API

## Troubleshooting

### Can't connect to backend
- Verify backend is running: http://localhost:3001/api/health
- Check `VITE_API_URL` in `.env`
- Check CORS settings in backend

### Port already in use
- Vite will automatically try the next available port (5174, 5175, etc.)

### Environment variables not working
- Restart dev server after changing `.env`
- Ensure variables start with `VITE_`

## Happy Coding! 🚀

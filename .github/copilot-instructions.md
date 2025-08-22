# Copilot Instructions for Medicine Reminder App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React TypeScript application built with Vite for a medicine reminder and family notification app.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Firebase (Authentication, Firestore, Cloud Functions)
- **Mobile**: Capacitor for native mobile features
- **Deployment**: Vercel for web deployment
- **Styling**: Tailwind CSS or CSS Modules

## Key Features
1. Medicine schedule management
2. Local notifications for medication reminders
3. Family sharing and notification system
4. Medicine intake tracking calendar
5. Real-time family member status updates

## Development Guidelines
- Use TypeScript strictly with proper type definitions
- Follow React functional components with hooks
- Implement proper error handling and loading states
- Use Firebase SDK v9+ with modular approach
- Structure components with clear separation of concerns
- Implement responsive design for mobile-first approach
- Use Capacitor plugins for native device features (notifications, calendar)

## Code Organization
- `/src/components` - Reusable UI components
- `/src/pages` - Route-based page components
- `/src/hooks` - Custom React hooks
- `/src/services` - Firebase and API services
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions and helpers
- `/src/stores` - State management (Context API or Zustand)

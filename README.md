# Media Playback App RN

## Requirements

- [x] Start a new project on React Native + Expo
- [x] Use Google Firebase to provide reconfiguration, analytics, and crash data collection
- [ ] The app is a radio player. It should play one link to an HLS audio stream (will be provided later)
- [x] Try to design the UI with Figma Make, or any other AI tool
  - [Figma Design](https://stitch.withgoogle.com/projects/9402638497170977509)
- [ ] The app is to use standard media session controls, both on Android and iOS
- [ ] The app is to be able to play the link in the foreground and background
- [ ] The app is to be able to handle unstable network conditions (reconnect on failure, etc)
- [ ] The app is to handle incoming calls/notifications
- [ ] Important: Try to modify the standard media session behaviour so that the pause button effectively serves as a stop button

## HLS Demo Stream

```
https://radio.dc.beltelecom.by/radiusfm/radiusfm.stream/playlist.m3u8
```

## Project Setup

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
EXPO_PUBLIC_BITMOVIN_LICENSE_KEY=your_License_key_here
EXPO_PUBLIC_STREAM_URL=https://radio.dc.beltelecom.by/radiusfm/radiusfm.stream/playlist.m3u8
```

See `.env.example` for the template.

**Important:** Never commit the `.env` file with sensitive keys. Use `.env.example` as a template for the team.

### Firebase Configuration

Firebase files contain sensitive API keys and are **git-ignored** for security.

**For iOS:**
1. Download `GoogleService-Info.plist` from [Firebase Console](https://console.firebase.google.com)
2. Place it in the project root directory
3. See `GoogleService-Info.plist.example` for reference

**For Android:**
1. Download `google-services.json` from [Firebase Console](https://console.firebase.google.com)
2. Place it in the project root directory
3. See `google-services.json.example` for reference

**⚠️ Security Note:** Never commit Firebase config files to git. They are already in `.gitignore`. Each developer/environment should have their own copy with their own API keys.

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

Then press:
- **`i`** for iOS simulator
- **`a`** for Android emulator
- **`w`** for web browser

## Project Structure

```
src/
├── app/                  # Screen files (Expo Router)
│   ├── _layout.tsx      # Root layout wrapper
│   └── index.tsx        # Home screen (player UI)
├── components/          # Reusable UI components
│   ├── VideoPlayer.tsx      # Bitmovin PlayerView wrapper
│   ├── StatusBanner.tsx     # Playback status display
│   ├── ControlButtons.tsx   # Play/Pause/Stop controls
│   └── DebugPanel.tsx       # Event log viewer
├── hooks/              # Custom React hooks
│   └── usePlayerControls.ts  # Player state & logic
├── constants/          # App configuration
│   └── config.ts       # Colors, spacing, player settings
├── styles/             # Centralized styles
│   └── videoDebugStyles.ts
├── types/              # TypeScript interfaces
│   └── index.ts
└── utils/              # Utility functions
    └── env.ts          # Environment variable loader
```

## Key Features

- **Modular Architecture** — Separated concerns across components, hooks, and utilities
- **Type Safety** — Full TypeScript support with interfaces
- **Environment Configuration** — Secure key management via `.env`
- **Firebase Integration** — Analytics, crash reporting, and remote config ready
- **Debug Panel** — Real-time event logging for troubleshooting
- **Responsive UI** — Works on iOS, Android, and web

## Development Notes

- All sensitive keys are stored in `.env` (git-ignored)
- Environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in the app
- Update `.env.example` with new key names for team reference
- Debug panel helps identify playback issues and network events

## Tech Stack

- **React Native** — Cross-platform mobile framework
- **Expo** — Build system and device API wrapper
- **TypeScript** — Type-safe JavaScript
- **Bitmovin Player** — HLS video playback
- **Google Firebase** — Backend services (analytics, remote config, crashes)
- **Expo Router** — File-based navigation

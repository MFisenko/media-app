# 🎵 Roadio — React Native + Expo Media Player App

Welcome! This is a **cross-platform mobile app** built with **React Native** and **Expo**. It runs on iOS, Android, and the web from a single codebase. You are building a radio/media player — this is the starter shell you'll flesh out.

> **You're a JS junior who hasn't touched React yet?** Perfect. Read this whole file first, then explore each file in the order listed. Every source file has explanation comments and a jargon dictionary at the bottom.

---

## 🗺️ What is this tech stack?

| Tool | What it does |
|---|---|
| **JavaScript / TypeScript** | The programming language. TypeScript adds type safety on top of JS. |
| **React** | A library for building UIs out of reusable pieces called *components*. |
| **React Native** | Lets React components render as real iOS/Android UI, not a website. |
| **Expo** | A toolkit that wraps React Native and handles building, bundling, and device APIs. |
| **Expo Router** | File-based navigation — the file name = the screen URL, just like Next.js. |

---

## 🚀 How to run the app

```bash
npm install          # install all dependencies (only needed once)
npm start            # opens the Expo dev menu
```

Then press **`i`** for iOS simulator, **`a`** for Android emulator, or **`w`** for the browser.

To reset the project back to a blank slate:
```bash
npm run reset-project
```

---

## 📁 Project Structure & File Guide

```
media-app/
├── app.json               ← App configuration (name, icons, permissions)
├── package.json           ← Project manifest & dependency list
├── tsconfig.json          ← TypeScript compiler settings
├── src/
│   ├── app/               ← SCREENS — every file here = one screen
│   │   ├── _layout.tsx    ← Root layout that wraps all screens
│   │   ├── index.tsx      ← Home screen (tab 1)
│   │   └── explore.tsx    ← Explore screen (tab 2)
│   ├── components/        ← Reusable UI building blocks
│   │   ├── app-tabs.tsx          ← Bottom tab navigation bar
│   │   ├── animated-icon.tsx     ← Animated splash + logo icon
│   │   ├── themed-text.tsx       ← Text that adapts to light/dark mode
│   │   ├── themed-view.tsx       ← Container box that adapts to light/dark mode
│   │   ├── external-link.tsx     ← Opens URLs in an in-app browser
│   │   ├── hint-row.tsx          ← Two-column label + code hint row
│   │   ├── web-badge.tsx         ← "Powered by Expo" badge (web only)
│   │   └── ui/                   ← Generic UI primitives
│   ├── constants/
│   │   └── theme.ts       ← Colors, fonts, and spacing values
│   ├── hooks/
│   │   ├── use-theme.ts           ← Returns current light/dark theme colors
│   │   ├── use-color-scheme.ts    ← Detects light/dark on mobile
│   │   └── use-color-scheme.web.ts← Same but safe for the browser
│   └── global.css         ← Web-only font variables
├── assets/                ← Images, icons, fonts
└── scripts/
    └── reset-project.js   ← Helper script to wipe example content
```

---

## 🗂️ File-by-File Descriptions

### Configuration Files (root)

#### [`app.json`](./app.json)
The main config file for Expo. Defines your app's **name**, **bundle ID** (unique app identifier for app stores), **icons**, **splash screen color**, and which Expo plugins are active.

#### [`package.json`](./package.json)
The project **manifest**. Lists all libraries your app depends on (`dependencies`) and the npm scripts you can run (`start`, `android`, `ios`, `web`, `lint`). When you run `npm install`, npm reads this file to know what to download.

#### [`tsconfig.json`](./tsconfig.json)
TypeScript configuration. The key part here is the **path alias** `@/*` which maps to `./src/*` — that's why imports say `@/components/...` instead of `../../components/...`.

---

### `src/app/` — Screens

#### [`src/app/_layout.tsx`](./src/app/_layout.tsx)
The **root layout**. This file wraps every screen in your app. It sets up the `ThemeProvider` (so all screens know the light/dark theme), shows the animated splash overlay, and renders the tab bar. Think of it as the app's outer shell.

#### [`src/app/index.tsx`](./src/app/index.tsx)
The **Home screen** — the first tab. Currently shows a welcome message and helpful hints. This is where you'll eventually build your Roadio player controls (play button, track info, etc.).

#### [`src/app/explore.tsx`](./src/app/explore.tsx)
The **Explore screen** — the second tab. Shows collapsible documentation sections about the starter template. You can replace this with a station browser or playlist for your radio app.

---

### `src/components/` — Reusable UI Pieces

#### [`src/components/app-tabs.tsx`](./src/components/app-tabs.tsx)
The **bottom navigation bar**. Defines two tabs ("Home" and "Explore") with icons. Uses `expo-router`'s `NativeTabs` to render native tab bars on iOS/Android.

#### [`src/components/animated-icon.tsx`](./src/components/animated-icon.tsx)
Two exported components:
- **`AnimatedSplashOverlay`** — The blue full-screen overlay that fades out when the app launches.
- **`AnimatedIcon`** — The Expo logo with a glowing spinning effect. You can swap this for your Roadio logo later.

#### [`src/components/themed-text.tsx`](./src/components/themed-text.tsx)
A `<Text>` wrapper that automatically uses the correct color for light or dark mode. Accepts a `type` prop (`"title"`, `"subtitle"`, `"small"`, `"code"`, etc.) to pick the right font size/weight.

#### [`src/components/themed-view.tsx`](./src/components/themed-view.tsx)
A `<View>` (box/container) wrapper that automatically sets the correct `backgroundColor` based on light or dark mode.

#### [`src/components/external-link.tsx`](./src/components/external-link.tsx)
Opens a URL. On mobile it uses an **in-app browser** (so the user stays in your app). On web it just opens a new browser tab.

#### [`src/components/hint-row.tsx`](./src/components/hint-row.tsx)
A small UI row that shows a label on the left and a code snippet on the right. Used on the Home screen to show tips.

#### [`src/components/web-badge.tsx`](./src/components/web-badge.tsx)
An "Expo" badge that only appears when running on the web. Displays the current Expo version number.

---

### `src/constants/` — App-Wide Values

#### [`src/constants/theme.ts`](./src/constants/theme.ts)
The **design system** for the app. Defines:
- **`Colors`** — exact hex colors for light and dark mode.
- **`Fonts`** — font family names per platform (iOS / Android / web).
- **`Spacing`** — a numbered scale (`Spacing.one` = 4px, `Spacing.two` = 8px, etc.).

---

### `src/hooks/` — Custom React Hooks

#### [`src/hooks/use-theme.ts`](./src/hooks/use-theme.ts)
A custom hook that reads the device's color scheme and returns the matching color palette from `theme.ts`. Any component can call `useTheme()` to get the correct colors.

#### [`src/hooks/use-color-scheme.ts`](./src/hooks/use-color-scheme.ts)
Re-exports React Native's `useColorScheme` for mobile. The `.web.ts` version of the same file adds a hydration guard so the web version doesn't flash the wrong theme on first load.

---

### Other Files

#### [`src/global.css`](./src/global.css)
Defines **CSS variables** for web fonts (the ones used in `Fonts` from `theme.ts`). Only applies when the app runs in a browser.

#### [`assets/`](./assets/)
Static files: app icon, splash screen image, tab bar icons, tutorial screenshots.

#### [`scripts/reset-project.js`](./scripts/reset-project.js)
A Node.js script that deletes the starter example content and gives you a clean `index.tsx` to start fresh.

---

## 🛣️ Where to Start Building Your Radio App

1. **Replace the Home screen** — open `src/app/index.tsx` and start adding player UI.
2. **Add your own colors** — edit `src/constants/theme.ts`.
3. **Add a new screen** — just create a new `.tsx` file in `src/app/`, Expo Router picks it up automatically.
4. **Need audio?** — add the `expo-av` package (`npx expo install expo-av`).

---

## 📚 Helpful Links

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router — File-based Routing](https://docs.expo.dev/router/introduction)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

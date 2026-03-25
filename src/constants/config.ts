/**
 * Application constants and configuration values
 */

export const PLAYER_CONFIG = {
  ASPECT_RATIO: 16 / 9,
  MAX_LOG_LINES: 40,
};

export const COLORS = {
  BACKGROUND: "#0E0E0E",
  SURFACE: "#151515",
  ACCENT: "#85ADFF",
  TEXT_PRIMARY: "#FFFFFF",
  TEXT_SECONDARY: "#D1D5DB",
  STATUS_IDLE: "#1F2937",
  STATUS_PLAYING: "#163B2B",
  STATUS_ERROR: "#4A1D1D",
  BUTTON_SECONDARY: "#2A2A2A",
  PLAYER_BG: "#000",
};

export const SPACING = {
  PADDING: 20,
  MARGIN: 20,
  GAP: 10,
};

export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  READY: "ready",
  LOADED: "loaded",
  PLAYING: "playing",
  PAUSED: "paused",
  STOPPED: "stopped",
  FINISHED: "finished",
  ERROR: "error",
} as const;

export type PlayerStatus = (typeof STATUS)[keyof typeof STATUS];

/**
 * Shared TypeScript types and interfaces
 */

export interface PlayerLog {
  timestamp: string;
  message: string;
}

export interface PlayerSource {
  url: string;
  type: string;
  title: string;
}

export interface PlayerState {
  status: string;
  isPlaying: boolean;
  logs: string[];
}

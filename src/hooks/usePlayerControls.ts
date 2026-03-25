import { usePlayer } from "bitmovin-player-react-native";
import { useRef, useState } from "react";
import { STATUS, type PlayerStatus } from "../constants/config";

/**
 * Hook to manage player state and playback controls
 * Abstracts player logic from UI components
 */

export const usePlayerControls = () => {
  const [status, setStatus] = useState<PlayerStatus>(STATUS.IDLE as PlayerStatus);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const loadedRef = useRef(false);

  const player = usePlayer();

  const pushLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logLine = `${timestamp}  ${message}`;
    console.log(logLine);
    setLogs((prev) => [logLine, ...prev].slice(0, 40));
  };

  const loadAndPlay = async (source: any) => {
    try {
      setStatus(STATUS.LOADING as PlayerStatus);
      pushLog("Load requested");

      if (!loadedRef.current) {
        await player.load(source);
        loadedRef.current = true;
        pushLog("Source loaded");
      }

      await player.play();
      setIsPlaying(true);
      setStatus(STATUS.PLAYING as PlayerStatus);
      pushLog("Playback started");
    } catch (error) {
      setStatus(STATUS.ERROR as PlayerStatus);
      setIsPlaying(false);
      pushLog(`Load/play error: ${String(error)}`);
    }
  };

  const pause = async () => {
    try {
      await player.pause();
      setIsPlaying(false);
      setStatus(STATUS.PAUSED as PlayerStatus);
      pushLog("Playback paused");
    } catch (error) {
      setStatus(STATUS.ERROR as PlayerStatus);
      pushLog(`Pause error: ${String(error)}`);
    }
  };

  const stop = async () => {
    try {
      await player.pause();
      if (typeof player.seek === "function") {
        await player.seek(0);
      }
      setIsPlaying(false);
      setStatus(STATUS.STOPPED as PlayerStatus);
      pushLog("Playback stopped");
    } catch (error) {
      setStatus(STATUS.ERROR as PlayerStatus);
      pushLog(`Stop error: ${String(error)}`);
    }
  };

  return {
    player,
    status,
    setStatus,
    isPlaying,
    setIsPlaying,
    logs,
    pushLog,
    loadAndPlay,
    pause,
    stop,
  };
};

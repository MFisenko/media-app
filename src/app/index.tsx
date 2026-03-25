import { SourceType } from "bitmovin-player-react-native";
import React, { useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text
} from "react-native";

import { ControlButtons } from "../components/ControlButtons";
import { DebugPanel } from "../components/DebugPanel";
import { StatusBanner } from "../components/StatusBanner";
import { VideoPlayer } from "../components/VideoPlayer";
import { usePlayerControls } from "../hooks/usePlayerControls";
import { styles } from "../styles/videoDebugStyles";
import ENV from "../utils/env";

export default function VideoDebugScreen() {
  const { player, status, isPlaying, logs, pushLog, loadAndPlay, pause, stop } =
    usePlayerControls();

  const source = useMemo(
    () => ({
      url: ENV.STREAM_URL,
      type: SourceType.HLS,
      title: "Radio Stream",
    }),
    [],
  );

  const handleLoadAndPlay = () => loadAndPlay(source);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Radio Player</Text>

        <VideoPlayer
          player={player}
          onReady={() => {
            pushLog("Event: player ready");
          }}
          onSourceLoaded={() => {
            pushLog("Event: source loaded");
          }}
          onPlaying={() => {
            pushLog("Event: playing");
          }}
          onPaused={() => {
            pushLog("Event: paused");
          }}
          onPlaybackFinished={() => {
            pushLog("Event: playback finished");
          }}
        />

        <StatusBanner status={status} isPlaying={isPlaying} />

        <ControlButtons
          onLoadAndPlay={handleLoadAndPlay}
          onPause={pause}
          onStop={stop}
        />

        <DebugPanel logs={logs} />
      </ScrollView>
    </SafeAreaView>
  );
}

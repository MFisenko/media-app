import { PlayerView } from "bitmovin-player-react-native";
import React from "react";
import { View } from "react-native";
import { styles } from "../styles/videoDebugStyles";

interface VideoPlayerProps {
  player: any;
  onReady: () => void;
  onSourceLoaded: () => void;
  onPlaying: () => void;
  onPaused: () => void;
  onPlaybackFinished: () => void;
}

/**
 * VideoPlayer component wraps the Bitmovin PlayerView
 * Manages player lifecycle events and event callbacks
 */

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  player,
  onReady,
  onSourceLoaded,
  onPlaying,
  onPaused,
  onPlaybackFinished,
}) => {
  return (
    <View style={styles.playerWrap}>
      <PlayerView
        player={player}
        style={styles.player}
        onReady={onReady}
        onSourceLoaded={onSourceLoaded}
        onPlaying={onPlaying}
        onPaused={onPaused}
        onPlaybackFinished={onPlaybackFinished}
      />
    </View>
  );
};

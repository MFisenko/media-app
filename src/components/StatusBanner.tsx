import React from "react";
import { Text, View } from "react-native";
import { STATUS, type PlayerStatus } from "../constants/config";
import { styles } from "../styles/videoDebugStyles";

interface StatusBannerProps {
  status: PlayerStatus;
  isPlaying: boolean;
}

/**
 * StatusBanner component displays current playback state
 * Shows visual feedback with color-coded status indicators
 */

export const StatusBanner: React.FC<StatusBannerProps> = ({
  status,
  isPlaying,
}) => {
  const getStatusStyle = () => {
    if (status === STATUS.PLAYING) return styles.statusPlaying;
    if (status === STATUS.ERROR) return styles.statusError;
    return styles.statusIdle;
  };

  return (
    <View style={[styles.statusBanner, getStatusStyle()]}>
      <Text style={styles.statusText}>Status: {status.toUpperCase()}</Text>
      <Text style={styles.statusSubtext}>
        {isPlaying
          ? "Video should be visible and playing"
          : "Waiting for playback"}
      </Text>
    </View>
  );
};

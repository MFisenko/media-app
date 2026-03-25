import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/videoDebugStyles";

interface ControlButtonsProps {
  onLoadAndPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

/**
 * ControlButtons component provides playback control buttons
 * Handles Load+Play, Pause, and Stop actions
 */

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  onLoadAndPlay,
  onPause,
  onStop,
}) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={onLoadAndPlay}>
        <Text style={styles.buttonText}>Load + Play</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={onPause}>
        <Text style={styles.buttonText}>Pause</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={onStop}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

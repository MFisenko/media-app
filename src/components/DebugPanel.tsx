import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/videoDebugStyles";

interface DebugPanelProps {
  logs: string[];
}

/**
 * DebugPanel component displays player event logs
 * Helps developers diagnose playback issues
 */

export const DebugPanel: React.FC<DebugPanelProps> = ({ logs }) => {
  return (
    <View style={styles.debugPanel}>
      <Text style={styles.debugTitle}>Debug Log</Text>
      {logs.length === 0 ? (
        <Text style={styles.debugLine}>No events yet</Text>
      ) : (
        logs.map((line, index) => (
          <Text key={index} style={styles.debugLine}>
            {line}
          </Text>
        ))
      )}
    </View>
  );
};

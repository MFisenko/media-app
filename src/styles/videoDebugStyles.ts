import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants/config";

/**
 * Centralized styles for the video debug screen
 */

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    padding: SPACING.PADDING,
    alignItems: "center",
  },
  title: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: SPACING.MARGIN,
  },
  playerWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.PLAYER_BG,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: SPACING.MARGIN,
  },
  player: {
    width: "100%",
    height: "100%",
  },
  statusBanner: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    marginBottom: SPACING.MARGIN,
  },
  statusIdle: {
    backgroundColor: COLORS.STATUS_IDLE,
  },
  statusPlaying: {
    backgroundColor: COLORS.STATUS_PLAYING,
  },
  statusError: {
    backgroundColor: COLORS.STATUS_ERROR,
  },
  statusText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "700",
  },
  statusSubtext: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 13,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: SPACING.GAP,
    marginBottom: 24,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.ACCENT,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonSecondary: {
    backgroundColor: COLORS.BUTTON_SECONDARY,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: COLORS.TEXT_PRIMARY,
    fontWeight: "700",
  },
  debugPanel: {
    width: "100%",
    backgroundColor: COLORS.SURFACE,
    borderRadius: 16,
    padding: 16,
  },
  debugTitle: {
    color: COLORS.ACCENT,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  debugLine: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: 12,
    marginBottom: 6,
    fontFamily: "monospace",
  },
});

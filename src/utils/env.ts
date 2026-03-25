import Constants from "expo-constants";

/**
 * Environment configuration loader
 * Manages access to environment variables and defaults
 */

export const ENV = {
  BITMOVIN_LICENSE_KEY:
    Constants.expoConfig?.extra?.bitmovinLicenseKey || "",
  STREAM_URL:
    Constants.expoConfig?.extra?.streamUrl ||
    "https://radio.dc.beltelecom.by/radiusfm/radiusfm.stream/playlist.m3u8",
};

export default ENV;

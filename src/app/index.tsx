import {
  AudioSession,
  PlayerView,
  SourceType,
  usePlayer,
} from 'bitmovin-player-react-native';
import React, { useCallback, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export default function PlayerSample() {
  const player = usePlayer({
    // The only required parameter is the license key but it can be omitted from code upon correct
    // Info.plist/AndroidManifest.xml configuration.
    //
    // Head to `Configuring your License` for more information.
    licenseKey: 'db834fea-a40a-46c1-9ff3-cc3c215298ea',
  });

  useEffect(() => {
    // iOS audio session category must be set to `playback` first, otherwise playback
    // will have no audio when the device is silenced.
    //
    // Usually it's desireable to set the audio's category only once during your app's main component
    // initialization. This way you can guarantee that your app's audio category is properly
    // configured throughout the whole lifecycle of the application.
    AudioSession.setCategory('playback').catch(error => {
      // Handle any native errors that might occur while setting the audio's category.
      console.log("Failed to set app's audio category to `playback`:\n", error);
    });

    player.load({
      url:
        Platform.OS === 'ios'
          ? 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
          : 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
      type: Platform.OS === 'ios' ? SourceType.HLS : SourceType.DASH,
      title: 'Art of Motion',
    });
  }, [player]);

  // onReady is called when the player has downloaded initial
  // video and audio and is ready to start playback.
  const onReady = useCallback(
    (    event: { timestamp: any; }) => {
      // Start playback
      player.play();
      console.log(event.timestamp);
    },
    [player],
  );

  return (
    <View style={styles.flex1}>
      <PlayerView style={styles.flex1} player={player} onReady={onReady} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

// import React, { useCallback, useEffect } from 'react';
// import { StyleSheet, View } from 'react-native';

// import {
//   PlayerView,
//   ReadyEvent,
//   SourceType,
//   usePlayer,
// } from 'bitmovin-player-react-native';

// const licenseKey = 'db834fea-a40a-46c1-9ff3-cc3c215298ea';

// export default function PlayerSample() {
//   const player = usePlayer({
//     // Bitmovin player license key
//     // licenseKey: licenseKey,
//     licenseKey: 'db834fea-a40a-46c1-9ff3-cc3c215298ea',
//     analyticsConfig: {
//       // Bitmovin Observability key from the Observability Dashboard
//       licenseKey: 'fe76b974-3658-4c79-ad75-57fe21c06b51',
//     },
//   });

//   useEffect(() => {
//     player.load({
//       url: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
//       type: SourceType.HLS,
//       title: 'Art of Motion',
//       analyticsSourceMetadata: {
//         videoId: 'reactnative-wizard-Art_of_Motion-1774353770648',
//         title: 'Art of Motion',
//         isLive: false,
//       },
//     });
//   }, [player]);

//   // onReady is called when the player has downloaded initial
//   // video and audio and is ready to start playback.
//   const onReady = useCallback(
//     (event: ReadyEvent) => {
//       // Start playback
//       player.play();
//       console.log(event.timestamp);
//     },
//     [player]
//   );

//   return (
//     <View style={styles.flex1}>
//       <PlayerView style={styles.flex1} player={player} onReady={onReady} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   flex1: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
// });






// import {
//   PlayerView,
//   ReadyEvent,
//   SourceType,
//   usePlayer,
// } from "bitmovin-player-react-native";
// import React, { useCallback, useEffect, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";

// export default function PlayerSample() {
//   const [status, setStatus] = useState("idle");

//   const player = usePlayer({
//     licenseKey: "db834fea-a40a-46c1-9ff3-cc3c215298ea",
//     analyticsConfig: {
//       // Bitmovin Observability key from the Observability Dashboard
//       licenseKey: "fe76b974-3658-4c79-ad75-57fe21c06b51",
//     },
//   });

//   const testUrl = "https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"; // Mux test stream (public)

//   useEffect(() => {
//     setStatus("loading source");

//     // Try a different test URL - this one is more reliable on iOS
//     // const testUrl = "https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"; // Mux test stream (public)
//     // Alternative if above doesn't work: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img-tech-overview/2011-14.3mbps-16-9.ts"

//     player.load({
//       url: testUrl,
//       type: SourceType.HLS,
//       title: "Test Video",
//       analyticsSourceMetadata: {
//         videoId: "test-video-001",
//         title: "Test Video",
//         isLive: false,
//       },
//     });
//   }, [player]);

//   const onReady = useCallback(
//     (event: ReadyEvent) => {
//       console.log("READY", event.timestamp);
//       setStatus("ready -> playing");
//       player.play();
//     },
//     [player],
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.banner}>
//         <Text style={styles.bannerText}>Status: {status}</Text>
//       </View>

//       <PlayerView
//         style={styles.player}
//         player={player}
//         onReady={onReady}
//         onPlaying={() => {
//           console.log("PLAYING");
//           setStatus("playing");
//         }}
//         onPaused={() => {
//           console.log("PAUSED");
//           setStatus("paused");
//         }}
//         onSourceLoaded={() => {
//           console.log("SOURCE LOADED");
//           setStatus("source loaded");
//         }}
//         onPlayerError={(event: any) => {
//           const msg = JSON.stringify(event, null, 2);
//           console.log("PLAYER ERROR", msg);
//           setStatus(`player error: ${msg}`);
//         }}
//         onSourceError={(event: any) => {
//           const msg = JSON.stringify(event, null, 2);
//           console.log("SOURCE ERROR", msg);
//           setStatus(`source error: ${msg}`);
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//   },
//   banner: {
//     paddingTop: 60,
//     paddingHorizontal: 16,
//     paddingBottom: 12,
//     backgroundColor: "#111827",
//   },
//   bannerText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   player: {
//     flex: 1,
//   },
// });

// import {
//   PlayerView,
//   SourceType,
//   usePlayer,
// } from "bitmovin-player-react-native";
// import React, { useMemo, useRef, useState } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // const BITMOVIN_LICENSE_KEY = "db834fea-a40a-46c1-9ff3-cc3c215298ea";

// const TEST_VIDEO_URL =
//   "https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

// export default function VideoDebugScreen() {
//   const [status, setStatus] = useState("idle");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [logs, setLogs] = useState<string[]>([]);
//   const loadedRef = useRef(false);

//   const player = usePlayer({
//     // licenseKey: BITMOVIN_LICENSE_KEY,
//   });

//   const source = useMemo(
//     () => ({
//       url: TEST_VIDEO_URL,
//       type: SourceType.HLS,
//       title: "Bitmovin Video Test",
//     }),
//     [],
//   );

//   const pushLog = (message: string) => {
//     const line = `${new Date().toLocaleTimeString()}  ${message}`;
//     console.log(line);
//     setLogs((prev) => [line, ...prev].slice(0, 40));
//   };

//   const loadAndPlay = async () => {
//     try {
//       setStatus("loading");
//       pushLog("Load requested");

//       if (!loadedRef.current) {
//         await player.load(source);
//         loadedRef.current = true;
//         pushLog("Source loaded");
//       }

//       await player.play();
//       setIsPlaying(true);
//       setStatus("playing");
//       pushLog("Playback started");
//     } catch (error) {
//       setStatus("error");
//       setIsPlaying(false);
//       pushLog(`Load/play error: ${String(error)}`);
//     }
//   };

//   const pause = async () => {
//     try {
//       await player.pause();
//       setIsPlaying(false);
//       setStatus("paused");
//       pushLog("Playback paused");
//     } catch (error) {
//       setStatus("error");
//       pushLog(`Pause error: ${String(error)}`);
//     }
//   };

//   const stop = async () => {
//     try {
//       await player.pause();
//       if (typeof player.seek === "function") {
//         await player.seek(0);
//       }
//       setIsPlaying(false);
//       setStatus("stopped");
//       pushLog("Playback stopped");
//     } catch (error) {
//       setStatus("error");
//       pushLog(`Stop error: ${String(error)}`);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.title}>Bitmovin Video Test</Text>

//         <View style={styles.playerWrap}>
//           <PlayerView
//             player={player}
//             style={styles.player}
//             onReady={() => {
//               pushLog("Event: player ready");
//               setStatus((s) => (s === "idle" ? "ready" : s));
//             }}
//             onSourceLoaded={() => {
//               pushLog("Event: source loaded");
//               setStatus((s) => (s === "loading" ? "loaded" : s));
//             }}
//             onPlaying={() => {
//               pushLog("Event: playing");
//               setIsPlaying(true);
//               setStatus("playing");
//             }}
//             onPaused={() => {
//               pushLog("Event: paused");
//               setIsPlaying(false);
//               setStatus("paused");
//             }}
//             onPlaybackFinished={() => {
//               pushLog("Event: playback finished");
//               setIsPlaying(false);
//               setStatus("finished");
//             }}
//             // onError={(event: any) => {
//             //   pushLog(`Event: error ${JSON.stringify(event)}`);
//             //   setIsPlaying(false);
//             //   setStatus("error");
//             // }}
//           />
//         </View>

//         <View
//           style={[
//             styles.statusBanner,
//             status === "playing"
//               ? styles.statusPlaying
//               : status === "error"
//                 ? styles.statusError
//                 : styles.statusIdle,
//           ]}
//         >
//           <Text style={styles.statusText}>Status: {status.toUpperCase()}</Text>
//           <Text style={styles.statusSubtext}>
//             {isPlaying
//               ? "Video should be visible and playing"
//               : "Waiting for playback"}
//           </Text>
//         </View>

//         <View style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={loadAndPlay}>
//             <Text style={styles.buttonText}>Load + Play</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.buttonSecondary} onPress={pause}>
//             <Text style={styles.buttonText}>Pause</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.buttonSecondary} onPress={stop}>
//             <Text style={styles.buttonText}>Stop</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.debugPanel}>
//           <Text style={styles.debugTitle}>Debug Log</Text>
//           {logs.length === 0 ? (
//             <Text style={styles.debugLine}>No events yet</Text>
//           ) : (
//             logs.map((line, index) => (
//               <Text key={index} style={styles.debugLine}>
//                 {line}
//               </Text>
//             ))
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0E0E0E",
//   },
//   content: {
//     padding: 20,
//     alignItems: "center",
//   },
//   title: {
//     color: "#FFFFFF",
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 20,
//   },
//   playerWrap: {
//     width: "100%",
//     aspectRatio: 16 / 9,
//     backgroundColor: "#000",
//     borderRadius: 16,
//     overflow: "hidden",
//     marginBottom: 20,
//   },
//   player: {
//     width: "100%",
//     height: "100%",
//   },
//   statusBanner: {
//     width: "100%",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 20,
//   },
//   statusIdle: {
//     backgroundColor: "#1F2937",
//   },
//   statusPlaying: {
//     backgroundColor: "#163B2B",
//   },
//   statusError: {
//     backgroundColor: "#4A1D1D",
//   },
//   statusText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   statusSubtext: {
//     color: "#D1D5DB",
//     fontSize: 13,
//     marginTop: 4,
//   },
//   row: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 24,
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   button: {
//     backgroundColor: "#85ADFF",
//     paddingHorizontal: 18,
//     paddingVertical: 14,
//     borderRadius: 12,
//   },
//   buttonSecondary: {
//     backgroundColor: "#2A2A2A",
//     paddingHorizontal: 18,
//     paddingVertical: 14,
//     borderRadius: 12,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontWeight: "700",
//   },
//   debugPanel: {
//     width: "100%",
//     backgroundColor: "#151515",
//     borderRadius: 16,
//     padding: 16,
//   },
//   debugTitle: {
//     color: "#85ADFF",
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 12,
//   },
//   debugLine: {
//     color: "#D1D5DB",
//     fontSize: 12,
//     marginBottom: 6,
//     fontFamily: "monospace",
//   },
// });

// import { MaterialIcons } from "@expo/vector-icons";
// import {
//   PlayerView,
//   SourceConfig,
//   SourceType,
//   usePlayer,
// } from "bitmovin-player-react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useMemo, useState } from "react";
// import {
//   Dimensions,
//   Image,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");

// const STREAM_URL =
//   "https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa-audio-only.m3u8";

// const POSTER_URL =
//   "https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/poster.jpg";

// export default function NowPlayingScreen() {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const source: SourceConfig = useMemo(
//     () => ({
//       url: STREAM_URL,
//       type: SourceType.HLS,
//       poster: POSTER_URL,
//       title: "Audio Stream",
//     }),
//     [],
//   );

//   const player = usePlayer({
//     // licenseKey can be omitted here if set in app.json plugin config
//   });

//   const handleTogglePlayback = async () => {
//     try {
//       if (isPlaying) {
//         await player.pause();
//         setIsPlaying(false);
//       } else {
//         await player.load(source);
//         await player.play();
//         setIsPlaying(true);
//       }
//     } catch (error) {
//       console.error("Playback error:", error);
//     }
//   };

//   const handleStop = async () => {
//     try {
//       await player.pause();
//       setIsPlaying(false);
//     } catch (error) {
//       console.error("Stop error:", error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="light-content" />

//       <View style={styles.container}>
//         <View style={styles.hiddenPlayer}>
//           <PlayerView player={player} style={styles.hiddenPlayerView} />
//         </View>

//         <View style={styles.glowPrimary} />
//         <View style={styles.glowSecondary} />

//         <View style={styles.topBar}>
//           <TouchableOpacity style={styles.iconButton}>
//             <MaterialIcons name="keyboard-arrow-down" size={28} color="#fff" />
//           </TouchableOpacity>

//           <Text style={styles.topTitle}>Now Playing</Text>

//           <TouchableOpacity style={styles.iconButton}>
//             <MaterialIcons name="more-vert" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.broadcastWrapper}>
//           <View style={styles.broadcastGlow} />

//           <TouchableOpacity
//             activeOpacity={0.9}
//             style={styles.broadcastButton}
//             onPress={handleTogglePlayback}
//           >
//             <LinearGradient
//               colors={["#85ADFF", "#6D9FFF"]}
//               start={{ x: 0.1, y: 0.1 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.broadcastGradient}
//             >
//               <MaterialIcons
//                 name={isPlaying ? "pause-circle-filled" : "radio"}
//                 size={88}
//                 color="#002C65"
//               />
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.contextBlock}>
//           <TouchableOpacity
//             style={styles.stopButton}
//             activeOpacity={0.85}
//             onPress={handleStop}
//           >
//             <Text style={styles.stopButtonText}>STOP BROADCAST</Text>
//           </TouchableOpacity>

//           <Text style={styles.broadcastStatus}>
//             {isPlaying
//               ? "Broadcasting live to the local network"
//               : "Ready to start playback"}
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const buttonSize = width > 400 ? 300 : 250;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#0E0E0E",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#0E0E0E",
//   },
//   hiddenPlayer: {
//     position: "absolute",
//     width: 1,
//     height: 1,
//     opacity: 0,
//   },
//   hiddenPlayerView: {
//     width: 1,
//     height: 1,
//   },
//   topBar: {
//     height: 64,
//     paddingHorizontal: 24,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     zIndex: 5,
//   },
//   iconButton: {
//     width: 36,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   topTitle: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "700",
//     letterSpacing: -0.3,
//   },
//   main: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 32,
//     paddingBottom: 40,
//   },
//   posterWrap: {
//     marginBottom: 24,
//   },
//   poster: {
//     width: 120,
//     height: 120,
//     borderRadius: 24,
//   },
//   frequencyBlock: {
//     alignItems: "center",
//     marginBottom: 40,
//     zIndex: 2,
//   },
//   frequencyLabel: {
//     color: "#ADAAAA",
//     fontSize: 12,
//     fontWeight: "600",
//     letterSpacing: 2.4,
//     marginBottom: 16,
//   },
//   frequencyRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//   },
//   frequencyValue: {
//     color: "#FFFFFF",
//     fontSize: width > 400 ? 72 : 58,
//     fontWeight: "800",
//     letterSpacing: -2,
//     lineHeight: width > 400 ? 78 : 64,
//   },
//   frequencyUnit: {
//     color: "#85ADFF",
//     fontSize: width > 400 ? 32 : 24,
//     fontWeight: "700",
//     marginLeft: 8,
//     marginBottom: 10,
//   },
//   broadcastWrapper: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 40,
//     zIndex: 2,
//   },
//   broadcastGlow: {
//     position: "absolute",
//     width: buttonSize + 40,
//     height: buttonSize + 40,
//     borderRadius: 40,
//     backgroundColor: "rgba(133, 173, 255, 0.18)",
//     shadowColor: "#85ADFF",
//     shadowOpacity: 0.6,
//     shadowRadius: 40,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 20,
//   },
//   broadcastButton: {
//     borderRadius: 28,
//   },
//   broadcastGradient: {
//     width: buttonSize,
//     height: buttonSize,
//     borderRadius: 28,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#85ADFF",
//     shadowOpacity: 0.35,
//     shadowRadius: 22,
//     shadowOffset: { width: 0, height: 0 },
//     elevation: 12,
//   },
//   contextBlock: {
//     alignItems: "center",
//     zIndex: 2,
//   },
//   stopButton: {
//     paddingHorizontal: 28,
//     paddingVertical: 16,
//     borderRadius: 999,
//     borderWidth: 1,
//     borderColor: "rgba(72, 72, 71, 0.45)",
//     backgroundColor: "transparent",
//   },
//   stopButtonText: {
//     color: "#85ADFF",
//     fontSize: 18,
//     fontWeight: "700",
//     letterSpacing: 2,
//   },
//   broadcastStatus: {
//     marginTop: 16,
//     color: "#ADAAAA",
//     fontSize: 14,
//     fontWeight: "500",
//     textAlign: "center",
//   },
//   signalSection: {
//     width: "100%",
//     maxWidth: 420,
//     marginTop: 48,
//     paddingHorizontal: 8,
//     zIndex: 2,
//   },
//   signalTrack: {
//     height: 6,
//     width: "100%",
//     backgroundColor: "#262626",
//     borderRadius: 999,
//     overflow: "hidden",
//   },
//   signalFill: {
//     height: "100%",
//     backgroundColor: "#85ADFF",
//     borderRadius: 999,
//   },
//   signalLabelsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 12,
//   },
//   signalLeft: {
//     color: "#ADAAAA",
//     fontSize: 10,
//     fontWeight: "700",
//     letterSpacing: 1.5,
//   },
//   signalRight: {
//     color: "#85ADFF",
//     fontSize: 10,
//     fontWeight: "700",
//     letterSpacing: 1.5,
//   },
//   glowPrimary: {
//     position: "absolute",
//     top: "32%",
//     left: "50%",
//     width: 420,
//     height: 420,
//     marginLeft: -210,
//     marginTop: -210,
//     borderRadius: 999,
//     backgroundColor: "rgba(133, 173, 255, 0.10)",
//   },
//   glowSecondary: {
//     position: "absolute",
//     top: "36%",
//     right: "6%",
//     width: 220,
//     height: 220,
//     borderRadius: 999,
//     backgroundColor: "rgba(124, 251, 181, 0.05)",
//   },
// });

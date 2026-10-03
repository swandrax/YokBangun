import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { WebView } from "react-native-webview";

const PRODUCTION_URL = "https://yokbangun.work.gd";
const HOST_IP_URL = "http://111.94.7.240:3000";

export default function App() {
  const [currentUrl, setCurrentUrl] = useState(PRODUCTION_URL);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const webViewRef = useRef<WebView>(null);

  // Handle hardware back button on Android
  React.useEffect(() => {
    if (Platform.OS !== "android") return;
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };
    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => subscription.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />

      {hasError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Tidak Dapat Terhubung</Text>
          <Text style={styles.errorSubtitle}>
            Pastikan koneksi internet Anda aktif atau coba hubungkan ke server lokal IP 111.94.7.240.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                setHasError(false);
                setCurrentUrl(PRODUCTION_URL);
              }}
            >
              <Text style={styles.primaryButtonText}>Coba Lagi (yokbangun.work.gd)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setHasError(false);
                setCurrentUrl(HOST_IP_URL);
              }}
            >
              <Text style={styles.secondaryButtonText}>Gunakan Server IP (111.94.7.240)</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.webViewWrapper}>
          <WebView
            ref={webViewRef}
            source={{ uri: currentUrl }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => setHasError(true)}
            onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1F5D45" />
                <Text style={styles.loadingText}>Memuat yokBangun...</Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  webViewWrapper: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#1F5D45",
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F8F6",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F5D45",
    marginBottom: 8,
    textAlign: "center",
  },
  errorSubtitle: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  actions: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#1F5D45",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#1F5D45",
    fontSize: 14,
    fontWeight: "600",
  },
});

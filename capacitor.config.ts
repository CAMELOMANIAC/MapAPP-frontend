import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.camelomaniac.chat",
  appName: "henmy-front",
  webDir: "build",
  backgroundColor: "#ffffff",
  ios: {
    contentInset: "never",
    allowsLinkPreview: false,
  },
  plugins: {
    SplashScreen: {
      backgroundColor: "#FFFFFF", // 원하는 배경색 코드
      darkModeBackgroundColor: "#FFFFFF", // 다크 모드 배경색
      splashFullScreen: true,
      splashImmersive: true,
      androidScaleType: "CENTER_CROP",
    },
  },
};

export default config;

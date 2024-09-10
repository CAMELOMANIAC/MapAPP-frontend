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
  android: {
    //useLegacyBridge: true, //레거시 브릿지(신형 브릿지에서는 배터리 최적화문제로 웹뷰 통신시 백그라운드 시간을 연장하지 못하는 문제가 있으므로 문제 발생시 사용)
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

import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.camelomaniac.chat",
  appName: "henmy-front",
  webDir: "build",
  ios: {
    contentInset: "always",
    backgroundColor: "#ffffff",
    allowsLinkPreview: false,
  },
};

export default config;

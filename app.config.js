import "dotenv/config";
export default {
  expo: {
    name: "EnNote",
    slug: "EnNote",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.damianoitaliano.EnNote",
    },
    web: {
      bundler: "metro",
      output: "static",
    },
    plugins: ["expo-router", "expo-font"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      apiUrl: process.env.BASE_URL,
      router: {
        origin: false,
      },

      eas: {
        projectId: "f7a748e8-554f-435e-a27c-e0ac3cca8be6",
      },
    },
    owner: "damianoitaliano",
  },
};

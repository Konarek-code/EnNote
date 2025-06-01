import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";

import { auth } from "./firebaseConfig";
import { login, logout } from "../store/user/userSlice";


interface AuthContextType {
  signInWithGoogle: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const googleClientId = Constants.expoConfig?.extra?.GOOGLE_CLIENT_ID || "";

  const redirectUri = "https://auth.expo.io/@damianoitaliano/EnNote";

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: googleClientId,
    redirectUri,
  });

  console.log("Redirect URI:", redirectUri);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isNewUser =
          user.metadata.creationTime === user.metadata.lastSignInTime;

        if (isNewUser) {
          await AsyncStorage.setItem("isNewGoogleUser", "true");
        }

        dispatch(
          login({
            uid: user.uid,
            email: user.email ?? "",
            name: user.displayName ?? "",
            createdAt: user.metadata.creationTime || new Date().toISOString(),
            gender: "",
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (response?.type === "success" && response.params.id_token) {
      const credential = GoogleAuthProvider.credential(
        response.params.id_token
      );
      signInWithCredential(auth, credential).catch((error) => {
        console.error("Firebase Google Sign-In error:", error);
      });
    }
  }, [response]);

  const signInWithGoogle = () => {
    if (request) {
      promptAsync();
    } else {
      console.warn("Google Auth request not ready");
    }
  };

  return (
    <AuthContext.Provider value={{ signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

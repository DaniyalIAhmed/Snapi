import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Constants from 'expo-constants';
import React, { ReactNode } from "react";
import { Text, View } from "react-native";

type Props = {
  children: ReactNode;
};
const expo_url = Constants.expoConfig?.extra?.EXPO_PUBLIC_CONVEX_URL || 
                 Constants.manifest?.extra?.EXPO_PUBLIC_CONVEX_URL ||
                 process.env.EXPO_PUBLIC_CONVEX_URL;
                 
const publishableKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || 
                      Constants.manifest?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
                      process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!expo_url || !publishableKey) {
  console.error("Missing required environment variables:", {
    EXPO_PUBLIC_CONVEX_URL: expo_url ? "✓" : "✗",
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: publishableKey ? "✓" : "✗"
  });
}

const convex = new ConvexReactClient(
  expo_url || "https://dummy-url.convex.cloud",
  {
    unsavedChangesWarning: false,
  }
);

const ConvexProvider = ({ children }: Props) => {
  // If we don't have required configuration, show error screen
  if (!expo_url || !publishableKey) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'black' }}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
          Configuration Error
        </Text>
        <Text style={{ color: 'red', fontSize: 14, textAlign: 'center' }}>
          Missing environment variables:{'\n'}
          {!publishableKey && '• EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY\n'}
          {!expo_url && '• EXPO_PUBLIC_CONVEX_URL\n'}
        </Text>
        <Text style={{ color: 'gray', fontSize: 12, textAlign: 'center', marginTop: 20 }}>
          Please configure EAS secrets and rebuild the app.
        </Text>
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ClerkLoaded>{children}</ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexProvider;

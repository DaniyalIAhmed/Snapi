import InitialLayout from "@/components/InitialLayout";
import ConvexProvider from "@/providers/ConvexProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  
  return (
    <ConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <InitialLayout/>
        </SafeAreaView>
      </SafeAreaProvider>
    </ConvexProvider>
  );
}

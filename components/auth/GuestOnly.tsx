import { useRouter } from "expo-router";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { Text } from "react-native";
import ThemedLoader from "../ThemedLoader";

const GuestOnly = ({ children }: any) => {
  const { authChecked, user }: any = useUser();
  const router = useRouter();
  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/profile");
    }
  }, [authChecked, user]);

  if (!authChecked || user) {
    return <ThemedLoader />;
  }

  return children;
};

export default GuestOnly;

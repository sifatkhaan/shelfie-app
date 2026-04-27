import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import ThemedLoader from "../ThemedLoader";

const UserOnly = ({ children }: any) => {
  const { authChecked, user }: any = useUser();
  const router = useRouter();
  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/login");
    }
  }, [authChecked, user]);
  if (!authChecked || !user) {
    return <ThemedLoader />;
  }

  return children;
};
export default UserOnly;

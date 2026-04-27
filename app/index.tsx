import { StyleSheet} from "react-native";
import React from "react";
import { Link } from "expo-router";
import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo style={styles.image} />
      <Spacer height={10}/>
      <ThemedText style={styles.title} title={true}>The Number 1</ThemedText>
      <Spacer height={10}/>
      <ThemedText>Reading List App</ThemedText>
      <Spacer/>
      <Link href="/login" style={styles.link}>
        <ThemedText>Login Page</ThemedText>
      </Link>
      <Link href="/register" style={styles.link}>
        <ThemedText>Register Page</ThemedText>
      </Link>
      <Link href="/profile" style={styles.link}>
        <ThemedText>Profile Page</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // gap: 20,
  },
  image: {
    marginVertical: 10,
    height: 100,
    width: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    boxShadow: "4px, 4px rgba(0,0,0, 0.1)",
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});

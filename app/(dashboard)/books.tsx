import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { useBooks } from "../../hooks/useBooks";
import { Colors } from "../../constants/Colors";
import ThemedCard from "../../components/ThemedCard";
import { useRouter } from "expo-router";
import ThemedTextInput from "../../components/ThemedTextInput";

const Books = () => {
  const { books, setSearchQuery }: any = useBooks();
  const router = useRouter();
  return (
    <ThemedView style={styles.container} safe={true}>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>
      <Spacer />

        <ThemedTextInput
          style={styles.searchInput}
          placeholder="Search books, authors, or description"
          onChangeText={setSearchQuery}
        />


      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`books/${item.$id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText>Written by {item.author}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40,
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor:'#fff',
    marginBottom: 8,
    borderRadius: 8,
    alignSelf: "stretch",
    width: "90%",
    marginHorizontal: "5%",
  },
});

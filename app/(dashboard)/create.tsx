import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedButton from "../../components/ThemedButton";
import { useBooks } from "../../hooks/useBooks";
import { useRouter } from "expo-router";
import ThemedImagePicker from "../../components/ThemedImagePicker";
import ThemedDatePicker from "../../components/ThemedDatePicker";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [publishDate, setPublishDate] = useState("");

  const [loading, setLoading] = useState(false);

  const { createBook }: any = useBooks();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !description.trim()) return;
    setLoading(true);
    await createBook({
      title,
      author,
      description,
      photoUrl,
      publishDate,
    });
    setTitle("");
    setAuthor("");
    setDescription("");
    router.replace("/books");
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.container}>
            <ThemedText title={true} style={styles.heading}>
              Add a New Book
            </ThemedText>
            <Spacer />
            <ThemedImagePicker value={photoUrl} onChange={setPhotoUrl} />
            <Spacer />
            <ThemedDatePicker value={publishDate} onChange={setPublishDate} />
            <Spacer />
            <ThemedTextInput
              style={styles.input}
              placeholder="Book Title"
              onChangeText={setTitle}
              value={title}
            />
            <Spacer />
            <ThemedTextInput
              style={styles.input}
              placeholder="Author"
              onChangeText={setAuthor}
              value={author}
            />
            <Spacer />
            <ThemedTextInput
              style={styles.multiline}
              placeholder="Book Description"
              onChangeText={setDescription}
              value={description}
              multiline={true}
            />
            <Spacer />
            <ThemedButton onPress={handleSubmit} disabled={loading}>
              <Text style={{ color: "#f2f2f2" }}>
                {loading ? "Saving..." : "Create Book"}
              </Text>
            </ThemedButton>
          </ThemedView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
});

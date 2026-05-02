import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import ThemedView from "../ThemedView";
import ThemedText from "../ThemedText";
import Spacer from "../Spacer";
import ThemedTextInput from "../ThemedTextInput";
import ThemedButton from "../ThemedButton";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
};

export default function BookForm({ initialData, onSubmit, loading }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSubmit = async () => {
    await onSubmit({ title, author, description });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText title style={styles.heading}>
          {initialData ? "Edit Book" : "Add a New Book"}
        </ThemedText>

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Book Title"
          value={title}
          onChangeText={setTitle}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.multiline}
          placeholder="Book Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: "#f2f2f2" }}>
            {loading
              ? "Saving..."
              : initialData
              ? "Update Book"
              : "Create Book"}
          </Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

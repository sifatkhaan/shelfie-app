import { Modal, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedView from "../../../components/ThemedView";
import { useLocalSearchParams, useRouter } from "expo-router";
import ThemedText from "../../../components/ThemedText";
import { useBooks } from "../../../hooks/useBooks";
import Spacer from "../../../components/Spacer";
import ThemedCard from "../../../components/ThemedCard";
import ThemedLoader from "../../../components/ThemedLoader";
import ThemedButton from "../../../components/ThemedButton";
import { Colors } from "../../../constants/Colors";
import BookForm from "../../../components/Forms/BookForm";

const BookDetails = () => {
  const [book, setBook] = useState<any>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { id } = useLocalSearchParams();
  const {books, fethBookById, deleteBook, updateBook }: any = useBooks();
  
  const router = useRouter();

  const handleDelete = async () => {
    await deleteBook(id);
    setBook(null);
    router.replace("/books");
  };

  useEffect(() => {
    async function loadBook() {
      const data = await fethBookById(id);
      setBook(data);
    }
  
    if (id) loadBook();
  }, [id]);

  useEffect(() => {
    if (!books.length || !id) return;
  
    const updated = books.find((b) => b.$id === id);
  
    if (updated) {
      setBook(updated); // ✅ sync realtime
    }
  }, [books, id]);


  // useEffect(() => {
  //   async function loadBook() {
  //     const bookData = await fethBookById(id);
  //     setBook(bookData);
  //   }
  //   loadBook();
  // }, [id]);


  if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText>Written By {book.title}</ThemedText>
        <Spacer />
        <ThemedText title={true}>Book Description</ThemedText>
        <Spacer heitht={10} />
        <ThemedText>{book.description}</ThemedText>
      </ThemedCard>
      <ThemedButton style={styles.delete} onPress={handleDelete}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Delete Book</Text>
      </ThemedButton>
      <ThemedButton
        style={styles.edit}
        onPress={() => {
          setSelectedBook(book);
          setOpen(true);
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Edit</Text>
      </ThemedButton>

      {open && (
        <Modal>
          <BookForm
            initialData={selectedBook}
            onSubmit={async (data) => {
              await updateBook(selectedBook.$id, data);
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20,
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
  edit: {
    marginTop: 40,
    backgroundColor: Colors.primary,
    width: 200,
    alignSelf: "center",
  },
});

import { createContext, useEffect, useRef, useState } from "react";
import { client, databases } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";
import { AppState } from "react-native";

const DATABASE_ID = "69eb4343003b85747656";
const TABLE_ID = "books";

export const BooksContext = createContext({});
export function BooksProvider({ children }: any) {
  const [books, setBooks] = useState<any>([]);
  const [filteredBooks, setFilteredBooks] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user }: any = useUser();
  const subscriptionRef = useRef<any>(null);

  async function fetchBooks() {
    try {
      const response: any = await databases.listDocuments(
        DATABASE_ID,
        TABLE_ID,
        [Query.equal("userId", user.$id)]
      );
      setBooks(response.documents);
      setFilteredBooks(response.documents);
    } catch (error: any) {
      console.error("error:", error.message);
    }
  }

  const filterBooks = () => {
    let filteredData = [...books];
    if (searchQuery) {
      filteredData = filteredData.filter((book: any) => {
        return (
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }
    setFilteredBooks(filteredData);
  };

  async function fethBookById(id: any) {
    try {
      const response = await databases.getDocument(DATABASE_ID, TABLE_ID, id);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  }
  async function createBook(data: any) {
    try {
      const newBook = await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        { ...data, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      setBooks((prev: any) => [...prev, newBook]);
    } catch (error: any) {
      console.error(error);
    }
  }
  async function deleteBook(id: any) {
    try {
      await databases.deleteDocument(DATABASE_ID, TABLE_ID, id);
      setBooks((prev: any[]) => prev.filter((book) => book.$id !== id));
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function updateBook(id: string, data: any) {
    try {
      const updatedBook = await databases.updateDocument(
        DATABASE_ID,
        TABLE_ID,
        id,
        data
      );

      setBooks((prev: any[]) =>
        prev.map((book) =>
          book.$id === id ? { ...book, ...updatedBook } : book
        )
      );

      return updatedBook;
    } catch (error: any) {
      console.error("Update error:", error.message);
    }
  }

  useEffect(() => {
    filterBooks();
  }, [searchQuery, books]);

  useEffect(() => {
    let unsubscribe: any;
    const channel = `databases.${DATABASE_ID}.tables.${TABLE_ID}.rows`;
    if (user) {
      fetchBooks();
      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events }: any = response;
        // if (events[0].includes("create")) {
        //   setBooks((prev: any) => [...prev, payload]);
        // }

        if (events[0].includes("create")) {
          setBooks((prev: any[]) => {
            const exists = prev.some((b) => b.$id === payload.$id);
            if (exists) return prev; // ✅ prevent duplicate
            return [...prev, payload];
          });
        }

        if (events[0].includes("delete")) {
          setBooks((prevBooks: any) =>
            prevBooks.filter((book: any) => book.$id !== payload.$id)
          );
        }
        if (events[0].includes("update")) {
          setBooks((prev: any[]) =>
            prev.map((book) => (book.$id === payload.$id ? payload : book))
          );
        }
      });
    } else {
      setBooks([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{
        books: filteredBooks,
        setSearchQuery,
        fetchBooks,
        fethBookById,
        createBook,
        deleteBook,
        updateBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

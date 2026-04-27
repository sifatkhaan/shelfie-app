import { createContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

export const UserContext = createContext({});
export function UserProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  async function login(email: any, password: any) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response: any = await account.get();
      setUser(response);
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async function register(email: any, password: any) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  async function logout() {
    await account.deleteSession("current");
    setUser(null)
  }

  async function getInitialUserValue() {
    try {
      const response:any = await account.get();
      setUser(response);
    } catch (error: any) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}

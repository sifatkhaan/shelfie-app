import { Account, Avatars, Client, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("69e24ee60032426e9fb1")
  .setPlatform("dev.khan.shelfie");
export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);

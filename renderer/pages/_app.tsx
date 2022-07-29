import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/config";
import { getDatabase } from "firebase/database";

function MyApp({ Component, pageProps }: AppProps) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  return <Component {...pageProps} />;
}

export default MyApp;

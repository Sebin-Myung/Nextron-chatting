import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/config";
import { getDatabase } from "firebase/database";
import { Provider } from "react-redux";
import { store, useAppSelector } from "../store/config";
import BottomAlert from "../components/BottomAlert";

function MyApp({ Component, pageProps }: AppProps) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Alert />
    </Provider>
  );
}

const Alert = () => {
  const { message, visibility } = useAppSelector((state) => state.alertData);
  return <BottomAlert message={message} visibility={visibility} />;
};

export default MyApp;

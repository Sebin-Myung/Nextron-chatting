import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/config";
import { getFirestore } from "firebase/firestore";
import { Provider } from "react-redux";
import { store, useAppSelector } from "../store/config";
import BottomAlert from "../components/BottomAlert";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function MyApp({ Component, pageProps }: AppProps) {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

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

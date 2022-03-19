import "../styles/globals.css";
import "../utils/firebase/FirebaseInit"; // exe Firebase init setting
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

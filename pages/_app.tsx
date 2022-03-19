import "../styles/globals.css";

// exe Firebase init setting
import "../utils/firebase/FirebaseInit";

import type { AppProps } from "next/app";

// redux
import { store } from "../app/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

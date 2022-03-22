import "../styles/globals.css";

// exe Firebase init setting
import "../utils/firebase/FirebaseInit";

import type { AppProps } from "next/app";

// redux
import { store } from "../app/store";
import { Provider } from "react-redux";
import AuthComponent from "../components/AuthComponent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthComponent>
        <Component {...pageProps} />
      </AuthComponent>
    </Provider>
  );
}

export default MyApp;

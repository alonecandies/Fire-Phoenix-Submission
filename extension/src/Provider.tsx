import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import store from "./store";
import theme from "./theme";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export const persistor = persistStore(store);

const Provider: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <RefreshContextProvider>
            <App />
          </RefreshContextProvider>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default Provider;

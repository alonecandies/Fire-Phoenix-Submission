import React, { Suspense, useMemo, useEffect, lazy } from "react";
import {
  Route,
  Router,
  Switch,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routerHistory from "./routerHistory";

import { Box, Flex } from "@chakra-ui/layout";
import { get } from "lodash";
import HttpRequest from "./contexts/HttpRequest";
import LoadingPage from "./components/LoadingPage";
import { listenMessage } from "./services/extension";

const Home = lazy(() => import("./components/Home"));
const Report = lazy(()=> import("./components/Report"));

const App: React.FC = () => {
  const location = useLocation();

  const background = useMemo(
    () => get(location, "state.background"),
    [location]
  );

  useEffect(() => {
    listenMessage();
  }, []);

  return (
    <>
      <Flex>
        <Box flex="1" minW="0">
          <Suspense fallback={<LoadingPage />}>
            <HttpRequest>
              <>
                <Switch location={background || location}>
                  <Route path="/" exact component={Home} />
                  <Route path="/report" exact component={Report} />
                </Switch>
              </>
            </HttpRequest>
          </Suspense>
        </Box>
      </Flex>
      <ToastContainer theme="dark" />
    </>
  );
};

const WrappedAppWithBrowserRouter = () => {
  return (
    <Router history={routerHistory}>
      <App />
    </Router>
  );
};

export default WrappedAppWithBrowserRouter;

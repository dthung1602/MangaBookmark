import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { QueryParamProvider } from "use-query-params";
import { ConfigProvider } from "antd";

import {
  ROUTE_ACCOUNT,
  ROUTE_HOME,
  ROUTE_LEGAL_NOTICE,
  ROUTE_LOGIN,
  ROUTE_ALL_MANGAS,
  ROUTE_QUICK_ACCESS,
  ROUTE_MANGA_DETAIL,
  ROUTE_SEARCH,
  ROUTE_REGISTER,
} from "./utils/constants";
import { GlobalContextProvider } from "./components/GlobalContext";
import { ErrorBoundary, RequireLogin, FullScreenLoading, NotificationPrompt } from "./components";
import theme from "./theme";

import Home from "./pages/Home"; // load home page eagerly for better UX
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const AllMangas = lazy(() => import("./pages/AllMangas"));
const QuickAccess = lazy(() => import("./pages/QuickAccess"));
const MangaDetail = lazy(() => import("./pages/MangaDetail"));
const Search = lazy(() => import("./pages/Search"));
const Register = lazy(() => import("./pages/Register"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <ErrorBoundary>
        <Router>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <Suspense fallback={<FullScreenLoading />}>
              <GlobalContextProvider>
                <NotificationPrompt />
                <Routes>
                  <Route exact path={ROUTE_HOME} element={<Home />} />
                  <Route path={ROUTE_LEGAL_NOTICE} element={<LegalNotice />} />
                  <Route path={ROUTE_LOGIN} element={<Login />} />
                  <Route path={ROUTE_REGISTER} element={<Register />} />
                  <Route path={ROUTE_ACCOUNT} element={<RequireLogin path={ROUTE_ACCOUNT} component={Account} />} />
                  <Route
                    path={ROUTE_ALL_MANGAS}
                    element={<RequireLogin path={ROUTE_ALL_MANGAS} component={AllMangas} />}
                  />
                  <Route
                    path={ROUTE_QUICK_ACCESS}
                    element={<RequireLogin path={ROUTE_QUICK_ACCESS} component={QuickAccess} />}
                  />
                  <Route
                    path={ROUTE_MANGA_DETAIL}
                    element={<RequireLogin path={ROUTE_MANGA_DETAIL} component={MangaDetail} />}
                  />
                  <Route path={ROUTE_SEARCH} element={<RequireLogin path={ROUTE_SEARCH} component={Search} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </GlobalContextProvider>
            </Suspense>
          </QueryParamProvider>
        </Router>
      </ErrorBoundary>
    </ConfigProvider>
  );
};

export default App;

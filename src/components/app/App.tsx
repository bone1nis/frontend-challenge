import { lazy, ReactElement, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { fetchCats } from "../../store/catsSlice";

import { useAppDispatch } from "../../hooks/hooks";

import AppHeader from "../appHeader/AppHeader";

const MainPage = lazy(() => import("../pages/mainPage/MainPage"));
const LikedCatsPage = lazy(() => import("../pages/likeCatsPage/LikeCatsPage"));

const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCats());
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppHeader />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/liked" element={<LikedCatsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { ReactElement, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router";

import { fetchCats } from "../../store/catsSlice";

import { useAppDispatch } from "../../hooks/hooks";

import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/mainPage/MainPage";
import LikedCatsPage from "../pages/likeCatsPage/LikeCatsPage";

const App = (): ReactElement => {

  const dispatch = useAppDispatch(); // баг с linkAcitve fiks

  useEffect(() => {
    dispatch(fetchCats())
  }, []);

  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/liked" element={<LikedCatsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

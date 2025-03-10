import { ReactElement } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchCats, toggleLiked } from "../../store/catsSlice";

import { ICat } from "../../types/types";

import CatCard from "../catCard/CatCard";
import InfiniteScroll from "react-infinite-scroll-component";

import s from "./catsList.module.scss";

const CatsList = (): ReactElement => {
  const dispath = useAppDispatch();

  const cats = useAppSelector((state) => state.cats.catsList);
  const loading = useAppSelector((state) => state.cats.loadingStatus);

  const onLike = (id: string) => {
    dispath(toggleLiked(id));
  };

  const handleFetchedCats = () => {
    dispath(fetchCats(15));
  };

  const renderCards = (arr: ICat[]) => {
    return arr.map((cat: ICat) => {
      return (
        <CatCard
          key={cat.id}
          url={cat.url}
          id={cat.id}
          onLike={() => onLike(cat.id)}
        />
      );
    });
  };

  const content = (loading === "idle" || loading === "loading") && (
    <InfiniteScroll
      dataLength={cats.length}
      next={handleFetchedCats}
      hasMore={true}
      loader={
        <div className={s.catsListLoading}>... загружаем еще котиков ...</div>
      }
      className={s.catsList}
    >
      {renderCards(cats)}
    </InfiniteScroll>
  );
  const error = loading === "error" && (
    <div className={s.catsListError}>... упс, произошла ошибка ...</div>
  );

  return (
    <>
      {content}
      {error}
    </>
  );
};

export default CatsList;

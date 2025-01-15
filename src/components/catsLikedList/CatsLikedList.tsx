import { ReactElement } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleLiked } from "../../store/catsSlice";

import { ICat } from "../../types/types";

import CatCard from "../catCard/CatCard";

import s from "./catsLikedList.module.scss";

const CatsLikedList = (): ReactElement => {
  const dispath = useAppDispatch();

  const cats = useAppSelector((state) => state.cats.likedCatsList);
  const loading = useAppSelector((state) => state.cats.loadingStatus);

  const onLike = (id: string) => {
    dispath(toggleLiked(id));
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

  const spinner = loading === "loading" && (
    <div className={s.catsLikedListError}>... загружаем котиков ...</div>
  );
  const content = (loading === "idle" || loading === "loading") && (
    <div className={s.catsLikedList}>{renderCards(cats)}</div>
  );
  const error = loading === "error" && (
    <div className={s.catsLikedListLoading}>... упс, произошла ошибка ...</div>
  );

  return (
    <>
      {content}
      {spinner}
      {error}
    </>
  );
};

export default CatsLikedList;

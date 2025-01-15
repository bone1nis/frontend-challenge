import { ReactElement } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { toggleLiked } from "../../store/catsSlice"

import { ICat } from "../../types/types"

import CatCard from "../catCard/CatCard"

import s from "./catsList.module.scss"

interface ComponentProps {
  liked?: boolean
}

const CatsList = ({ liked }: ComponentProps): ReactElement => {

    const dispath = useAppDispatch();

    const cats = useAppSelector(state => liked ? state.cats.likedCatsList : state.cats.catsList )

    const onLike = (id: string) => {
      dispath(toggleLiked(id))
    }

    const renderCards = (arr: ICat[]) => {
        return arr.map((cat: ICat) => {
            return <CatCard 
                    key={cat.id} 
                    url={cat.url} 
                    id={cat.id}
                    onLike={() => onLike(cat.id)}/>
        });
    }

    const content = renderCards(cats);

    return (
      <div className={s.catsList}>
        { content }
      </div>
    )
  }
  
  export default CatsList
  
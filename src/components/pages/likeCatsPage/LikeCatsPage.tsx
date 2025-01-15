import { ReactElement } from "react";

import CatsList from "../../catsList/CatsList";

const LikedCatsPage = (): ReactElement => {
    return (
        <>
            <CatsList liked={true} />
        </>
    )
}

export default LikedCatsPage;
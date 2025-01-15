import { ReactElement } from "react";
import { NavLink } from "react-router";

import s from "./appHeader.module.scss"

const AppHeader = (): ReactElement => {
    console.log(s)
    return (
        <div className={s.appHeader}>
            <nav className={s.appHeaderNav}>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? s.appHeaderLinkActive  : s.appHeaderLink }>
                        Все котики</NavLink>
                <NavLink 
                    to="/liked" 
                    className={({ isActive }) => isActive ? s.appHeaderLinkActive : s.appHeaderLink }>
                        Любимые котики</NavLink>
            </nav>
        </div>
    )
}

export default AppHeader;
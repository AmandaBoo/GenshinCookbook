import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {NavLink} from "react-router-dom";

export const SideNavBarPanel = ({onCloseClick}) => {
    return (
        <div className="side-panel">
            {renderTopBar(onCloseClick)}
            <div className={'vertical-center'}>
                <NavLink className={"mobile-nav-bar-links"} to={"/summary"} activeClassName={"nav-bar-link-selected"}>Summary</NavLink>
                <NavLink className={"mobile-nav-bar-links"} to={"/cooking"} activeClassName={"nav-bar-link-selected"}>Cooking</NavLink>
                <NavLink className={"mobile-nav-bar-links"} to={"/potions"} activeClassName={"nav-bar-link-selected"}>Potions</NavLink>
                <NavLink className={"mobile-nav-bar-links"} to={"/smithing"} activeClassName={"nav-bar-link-selected"}>Smithing</NavLink>
            </div>
        </div>
    );
}

function renderTopBar(onCloseClick) {
    return (
        <div className={'padding side-panel-top-bar'}>
            <CloseRoundedIcon
                fontSize={'large'}
                className={'svg-icon'}
                onClick={() => onCloseClick()}
            />
        </div>
    );
}
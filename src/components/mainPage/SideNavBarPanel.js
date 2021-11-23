import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {NavLink} from "react-router-dom";

export const SideNavBarPanel = ({onCloseClick}) => {
    return (
        <div className={'side-panel-container'}>
            <div className="side-panel">
                {renderTopBar(onCloseClick)}
                <div>
                    {createNavLink('/', 'Home', onCloseClick)}
                    {createNavLink('/summary', 'Summary', onCloseClick)}
                    {createNavLink('/cooking', 'Cooking', onCloseClick)}
                    {createNavLink('/potions', 'Potions', onCloseClick)}
                    {createNavLink('/smithing', 'Smithing', onCloseClick)}
                </div>
            </div>
        </div>
    );
}

function createNavLink(toLink, linkName, onCloseClick) {
    return (
        <NavLink className={"mobile-nav-bar-links"}
                 to={toLink}
                 exact={true}
                 activeClassName={"nav-bar-link-selected"}
                 onClick={() => onCloseClick()}
        >{linkName}
        </NavLink>
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
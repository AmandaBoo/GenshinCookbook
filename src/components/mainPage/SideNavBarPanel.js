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
                    {createNavLink('/alchemy', 'Alchemy', onCloseClick)}
                    {createNavLink('/smithing', 'Smithing', onCloseClick)}
                </div>
            </div>
        </div>
    );
}

function createNavLink(toLink, linkName, onCloseClick) {
    return (
        <NavLink className={({ isActive }) => (isActive ? 'nav-bar-link-selected mobile-nav-bar-links' : 'mobile-nav-bar-links')}
                 to={toLink}
                 exact={true}
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
import React, {useState} from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {SideNavBarPanel} from "./SideNavBarPanel";

export const SideMenu = () => {
    const [isNavBarOpen, setNavBarOpen] = useState(false);
    return (
        <div className={'side-menu'}>
            <MenuRoundedIcon
                className={'svg-icon'}
                onClick={() => setNavBarOpen(true)}
            />
            {renderSideNavBar(isNavBarOpen, setNavBarOpen)}
        </div>
    );
}

function renderSideNavBar(isNavBarOpen, setNavBarOpen) {
    if (isNavBarOpen) {
        return (
            <SideNavBarPanel
                onCloseClick={() => setNavBarOpen(false)}
            />
        );
    }
}
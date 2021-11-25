import React from 'react';
import {ModalComponent} from "../shared/ModalComponent";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {DISCLAIMER} from "../../constants/constants";

export const CookiePopup = ({onCloseClick}) => {
    return (
        <ModalComponent>
            {renderTopBar(onCloseClick)}
            {renderMessageBody()}
        </ModalComponent>
    );
}

function renderTopBar(onCloseClick) {
    return (
        <div className={'top-bar padding text-align-center large-font offside-font'}>
            <div className={'flex-center'}>
                {renderCookieIcon()}
                <span className={'vertical-center padding-left padding-right'}>COOKIE, DISCLAIMERS, ATTRIBUTIONS</span>
                {renderCookieIcon()}
                <CloseRoundedIcon
                    fontSize={'large'}
                    className={'cookie-popup-close'}
                    onClick={() => onCloseClick()}
                />
            </div>
        </div>
    );
}

function renderCookieIcon() {
    return (
        <img src={'./images/icons/cookie.png'} alt={'cookie'} className={'cookie-png'}/>

    );
}

function renderMessageBody() {
    return (
        <span className={'text-align-center padding-top bottom-padding-donate-popup'}>
            <p className={'text-align-center'}>Hi everyone! This is the usual cookie and disclaimer policy that we're all used to~</p>
            {renderSubTitle('COOKIES')}
            <ul>
                <li>Google Analytics tells me which pages within Genshin Cookbook are visited the most allows me to cater my development towards popular pages~</li>
                <br/>
                <li>Google Analytics also tells me city and region of the world you're from (ie San Francisco, USA or Paris, France) which will help me determine what translation services are needed most~</li>
            </ul>

            {renderSubTitle('LOCAL STORAGE')}
            <ul>
                <li>Genshin Cookbook keeps track of your page data (ie what recipes you're currently keeping track of), so that it's still here when you return</li>
                <br/>
                <li className={'font-bold'}>Therefore, please do not run the site in incognito or private mode as your page data will not be saved, and you will have to reconfigure everything ;-;</li>
            </ul>

            {renderSubTitle('ATTRIBUTIONS')}
            <div>Icons made by <a href="https://www.flaticon.com/authors/aranagraphics" title="Aranagraphics">Aranagraphics</a> and <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
            {renderSubTitle('DISCLAIMERS')}
            <ul className={'donate-bottom-padding'}>
                <li>{DISCLAIMER}</li>
            </ul>
        </span>
    )
}

function renderSubTitle(title) {
    return (
        <p className={'border-bottom large-font offside-font'}>{title}</p>
    );
}
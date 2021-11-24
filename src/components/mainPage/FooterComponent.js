import React from 'react';

export const FooterComponent = ({onCookieClick}) => {
    return (
        <footer className={'footer flex-center'}>
            {createKofiIcon()}
            {createPaypalIcon()}
            {createCookiePolicyIcon(onCookieClick)}
            {createDiscordIcon()}
        </footer>
    )
}

function createKofiIcon() {
    return (
        <a href={"https://ko-fi.com/kitbon" } target="_blank">
            <img
                src={'./images/icons/kofiRound.png'}
                alt={'kofi-icon'}
                className={'footer-icons padding-right'}
            />
        </a>
    );
}

function createPaypalIcon() {
    return (
        <a href={"https://ko-fi.com/kitbon" } target="_blank">
            <img
                src={'./images/icons/paypal.png'}
                alt={'paypal-icon'}
                className={'footer-icons padding-right'}
            />
        </a>
    );
}

function createCookiePolicyIcon(onCookieClick) {
    return (
        <img
            src={'./images/icons/cookie.png'}
            alt={'cookie-icon'}
            className={'footer-icons padding-right'}
            onClick={() => onCookieClick()}
        />
    );
}

function createDiscordIcon() {
    return (
        <img
            src={'./images/icons/discordIcon.png'}
            alt={'discord-icon'}
            className={'discord-icon'}
        />
    );
}


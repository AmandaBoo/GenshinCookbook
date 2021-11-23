import React from 'react';

const Button = ({onClick, text, classNames}) => {
    return (
        <button
            className={"modal-button " + classNames}
            onClick={() => onClick()}
        >
            {text}
        </button>
    )
}
export default Button;
import React from 'react';
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

export const ToggleContainer = ({isToggleOn, setIsToggleOn, title}) => {
    return (
        <div>
            <div className={"flex-center"}>
                <div className={"vertical-center padding-right"}>
                    <span className={'text-align-center toggle-text'}>{title} </span>
                </div>
                <div className={"vertical-center padding-right toggle-text"}>
                    :
                </div>
                <div className={"vertical-center"}>
                    <span className={"toggle-text"}>Off</span>
                </div>
                {renderToggle(isToggleOn, setIsToggleOn)}
                <div className={"vertical-center"}>
                    <span className={"toggle-text"}>On</span>
                </div>
            </div>
        </div>
    );
}

function renderToggle(isToggleOn, setIsToggleOn) {
    if (isToggleOn) {
        return (
            <ToggleOnIcon
                fontSize={"large"}
                onClick={() => setIsToggleOn(false)}
                className={"toggle"}
            />
        );
    } else {
        return (
            <ToggleOffIcon
                fontSize={"large"}
                onClick={() => setIsToggleOn(true)}
                className={"toggle"}
            />
        );
    }
}
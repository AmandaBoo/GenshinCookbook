import React from 'react';

export const SubModalComponent = ({children}) => {

    return (
        <div className={"message-modal"}>
            <div className={"vertical-center"}>
                {children}
            </div>
        </div>
    );
}
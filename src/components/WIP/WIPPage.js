import React from 'react';
import {KofiIcon} from "../shared/donate/KofiIcon";

export const WIPPage = () => {
    return (
        <div className={"flex-center placeholder-div"}>
            <div className={"vertical-center"}>
                <div className={"flex-center"}>
                    <img
                        className={"paimon"}
                        alt={"paimon spoop"}
                        src={"./images/icons/paimonSpoop.png"}
                    />
                </div>
                <div className={'padding'}>Oops! This page isn't quite ready yet...</div>
                <div className={'padding'}>In the meantime, you can support the development of the site at my KoFi~</div>
                <div className={'flex-center'}>
                    <KofiIcon/>
                </div>
            </div>

        </div>
    );
}



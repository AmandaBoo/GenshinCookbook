import React from 'react';
import {DonateIcons} from "../shared/donate/DonateIcons";

export const WIPPage = () => {
    return (
        <div className={"flex-center placeholder-div"}>
            <div className={"vertical-center"}>
                <div className={"flex-center"}>
                    <img
                        className={"paimon"}
                        alt={"paimon spoop"}
                        src={"./images/iconsDisplay/paimonSpoop.png"}
                    />
                </div>
                <div className={'padding offside-font large-font'}>Oops! This page isn't quite ready yet...</div>
                <div className={'padding offside-font large-font'}>In the meantime, you can support the development of the site at my KoFi~</div>
                <div className={'flex-center'}>
                    <DonateIcons/>
                </div>
            </div>

        </div>
    );
}



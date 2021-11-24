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
                        src={"./images/icons/paimonSpoop.png"}
                    />
                </div>
                <div className={'padding'}>Oops! This page isn't quite ready yet...</div>
                <div className={'padding'}>In the meantime, you can support the development of the site at my KoFi or Paypal~</div>
                <div className={'flex-center'}>
                    <DonateIcons/>
                </div>
            </div>

        </div>
    );
}



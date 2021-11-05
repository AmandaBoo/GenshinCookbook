import React, {Component} from 'react';
import {NavBarTab} from "./NavBarTab";
import CloseButton from "../buttons/CloseButton";

export class NavBar extends Component {
    /* PROPS
    * selectedTab, navBarTabList
    * */
    constructor(props) {
        super(props);
    }

    renderNavBarTabs() {
        let navBarTabs = [];
        for (let i = 0; i < this.props.imgSrcList.length; i++) {
            let tabId = this.props.imgSrcListIds[i];
            // TODO : FIX UNIQUE KEY PROP WARNING
            navBarTabs.push(
                <NavBarTab
                    src={this.props.imgSrcList[i]}
                    id={tabId}
                    isSelected={this.props.selectedTab === tabId}
                    onClick={() => this.props.onInventoryTabClick(tabId)}
                />
            )
        }
        return (
            navBarTabs
        )
    }

    render() {
        return (
            <div className={"modal-nav-bar"}>
                <img
                    className={"modal-nav-bar-icon"}
                    src={this.props.navBarIcon}
                    alt={"Inventory Icon"}
                />
                <div>
                    {this.renderNavBarTabs()}
                </div>
                <CloseButton
                    onCloseClick={() => this.props.onCloseClick()}
                />
            </div>
        );
    }
}
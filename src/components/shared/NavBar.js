import React, {Component} from 'react';
import {NavBarTab} from "./NavBarTab";
import CloseButton from "./CloseButton";

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
            <div className={"inventory-nav-bar"}>
                <img
                    className={"inventory-nav-bar-main-icon"}
                    src={this.props.navBarIcon}
                    alt={"Inventory Icon"}
                />
                <div className={"inventory-nav-bar-tabs"}>
                    {this.renderNavBarTabs()}
                </div>
                <CloseButton
                    onClick={() => this.props.onCloseClick()}
                />
            </div>
        );
    }
}
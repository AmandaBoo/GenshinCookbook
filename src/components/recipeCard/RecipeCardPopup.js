import React, { Component } from 'react';
import {NavBar} from "../shared/NavBar";

export class RecipeCardPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab : null
        };
        this.imgSrcList = ["images/icons/foodIcon.png"];
        this.imgSrcListIds = ["food-tab"];
    }

    updateSelectedInventoryTab(tabId) {
        this.setState({selectedTab: tabId});
    }

    render() {
        if (this.props.doRender) {
            return (
                <div id={"inventory-popup"} className={"modal"}>
                    <NavBar
                        navBarIcon={"images/icons/foodIcon.png"}
                        imgSrcList={this.imgSrcList}
                        imgSrcListIds={this.imgSrcListIds}
                        selectedTab={this.state.selectedTab}
                        onInventoryTabClick={tabId => this.updateSelectedInventoryTab(tabId)}
                        onCloseClick={() => this.props.onCloseClick()}
                    />
                </div>
            );
        }
        return null;
    }
}
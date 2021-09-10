import React, { Component } from 'react';
import {NavBar} from "../shared/NavBar";

export class InventoryPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab : "materials-tab"
        };
        this.imgSrcList = ["images/icons/ingredientsIcon.png", "images/icons/furnitureIcon.png"];
        this.imgSrcListIds = ["materials-tab", "furniture-tab"];
    }

    updateSelectedInventoryTab(tabId) {
        this.setState({selectedTab: tabId});
    }

    render() {
        if (this.props.doRender) {
            return (
                <div id={"inventory-popup"} className={"modal"}>
                    <NavBar
                        navBarIcon={"images/icons/inventoryIcon.png"}
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
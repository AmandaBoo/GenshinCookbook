// import React, { Component } from 'react';

// // TODO : CONVERT INTO FUNCTIONAL COMPONENT
// export class NavBarTab extends Component {
//     /* PROPS
//     * id, ?src, ?name, selectedTab
//     * */
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         if (this.props.src !== undefined) {
//             return (
//                 <img
//                     className={
//                         `inventory-nav-bar-tab-icon 
//                         ${this.props.isSelected ? "selected-tab" : ""}`
//                     }
//                     id={this.props.id}
//                     src={this.props.src}
//                     alt={this.props.src}
//                     onClick={() => this.props.onClick(this.props.id)}
//                 />
//             );
//         } else if (this.props.name !== undefined) {
//             return (
//                 <label
//                     className={"site-nav-bar-links"}
//                     id={this.props.id}
//                 >
//                     this.props.name
//                 </label>
//             );
//         }
//     }
// }
import React from 'react';

// TODO : CONVERT INTO FUNCTIONAL COMPONENT
export function NavBarTab (props){
    /* PROPS
    * id, ?src, ?name, selectedTab
    * */
    //constructor(props) {
    //    super(props);
    //}
    if (props.src !== undefined) {
       return (
            <img
                className={
                    `inventory-nav-bar-tab-icon 
                    ${props.isSelected ? "selected-tab" : ""}`
                }
                id={props.id}
                src={props.src}
                alt={props.src}
                onClick={() => props.onClick(props.id)}
            />
        );
    } else if (props.name !== undefined) {
        return (
            <label
                className={"site-nav-bar-links"}
                id={props.id}
            >
                props.name
            </label>
       );
    }
}

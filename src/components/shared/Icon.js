// import React, { Component } from 'react';

// // TODO : CONVERT TO FUNCTIONAL COMPONENT
// export class Icon extends Component {
//     render() {
//         return (
//             <button
//                 className={"btn"}
//                 onClick={() => this.props.onClick(this.props.id)}
//             >
//                 {this.props.text}
//             </button>
//         )
//     }
// }
import React from 'react';

// TODO : CONVERT TO FUNCTIONAL COMPONENT
export function Icon(props) {    
    return (
        <button
            className={"btn"}
            onClick={() => props.onClick(props.id)} 
        >
         {props.text}
        </button>
    )  
}
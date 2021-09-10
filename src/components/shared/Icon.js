import React, { Component } from 'react';

// TODO : CONVERT TO FUNCTIONAL COMPONENT
export class Icon extends Component {
    render() {
        return (
            <button
                className={"btn"}
                onClick={() => this.props.onClick(this.props.id)}
            >
                {this.props.text}
            </button>
        )
    }
}
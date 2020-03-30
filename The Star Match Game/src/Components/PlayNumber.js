import React from 'react';
import { constants } from '../Common/constants'


class PlayNumber extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onNumberChange(this.props.number, this.props.status);
    }

    render() {
        var number = this.props.number;
        var status = this.props.status;

        return (
            <button className="number" 
                style={{ backgroundColor: constants.colors[status] }}
                onClick={this.handleClick}>
                {number}
            </button>
        );
    }
}

export default PlayNumber
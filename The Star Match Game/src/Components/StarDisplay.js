import React from 'react';
import { utils } from '../Common/utils'


class StarDisplay extends React.Component {
    render() {
        var count = this.props.count;

        return (
            <>{ utils.range(1, count).map(starId => <div key={starId} className="star" />)  }</>
        );
    }
}

export default StarDisplay
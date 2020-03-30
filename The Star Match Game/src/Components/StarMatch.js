import React from 'react';
import Game from './Game'

class StarMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: 1
        }

        this.handleStartNewGame = this.handleStartNewGame.bind(this);
    }

    handleStartNewGame() {
        let gameId = this.state.gameId;
        this.setState({ gameId: ++gameId });
    }

    render() {
        var gameId = this.state.gameId;
        return <Game key={gameId} onStarNewGame={this.handleStartNewGame} />
    }
}

export default StarMatch;
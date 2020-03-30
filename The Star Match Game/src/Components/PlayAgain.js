import React from 'react';

class PlayAgain extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onResetGame();
    }
    
    render() {
        const gameStatus = this.props.gameStatus;
        const isGameOver = gameStatus === 'lost';

        return (
            <div className="game-done">
                <div className="message"
                    style={{ color: isGameOver ? 'red' : 'green' }}>
                    {isGameOver ? 'Game Over' : 'Nice!'}
                </div>
                <button onClick={this.handleClick}>PlayAgain</button>
            </div>
        );
    }
}

export default PlayAgain;
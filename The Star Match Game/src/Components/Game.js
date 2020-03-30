import React from 'react';
import PlayNumber from './PlayNumber'
import StarDisplay from './StarDisplay'
import PlayAgain from './PlayAgain'
import { utils } from '../Common/utils'

function useGameState() [

]

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stars: utils.random(1, 9),
            availableNums: utils.range(1, 9), //mock data
            candidateNums: [], // mock data
            secondsLeft: 15
        };

        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleResetGame = this.handleResetGame.bind(this);

        this._timerId = null;
    }

    //#region Properties

    get candidatesAreWrong() {
        return utils.sum(this.state.candidateNums) > this.state.stars;
    }

    get gameStatus() {
        return this.state.availableNums.length === 0
            ? 'won'
            : this.state.secondsLeft === 0 ? 'lost' : 'active';
    }

    get isGameDone() {
        return !(this.state.secondsLeft > 0 && this.state.availableNums.length > 0);
    }

    //#endregion

    //#region Events

    handleResetGame() {
        this.props.onStarNewGame();
    }

    handleNumberChange(number, currentStatus) {
        if(this.gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }

        // candidates
        const newCandidateNums = currentStatus === 'available'
            ? this.state.candidateNums.concat(number)
            : this.state.candidateNums.filter(cn => cn !== number);
        
        if(utils.sum(newCandidateNums) !== this.state.stars) {
            this.setState({ candidateNums: newCandidateNums }) 
        } else {  // we have a correct pick
            // Shring list of candidates
            const newAvailableNums = this.state.availableNums.filter(n => !newCandidateNums.includes(n));

            // Redraw number of stars
            var newStars = utils.randomSumIn(newAvailableNums, 9); // Tell Don't Ask principle
            this.setState({ stars: newStars }); 

            this.setState({ availableNums: newAvailableNums }); // Tell Don't Ask principle

            // Reset Candidate Numbers
            this.setState({ candidateNums: [] });
        }
    }

    //#endregion

    //#region LifeCycle Methods

    componentDidMount() {
        this._timerId = this.updateTimer();
    }

    componentWillUpdate() {
        if (!this.isGameDone) {
            clearInterval(this._timerId);
            this._timerId = this.updateTimer();
        }
    }

    componentDidUpdate() {
        if (this.isGameDone) {
            clearInterval(this._timerId);
        }
    }
    
    render() {
        var stars = this.state.stars;  

        return (
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>

                <div className="body">
                    <div className="left">
                        { this.gameStatus !== 'active'
                            ? <PlayAgain onResetGame={this.handleResetGame} gameStatus={this.gameStatus}/>
                            : <StarDisplay count={stars} /> }
                        
                    </div>
                    <div className="right">
                        { utils.range(1, 9).map(number => 
                            <PlayNumber 
                                key={number} 
                                status={this.retrieveNumberStatus(number)}
                                number={number} 
                                onNumberChange={this.handleNumberChange} // lifting state up
                            />) }
                    </div>
                </div>

                <div className="timer">Time Remaining: {this.state.secondsLeft}</div>
            </div>
        );
    }

    //#endregion

    //#region Private Methods

    retrieveNumberStatus(number) {
        if(!this.state.availableNums.includes(number)) {
            return 'used';
        }

        if(this.state.candidateNums.includes(number)) {
            return this.candidatesAreWrong ? 'wrong' : 'candidate'; 
        }

        return 'available';
    }

    updateTimer() {
        return setTimeout(() => {
            const currentSeconds = this.state.secondsLeft;
            this.setState({ secondsLeft: currentSeconds - 1 });
        }, 1000)
    }

    //#endregion
}

export default Game;
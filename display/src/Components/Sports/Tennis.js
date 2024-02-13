import React from 'react';
import './Sport.css';

const Tennis = ({ gsi }) => {
    return (
        <div className="sport-container">
            <h1>Tennis Match</h1>
            <div className="score-container">
                <div className="team">
                    <h2 className="team-name">Home</h2>
                    <p className="team-points">Home_Points</p>
                    <p className="team-sets-won">Home_SetsWon</p>
                </div>
                <div className="team">
                    <h2 className="team-name">Guest</h2>
                    <p className="team-points">Guest_Points</p>
                    <p className="team-sets-won">Guest_SetsWon</p>
                </div>
            </div>
            <div className="chrono-container">
                <p className="chrono">Chrono</p>
            </div>
            <div className="timer-status-container">
                <p className="timer-status">Timer_Status</p>
                <p className="timer-led">Timer_LED</p>
            </div>
            <div className="display-container">
                <p className="tiebreak">TieBreak</p>
            </div>
        </div>
    );
};

export default Tennis;

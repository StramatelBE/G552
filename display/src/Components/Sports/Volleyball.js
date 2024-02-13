import React from 'react';
import './Sport.css';

const Volleyball = ({ gsi }) => {
    return (
        <div className="sport-container">
            <h1>Volleyball Match</h1>
            <div className="score-container">
                <div className="team">
                    <h2 className="team-name">Home</h2>
                    <p className="team-points">Home_TotalPoints</p>
                    <p className="team-sets-won">Home_SetsWon</p>
                    <p className="team-timeouts">Home_CountTimeout</p>
                </div>
                <div className="team">
                    <h2 className="team-name">Guest</h2>
                    <p className="team-points">Guest_TotalPoints</p>
                    <p className="team-sets-won">Guest_SetsWon</p>
                    <p className="team-timeouts">Guest_CountTimeout</p>
                </div>
            </div>
            <div className="chrono-container">
                <p className="chrono">Chrono</p>
            </div>
            <div className="timer-status-container">
                <p className="timer-status">Timer_Status</p>
                <p className="timer-led">LED</p>
            </div>
            <div className="display-container">
                <p className="period">Set</p>
                <p className="horn">Horn</p>
            </div>
        </div>
    );
};

export default Volleyball;

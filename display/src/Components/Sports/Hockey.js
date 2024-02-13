import React from 'react';
import './Sport.css';

const Hockey = ({ gsi }) => {
    return (
        <div className="sport-container">
            <h1>Rink Hockey Match</h1>
            <div className="score-container">
                <div className="team">
                    <h2 className="team-name">Home</h2>
                    <p className="team-points">Home_Points</p>
                    <p className="team-fouls">Home_Team_Fouls</p>
                    <p className="team-timeouts">Home_TimeOuts</p>
                </div>
                <div className="team">
                    <h2 className="team-name">Guest</h2>
                    <p className="team-points">Guest_Points</p>
                    <p className="team-fouls">Guest_Team_Fouls</p>
                    <p className="team-timeouts">Guest_TimeOuts</p>
                </div>
            </div>
            <div className="chrono-container">
                <p className="chrono">Chrono</p>
            </div>
            <div className="timer-status-container">
                <p className="timer-status">Timer_Status</p>
            </div>
            <div className="display-container">
                <p className="period">Period</p>
                <p className="horn">Horn</p>
            </div>
        </div>
    );
};

export default Hockey;

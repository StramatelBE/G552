import React from 'react';
import './Sport.css';

const SimpleTimer = ({ gsi }) => {
    return (
        <div className="sport-container">
            <div className="chrono-container">
                <p className="chrono">Chrono</p>
                <p className="horn">Horn</p>
            </div>
            <div className="timer-status-container">
                <p className="timer-status">Timer_Status</p>
                <p className="led">LED</p>
            </div>
            <div className="display-container">
                <p className="clock-display">Clock_Display</p>
                <p className="chrono-display">Chrono_Display</p>
            </div>
        </div>
    );
};

export default SimpleTimer

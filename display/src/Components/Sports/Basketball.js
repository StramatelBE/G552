import React from 'react';
import './Sport.css';

const Basketball = ({ data }) => {
    return (
        <div className="sport-container">
            <h1>Basketball Match</h1>
            <div className="chrono-container">
                <h1 className="chrono">{data.gameState.chrono}</h1>
                <p className="chrono-timeout">
                    Chrono_TimeOut_Digit1
                    Chrono_TimeOut_Digit2
                    Chrono_TimeOut_Digit3
                </p>
            </div>
            <div className="score-container">
                <div className="team">
                    <h2 className="team-name">Home</h2>
                    <p className="team-points">Home_Points</p>
                    <p className="team-fouls">Home_TeamFouls</p>
                    <p className="team-fouls-rs">Home_TeamFouls_RS</p>
                    <p className="team-timeouts">Home_CountTimeout</p>
                    <p className="team-individual-foul">Home_IndividualFoul</p>
                    <p className="team-individual-points">Home_IndiviualPoints</p>
                </div>
                <div className="team">
                    <h2 className="team-name">Guest</h2>
                    <p className="team-points">Guest_Points</p>
                    <p className="team-fouls">Guest_TeamFouls</p>
                    <p className="team-fouls-rs">Guest_TeamFouls_RS</p>
                    <p className="team-timeouts">Guest_CountTimeout</p>
                    <p className="team-individual-foul">Guest_IndividualFoul</p>
                    <p className="team-individual-points">Guest_IndiviualPoints</p>
                </div>
            </div>

            <div className="timer-status-container">
                <p className="timer-status">Timer_Status</p>
                <p className="timer-led">Timer_LED</p>
            </div>
            <div className="display-container">
                <p className="period">Period</p>
                <p className="horn">Horn</p>
                <p className="horn24s">Horn24s_Status</p>
                <p className="display-status">Display_Status</p>
                <p className="display-led">Display_LED_Mode</p>
            </div>
            <div className="timer24s-container">
                <p className="timer24s">
                    Timer24s_Digit1
                    Timer24s_Digit2
                </p>
                <p className="timer24s-status">Timer24s_Status</p>
                <p className="timer24s-led">Timer24s_LED</p>
            </div>
        </div>
    );
};

export default Basketball;

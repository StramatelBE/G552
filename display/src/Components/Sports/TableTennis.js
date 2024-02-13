import React from 'react';
import './TableTennis.css';

// Separate Service component
const ServiceIndicator = ({ isServing }) => {
    if (!isServing) return null;
    return <div className="team-service">•</div>;
};

const Team = ({ name, teamData }) => {
    const formatPointsBySet = (team) => {
        if (!team || !team.PointsInSet) return 'N/A';
        return Object.values(team.PointsInSet).join(' - ');
    };

    const getValue = (value, fallback = 'N/A') => value || value === 0 ? value : fallback;

    return (
        <div className="team">
            <div className="team-header">
                <h2 className="team-name">{name}</h2>
                <ServiceIndicator isServing={teamData.Service} />
            </div>
            <p className="team-score">{getValue(teamData.TotalPoints)}</p>
            <p className="team-sets-won">Sets: {getValue(teamData.SetsWon)}</p>
            <p className="team-points-by-set">{formatPointsBySet(teamData)}</p>
            {teamData.Winner && <p className="team-winner">Winner!</p>}
        </div>
    );
};

const TableTennis = ({ gameState }) => {
    const { Home, Guest, Chrono } = gameState;

    return (
        <div className="table-tennis-container">
            <h1>Table Tennis Match</h1>
            <div className="score-container">
                <Team name="Home" teamData={Home} />
                <div className="divider"></div>
                <Team name="Guest" teamData={Guest} />
            </div>
            <div className="chrono-container">
                <p className="chrono">{Chrono.Value}</p>
            </div>
        </div>
    );
};

export default TableTennis;

import React, { useEffect, useState } from 'react';
import {
    TableTennis,
    Basketball,
    Badminton,
    SimpleTimer,
    Soccer,
    Volleyball,
    Tennis,
    Hockey,
    Handball,
    Boxing,
    StandardDisplay
} from './Sports/';
import './Mode.css';

//TODO: DISPLAY TIMEOUT COUNTDOWN WHEN TIMEOUT IS CALLED

const SPORT_COMPONENT_MAP = {
    'Table Tennis': TableTennis,
    'Basketball': Basketball,
    'Badminton': Badminton,
    'Simple Timer': SimpleTimer,
    'Soccer': Soccer,
    'Volleyball': Volleyball,
    'Tennis': Tennis,
    'Hockey': Hockey,
    'Handball': Handball,
    'Boxing': Boxing
};

const ScoringMode = ({ gameState }) => {
    const [sport, setSport] = useState('none');

    useEffect(() => {
        if (gameState && gameState.Sport) {
            setSport(gameState.Sport);
        }
    }, [gameState]);

    const CurrentSportComponent = StandardDisplay || (() => <div style={{ backgroundColor: "black", color: "white" }}>Waiting for data...ScoringMode</div>);

    return (
        < >
            <CurrentSportComponent gameState={gameState} />
        </>
    );
};

export default ScoringMode;

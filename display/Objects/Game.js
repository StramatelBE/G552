class Game {
    static State = {

        Sport: null,

        Period: null,

        Set: null,

        TieBreak: null,

        Timer: {
            Value: null,
            Display: null,
            Status: null,
            LED: null,
            Horn: null,
        },

        Timer24s: {
            Value: null,
            Display: null,
            Status: null,
            LED: null,
            Horn24s: null,
        },

        Clock: {
            Display: null,
        },

        Guest: {
            Player: {
                Name: new Array(16),
                Number: new Array(16),
            },
            PlayersInPlay: null,
            TeamName: null,
            Points: null,
            TotalPoints: null,
            PointsInSet: null,
            SetsWon: null,
            Service: null,
            Fouls: {
                Individual: new Array(16),
                Team: null,
                RS: null,
            },
            Timeout: {
                Count: null,
                Time: null,
            },
            PenaltiesInProgress: null,
            Exclusion: {
                Timer: null,
                ShirtNumber: null,
            },
            Possession: null,
            Warnings: null,
        },
        Home: {
            Player: {
                Name: new Array(16),
                Number: new Array(16),
            },
            PlayersInPlay: null,
            TeamName: null,
            Points: null,
            TotalPoints: null,
            PointsInSet: null,
            SetsWon: null,
            Service: null,
            Fouls: {
                Individual: new Array(16),
                Team: null,
                RS: null,
            },
            Timeout: {
                Count: null,
                Time: null,
            },
            PenaltiesInProgress: null,

            Exclusion: {
                Timer: null,
                ShirtNumber: null,
            },
            Possession: null,
            Warnings: null,
        }


    }
}
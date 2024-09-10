// APIs

export const postGameData = (username, gameroom, state, date) => {
    const gameData = {
        username: username,
        game: {
            gameroom: gameroom,
            state: state,
            date: date
        }
    };

    return fetch('http://localhost:5000/api/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

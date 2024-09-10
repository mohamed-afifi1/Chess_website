import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import './css-files/profile.css';
import { Navbar } from './navbar';

const Profile = () => {
    const { userId } = useAuth(); // username
    const [gameStats, setGameStats] = useState(null);

    // Fetch the game data for the user
    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/games`);
                const data = await response.json();
                const userGames = data[userId] || [];

                // Calculate game stats
                const totalGames = userGames.length;
                const computerGames = userGames.filter(game => game.gameroom === 'Computer').length;
                const onlineGames = userGames.filter(game => game.gameroom !== 'Computer').length;
                const wins = userGames.filter(game => game.state === 'win').length;
                const draws = userGames.filter(game => game.state === 'draw').length;
                const losses = userGames.filter(game => game.state === 'lost' || game.state === 'lose').length;

                setGameStats({
                    totalGames,
                    computerGames,
                    onlineGames,
                    wins,
                    draws,
                    losses,
                    lastGames: userGames.slice(-7), // Last 5 games
                });
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        fetchGameData();
    }, [userId]);

    if (!gameStats) return <p>Loading profile...</p>;

    return (
        <>
            <Navbar />
            <div className="profile-container">

                <div className="profile-header">
                    <h1>{userId}'s Profile</h1>
                </div>
                <div className="profile-stats">
                    <div className="stats-box">
                        <h3>Total Games: {gameStats.totalGames}</h3>
                    </div>
                    <div className="stats-box">
                        <h3>Computer Games: {gameStats.computerGames}</h3>
                    </div>
                    <div className="stats-box">
                        <h3>Online Games: {gameStats.onlineGames}</h3>
                    </div>
                    <div className="stats-box">
                        <h3>Wins: {gameStats.wins}</h3>
                    </div>
                    <div className="stats-box">
                        <h3>Draws: {gameStats.draws}</h3>
                    </div>
                    <div className="stats-box">
                        <h3>Losses: {gameStats.losses}</h3>
                    </div>
                </div>
                <div className="last-games">
                    <h2>Last Games Played</h2>
                    <ul>
                        {gameStats.lastGames.map((game, index) => (
                            <li key={index}>
                                <span>{game.date.slice(0, 10)}</span> - <strong>{game.gameroom}</strong> - <em>{game.state}</em>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Profile;

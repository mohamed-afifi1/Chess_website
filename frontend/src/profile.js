import { useAuth } from './AuthContext';
import './css-files/profile.css';
function Profile() {
    const { userId } = useAuth();
    return (
        <div className='profile'>
        <h1>Welcome, {userId}</h1>
        </div>
    )
}

export default Profile;
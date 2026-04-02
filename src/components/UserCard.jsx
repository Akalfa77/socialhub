import { Link } from 'react-router-dom';

export default function UserCard({ user }) {

    return (
        <Link to={`/users/${user.id}`} className="user-card">

            <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="user-card-image"
            />
            <h3 className="user-card-name">
                {user.firstName} {user.lastName}
            </h3>

            <p className="user-card-username">
                @{user.username}
            </p>

            <p className="user-card-email">
                {user.email}
            </p>

            {user.company && (
                <p className="user-card-company">
                    {user.company.name}
                </p>
            )}

            <span className="user-card-btn">
                View Profile &#8594;
            </span>

        </Link>
    );
}


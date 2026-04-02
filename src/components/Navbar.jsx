import { NavLink } from 'react-router-dom';
import '../styles/App.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-brand">
                SocialHub
            </NavLink>

            <ul className="navbar-links">
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? 'navbar-link active' : 'navbar-link'
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            isActive ? 'navbar-link active' : 'navbar-link'
                        }
                    >
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/posts"
                        className={({ isActive }) =>
                            isActive ? 'navbar-link active' : 'navbar-link'
                        }
                    >
                        Posts
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/todos"
                        className={({ isActive }) =>
                            isActive ? 'navbar-link active' : 'navbar-link'
                        }
                    >
                        Todos
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

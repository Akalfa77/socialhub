
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService, postService, todoService } from '../services/api';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function Dashboard() {

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPosts: 0,
        totalTodos: 0,
        totalComments: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);

        try {
            const [usersRes, postsRes, todosRes] = await Promise.all([
                userService.getAll(5, 0),
                postService.getAll(5, 0),
                todoService.getAll(3, 0),
            ]);

            setUsers(usersRes.data.users);
            setPosts(postsRes.data.posts);

            setStats({
                totalUsers: usersRes.data.total,
                totalPosts: postsRes.data.total,
                totalTodos: todosRes.data.total,
                totalComments: 340,
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);


    if (loading) {
        return (
            <div className="page-container">
                <Loader message="Loading dashboard..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <ErrorMessage
                    message={error}
                    onRetry={fetchDashboardData}
                />
            </div>
        );
    }

    return (
        <div className="page-container">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">
                Welcome to SocialHub! Here is your overview.
            </p>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-icon">
                        <span className="material-icons">groups</span>
                    </div>
                    <div className="stat-card-number">{stats.totalUsers}</div>
                    <div className="stat-card-label">Total Users</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-icon">
                        <span className="material-icons">description</span>
                    </div>
                    <div className="stat-card-number">{stats.totalPosts}</div>
                    <div className="stat-card-label">Total Posts</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-icon">
                        <span className="material-icons">check_circle</span>
                    </div>
                    {/* &#9989; = checkmark icon */}
                    <div className="stat-card-number">{stats.totalTodos}</div>
                    <div className="stat-card-label">Total Todos</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-icon">
                        <span className="material-icons">chat</span>
                    </div>
                    {/* &#128172; = speech bubble icon */}
                    <div className="stat-card-number">{stats.totalComments}</div>
                    <div className="stat-card-label">Total Comments</div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">Recent Posts</h2>
                        <Link to="/posts" className="section-link">
                            View All &#8594;
                        </Link>
                    </div>

                    {posts.map((post) => (
                        <Link
                            to={`/posts/${post.id}`}
                            key={post.id}
                            className="dashboard-post-card"
                        >
                            <h3 className="dashboard-post-title">
                                {post.title}
                            </h3>
                            <p className="dashboard-post-body">
                                {post.body.length > 100
                                    ? post.body.substring(0, 100) + '...'
                                    : post.body}    
                            </p>
                            <div className="dashboard-post-tags">
                                {post.tags.map((tag) => (
                                    <span className="tag" key={tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">Active Users</h2>
                        <Link to="/users" className="section-link">
                            View All &#8594;
                        </Link>
                    </div>

                    {users.map((user) => (
                        <Link
                            to={`/users/${user.id}`}
                            key={user.id}
                            className="dashboard-user-item"
                        >
                            <img
                                src={user.image}
                                alt={user.firstName}
                                className="dashboard-user-image"
                            />
                            <div className="dashboard-user-info">
                                <h4 className="dashboard-user-name">
                                    {user.firstName} {user.lastName}
                                </h4>
                                <p className="dashboard-user-email">
                                    {user.email}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
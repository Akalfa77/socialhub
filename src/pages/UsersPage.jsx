// src/pages/UsersPage.jsx

import { useState, useEffect } from 'react';
import { userService } from '../services/api';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function UsersPage() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const USERS_PER_PAGE = 8;


    useEffect(() => {
        fetchUsers();
    }, [currentPage]);


    const fetchUsers = async () => {    
        try {
            setLoading(true);
            setError(null);
            const skip = (currentPage - 1) * USERS_PER_PAGE;
            const response = await userService.getAll(USERS_PER_PAGE, skip);
            setUsers(response.data.users);

            setTotalPages(Math.ceil(response.data.total / USERS_PER_PAGE));

        } catch (err) {

            setError('Failed to fetch users. Please try again later.');
            console.error('Error fetching users:', err);

        } finally {

            setLoading(false);
        }
    };
  
    const handleSearch = async (term) => {
        setSearchTerm(term);

        if (!term.trim()) {
            setCurrentPage(1);
            fetchUsers();
            return;
        }

        try {
            setLoading(true);
            setError(null);


            const response = await userService.search(term);

            setUsers(response.data.users);


            setTotalPages(Math.ceil(response.data.total / USERS_PER_PAGE));

            setCurrentPage(1);

        } catch (err) {
            setError('Failed to search users. Please try again.');
            console.error('Error searching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };



    return (
        <div className="users-page">
            {/* Page Header */}
            <div className="page-header">
                <h1>Users</h1>
                <p className="page-subtitle">Browse and search through all users</p>
            </div>


            <SearchBar
                onSearch={handleSearch}
                placeholder="Search users by name..."
            />


            {loading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : users.length === 0 ? (
                <div className="no-results">
                    <h3>No users found</h3>
                    <p>Try a different search term</p>
                </div>
            ) : (
                <>

                    <div className="users-grid">
                        {users.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>

                    {!searchTerm && totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default UsersPage;
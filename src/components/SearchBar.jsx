
import { useState } from 'react';

function SearchBar({ onSearch, placeholder = 'Search...' }) {
    const [term, setTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setTerm(value);
        onSearch(value);
    };

    const handleClear = () => {
        setTerm('');
        onSearch('');
    };

    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <span className="search-icon">
                    &#128269;
                </span>
                <input
                    type="text"
                    value={term}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="search-input"
                />
                {term && (
                    <button
                        className="search-clear-btn"
                        onClick={handleClear}
                        type="button"
                    >
                        x
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchBar;

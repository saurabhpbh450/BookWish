// this is my frontend\src\pages\AllBooks.jsx file
// frontend\src\pages\AllBooks.jsx
// frontend/src/pages/AllBooks.jsx
// frontend\src\pages\AllBooks.jsx

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import { FaSort, FaArrowUp } from 'react-icons/fa';

const AllBooks = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [randomPlaceholder, setRandomPlaceholder] = useState('');
    const inputRef = useRef(null); // For scrolling into view

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:1000/api/v1/get-all-books');
            const books = response.data.data;
            setProducts(books);
            setFilteredProducts(books);
            setAuthors([...new Set(books.map((book) => book.author))]);
            setLanguages([...new Set(books.map((book) => book.language))]);
            setRandomPlaceholder(books[Math.floor(Math.random() * books.length)].title);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchTerm, sortOption, selectedAuthor, selectedLanguage]);

    const applyFilters = () => {
        let filtered = [...products];

        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            handleSearchSuggestions(searchTerm);
        }

        if (selectedAuthor) {
            filtered = filtered.filter((product) => product.author === selectedAuthor);
        }

        if (selectedLanguage) {
            filtered = filtered.filter((product) => product.language === selectedLanguage);
        }

        if (sortOption) {
            if (sortOption === 'title-asc') {
                filtered.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOption === 'title-desc') {
                filtered.sort((a, b) => b.title.localeCompare(a.title));
            } else if (sortOption === 'price-asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortOption === 'price-desc') {
                filtered.sort((a, b) => b.price - a.price);
            }
        }

        setFilteredProducts(filtered);
    };

    const handleSearchSuggestions = (term) => {
        const suggestionList = products
            .filter((product) => product.title.toLowerCase().includes(term.toLowerCase()))
            .map((product) => product.title)
            .slice(0, 2);
        setSuggestions(suggestionList);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-950 min-h-screen px-6 md:px-16 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                <h4 className="text-3xl md:text-5xl font-bold text-yellow-100 text-center">
                    Discover Your Next Book
                </h4>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border-none rounded-lg px-6 py-3 text-sm bg-zinc-800 text-white placeholder-gray-400 shadow-md focus:ring-2 focus:ring-yellow-400 outline-none"
                            placeholder={randomPlaceholder}
                            ref={inputRef}
                        />
                        {searchTerm && suggestions.length > 0 && (
                            <ul className="absolute bg-zinc-700 w-full mt-2 rounded-lg shadow-lg z-50 text-white">
                                {suggestions.map((suggestion, i) => (
                                    <li
                                        key={i}
                                        onClick={() => setSearchTerm(suggestion)}
                                        className="px-4 py-2 hover:bg-yellow-500 cursor-pointer"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="relative">
                        <FaSort className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-zinc-800 text-white px-10 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="">Sort By</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
                <select
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="bg-zinc-800 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400"
                >
                    <option value="">Filter by Author</option>
                    {authors.map((author, i) => (
                        <option key={i} value={author}>
                            {author}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-zinc-800 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400"
                >
                    <option value="">Filter by Language</option>
                    {languages.map((language, i) => (
                        <option key={i} value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <Loader />
            ) : filteredProducts.length === 0 ? (
                <p className="text-center text-yellow-100">No books found.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {filteredProducts.map((book, index) => (
                        <BookCard key={index} data={book} favourite={false} />
                    ))}
                </div>
            )}

            <button
                onClick={scrollToTop}
                className="fixed bottom-10 right-10 bg-yellow-500 p-3 rounded-full hover:bg-yellow-400 transition"
                aria-label="Scroll to top"
            >
                <FaArrowUp className="text-white" />
            </button>
        </div>
    );
};

export default AllBooks;

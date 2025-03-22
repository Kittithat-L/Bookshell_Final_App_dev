import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const BookList = ({ books, bookClick, userId: propUserId }) => {
    const [favorite, setFavorite] = useState([]);
    const [userId, setUserId] = useState(propUserId || localStorage.getItem('userId'));

    console.log("UserId received:", userId);

    useEffect(() => {
        if (!userId) {
            console.log("UserId is undefined or null, not fetching favorites.");
            return;
        }
        fetchFavorites();
    }, [userId]);

    const toggleFavorite = async (book) => {
        try {
            if (userId) {
                console.log("Toggling favorite for book:", book.id, "userId:", userId);
                const isBookFavorite = favorite.find((fav) => fav.bookId === book.id);
                if (isBookFavorite) {
                    console.log("Deleting favorite:", isBookFavorite._id);
                    await axios.delete(`http://localhost:5001/api/favorite/delete/${isBookFavorite._id}`);
                } else {
                    const alreadyFavorited = favorite.some((fav) => fav.bookId === book.id);
                    if (!alreadyFavorited) {
                        console.log("Adding favorite:", { userId, bookId: book.id, bookTitle: book.volumeInfo.title });
                        await axios.post('http://localhost:5001/api/favorite/post', {
                            userId: userId,
                            bookId: book.id,
                            bookTitle: book.volumeInfo.title,
                        });
                    } else {
                        console.log("Book already favorited, not adding again.");
                    }
                }
                fetchFavorites();
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const fetchFavorites = async () => {
        try {
            if (userId) {
                console.log("Fetching favorites for userId:", userId);
                const response = await axios.get(`http://localhost:5001/api/favorite/get/${userId}`);
                if (Array.isArray(response.data)) {
                    console.log("Fetched favorites:", response.data);
                    setFavorite(response.data);
                } else {
                    console.error("API returned non-array data:", response.data);
                    setFavorite([]);
                }
            } else {
                setFavorite([]);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
            setFavorite([]);
        }
    };

    const isFavorite = (book) => {
        if (Array.isArray(favorite)) {
            return favorite.some((fav) => fav.bookId === book.id);
        }
        return false;
    };

    return (
        <div className="mx-3 my-3 max-h-[80vh] overflow-auto items-center">
            {books.map((book, index) => {
                if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
                    let uniqueKey = book.id;

                    if (book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[0]) {
                        uniqueKey = book.volumeInfo.industryIdentifiers[0].identifier;
                    } else {
                        uniqueKey = index;
                    }

                    return (
                        <div key={uniqueKey}>
                            <div
                                className="mx-auto mb-5 bg-[#ffcbbf] rounded-3xl text-center w-[90%] flex flex-col items-center"
                                onClick={() => bookClick(book)}
                            >
                                <div className="border-0 w-[100%] flex items-end justify-end mr-3 mt-3">
                                    <div
                                        className={`w-[1.5rem] h-[1.5rem] flex items-center justify-center bg-white ${
                                            isFavorite(book) ? 'text-yellow-300' : 'hover:text-yellow-300'
                                        } rounded-2xl`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("Star clicked for book:", book.id);
                                            toggleFavorite(book);
                                        }}
                                    >
                                        <FaStar />
                                    </div>
                                </div>
                                <h2>{book.volumeInfo.title}</h2>
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                                {book.volumeInfo.authors && <p>Authors: {book.volumeInfo.authors.join(', ')}</p>}
                                <p>Published Date: {book.volumeInfo.publishedDate || 'N/A'}</p>
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default BookList;
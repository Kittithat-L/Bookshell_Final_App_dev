import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const BookDetail = ({ book, onBack, userId: propUserId }) => {
    const [favorite, setFavorite] = useState([]);
    const [userId, setUserId] = useState(propUserId || localStorage.getItem('userId'));

    console.log('UserId received:', userId);

    useEffect(() => {
        if (!userId) {
            console.log('UserId is undefined or null, not fetching favorites.');
            return;
        }
        fetchFavorites();
    }, [userId]);

    const toggleFavorite = async (book) => {
        try {
            if (userId) {
                console.log('Toggling favorite for book:', book.id, 'userId:', userId);
                const isBookFavorite = favorite.find((fav) => fav.bookId === book.id);
                if (isBookFavorite) {
                    console.log('Deleting favorite:', isBookFavorite._id);
                    await axios.delete(`http://localhost:5001/api/favorite/delete/${isBookFavorite._id}`);
                } else {
                    const alreadyFavorited = favorite.some((fav) => fav.bookId === book.id);
                    if (!alreadyFavorited) {
                        console.log('Adding favorite:', { userId, bookId: book.id, bookTitle: book.volumeInfo.title });
                        await axios.post('http://localhost:5001/api/favorite/post', {
                            userId: userId,
                            bookId: book.id,
                            bookTitle: book.volumeInfo.title,
                        });
                    } else {
                        console.log('Book already favorited, not adding again.');
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
                console.log('Fetching favorites for userId:', userId);
                const response = await axios.get(`http://localhost:5001/api/favorite/get/${userId}`);
                if (Array.isArray(response.data)) {
                    console.log('Fetched favorites:', response.data);
                    setFavorite(response.data);
                } else {
                    console.error('API returned non-array data:', response.data);
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
        <div className="mt-4 p-4 bg-[#ffcbbf] rounded-xl h-[90%] overflow-auto flex flex-col text-center items-center">
            <div className="w-[100%] items-start justify-start flex">
                <button onClick={onBack}>
                    <IoIosArrowBack className=" text-2xl bg-white rounded-xl w-20 hover:bg-gray-100" />
                </button>
            </div>
            <p className="text-xl py-5">{book.volumeInfo.title}</p>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className=" w-[10%]" />
            <div className=" flex flex-col w-[80%] text-start text-sm gap-1">
                {book.volumeInfo.authors && <p><span className="font-bold pr-5">Authors: </span>{book.volumeInfo.authors.join(', ')}</p>}
                <p><span className="font-bold pr-5">Published Date:  </span>{book.volumeInfo.publishedDate || 'N/A'}</p>
                <p><span className="font-bold pr-5">Description: </span> <span className=" space-x-5">{book.volumeInfo.description || 'N/A'}</span></p>
                <div className="mt-5 flex justify-between">
                    <p className="hover:text-blue-500 text-xl bg-white w-30 rounded-2xl flex items-center justify-center">
                        <Link to={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                            <FaInfoCircle className="mr-2" /> Preview
                        </Link>
                    </p>
                    <div
                        className={`w-30 h-10 flex items-center justify-center bg-white ${isFavorite(book) ? 'text-yellow-300' : 'hover:text-yellow-300'} rounded-2xl`}
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("Star clicked for book:", book.id);
                            toggleFavorite(book);
                        }}
                    >
                        <FaStar className="mr-2"/> <p>Favorite</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
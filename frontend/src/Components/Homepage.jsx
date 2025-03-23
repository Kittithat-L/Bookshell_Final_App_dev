import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import BookList from './Booklist';
import BookDetail from './BookDetail';
import { IoBookOutline } from "react-icons/io5";
import { ImSpinner6 } from "react-icons/im";

const HomePage = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };
    const API_KEY = import.meta.env.VITE_GOOGLE_API;
    const [randomBook, setRandomBook] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isLoading , setLoading] = useState(false);

    const fetchRandomBooks = async () => {
        const randomKeywords = ['fiction', 'science', 'history', 'technology', 'art', 'philosophy', 'biography'];
        const randomQuery = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
        const WEB_URL = `https://www.googleapis.com/books/v1/volumes?q=${randomQuery}&key=${API_KEY}&maxResults=10`;
        try {
            setLoading(true);
            const response = await axios.get(WEB_URL);
            setRandomBook(response.data.items || []);
        } catch (error) {
            console.error('Error fetching random books:', error);
            setRandomBook([]);
        }
        setLoading(false);
    };

    const bookClick = (book) => {
        setSelectedBook(book);
    };

    useEffect(() => {
        fetchRandomBooks();
    }, []);

    return (
        <div className='flex flex-row justify-between items-center w-screen'>
            <div className="containter flex overflow-hidden rounded-[10px] bg-white w-[20%] min-h-screen border-r-[6px] mr-1">
                <Sidebar handleLogout={handleLogout} />
            </div>

            <div className='flex flex-col rounded-2xl min-w-[50vh] w-[70%] ml-[10vh] min-h-screen mx-auto'>
                <div className='px-5 pt-4 bg-white rounded-2xl h-[20%] mb-[20px] shadow-2xl border-r-[6px]'>
                    <p className="text-2xl font-bold flex"><span><IoBookOutline className='text-3xl text-yellow-200'/></span><span className='pl-3'>Welcome to Bookshell!</span></p>
                    <p className='text-sm'>Explore a wide collection of books and resources with online services</p>
                    <p className='text-sm'> for easy access anytime, anywhere!</p>
                </div>
                <div className='pl-5 bg-white rounded-2xl min-h-[85vh] h-[85%] shadow-2xl border-r-[6px]'>
                {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <ImSpinner6 className="animate-spin text-4xl" />
                        </div>
                    ) : selectedBook ? (
                        <BookDetail book={selectedBook} onBack={() => setSelectedBook(null)} />
                    ) : randomBook.length > 0 ? (
                        <BookList books={randomBook} bookClick={bookClick} />
                    ) : (
                        <p>No books to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
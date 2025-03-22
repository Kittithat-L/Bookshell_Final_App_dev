import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Searchbar from './Searchbar';
import BookList from './Booklist';
import BookDetail from './BookDetail';


const HomePage = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };
    const API_KEY = import.meta.env.VITE_GOOGLE_API;
    const [searchResult, setSearchResult] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleSearch = (book) => {
        if (book) {
            const WEB_URL = `https://www.googleapis.com/books/v1/volumes?q=${book}&key=${API_KEY}&maxResults=40`;
            axios.get(WEB_URL)
                .then(data => {
                    setSearchResult(data.data.items);
                })
                .catch(err => {
                    console.log(err);
                    setSearchResult([]);
                });
        } else {
            setSearchResult([]);
        }
    };

    const bookClick = (book) => {
        setSelectedBook(book);
    };

  const [randomBook , setRandomBook] = useState([]);

  const fetchRandomBooks = async () => {
    const WEB_URL = `https://www.googleapis.com/books/v1/volumes?q=random&key=${API_KEY}&maxResults=5`;
    try {
        const response = await axios.get(WEB_URL);
        setRandomBook(response.data.items || []);
    } catch (error) {
      console.error('Error fetching random books:', error);
      setRandomBook([]);
    }
  };

  useEffect(()=>{
    if (!searchResult.length) {
      fetchRandomBooks();
    }
  }, [searchResult]);

    return (
        <div className='flex flex-row justify-between items-center w-screen'>
            <div className="containter flex overflow-hidden rounded-[10px] bg-white w-[20%] min-h-screen border-r-[6px] mr-1">
                <Sidebar handleLogout={handleLogout} />
            </div>

            <div className='containter flex overflow-hidden rounded-[10px] bg-white w-[70%] min-w-[50vh] min-h-screen mx-auto border-r-[6px]'>
                <main className="content flex-1 p-[20px] bg-cover flex-col items-center content-start w-100% h-[100vh]">
                    <Searchbar onSearch={handleSearch} />
                    {selectedBook ? (
                        <BookDetail book={selectedBook} onBack={() => setSelectedBook(null)} />
                    ) : (
                      searchResult.length > 0 ? (

                        <BookList books={searchResult} bookClick={bookClick} className='max-h-screen' />
                      ) : (
                        <BookList books={randomBook} bookClick={bookClick} className='max-h-screen' />
                      )
                    )}
                </main>
            </div>
        </div>
    );
};

export default HomePage;
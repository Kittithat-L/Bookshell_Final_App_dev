import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import BookList from './Booklist';
import axios from 'axios';
import { ImSpinner6 } from "react-icons/im";
import Searchbar from './Searchbar';

const MyFavoriteBooks = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const userId = localStorage.getItem('userId');
  const [isLoading , setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() =>{
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        if (userId){
          const response = await axios.get(`http://localhost:5001/api/favorite/get/${userId}`);
          if (Array.isArray(response.data)){
            const BookDetail = await Promise.all(
              response.data.map(async (favorite) => {
                const bookResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${favorite.bookId}`);
                return bookResponse.data;
              })
            );
            setFavoriteBooks(BookDetail);
            setFilteredBooks(BookDetail);
          }
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchFavorites();
  }, [userId]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = favoriteBooks.filter((book) =>
        book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(favoriteBooks);
    }
  }, [searchQuery, favoriteBooks]);

  const toggleFavorite = async (bookId) => {
    try {
      if (userId){
        const isBookFavorite = favoriteBooks.some((book) => book.id === bookId);
        if (isBookFavorite) {
          const favoriteDeleteId = favoriteBooks.find((book) => book.id === bookId);
          await axios.delete(`http://localhost:5001/api/favorite/delete/${favoriteDeleteId._id}`);
          
          setFavoriteBooks((prev)=>prev.filter((book) => book.id !== bookId));
        }

      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='flex flex-row justify-between items-center w-screen'>
            <div className="containter flex overflow-hidden rounded-[10px] bg-white w-[20%] min-h-screen border-r-[6px] mr-1">
                <Sidebar handleLogout={handleLogout} />
            </div>
            <div className='containter flex overflow-hidden rounded-[10px] bg-white w-[70%] min-w-[50vh] min-h-screen mx-auto border-r-[6px]'>
        <main className="content flex-1 p-[20px] bg-cover flex-col items-center content-start w-100% h-[100vh]">
          <h1 className="text-2xl font-bold mb-5">My Favorite Books</h1>
          <Searchbar onSearch={(query) => setSearchQuery(query)} />
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl"><ImSpinner6 className='animate-spin text-4xl'/></p>
            </div>
          ) : filteredBooks.length > 0 ? (
            <BookList books={filteredBooks} bookClick={() => {}} toggleFavorite={toggleFavorite} />
          ) : (
            <p>No favorite books found.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default MyFavoriteBooks;
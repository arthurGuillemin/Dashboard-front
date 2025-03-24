import { useEffect, useState } from "react";
import BookServices from "../../Services/BookServices";
import style from './ReadingList.module.css';
const ReadingList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BookServices.getAllBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement des livres...</p>;

  return (
    <div className={style.readinglist}>
      {books.map((book) => (
        <div key={book.id} className={style.bookcard}>
          <h2>{book.title}</h2>
          <p>Pages : {book.pages_nbr}</p>
          <div className={style.progresscontainer}>
            <div
              className={style.progressbar}
              style={{ width: `${(book.progress / book.pages_nbr) * 100}%` }}
            ></div>
          </div>
          <p>{book.progress} pages lues</p>
        </div>
      ))}
    </div>
  );
};

export default ReadingList;

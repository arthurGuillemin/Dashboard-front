import axios from 'axios';

const API_URL = 'https://16.171.177.148:3000/books';

class BookServices {
  getAllBooks() {
    return axios.get(API_URL);
  }

  getBookById(bookId) {
    return axios.get(`${API_URL}/${bookId}`);
  }

  createBook(bookData) {
    return axios.post(API_URL, bookData);
  }
}

export default new BookServices();
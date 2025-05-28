import axios from 'axios';

const API_URL = 'https://dashboard-back-9yvd.onrender.com//books';

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
import React from "react";
import Book from "./Book";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import "./ListBooks.scss";
import "./MyBooks.scss";

class ListBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }

  componentDidMount() {    
    axios.get('/books?status=FREE').then(response => {
      this.setState({books: response.data})
    })
  }

  borrowBook(bookId) {
    axios.post(`/borrows/${bookId}`, {}).then(()=> {
      this.props.history('/myBorrows')
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Livres disponibles</h1>
        <div className="list-container">
          {this.state.books.length === 0 ? "Pas de livre disponible" : null}
          {this.state.books.map((book, key) => (
            <div key={key} className="list-book-container">
              <Book title={book.title} category={book.category.label} lender={`${book.user.firstname} ${book.user.lastname}`}></Book>
              <div className="text-center">
                <button className="btn btn-success btn-sm" onClick={() => this.borrowBook(book.id)}>Emprunter</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default function Wrapper(props) {
  const history = useNavigate();
  return <ListBooks {...props} history={history} />;
}

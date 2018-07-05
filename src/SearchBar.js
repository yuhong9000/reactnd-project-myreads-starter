import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'

class SearchBar extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState(()=>({
      query: query.trim()
    }));
    BooksAPI.search(query.trim())
      .then((books) => {
        console.log(books);
        // if the book is already on shelf, replace it with shelf's books
        // which contains shelf informaiton
        books.forEach((book,i)=>{
          const index = this.props.books.findIndex(b => b.id ===book.id);
          if(index > 0){
            books[i] = this.props.books[index];
            console.log(books[i]);
          }
        });
        this.setState({
          books
        });
      });
  }

  render(){
    const { query,books } = this.state;
    const { updateShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event)=>this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books && books.length>0 && books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateShelf={updateShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBar

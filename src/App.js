import React from 'react'
import BookShelf from './BookShelf'
import SearchBar from './SearchBar'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    bookShelfs: {
      currentlyReading: {
        title: 'Currently Reading',
      },
      wantToRead: {
        title: 'Want to Read',
      },
      read: {
        title: 'Read',
      }
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
          this.setState({
            books
          });
          console.log(this.state.books);
      });

  }

  updateShelf = (book,shelf)=>{
    BooksAPI.update(book,shelf)
      .then((data)=>{
        this.setState((prevState) => {
          book.shelf = shelf;
          let books = prevState.books;
          if(books.findIndex(b => b.id===book.id) < 0)
            books.push(book);
          return {books};
        });
      });
  }

  addBook = () => {

  }

  render() {
    const { books,bookShelfs }= this.state;

    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBar
            books={books}
            updateShelf={this.updateShelf}
          />
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {Object.keys(bookShelfs).map((key)=>(
                  <BookShelf key={bookShelfs[key].title}
                    title={bookShelfs[key].title}
                    books={books.filter(book => book.shelf === key)}
                    updateShelf={this.updateShelf}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp

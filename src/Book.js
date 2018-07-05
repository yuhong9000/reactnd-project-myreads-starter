import React from 'react'
import PropTypes from 'prop-types'
import Options from './Options'
import './App.css'


class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  // state={
  //   shelf: ''
  // }
  //
  // componentDidMount() {
  //   const { book } = this.props;
  //   this.setState({
  //     shelf: book.shelf
  //   })
  // }

  handleShelfChange = (event)=>{
    const { book,updateShelf } = this.props;
    updateShelf(book,event.target.value);
  }

  render() {
    const { book } = this.props;
    const img_url = book.imageLinks? book.imageLinks.thumbnail: '';

    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${img_url})`}}></div>
          <Options
            shelf={book.shelf? book.shelf:'none'}
            handleShelfChange={this.handleShelfChange}
          />
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.map((author) => (
          <div key={`${book.id}${author}`} className="book-authors">{author}</div>
        ))}
      </div>
    );
  }
}

export default Book;

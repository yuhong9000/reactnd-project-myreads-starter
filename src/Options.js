import React from 'react'
import PropTypes from 'prop-types'
import './App.css'

class Options extends React.Component {

  static propTypes = {
    shelf: PropTypes.string.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  render(){
    const { shelf, handleShelfChange } = this.props;

    return(
      <div className="book-shelf-changer">
        <select onChange={handleShelfChange} value={shelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading" >Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default Options

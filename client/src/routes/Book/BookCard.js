import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BookCard = (prop) => {
  return (
    <Container fluid={true} className="bookCard">
      <Row noGutters={true} className="justify-content-md-center"> 
        <div className="cardImage">
          <img src={'http://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg'} alt="img" />
        </div>
      </Row>
      <Row noGutters={true} className="justify-content-md-center">
        <div className="cardtext">
          <p className="bookTitle">Title of the book</p>
          <p className="bookAuthor">Author is Aquid Shahwar</p>
        </div>
      </Row>
    </Container>
  )
};

export default BookCard;
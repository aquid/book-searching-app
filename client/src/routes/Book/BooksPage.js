//@flow
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SearchContext} from '../../context/SearchContext';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Back from '../../assets/images/Back.svg';
import Search from '../../assets/images/Search.svg';
import Cancel from '../../assets/images/Cancel.svg';
import BookCard from './BookCard';

const BooksPage = () => {
  let history = useHistory();
  let [focus, setFocus] = useState(false);
  let [filled, setFilled] = useState(false);
  let [searhText, setSearhText] = useState('');
  const { searchTitle } = useContext(SearchContext);

  const _onSearchChange = (text) => {
    if(text) {
      setFilled(true);
    }
    else {
      setFilled(false);
    }
    setSearhText(text);
  };

  const _crearText = () => {
    setFilled(false);
    setSearhText('');
  };

  const _redirectBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Container fluid={true} className='booksSearchContainer'>
        <Container>
        <Row className="justify-content-md-center">
          <Col md={9} sm={12} xs={12}>
            <Row noGutters={true} className="backButton" onClick={_redirectBack}>
              <img src={Back} alt="Back" />
              <h2>{searchTitle}</h2>
            </Row>
            <Row noGutters={true} className="inputSection">
                <InputGroup className={['inputGroup', focus? 'active': '']}>
                  <InputGroup.Prepend className="searchIcon">
                    <InputGroup.Text id="basic-addon1">
                      <img src={Search} alt="search"/>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    value={searhText}
                    onChange={(event) => _onSearchChange(event.target.value)}
                    className="inputTextArea"
                    type="text"
                    placeholder="search"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Append className="closeIcon" onClick={() => _crearText()}>
                    <InputGroup.Text>
                      <img className={`cancleIcon ${filled ? 'active' : ''}`} src={Cancel} alt="cloase"/>
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
            </Row>
          </Col>
        </Row>
        </Container>
      </Container>
      <Container>
        <Row noGutters={true} className="justify-content-md-center">
          <Col lg={9} md={12} sm={12} xs={12}>
            <Row noGutters={true}>
              <Col xs={4} sm={3} md={2}>
                <BookCard/>
              </Col>
              <Col xs={4} sm={3} md={2}>
                <BookCard />
              </Col>
              <Col xs={4} sm={3} md={2}>
                <BookCard />
              </Col>
              <Col xs={4} sm={3} md={2}>
                <BookCard />
              </Col>
              <Col xs={4} sm={3} md={2}>
                <BookCard />
              </Col>
              <Col xs={4} sm={3} md={2}>
                <BookCard />
              </Col>
              <Col xs={4} sm={2}>
                <BookCard />
              </Col>
              <Col xs={4} sm={2}>
                <BookCard />
              </Col>
              <Col xs={4} sm={2}>
                <BookCard />
              </Col>
              <Col xs={4} sm={2}>
                <BookCard />
              </Col>
              <Col xs={4} sm={2}>
                <BookCard />
              </Col>

            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
};
export default BooksPage;
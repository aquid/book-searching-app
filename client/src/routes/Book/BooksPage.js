//@flow
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SearchContext} from '../../context/SearchContext';
import InputGroup from 'react-bootstrap/InputGroup';
import Back from '../../assets/images/Back.svg';
import Search from '../../assets/images/Search.svg';
import Cancel from '../../assets/images/Cancel.svg';
import BookCard from './BookCard';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';
import Spinner from 'react-bootstrap/Spinner';
import debounce from 'lodash.debounce';
import NoContent from '../../assets/images/no-result.svg';

const BooksPage = () => {
  let history = useHistory();
  let [focus, setFocus] = useState(false);
  let [filled, setFilled] = useState(false);
  let [books, setBooks] = useState([]);
  let [isLoading, setLoading] = useState(false);
  let [page, setPage] = useState({ page: 1, previousPage: null, nextPage: null});
  let [searhText, setSearhText] = useState('');
  const { searchTitle, searchQuery } = useContext(SearchContext);

  window.onscroll = debounce(() => {
    if (isLoading || !page.nextPage) return;
    // Checks that the page has scrolled to the bottom
    if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      fetchData(page.nextPage);
    }
  }, 300);

  const _onSearchChange = (text) => {
    console.log(text);
    if(text) {
      setFilled(true);
    }
    else {
      setFilled(false);
    }
    setPage({ page: 1, previousPage: null, nextPage: null });
    setBooks([]);
    setSearhText(text);
  };

  const fetchData = async (page) => {
    setLoading(true);
    let params = { params: { topic: searchQuery, page: page }, headers: { 
      'Content-Type': 'application/json'
    }};

    if (searhText) {
      params.params.search = searhText;
    } else {
      delete params.params.search;
    }
    const result = await axios(`${process.env.REACT_APP_API_URL}/books`, params);
    console.log('result', result);
    setLoading(false);
    setBooks([...books, ...result.data.rows]);
    setPage({ page: result.data.page, previousPage: result.data.previousPage, nextPage: result.data.nextPage })
  };

  useEffect(() => {
    fetchData(page.page);
  }, [searhText]);

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
                  <DebounceInput
                    minLength={2}
                    debounceTimeout={1000}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    value={searhText}
                    onChange={(event) => _onSearchChange(event.target.value)}
                    className="inputTextArea form-control"
                    type="text"
                    placeholder="search"
                    aria-label="search"
                    aria-describedby="basic-addon1"/>
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
              {
                books.map(book => {
                  return (
                    <Col xs={4} sm={3} md={2} key={book.id}>
                      <BookCard book={book}/>
                    </Col>
                  )
                })
              }
            </Row>
          </Col>
        </Row>
      </Container>
      {
        isLoading ? (
        <Container>
          <Row noGutters={true} className="justify-content-md-center pageSpinner">
            <Spinner animation="border" variant="primary" />
          </Row>
        </Container>) : null
      }
      {
        !books.length && !isLoading ? (
          <Container>
            <Row noGutters={true} className="justify-content-md-center noContentSection">
              <Col xs={12} className="noContentCol">
                <img src={NoContent} alt="no-result-found" />
              </Col>
              <Col xs={12} className="noContentCol">
                <h3>No Results Found</h3>
              </Col>
            </Row>
          </Container>) : null
      }
      
    </div>
  )
};
export default BooksPage;
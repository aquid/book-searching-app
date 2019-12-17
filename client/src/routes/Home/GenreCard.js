// @flow
import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Next from '../../assets/images/Next.svg';
import Adventure from '../../assets/images/Adventure.svg';
import Drama from '../../assets/images/Drama.svg';
import Fiction from '../../assets/images/Fiction.svg';
import History from '../../assets/images/History.svg';
import Humour from '../../assets/images/Humour.svg';
import Philosophy from '../../assets/images/Philosophy.svg';
import Politics from '../../assets/images/Politics.svg';
import { SearchContext } from '../../context/SearchContext';

const GenreCard = (props) => {
  const getGenreImage = (genreValue) => {
    switch (genreValue) {
      case 'fiction':
        return Fiction;
      case 'philosophy':
        return Philosophy;
      case 'drama':
        return Drama;
      case 'history':
        return History;
      case 'humuor':
        return Humour;
      case 'adventure':
        return Adventure;
      default:
        return Politics;
    }
  };

  const { setSearchQuery, setSearchTitle } = useContext(SearchContext);
  let history = useHistory();

  const _redirectToSearch = (searchTerm, title) => (event) => {
    setSearchQuery(searchTerm);
    setSearchTitle(title);
    history.push("/books");
  };

  return(
    <Container className='genreCardContainer' tabIndex="1" onClick={_redirectToSearch(props.value, props.title)}>
      <Row noGutters={true}>
        <Col xs={2}>
          <img className='genreImage' src={getGenreImage(props.value)} alt={props.title} />
        </Col>
        <Col xs={9}>
          {props.title}
        </Col>
        <Col xs={1}>
          <img src={Next} alt='Next'/>
        </Col>
      </Row>
    </Container>
  )
};

export default GenreCard;

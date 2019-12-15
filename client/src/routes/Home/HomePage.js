//@flow
import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import GenreCard from './GenreCard';

const Home = () => {
  const [genre] = useState([
    { title: 'Fiction', value: 'fiction'},
    { title: 'Philosophy', value: 'philosophy'},
    { title: 'Drama', value: 'drama' },
    { title: 'History', value: 'history' },
    { title: 'Humuor', value: 'humuor' },
    { title: 'Adventure', value: 'adventure' },
    { title: 'Politics', value: 'politics' }
  ]);

  return (
    <div className='homeBaseContainer'>
      <Jumbotron fluid className='homeJumbotron'>
        <Container>
          <Row className="justify-content-md-center">
            <Col sm={8} xs={12}>
              <h1>Gutenberg Project</h1>
              <p>
                A social cataloging website that allows you to freely search its database of books, annotations,
                and reviews.
              </p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm={8} xs={12}>
            <Row>
              {
                genre.map(gn => {
                  return(
                    <Col xs={12} sm={6} key={gn.value}>
                      <GenreCard title={gn.title} value={gn.value}/>
                    </Col>
                  )
                })
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Home;
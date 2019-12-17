import React, {useState}from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import frameImage from '../../assets/images/frame-landscape.svg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const BookCard = (prop) => { 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const _getMimeType = (formats) => {
    let html = formats.filter(format => format.mime_type.match(/text\/html/i));
    if (html.length) return html[0];
    let txt = formats.filter(format => format.mime_type.match(/^.+\.txt$/i));
    if (txt.length) return txt[0];
    let pdf = formats.filter(format => format.mime_type.match(/^.+\.pdf$/i));
    if (pdf.length) return txt[0];
    return null;
  };

  const _handleOnClick = (event) => {
    let url = _getMimeType(prop.book.formats);
    console.log(url);
    if(!url){
      setShow(true);
    } else {
      window.open(url.url, '_blank');
    }
  };

  const _getImage = (formats) => {
    let image = formats.filter(format => format.mime_type.match(/image\/*/i));
    if (image.length){
      return image[0].url;
    }
    return frameImage;
  };

  return (
    <div>
      <Container fluid={true} className="bookCard" onClick={_handleOnClick}>
        <Row noGutters={true} className="justify-content-md-center">
          <div className="cardImage">
            <img src={_getImage(prop.book.formats)} alt="img" />
          </div>
        </Row>
        <Row noGutters={true} className="justify-content-md-center">
          <div className="cardtext">
            <p className="bookTitle">{`${prop.book.title.substring(0, 20)}` || 'Not Provided'}</p>
            <p className="bookAuthor">{(prop.book.authors[0] && prop.book.authors[0].name) || 'Not Provided'}</p>
          </div>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>No viewable version available </Modal.Title>
        </Modal.Header>
        <Modal.Body>Try opening some other book</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div> 
  )
};

export default BookCard;
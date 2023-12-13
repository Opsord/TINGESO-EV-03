import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// Images imports
import ScheduleLogo from '../images/schedule.svg';
// CSS imports
import '../css/Header.css';

function Header() {
  return (
    <>
      <Navbar className="Header01">
        <Container className="Header01Content">
          <Navbar.Brand href="/">
            <img
              alt=""
              src={ScheduleLogo}
              className="Logo01"
            />{'  '}
            Asignamax 3000
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
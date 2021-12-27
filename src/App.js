import logo from './logo.svg';
import './App.css';
// import Navbar from 'react-bootstrap/Navbar';
// import { Container, Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Wrestlers from './pages/wrestlers';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/wrestlers" element={<Wrestlers />}/>
      </Routes>
    </Router>
    // <Navbar bg="light" expand="lg">
    //       <Container>
    //         <Navbar.Brand>Dohyo Delicioso</Navbar.Brand>
    //         <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    //         <Navbar.Collapse id="basic-navbar-nav">
    //           <Nav className="me-auto">
    //             <Nav.Link href="#home">Home</Nav.Link>
    //             <Nav.Link href="#wrestlers">Wrestlers</Nav.Link>
    //           </Nav>
    //         </Navbar.Collapse>
    //       </Container>
    //     </Navbar>
  );
}

export default App;

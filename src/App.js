import logo from './logo.svg';
import './App.css';
// import Navbar from 'react-bootstrap/Navbar';
// import { Container, Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Wrestlers from './pages/wrestlers';
import Tournaments from './pages/tournaments';
import Banzuke from './pages/banzuke';
import Fantasy from './pages/fantasy';
import About from './pages/about';

function App() {
  return (
    <Router class="h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/wrestlers" element={<Wrestlers />}/>
        <Route path="/tournaments" element={<Tournaments />}/>
        <Route path="/banzuke" element={<Banzuke />}/>
        <Route path="/fantasy" element={<Fantasy />}/>
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

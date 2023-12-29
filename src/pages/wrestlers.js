import React from 'react';
import ReactCardFlip from 'react-card-flip';

class Wrestlers extends React.Component {

    constructor() {
        super();
        this.state = {
            isFlipped: false,
            wrestlers: []
        };
        this.handleHover = this.handleHover.bind(this);
    }

    handleHover(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    breakIntoArrayOfArrays = (array, chunk = 3) => {
        var result = [];
        var i = 0;
        for (i = 0; i < array.length; i+=chunk) {
            result.push(array.slice(i, i+chunk ))
        }
        console.log(result);
        return result;
    }

    componentDidMount() {
      const headers = { 'Content-Type': 'application/json' };
      const api_url = process.env.REACT_APP_API_URL;
      const api_protocol = process.env.REACT_APP_API_PROTOCOL;
      const api_port = process.env.REACT_APP_API_PORT;
      const wrestler_api = api_protocol + "://" + api_url + ":" + api_port + "/api/wrestlers";
      fetch(wrestler_api, { headers }).then(res => res.json()).then((res) => {
        
        this.setState({
          wrestlers: res
        })
      });
    }

    render() {

        console.log(this.state.wrestlers.length);
        const splitArray = this.breakIntoArrayOfArrays(this.state.wrestlers,  this.state.wrestlers.length/3);
        return (
          <div className="page-container">
            
            {this.state.wrestlers.map((wrestler, i) => (
              <div>
                <BlogCard wrestler={wrestler}/>
              </div>
            ))}

            <footer>
              
            </footer>
          </div>
        )
      }
    }
    
    class BlogCard extends React.Component {
      constructor(props) {
          
        super(props);
        this.state = { flipped: false };
        this.flip = this.flip.bind(this);
      }
    
      flip = () => {
        this.setState({ flipped: !this.state.flipped });
      }
      render() {
        return (
    
    
          <div onMouseEnter={this.flip} onMouseLeave={this.flip} className={"card-container" + (this.state.flipped ? " flipped" : "")}>
    
            <Front wrestler_id={this.props.wrestler.id} />
            <Back wrestler={this.props.wrestler}/>
          </div>
    
        )
      }
    }
    
    class Front extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <div className="front">
            <ImageArea wrestler_id={this.props.wrestler_id} />
            <MainArea />
          </div>
        )
      }
    }
    
    class Back extends React.Component {
        
      render() {
        
        return (
          <div className="back">
            <p>Ring name: {this.props.wrestler.ringname}</p>
            <p>Given Name: {this.props.wrestler.givenname}</p>
            <p>Family Name: {this.props.wrestler.familyname}</p>
            <p>Date of Birth: {this.props.wrestler.birthdate}</p>
            <p>Place of Birth: {this.props.wrestler.birthplace}</p>
            <p>Height: {this.props.wrestler.height}cm</p>
            <p>Weight: {this.props.wrestler.weight}kg</p>
          </div>
        )
      }
    }
    
    class ImageArea extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        var img_src = api_protocol + "://" + api_url + ":" + api_port + "/api/wrestlers/<ID>/avatar".replace("<ID>", this.props.wrestler_id);
        //var img_src = "http://localhost:5000/api/wrestlers/<ID>/avatar".replace("<ID>", this.props.wrestler_id);
        return (
          <div className="image-container">
            <img className="card-image" src={img_src}></img>
            
          </div>
        )
      }
    
    }
    
    class MainArea extends React.Component {
      render() {
        return (
          <div className="main-area">
          </div>
        )
      }
    }

export default Wrestlers;
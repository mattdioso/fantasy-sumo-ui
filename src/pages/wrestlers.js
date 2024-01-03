import React from 'react';
import ReactCardFlip from 'react-card-flip';

class Wrestlers extends React.Component {

    constructor() {
        super();
        this.state = {
            isFlipped: false,
            wrestlers: [{"ringname": "Terunofuji"}]
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

        
        const splitArray = this.breakIntoArrayOfArrays(this.state.wrestlers,  this.state.wrestlers.length/3);
        return (
          <div class="relative w-full h-full pl-12 pt-4 grid justify-center gap-2 grid-cols-3 overflow-y-scroll">
              
              
              
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
    
    
          // <div onMouseEnter={this.flip} onMouseLeave={this.flip} className={"card-container" + (this.state.flipped ? " flipped" : "")}>
          <div class="group perspective h-[490px] w-[290px]">
            <div class="h-[490px] w-[290px] preserve-3d rounded-xl border border-black shadow-xl transition-all duration-700 group-hover:[transform:rotateY(180deg)]">
              <div class="absolute inset-0 h-[490px] w-[290px]">
                <ImageArea wrestler={this.props.wrestler} />
                <MainArea />
              </div>
              <div class="absolute bg-white backface-hidden [transform:rotateY(180deg)] inset-0 w-[290px] h-[490px]">
                <p>Ring name: {this.props.wrestler.ringname}</p>
                <p>Given Name: {this.props.wrestler.givenname}</p>
                <p>Family Name: {this.props.wrestler.familyname}</p>
                <p>Date of Birth: {this.props.wrestler.birthdate}</p>
                <p>Place of Birth: {this.props.wrestler.birthplace}</p>
                <p>Height: {this.props.wrestler.height}cm</p>
                <p>Weight: {this.props.wrestler.weight}kg</p>
              </div>
              {/* <Front isFlipped={this.state.flipped} wrestler={this.props.wrestler} /> */}
              {/* <Back isFlipped={this.state.flipped} wrestler={this.props.wrestler}/> */}
            </div>
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
          //<div className="front">
          <div class={"box-border h-[490px] w-[290px] block bg-white shadow-sm p-2 absolute rounded-md transition duration-500 [transform-style: preserve-3d] [backface-visibility: hidden] [transition: -webkit-transform ease 500ms] [transition: transform ease 500ms] [transform: rotateY(0deg)] z-10" + (this.props.isFlipped ? " [transform:rotateY(180deg)]": "")}>
            <ImageArea wrestler={this.props.wrestler} />
            <MainArea />
          </div>
        )
      }
    }
    
    class Back extends React.Component {
      constructor(props) {
        super(props);
      }
        
      render() {
        
        return (
          //<div className="back">
          <div class={"box-border h-[490px] w-[290px] block bg-white shadow-sm p-4 text-sm absolute rounded-md transition duration-500 [transform-style: preserve-3d] [backface-visibility: hidden] [transition: -webkit-transform ease 500ms] [transition: transform ease 500ms] [transform: rotateY(-180deg)]" + (this.props.isFlipped ? " [transform:rotateY(0deg)]": "")}>
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
        var img_src = api_protocol + "://" + api_url + ":" + api_port + "/api/wrestlers/<ID>/avatar".replace("<ID>", this.props.wrestler.id);
        //var img_src = "http://localhost:5000/api/wrestlers/<ID>/avatar".replace("<ID>", this.props.wrestler_id);
        if (api_url !== "localhost") {
          img_src = this.props.wrestler.avatar_store;
        }
        return (
          <div className="relative">
            <img className="rounded-sm" src={img_src}></img>
            
          </div>
        )
      }
    
    }
    
    class MainArea extends React.Component {
      render() {
        return (
          <div className="h-full">
          </div>
        )
      }
    }

export default Wrestlers;
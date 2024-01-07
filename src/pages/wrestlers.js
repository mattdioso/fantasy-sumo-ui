import React from 'react';
import ReactCardFlip from 'react-card-flip';

class Wrestlers extends React.Component {

    constructor() {
        super();
        this.state = {
            isFlipped: false,
            wrestlers: [{"ringname": "Terunofuji"}],
            rankings: []
        };
        this.handleHover = this.handleHover.bind(this);
        this.sortWrestlers = this.sortWrestlers.bind(this);
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

    sortWrestlers(a, b) {
      
      let ranks =['Y', 'O', 'Hoshoryu', 'S', 'S', 'K', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M17', 'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', 'J11', 'J12', 'J13', 'J14', 'Ms1', 'Ms2', 'Ms3', 'Ms4', 'Ms5', 'Ms6', 'Ms7', 'Ms8', 'Ms9', 'Ms10', 'Ms11', 'Ms12', 'Ms13', 'Ms14', 'Ms15', 'TD', 'Ms16', 'Ms17', 'Ms18', 'Ms19', 'Ms20', 'Ms21', 'Ms22', 'Ms23', 'Ms24', 'Ms25', 'Ms26', 'Ms27', 'Ms28', 'Ms29', 'Ms30', 'Ms31', 'Ms32', 'Ms33', 'Ms34', 'Ms35', 'Ms36', 'Ms37', 'Ms38', 'Ms39', 'Ms40', 'Ms41', 'Ms42', 'Ms43', 'Ms44', 'Ms45', 'Ms46', 'Ms47', 'Ms48', 'Ms49', 'Ms50', 'Ms51', 'Ms52', 'Ms53', 'Ms54', 'Ms55', 'Ms56', 'Ms57', 'Ms58', 'Ms59', 'Ms60', 'Sd1', 'Sd2', 'Sd3', 'Sd4', 'Sd5', 'Sd6', 'Sd7', 'Sd8', 'Sd9', 'Sd10', 'Sd11', 'Sd12', 'Sd13', 'Sd14', 'Sd15', 'Sd16', 'Sd17', 'Sd18', 'Sd19', 'Sd20', 'Sd21', 'Sd22', 'Sd23', 'Sd24', 'Sd25', 'Sd26', 'Sd27', 'Sd28', 'Sd29', 'Sd30', 'Sd31', 'Sd32', 'Sd33', 'Sd34', 'Sd35', 'Sd36', 'Sd37', 'Sd38', 'Sd39', 'Sd40', 'Sd41', 'Sd42', 'Sd43', 'Sd44', 'Sd45', 'Sd46', 'Sd47', 'Sd48', 'Sd49', 'Sd50', 'Sd51', 'Sd52', 'Sd53', 'Sd54', 'Sd55', 'Sd56', 'Sd57', 'Sd58', 'Sd59', 'Sd60', 'Sd61', 'Sd62', 'Sd63', 'Sd64', 'Sd65', 'Sd66', 'Sd67', 'Sd68', 'Sd69', 'Sd70', 'Sd71', 'Sd72', 'Sd73', 'Sd74', 'Sd75', 'Sd76', 'Sd77', 'Sd78', 'Sd79', 'Sd80', 'Sd81', 'Sd82', 'Sd83', 'Sd84', 'Sd85', 'Sd86', 'Sd87', 'Sd88', 'Sd89', 'Sd90', 'Jd1', 'Jd2', 'Jd3', 'Jd4', 'Jd5', 'Jd6', 'Jd7', 'Jd8', 'Jd9', 'Jd10', 'Jd11', 'Jd12', 'Jd13', 'Jd14', 'Jd15', 'Jd16', 'Jd17', 'Jd18', 'Jd19', 'Jd20', 'Jd21', 'Jd22', 'Jd23', 'Jd24', 'Jd25', 'Jd26', 'Jd27', 'Jd28', 'Jd29', 'Jd30', 'Jd31', 'Jd32', 'Jd33', 'Jd34', 'Jd35', 'Jd36', 'Jd37', 'Jd38', 'Jd39', 'Jd40', 'Jd41', 'Jd42', 'Jd43', 'Jd44', 'Jd45', 'Jd46', 'Jd47', 'Jd48', 'Jd49', 'Jd50', 'Jd51', 'Jd52', 'Jd53', 'Jd54', 'Jd55', 'Jd56', 'Jd57', 'Jd58', 'Jd59', 'Jd60', 'Jd61', 'Jd62', 'Jd63', 'Jd64', 'Jd65', 'Jd66', 'Jd67', 'Jd68', 'Jd69', 'Jd70', 'Jd71', 'Jd72', 'Jd73', 'Jd74', 'Jd75', 'Jd76', 'Jd77', 'Jd78', 'Jd79', 'Jd80', 'Jd81', 'Jd82', 'Jd83', 'Jd84', 'Jd85', 'Jd86', 'Jd87', 'Jd88', 'Jd89', 'Jd90', 'Jd91', 'Jd92', 'Jd93', 'Jd94', 'Jd95', 'Jd96', 'Jd97', 'Jd98', 'Jd99', 'Jd100', 'Jk1', 'Jk2', 'Jk3', 'Jk4', 'Jk5', 'Jk6', 'Jk7', 'Jk8', 'Jk9', 'Jk10', 'Jk11', 'Jk12', 'Jk13', 'Jk14', 'Jk15', 'Jk16', 'Jk17', 'Jk18'];

      let a_index = 100000;
      let b_index = 100000;
      try {
        
        let a_rank = this.state.rankings.filter((ranking) => ranking.idWrestler === a.id)[0].rank;
        
        a_index = ranks.indexOf(a_rank);

        let b_rank = this.state.rankings.filter((ranking) => ranking.idWrestler === b.id)[0].rank
        b_index = ranks.indexOf(b_rank);
        
        //console.log(a_rank + ": " + a_index);

      } catch (e) {
        // console.log(a);
        // console.log(b);
        a_index = 100000;
        b_index = 100000;
      }
      //console.log(a_index);
      console.log((a_index > b_index));
      return (a_index > b_index);
    }

    componentDidMount() {
      const headers = { 'Content-Type': 'application/json' };
      const api_url = process.env.REACT_APP_API_URL;
      const api_protocol = process.env.REACT_APP_API_PROTOCOL;
      const api_port = process.env.REACT_APP_API_PORT;
      const wrestler_api = api_protocol + "://" + api_url + ":" + api_port + "/api/wrestlers";
      const rankings_api = api_protocol + "://" + api_url + ":" + api_port + "/api/rankings";
      fetch(rankings_api, {headers}).then(res => res.json()).then((res) => {
        this.setState({
          rankings:res
        })
      })
      fetch(wrestler_api, { headers }).then(res => res.json()).then((res) => {
        
        this.setState({
          wrestlers: res
        })
      });
      

    }

    render() {
        
        //const splitArray = this.breakIntoArrayOfArrays(this.state.wrestlers,  this.state.wrestlers.length/3);
        //console.log(this.state.wrestlers)
        //console.log(this.state.rankings);
        let wrestlers = [].concat(this.state.wrestlers).sort((a, b) => {
      
          let ranks =['Y', 'O', 'S', 'K', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M17', 'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', 'J11', 'J12', 'J13', 'J14', 'Ms1', 'Ms2', 'Ms3', 'Ms4', 'Ms5', 'Ms6', 'Ms7', 'Ms8', 'Ms9', 'Ms10', 'Ms11', 'Ms12', 'Ms13', 'Ms14', 'Ms15', 'TD', 'Ms16', 'Ms17', 'Ms18', 'Ms19', 'Ms20', 'Ms21', 'Ms22', 'Ms23', 'Ms24', 'Ms25', 'Ms26', 'Ms27', 'Ms28', 'Ms29', 'Ms30', 'Ms31', 'Ms32', 'Ms33', 'Ms34', 'Ms35', 'Ms36', 'Ms37', 'Ms38', 'Ms39', 'Ms40', 'Ms41', 'Ms42', 'Ms43', 'Ms44', 'Ms45', 'Ms46', 'Ms47', 'Ms48', 'Ms49', 'Ms50', 'Ms51', 'Ms52', 'Ms53', 'Ms54', 'Ms55', 'Ms56', 'Ms57', 'Ms58', 'Ms59', 'Ms60', 'Sd1', 'Sd2', 'Sd3', 'Sd4', 'Sd5', 'Sd6', 'Sd7', 'Sd8', 'Sd9', 'Sd10', 'Sd11', 'Sd12', 'Sd13', 'Sd14', 'Sd15', 'Sd16', 'Sd17', 'Sd18', 'Sd19', 'Sd20', 'Sd21', 'Sd22', 'Sd23', 'Sd24', 'Sd25', 'Sd26', 'Sd27', 'Sd28', 'Sd29', 'Sd30', 'Sd31', 'Sd32', 'Sd33', 'Sd34', 'Sd35', 'Sd36', 'Sd37', 'Sd38', 'Sd39', 'Sd40', 'Sd41', 'Sd42', 'Sd43', 'Sd44', 'Sd45', 'Sd46', 'Sd47', 'Sd48', 'Sd49', 'Sd50', 'Sd51', 'Sd52', 'Sd53', 'Sd54', 'Sd55', 'Sd56', 'Sd57', 'Sd58', 'Sd59', 'Sd60', 'Sd61', 'Sd62', 'Sd63', 'Sd64', 'Sd65', 'Sd66', 'Sd67', 'Sd68', 'Sd69', 'Sd70', 'Sd71', 'Sd72', 'Sd73', 'Sd74', 'Sd75', 'Sd76', 'Sd77', 'Sd78', 'Sd79', 'Sd80', 'Sd81', 'Sd82', 'Sd83', 'Sd84', 'Sd85', 'Sd86', 'Sd87', 'Sd88', 'Sd89', 'Sd90', 'Jd1', 'Jd2', 'Jd3', 'Jd4', 'Jd5', 'Jd6', 'Jd7', 'Jd8', 'Jd9', 'Jd10', 'Jd11', 'Jd12', 'Jd13', 'Jd14', 'Jd15', 'Jd16', 'Jd17', 'Jd18', 'Jd19', 'Jd20', 'Jd21', 'Jd22', 'Jd23', 'Jd24', 'Jd25', 'Jd26', 'Jd27', 'Jd28', 'Jd29', 'Jd30', 'Jd31', 'Jd32', 'Jd33', 'Jd34', 'Jd35', 'Jd36', 'Jd37', 'Jd38', 'Jd39', 'Jd40', 'Jd41', 'Jd42', 'Jd43', 'Jd44', 'Jd45', 'Jd46', 'Jd47', 'Jd48', 'Jd49', 'Jd50', 'Jd51', 'Jd52', 'Jd53', 'Jd54', 'Jd55', 'Jd56', 'Jd57', 'Jd58', 'Jd59', 'Jd60', 'Jd61', 'Jd62', 'Jd63', 'Jd64', 'Jd65', 'Jd66', 'Jd67', 'Jd68', 'Jd69', 'Jd70', 'Jd71', 'Jd72', 'Jd73', 'Jd74', 'Jd75', 'Jd76', 'Jd77', 'Jd78', 'Jd79', 'Jd80', 'Jd81', 'Jd82', 'Jd83', 'Jd84', 'Jd85', 'Jd86', 'Jd87', 'Jd88', 'Jd89', 'Jd90', 'Jd91', 'Jd92', 'Jd93', 'Jd94', 'Jd95', 'Jd96', 'Jd97', 'Jd98', 'Jd99', 'Jd100', 'Jk1', 'Jk2', 'Jk3', 'Jk4', 'Jk5', 'Jk6', 'Jk7', 'Jk8', 'Jk9', 'Jk10', 'Jk11', 'Jk12', 'Jk13', 'Jk14', 'Jk15', 'Jk16', 'Jk17', 'Jk18'];
    
          let a_index = 100000;
          let b_index = 100000;
          try {
            
            let a_rank = this.state.rankings.filter((ranking) => ranking.idWrestler === a.id)[0].rank;
            
            a_index = ranks.indexOf(a_rank);
    
            let b_rank = this.state.rankings.filter((ranking) => ranking.idWrestler === b.id)[0].rank
            b_index = ranks.indexOf(b_rank);
            console.log(typeof(a_index));
            //console.log(a_rank + ": " + a_index);
    
          } catch (e) {
            // console.log(a);
            //console.log(e);
            return 100000;
          }
          //console.log(a_index);
          //console.log((a_index > b_index));
          return a_index - b_index;
        });
        console.log(wrestlers)
        return (
          <div class="relative w-full h-full pl-12 pt-4 grid justify-center gap-4 grid-cols-4 overflow-y-scroll">
              
              
              
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
          <div class="group perspective h-[400px] w-[200px]">
            <div class="h-full w-full preserve-3d rounded-xl border border-black shadow-xl transition-all duration-700 group-hover:[transform:rotateY(180deg)]">
              <div class="absolute inset-0 h-full w-full">
                <ImageArea wrestler={this.props.wrestler} />
                
              </div>
              <div class="absolute bg-white backface-hidden [transform:rotateY(180deg)] inset-0 w-full h-full">
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
          <div class={"box-border h-full w-full block bg-white shadow-sm p-2 absolute rounded-md transition duration-500 [transform-style: preserve-3d] [backface-visibility: hidden] [transition: -webkit-transform ease 500ms] [transition: transform ease 500ms] [transform: rotateY(0deg)] z-10" + (this.props.isFlipped ? " [transform:rotateY(180deg)]": "")}>
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
          <div class={"box-border h-full w-full block bg-white shadow-sm p-4 text-sm absolute rounded-md transition duration-500 [transform-style: preserve-3d] [backface-visibility: hidden] [transition: -webkit-transform ease 500ms] [transition: transform ease 500ms] [transform: rotateY(-180deg)]" + (this.props.isFlipped ? " [transform:rotateY(0deg)]": "")}>
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
            <img class="h-96 w-full" src={img_src}></img>
            
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
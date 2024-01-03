import React from 'react';
import '../styles/rank.css';

class Rank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            west_id: "",
            east_id: "",
            west_info: {},
            east_info: {}
        }
    }

    componentDidMount() {
        const headers = { 'Content-Type': 'application/json' };
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        const wrestler_api = api_protocol + '://' + api_url + ':' + '/api/wrestlers/'
        //const wrestler_api = 'http://localhost:5000/api/wrestlers/';
        if (this.props.west) {
            fetch(wrestler_api + this.props.west.idWrestler, {headers}).then(res => res.json()).then((res) => {
                this.setState({
                    west_info: res,
                    west_id: this.props.west.idWrestler
                })
            });
        }
        if (this.props.east) {
            fetch(wrestler_api + this.props.east.idWrestler, {headers}).then(res => res.json()).then((res) => {
                this.setState({
                    east_info: res
                })
            });
            this.setState({
                
                east_id: this.props.east.idWrestler
            })
        }
        
    }

    render() {
        
        let west_icon = "";
        if (this.props.west) {
            west_icon = this.state.west_info.icon_store;
        }
        let east_icon = "";
        if (this.props.east) {
            east_icon= this.state.east_info.icon_store;
        }

       return( <div class="w-[45rem] h-28 border border-black grid grid-cols-16 bg-white">
            <div class={`grid grid-cols-8 [grid-template-rows:4] col-span-7 border-r border-black ${this.props.style === "sanyaku" ? "bg-yellow-100": ""}`}>
                { this.props.west ? (
                <>
                    <img src={west_icon} class="row-start-1 row-end-2 col-start-2 col-end-4 mt-2"></img>
                    <p class="m-0 col-start-1 col-end-4 text-center">{this.state.west_info.ringname}</p>
                    <div class="row-start-1 row-end-3 col-start-5 col-end-9 grid grid-cols-2 content-center">
                       <h3 class="col-span-2">{this.props.west.wins}-{this.props.west.losses}</h3>
                   </div>
                </>) : null}
            </div>
            <div class={`rank ${this.props.style === "sanyaku" ? "bg-yellow-100" : ""}`}>
                <h2>{this.props.west.rank}</h2>
            </div>
            
            <div class={`grid grid-cols-8 [grid-template-rows:4] col-span-7 border-l border-black  ${this.props.style === "sanyaku" ? "bg-yellow-100": ""}`}>
                { this.props.east ? (
                <>
                    <img src={east_icon} class="row-start-1 row-end-2 col-start-6 col-end-8 mt-2"></img>
                    <p class="m-0 col-start-6 col-end-7 text-center">{this.state.east_info.ringname}</p>
                    <div class="row-start-1 row-end-3 col-start-1 col-end-5 grid grid-cols-2 content-center">
                        <h3 class="col-span-2">{this.props.east.wins}-{this.props.east.losses}</h3>
                    </div>
                </>) : null}
            </div>
        </div>
       );
    }
}

export default Rank;
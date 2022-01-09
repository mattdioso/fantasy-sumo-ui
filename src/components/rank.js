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
        const wrestler_api = 'http://localhost:5000/api/wrestlers/';
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
            west_icon = "http://localhost:5000/api/wrestlers/<ID>/icon".replace("<ID>", this.props.west.idWrestler);
        }
        let east_icon = "";
        if (this.props.east) {
            east_icon= "http://localhost:5000/api/wrestlers/<ID>/icon".replace("<ID>", this.props.east.idWrestler);
        }

       return( <div class="banzuke-row">
            <div class={`wrestler west ${this.props.style === "sanyaku" ? "sanyaku": ""}`}>
                { this.props.west ? (
                <><img src={west_icon} class="sumo_icon"></img><p>{this.state.west_info.ringname}</p><div class="wrestler_info">
                       <h3>{this.props.west.wins}-{this.props.west.losses}</h3>
                   </div></>) : null}
            </div>
            <div class={`rank ${this.props.style === "sanyaku" ? "sanyaku" : ""}`}>
                <h2>{this.props.west.rank}</h2>
            </div>
            
            <div class={`wrestler east ${this.props.style === "sanyaku" ? "sanyaku": ""}`}>
                { this.props.east ? (
                <><img src={east_icon} class="sumo_icon"></img>
                <p>{this.state.east_info.ringname}</p>
                <div class="wrestler_info">
                    <h3>{this.props.east.wins}-{this.props.east.losses}</h3>
                </div></>) : null}
            </div>
        </div>
       );
    }
}

export default Rank;
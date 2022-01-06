import React from 'react';
import '../styles/match.css';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            east_wrestler: "",
            west_wrestler: "",
            winning_technique: ""
        };
    }

    componentDidMount() {
        const headers = { 'Content-Type': 'application/json'};
        const wrestler_api = 'http://localhost:5000/api/wrestlers/';
        const technique_api = 'http://localhost:5000/api/techniques/';

        fetch(wrestler_api + this.props.match.idWrestler1, {headers}).then(res => res.json()).then((res) => {
            
            this.setState({
                east_wrestler: res.ringname
            })
        });
        fetch(wrestler_api + this.props.match.idWrestler2, {headers}).then(res => res.json()).then((res) => {
            this.setState({
                west_wrestler: res.ringname
            })
        });
        fetch(technique_api + this.props.match.winTechniqueId, {headers}).then(res => res.json()).then((res) => {
            this.setState({
                winning_technique: res.techniquetype
            })
        })

    }

    componentDidUpdate(prevProps) {
        
        if (prevProps.match.idWrestler1 !== this.props.match.idWrestler1 || prevProps.match.idWrestler2 !== this.props.match.idWrestler2) {
            
            const headers = { 'Content-Type': 'application/json'};
            const wrestler_api = 'http://localhost:5000/api/wrestlers/';
            const technique_api = 'http://localhost:5000/api/techniques/';
            fetch(wrestler_api + this.props.match.idWrestler1, {headers}).then(res => res.json()).then((res) => {
                this.setState({
                    east_wrestler: res.ringname
                })
            });
            fetch(wrestler_api + this.props.match.idWrestler2, {headers}).then(res => res.json()).then((res) => {
                this.setState({
                    west_wrestler: res.ringname
                })
            });
            fetch(technique_api + this.props.match.winTechniqueId, {headers}).then(res => res.json()).then((res) => {
                this.setState({
                    winning_technique: res.techniquetype
                })
            })
        }
    }

    render() {
        
        var west_icon = "http://localhost:5000/api/wrestlers/<ID>/icon".replace("<ID>", this.props.match.idWrestler2);
        var east_icon = "http://localhost:5000/api/wrestlers/<ID>/icon".replace("<ID>", this.props.match.idWrestler1);
        return (
            <div class="match">
                <div class={`wrestler west ${this.props.match.win2 === 0 ? "win": "loss"}`}>
                    <img class="sumo_icon" src={west_icon}></img>
                    <p>{this.state.west_wrestler}</p>
                    
                </div>
                <div class={`wrestler east ${this.props.match.win1 === 0 ? "win": "loss"}`}>
                    <img class="sumo_icon" src={east_icon}></img>
                    <p>{this.state.east_wrestler}</p>
                    
                </div>
                <div class="technique win">
                    <p>{this.state.winning_technique}</p>
                </div>
            </div>
        );
    }
}

export default Match;
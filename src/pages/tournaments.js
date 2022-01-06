import React from 'react';
import Match from '../components/match';
import '../styles/tournament.css';
import Select from 'react-select';

class Tournaments extends React.Component {
    constructor() {
        super();
        
        this.state = {
            tournament: [],
            tournament_id: "857bc3fa-c100-4952-b5bf-3114471cba55",
            day: "12b1255f-9d4d-4357-a7fc-c0a37553491a",
            days: [],
            matches: []
        };
    }

    componentDidMount() {
        const headers = { 'Content-Type': 'application/json' };
        const days_api = 'http://localhost:5000/api/days/';
        const tournaments_api = 'http://localhost:5000/api/tournaments';
        const tourney_days = 'http://localhost:5000/api/tournaments/<ID>/days';
        fetch(days_api + this.state.day, {headers}).then(res => res.json()).then(res => {
            this.setState({
                matches: res.matches
            })
        });
        fetch(tournaments_api, {headers}).then(res => res.json()).then(res => {
            this.setState({
                tournament: this.convertTournamentJson(res)
            })
        });
        fetch(tourney_days.replace("<ID>", this.state.tournament_id), {headers}).then(res => res.json()).then(res => {
            this.setState({
                days: this.grabTourneyDays(res)
            })
        })
    }
    
    grabTourneyDays(days) {
        let ret = [];
        for (let i = 0; i < days.length; i++) {
            ret.push({
                label: days[i].day_num,
                value: days[i].id
            });
        }
        return ret;
    }

    convertTournamentJson(tourney) {
        let ret = [];
        for (let i = 0; i < tourney.length; i++) {
            ret.push({
                label: tourney[i].name,
                value: tourney[i].id
            });
        }
        return ret;
    }

    setTourney(id) {
        this.setState({
            tournament_id: id.value
        })
    }

    

    setDay(selection) {
        const headers = { 'Content-Type': 'application/json' };
        const days_api = 'http://localhost:5000/api/days/';
        fetch(days_api + selection.value, {headers}).then(res => res.json()).then(res => {
            this.setState({
                day: selection.value,
                matches: res.matches
            });
            
        });
        
    }

    render() {
          
        return (
            <div class="matchlist">
                <div class="selections">
                    <div class="select">
                        <label for="tournaments">Tournament: </label>
                        <Select name="tournaments" defaultValue={{ label: "November Banzuke", value: "857bc3fa-c100-4952-b5bf-3114471cba55" }} options={this.state.tournament} onChange={(id) => this.setTourney(id)}/>
                    </div>
                    <div class="select">
                        <label for="days">Day: </label>
                        <Select name="days" style="width: 5px;" defaultValue={{ label: "15", value: "12b1255f-9d4d-4357-a7fc-c0a37553491a"}} options={this.state.days} onChange={(selection) => this.setDay(selection)}/>
                    </div>
                </div>
                {this.state.matches.map((match, i) => (
                    <Match match={match}/>
                ))}
            </div>
        );
    }
}

export default Tournaments;
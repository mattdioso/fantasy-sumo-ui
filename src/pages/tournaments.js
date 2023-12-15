import React from 'react';
import Match from '../components/match';
import '../styles/tournament.css';
import Select from 'react-select';

class Tournaments extends React.Component {
    constructor() {
        super();
        
        this.state = {
            tournament: [],
            tournament_id: "1faf296f-1e65-4572-8ad5-7d977c200cc5",
            day: 1,
            days: [],
            matches: [],
            day_matches: []
        };
    }

    componentDidMount() {
        const headers = { 'Content-Type': 'application/json' };
        const days_api = 'http://localhost:5000/api/days/';
        const tournaments_api = 'http://localhost:5000/api/tournaments';
        const tourney_days = 'http://localhost:5000/api/tournaments/<ID>/days';
        const tournament = 'http://localhost:5000/api/tournaments/<ID>';
        fetch(tournament.replace("<ID>", this.state.tournament_id), {headers}).then(res => res.json()).then(res => {
            let tournament_matches = res.matches;
            let day_matches  = tournament_matches.filter(match => match.day === this.state.day);
            let unique_days = tournament_matches.map((match) => match.day).filter((value, i, current_val) => current_val.indexOf(value) === i);
            let day_arr = [];
            for (let i = 0; i < unique_days.length; i++) {
                day_arr.push({
                    label: unique_days[i],
                    value: unique_days[i]
                })
            }
            day_arr.sort(function(a, b) {
                return parseInt(a.value) - parseInt(b.value);
            });
            this.setState({
                day_matches: day_matches,
                days: day_arr,
                matches: tournament_matches
            })
        });
        fetch(tournaments_api, {headers}).then(res => res.json()).then(res => {
            this.setState({
                tournament: this.convertTournamentJson(res)
            })
        });
        // fetch(tourney_days.replace("<ID>", this.state.tournament_id), {headers}).then(res => res.json()).then(res => {
        //     this.setState({
        //         days: this.grabTourneyDays(res)
        //     })
        // })
    }
    
    grabTourneyDays(days) {
        let ret = [];
        for (let i = 0; i < days.length; i++) {
            ret.push({
                label: days[i].day_num,
                value: days[i].id
            });
        }
        ret.sort();
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
        let tournament_matches = this.state.matches;
        let day_matches  = tournament_matches.filter(match => match.day === selection.value);
        console.log(day_matches);
        this.setState({
            day: selection.value,
            day_matches: day_matches
        })
        
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
                        <Select name="days" style="width: 5px;" defaultValue={{ label: 1, value: 1}} options={this.state.days} onChange={(selection) => this.setDay(selection)}/>
                    </div>
                </div>
                {this.state.day_matches.map((match, i) => (
                    <Match match={match}/>
                ))}
            </div>
        );
    }
}

export default Tournaments;
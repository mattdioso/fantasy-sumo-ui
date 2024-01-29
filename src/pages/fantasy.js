import React from 'react';
import Tabs from '../components/tabs';
import Team from '../components/team';
import ScoreBoard from '../components/scoreboard';
import LeaderBoard from '../components/leaderboard';
import Select from 'react-select';

class Fantasy extends React.Component {
    constructor() {
        super();
        this.state = {
            teams: [],
            fantasy_tournaments: [],
            fantasy_tournament: "2ea49be1-cd3c-424c-8cb2-e7c829e34104"
        }
    }

    componentDidMount() {
        const headers = { 'Content-Type': 'application/json' };
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        const teams_api = api_protocol + '://' + api_url + ':' + api_port +'/api/teams';
        const fantasy_tournaments_api = api_protocol + '://' + api_url + ':' + api_port +'/api/fantasy_tournaments';
        fetch(fantasy_tournaments_api + '/' + this.state.fantasy_tournament, {headers}).then(res => res.json()).then((res) => {
            this.setState({
                teams: res.teams
            })
        });
        fetch(fantasy_tournaments_api, {headers}).then(res => res.json()).then((res) => {
            this.setState({
                fantasy_tournaments: res.map(tournament => ({value: tournament.id, label: tournament.name}))
            })
        })
    }

    setTourney(selection) {
        console.log(selection);
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        const fantasy_tournaments_api = api_protocol + '://' + api_url + ':' + api_port + '/api/fantasy_tournaments/';
        //const rankings_api = 'http://localhost:5000/api/rankings/';
        this.setState({
            fantasy_tournament: selection.value
        });
        fetch(fantasy_tournaments_api + selection.value).then(res => res.json()).then(res => {
            this.setState({
                teams: res.teams
            });
        });
    }

    render() {
        
        return (
            <div className="h-screen w-full overflow-y-hidden">
                <div class="w-60 inline z-50">
                    <label for="tournaments">Tournament: </label>
                    <Select name="fantasy_tournaments" defaultValue={{value: "2ea49be1-cd3c-424c-8cb2-e7c829e34104", label: "January Basho"}} options={this.state.fantasy_tournaments} onChange={(selection) => this.setTourney(selection)}/>
                </div>
                <Tabs>
                    <div label="Teams">
                        {/* {this.state.teams.map((team) => (
                            <Team team={team} />
                        ))} */}
                        
                        <LeaderBoard tournament={this.state.fantasy_tournament}></LeaderBoard>
                    </div>
                    <div label="Scoreboard">
                        <ScoreBoard />
                    </div>
                </Tabs>
            </div>
        );
    }

}

export default Fantasy;
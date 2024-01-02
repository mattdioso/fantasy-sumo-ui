import React from 'react';
import Tabs from '../components/tabs';
import Team from '../components/team';
import ScoreBoard from '../components/scoreboard';
import LeaderBoard from '../components/leaderboard';

class Fantasy extends React.Component {
    constructor() {
        super();
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        const headers = { 'Content-Type': 'application/json' };
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        const teams_api = api_protocol + '://' + api_url + ':' + api_port +'/api/teams';
        fetch(teams_api, {headers}).then(res => res.json()).then((res) => {
            this.setState({
                teams: res
            })
        });
    }

    render() {
        console.log(this.state.teams);
        return (
            <div className="h-full  w-full">
                <Tabs>
                    <div label="Teams">
                        {/* {this.state.teams.map((team) => (
                            <Team team={team} />
                        ))} */}
                        
                        <LeaderBoard></LeaderBoard>
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
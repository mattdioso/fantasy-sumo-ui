import React from 'react';
import Tabs from '../components/tabs';
import Team from '../components/team';
import ScoreBoard from '../components/scoreboard';

class Fantasy extends React.Component {
    constructor() {
        super();
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        const headers = { 'Content-Type': 'application/json' };
        const teams_api = 'http://localhost:5000/api/teams';
        fetch(teams_api, {headers}).then(res => res.json()).then((res) => {
            this.setState({
                teams: res
            })
        });
    }

    render() {
        console.log(this.state.teams);
        return (
            <div>
                <Tabs>
                    <div class="team-layout" label="Teams">
                        {this.state.teams.map((team) => (
                            <Team team={team} />
                        ))}
                        
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
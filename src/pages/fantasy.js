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
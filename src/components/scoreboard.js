import React from 'react';
import ScoreBoardCell from './scoreboard_cell';
import ScoreBoardRow from './scoreboard_row';

import TeamScore from './team_score';

class ScoreBoard extends React.Component {

    constructor(props) {
        super(props);
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
        let tournament_id= "857bc3fa-c100-4952-b5bf-3114471cba55";
        return (
            <div class="lg:scores">
              {this.state.teams.map((team, i) => (
                <TeamScore team={team} tournament={tournament_id} key={i} />
              ))}

            </div>
        );

    }
}

export default ScoreBoard;
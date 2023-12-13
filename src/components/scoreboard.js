import React from 'react';
import ScoreBoardCell from './scoreboard_cell';
import ScoreBoardRow from './scoreboard_row';

import TeamScore from './team_score';
import '../styles/fantasy_scoreboard.css';

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
          <div class="content">
            <div class="board">
              <div class="selection">
                <div class="dropdown">

                </div>
              </div>
              <div class="matchup">
                <div class="pairs">
                <div class="pair selected">
                        <p>Matt vs. Alex</p>
                    </div>
                    <div class="pair">
                        <p>Matt vs. Alex</p>
                    </div>
                    <div class="pair">
                        <p>Matt vs. Alex</p>
                    </div>
                </div>
                <div class="teams">
                  <div class="team">
                        <div class="user">
                            <div class="pic">
                                
                            </div>
                            <div class="score">
                                <p>
                                    11.7
                                </p>
                            </div>
                        </div>
                        <div class="breakdown">
                            <div class="wrestler">
                                <div class="wrestler_name">
                                    <p>Terunofuji</p>
                                </div>
                                <div class="wrestler_result">
                                    <p>5.6</p>
                                </div>
                            </div>
                            <div class="wrestler">
                                <div class="wrestler_name">
                                    <p>Terunofuji</p>
                                </div>
                                <div class="wrestler_result">
                                    <p>5.6</p>
                                </div>
                            </div>
                            <div class="wrestler">
                                <div class="wrestler_name">
                                    <p>Terunofuji</p>
                                </div>
                                <div class="wrestler_result">
                                    <p>5.6</p>
                                </div>
                            </div>
                            <div class="wrestler">
                                <div class="wrestler_name">
                                    <p>Terunofuji</p>
                                </div>
                                <div class="wrestler_result">
                                    <p>5.6</p>
                                </div>
                            </div>
                            <div class="wrestler">
                                <div class="wrestler_name">
                                    <p>Terunofuji</p>
                                </div>
                                <div class="wrestler_result">
                                    <p>5.6</p>
                                </div>
                            </div>
                            <div class="wrestler">
                                <div class="wrestler_name">
                                    <p>Terunofuji</p>
                                </div>
                                <div class="wrestler_result">
                                    <p>5.6</p>
                                </div>
                            </div>
                            <div class="wrestler">
                                <div class="wrestler_name">
                                    <p>Total points</p>
                                </div>
                                <div class="wrestler_result">
                                    <p>33.6</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="team">

                    </div>
                </div>
              </div>
            </div>
          </div>
            // <div class="lg:scores">
            //   {this.state.teams.map((team, i) => (
            //     <TeamScore team={team} tournament={tournament_id} key={i} />
            //   ))}

            // </div>
        );

    }
}

export default ScoreBoard;
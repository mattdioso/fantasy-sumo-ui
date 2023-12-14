import React from 'react';
import ScoreBoardCell from './scoreboard_cell';
import ScoreBoardRow from './scoreboard_row';

import TeamScore from './team_score';
// import '../styles/fantasy_scoreboard.css';
import Select from 'react-select';

class ScoreBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          teams: [], 
          selections: [
            {label: "Matchup 1", value:1},
            {label: "Matchup 2", value:2},
            {label: "Matchup 3", value:3},
            {label: "Matchup 4", value:4},
            {label: "Matchup 5", value:5}
          ]
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
          <div class="flex h-full w-full overflow-x-hidden overflow-y-hidden justify-center">
            <div class="block h-4/5 w-4/5 mt-10 border-solid border-black border absolute justify-center">
              <div class="flex w-[99%] flex-row-reverse my-2">
                <Select name="tournaments"  options={this.state.selections} onChange={(selection) => this.setTourney(selection)}/>
              </div>
              <div class="block h-[92%] w-[98%] border border-solid border-gray-500 absolute mx-2">
                <div class="w-full h-20 flex">
                    <div class="h-full w-1/3 border border-solid border-gray-500 bg-blue-400">
                        <p class="text-center my-6">Matt vs. Alex</p>
                    </div>
                    <div class="h-full w-1/3 border border-solid border-gray-500">
                        <p class="text-center my-6">Matt vs. Alex</p>
                    </div>
                    <div class="h-full w-1/3 border border-solid border-gray-500">
                        <p class="text-center my-6">Matt vs. Alex</p>
                    </div>
                </div>
                <div class="h-[88.5%] w-full flex">
                  <div class="h-full w-full border border-solid border-gray-500">
                        <div class="h-32 w-full border-b border-solid border-gray-500 grid grid-cols-3">
                            <div class="h-32 col-span-2 content-center">
                                
                            </div>
                            <div class="h-32 col-span-1">
                                <p class="text-center my-10">
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
                    <div class="h-full w-full flex">

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
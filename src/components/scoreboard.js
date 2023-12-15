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
          ],
          pairs: [],
          selection: "",
          selected_pair: 0
        }
    }

    componentDidMount() {
      const headers = { 'Content-Type': 'application/json' };
      const teams_api = 'http://localhost:5000/api/teams';
      const fantasy_matchup_api = 'http://localhost:5000/api/fantasy_matchups';

      fetch(teams_api, {headers}).then(res => res.json()).then((res) => {
        this.setState({
          teams: res
        })
      });

      fetch(fantasy_matchup_api, {headers}).then(res => res.json()).then((res) => {
        let matchup_1 = res.filter(matchup => matchup.day1 == 1);
        let matchup_2 = res.filter(matchup => matchup.day1 == 4);
        let matchup_3 = res.filter(matchup => matchup.day1 == 7);
        let matchup_4 = res.filter(matchup => matchup.day1 == 10);
        let matchup_5 = res.filter(matchup => matchup.day1 == 13);
        let ret = [];
        if (matchup_1 !== undefined && matchup_1.length != 0)
          ret.push({
            label: "Matchup 1",
            value: matchup_1
          });
        if (matchup_2 !== undefined && matchup_2.length != 0)
          ret.push({
            label: "Matchup 2",
            value: matchup_2
          });
        if (matchup_3 !== undefined && matchup_3.length != 0)
          ret.push({
            label: "Matchup 3",
            value: matchup_3
          });
        if (matchup_4 !== undefined && matchup_4.length != 0)
          ret.push({
            label: "Matchup 4",
            value: matchup_4
          });
        if (matchup_5 !== undefined && matchup_5.length != 0)
          ret.push({
            label: "Matchup 5",
            value: matchup_5
          });
        this.setState({
          selections: ret,
          selection: this.setMatchup(ret[ret.length-1]),
          selected_pair: 0
        })
      })
    }

    setMatchup(matchup) {
      //console.log(matchup.value);
      let matchups = matchup.value;
      let pairs = matchups.map(this.getTeammatchups);
      console.log(pairs);
      this.setState({
        pairs: pairs,
        selected_pair: 0
      })
    }

    getTeammatchups(matchup) {
      return [matchup.team1.teamname, matchup.team2.teamname].join(" vs. ")
    }

    render() {
        let tournament_id= "857bc3fa-c100-4952-b5bf-3114471cba55";
        return (
          <div class="flex h-full w-full overflow-x-hidden overflow-y-hidden justify-center">
            <div class="block h-4/5 w-4/5 mt-10 border-solid border-black border absolute justify-center">
              <div class="flex w-[99%] flex-row-reverse my-2">
                <Select name="tournaments"  options={this.state.selections} defaultValue={this.state.selection} onChange={(selection) => this.setMatchup(selection)}/>
              </div>
              <div class="block h-[92%] w-[98%] border border-solid border-gray-500 absolute mx-2">
                <div class="w-full h-20 flex">
                  {
                    this.state.pairs.map((pair, i) => (
                      <div class={`h-full w-1/3 border border-solid border-gray-500 ${this.state.selected_pair == i ? 'bg-blue-400': ''}`}>
                        <p class="text-center my-6">{pair}</p>
                    </div>
                    ))
                  }
                    
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
                        <div class="h-[77%] w-full grid grid-rows-7">
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Total points</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">33.6</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-full w-full flex">
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
                        <div class="h-[77%] w-full grid grid-rows-7">
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Terunofuji</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">5.6</p>
                                </div>
                            </div>
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Total points</p>
                                </div>
                                <div class="col-span-1">
                                    <p class="text-center">33.6</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
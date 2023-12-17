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
          selected_pair: 0,
          team1: {},
          team2: {},
          team1_wrestlers: [],
          team2_wrestlers: [],
          team1_score: 0,
          team2_score: 0
        }
        this.changePair = this.changePair.bind(this);
        this.getWrestlerScore = this.getWrestlerScore.bind(this);
        this.getTeamScore = this.getTeamScore.bind(this);
        this.getUserPic = this.getUserPic.bind(this);
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
        console.log(matchup_1)
        console.log(matchup_2.length)
        console.log(matchup_3.length)
        console.log(matchup_4.length)
        console.log(matchup_5.length)
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
          selections: ret
          //selection: this.setMatchup(ret[ret.length-1]),
          // selected_pair: 0
        });
        
        this.setMatchup(ret[ret.length-1]);
        
      })
    }

    getWrestlerScore(team, wrestler) {
      const headers = { 'Content-Type': 'application/json' };
      let matchup = this.state.selection.value.filter(matchup => matchup.team1.id === team || matchup.team2.id === team);
      let matches = [];
      for (let i =0; i< matchup.length; i++) {
        let match_arr = matchup[i].matches;
        matches.push(...match_arr);
      }
      
      let wrestler_matches = matches.filter(match => match.idWrestler1 === wrestler || match.idWrestler2 === wrestler);
      
      let wrestler_score = 0.0;
      
      for (let i = 0; i < wrestler_matches.length; i++) {
        
        let match_score = wrestler_matches[i].match_score;
        
        // if (wrestler === "21edde30-a115-4fbd-8a68-8717a8d99f12") {
        //   console.log(matchup);

        //   console.log(wrestler_matches[i].id);
        //   console.log(wrestler_matches[i].idWrestler1);
        //   console.log(wrestler_matches[i].win1);
        //   console.log(wrestler_matches[i].idWrestler2);
        //   console.log(wrestler_matches[i].win2);
        // }
        if (wrestler === wrestler_matches[i].idWrestler1 && wrestler_matches[i].win1 === 0) {
            
          wrestler_score += parseFloat(match_score.score);
          if (wrestler === "21edde30-a115-4fbd-8a68-8717a8d99f12") {
            console.log("found ryuden")
            console.log(wrestler_matches);
            console.log(match_score);
          }
        }
        if (wrestler === wrestler_matches[i].idWrestler2 && wrestler_matches[i].win2 === 0) {
          
          wrestler_score += parseFloat(match_score.score);
          if (wrestler === "21edde30-a115-4fbd-8a68-8717a8d99f12") {
            console.log("found ryuden")
            console.log(wrestler_matches);
            console.log(match_score);
          }
        }
        
      }
      
      return wrestler_score.toFixed(1);
    }

    getTeamScore(team) {
      
      let matchup = this.state.selection.value.filter(matchup => matchup.team1.id === team.id || matchup.team2.id === team.id);
      let matches = [];
      for (let i = 0; i < matchup.length; i++) {
        let match_arr = matchup[i].matches;
        matches.push(...match_arr);
      }

      let team_wrestlers = team.wrestlers;
      let score = 0.0;
      for (let i = 0; i < team_wrestlers.length; i++) {
        let wrestler = team_wrestlers[i];
        
        let wrestler_matches = matches.filter(match => match.idWrestler1 === wrestler.id || match.idWrestler2 === wrestler.id);
        for (let x = 0; x < wrestler_matches.length; x++) {
          let match_score = wrestler_matches[x].match_score;
          if (wrestler.id === wrestler_matches[x].idWrestler1 && wrestler_matches[x].win1 === 0) {
            score += parseFloat(match_score.score);
          }
          if (wrestler.id === wrestler_matches[x].idWrestler2 && wrestler_matches[x].win2 === 0) {
            score += parseFloat(match_score.score);
          }
        }
      }
      return score.toFixed(1);
    }

    setMatchup(matchup) {
      let matchups = matchup.value;
      let pairs = matchups.map(this.getTeammatchups);
      
      let selected_matchup = matchups[this.state.selected_pair];
      let team1 = selected_matchup.team1;
      let team2 = selected_matchup.team2;
      let team1_wrestlers = team1.wrestlers;
      let team2_wrestlers = team2.wrestlers;
      
      this.setState({
        pairs: pairs,
        selected_pair: 0,
        selection: matchup,
        team1: team1,
        team2: team2,
        team1_wrestlers: team1.wrestlers,
        team2_wrestlers: team2.wrestlers,
        team1_score: selected_matchup.team1_score.toFixed(1),
        team2_score: selected_matchup.team2_score.toFixed(1)
      });
    }

    getTeammatchups(matchup) {
      return [matchup.team1.teamname, matchup.team2.teamname].join(" vs. ")
    }

    changePair(e) {
      
      let selected_matchup = this.state.selection.value[e.target.id];
      console.log(this.state.selection.value);
      let team1 = selected_matchup.team1;
      let team2 = selected_matchup.team2;
      this.setState({
        selected_pair: e.target.id,
        team1: team1,
        team2: team2, 
        team1_wrestlers: team1.wrestlers,
        team2_wrestlers: team2.wrestlers,
        team1_score: selected_matchup.team1_score.toFixed(1),
        team2_score: selected_matchup.team2_score.toFixed(1)
      })
    }

    getUserPic(team) {
      
      return "http://localhost:5000/api/users/<ID>/avatar".replace("<ID>", team.user.id);
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
                      <div id={i} onClick={this.changePair} class={`h-full w-1/3 border border-solid border-gray-500 ${this.state.selected_pair == i ? 'bg-blue-400': ''}`}>
                        <p id={i} class="text-center my-6">{pair}</p>
                      </div>
                    ))
                  }
                    
                </div>
                <div class="h-[88.5%] w-full flex">
                  <div class="h-full w-full border border-solid border-gray-500">
                        <div class="h-32 w-full border-b border-solid border-gray-500 grid grid-cols-3">
                            <div class="h-32 col-span-2 content-center px-28">
                                <img src={this.state.selection ? this.getUserPic(this.state.team1) : ""} width="111px" height="108px"></img>
                            </div>
                            <div class="h-32 col-span-1">
                                <p class="text-center my-10 text-6xl">
                                  {this.state.team1_score}
                                {/* {this.state.selection ? this.getTeamScore(this.state.team1) : 0} */}
                                </p>
                            </div>
                        </div>
                        <div class="h-[77%] w-full grid grid-rows-7">
                          { 
                            this.state.team1_wrestlers.map((wrestler, i) => (
                              <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                  <p class="text-center">{wrestler.ringname}</p>
                                </div>
                                <div class="col-span-1">
                                  <p class="text-center">{this.getWrestlerScore(this.state.team1.id, wrestler.id)}</p>
                                </div>
                              </div>
                            ))
                          }
                           
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Total points</p>
                                </div>
                                <div class="col-span-1">
                                    {/* <p class="text-center">{this.state.selection ? this.getTeamScore(this.state.team1) : 0}</p> */}
                                    <p class="text-center">{this.state.team1_score}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="h-full w-full flex">
                    <div class="h-full w-full border border-solid border-gray-500">
                        <div class="h-32 w-full border-b border-solid border-gray-500 grid grid-cols-3">
                            <div class="h-32 col-span-1"> 
                                <p class="text-center text-6xl my-10">
                                  {this.state.team2_score}
                                {/* {this.state.selection ? this.getTeamScore(this.state.team2) : 0} */}
                                </p>
                            </div>
                            <div class="h-32 col-span-2 content-center px-28">
                              <img src={this.state.selection ? this.getUserPic(this.state.team2) : ""} width="111px" height="108px"></img>
                            </div>
                            
                        </div>
                        <div class="h-[77%] w-full grid grid-rows-7">
                        {
                            
                            this.state.team2_wrestlers.map((wrestler, i) => (
                              <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                  <p class="text-center">{wrestler.ringname}</p>
                                </div>
                                <div class="col-span-1">
                                  <p class="text-center">{this.getWrestlerScore(this.state.team1.id, wrestler.id)}</p>
                                </div>
                              </div>
                            ))
                          }
                            
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Total points</p>
                                </div>
                                <div class="col-span-1">
                                    {/* <p class="text-center">{this.state.selection ? this.getTeamScore(this.state.team2) : 0}</p> */}
                                    <p class="text-center">{this.state.team2_score}</p>
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
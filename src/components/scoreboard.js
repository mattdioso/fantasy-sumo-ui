import React from 'react';
import ScoreBoardCell from './scoreboard_cell';
import ScoreBoardRow from './scoreboard_row';
import Modal from './matchup_modal';
import TeamScoreModal from './team_score_modal';

import TeamScore from './team_score';
// import '../styles/fantasy_scoreboard.css';
import Select from 'react-select';

class ScoreBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          matches:[], 
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
          team2_score: 0,
          modalToggle: false,
          modalWrestler: [],
          teamModalToggle: false,
          teamModalTeam: {}
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
      const tournament_api = 'http://localhost:5000/api/tournaments';

      fetch(tournament_api + "/" + "1faf296f-1e65-4572-8ad5-7d977c200cc5", {headers}).then(res => res.json()).then((res) => {
        //console.log(res.matches);
        this.setState({
          matches: res.matches
        })
      })

      fetch(teams_api, {headers}).then(res => res.json()).then((res) => {
        this.setState({
          teams: res
        })
      });

      fetch(fantasy_matchup_api, {headers}).then(res => res.json()).then((res) => {
        let matchup_1 = res.filter(matchup => matchup.day1 === 1);
        let matchup_2 = res.filter(matchup => matchup.day1 === 4);
        let matchup_3 = res.filter(matchup => matchup.day1 === 7);
        let matchup_4 = res.filter(matchup => matchup.day1 === 10);
        let matchup_5 = res.filter(matchup => matchup.day1 === 13);
        let ret = [];
        if (matchup_1 !== undefined && matchup_1.length !== 0)
          ret.push({
            label: "Matchup 1",
            value: matchup_1
          });
        if (matchup_2 !== undefined && matchup_2.length !== 0)
          ret.push({
            label: "Matchup 2",
            value: matchup_2
          });
        if (matchup_3 !== undefined && matchup_3.length !== 0)
          ret.push({
            label: "Matchup 3",
            value: matchup_3
          });
        if (matchup_4 !== undefined && matchup_4.length !== 0)
          ret.push({
            label: "Matchup 4",
            value: matchup_4
          });
        if (matchup_5 !== undefined && matchup_5.length !== 0)
          ret.push({
            label: "Matchup 5",
            value: matchup_5
          });
        this.setState({
          selections: ret
          //selection: this.setMatchup(ret[ret.length-1]),
          // selected_pair: 0
        });
        //console.log(ret)
        this.setMatchup(ret[ret.length-1]);
        
      })
    }

    getWrestlerScore(team, wrestler) {
      const headers = { 'Content-Type': 'application/json' };
      let matchup = this.state.selection.value.filter(matchup => matchup.team1.id === team || matchup.team2.id === team);
      let all_matches = this.state.selection.value.map(match => match.matches).reduce((a, b) => a.concat(b), []);
      //console.log(all_matches);
     
      let wrestler_matches = all_matches.filter(match => match.wrestler1.id === wrestler.id || match.wrestler2.id === wrestler.id);
      
      let wrestler_score = 0.0;
      let wrestler_name = wrestler.ringname;
      //console.log(wrestler_name + " had " + wrestler_matches.length + " matches in this matchup");
      
      for (let i = 0; i < wrestler_matches.length; i++) {
        
        let match_score = wrestler_matches[i].match_score;
        if (wrestler.id === wrestler_matches[i].wrestler1.id && wrestler_matches[i].win1 === true) {
          //console.log("he wrestled " + wrestler_matches[i].wrestler2.ringname + " and won");
          wrestler_score += parseFloat(match_score.score);
          
        }
        if (wrestler.id === wrestler_matches[i].wrestler2.id && wrestler_matches[i].win2 === true) {
          //console.log("he wrestled " + wrestler_matches[i].wrestler1.ringname + " and won");
          wrestler_score += parseFloat(match_score.score);
        }
        
      }
      
      return wrestler_score.toFixed(1);
    }

    getTeamScoreForDay(team_wrestlers, day_matches) {
      let day_scores = [];
      for (let i = 0; i < team_wrestlers.length; i++) {
        let wrestler = team_wrestlers[i];
        let id = wrestler.id;
        let matches = day_matches.filter(match => match.wrestler1.id == id || match.wrestler2.id == id);
        if (matches.length > 0) {
          let match = matches[0];
          if (match.wrestler1.id === id && match.win1) {
            day_scores.push(parseFloat(match.match_score.score));
          } else if (match.wrestler2.id === id && match.win2) {
            day_scores.push(parseFloat(match.match_score.score));
          } else {
            day_scores.push(0);
          }
        } else {
          day_scores.push(0);
        }
      }
      //console.log(day_scores);
      let top_four_values = day_scores.sort((a,b) => b-a).slice(0,4);
      //console.log(top_four_values);
      return top_four_values.reduce((a, b) => a + b, 0);
    }

    getTeamScore(team) {
      console.log(team.teamname);
      let matchup = this.state.selection.value.filter(matchup => matchup.team1.id === team.id || matchup.team2.id === team.id);
      let all_matches = this.state.selection.value.map(match => match.matches).reduce((a, b) => a.concat(b), []);
      console.log(all_matches);
      let day1 = matchup[0].day1;
      let day2 = matchup[0].day2;
      let day3 = matchup[0].day3;
      
      let team_wrestlers = team.wrestlers;
      let score = 0.0;

      //day1
      let day1_matches = all_matches.filter(match => match.day === day1);
      score += this.getTeamScoreForDay(team_wrestlers, day1_matches);
      //day2
      let day2_matches = all_matches.filter(match => match.day === day2);
      score += this.getTeamScoreForDay(team_wrestlers, day2_matches);
      //day3
      let day3_matches = all_matches.filter(match => match.day === day3);
      score += this.getTeamScoreForDay(team_wrestlers, day3_matches);
      
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
      //console.log(selected_matchup.id);
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
                                <p class="text-center">{this.state.selection ? this.state.team1.teamname : ""}</p>
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
                                <div class="col-span-1" onClick={() => {this.setState({modalToggle: !this.state.modalToggle, modalWrestler: wrestler})}}>
                                  <p class="text-center">{this.getWrestlerScore(this.state.team1.id, wrestler)}</p>
                                </div>
                              </div>
                            ))
                          }
                           
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-2 border-r-2 border-solid border-gray-500">
                                    <p class="text-center">Total points</p>
                                </div>
                                <div class="col-span-1" onClick={() => {this.setState({teamModalToggle: !this.teamModalToggle, teamModalTeam: this.state.team1})}}>
                                    {/* <p class="text-center">{this.state.selection ? this.getTeamScore(this.state.team1) : 0}</p> */}
                                    <p class="text-center">{this.state.selection ?  this.getTeamScore(this.state.team1) : 0}</p>
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
                              <p class="text-center">{this.state.selection ? this.state.team2.teamname : ""}</p>
                            </div>
                            
                        </div>
                        <div class="h-[77%] w-full grid grid-rows-7">
                        {
                            
                            this.state.team2_wrestlers.map((wrestler, i) => (
                              <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                
                                <div class="col-span-1" onClick={() => {this.setState({modalToggle: !this.state.modalToggle, modalWrestler: wrestler})}}>
                                  <p class="text-center">{this.getWrestlerScore(this.state.team1.id, wrestler)}</p>
                                </div>
                                <div class="col-span-2 border-l-2 border-solid border-gray-500">
                                  <p class="text-center">{wrestler.ringname}</p>
                                </div>
                              </div>
                            ))
                          }
                            
                            <div class="row-span-1 grid grid-cols-3 border border-solid border-gray-500">
                                <div class="col-span-1" onClick={() => {this.setState({teamModalToggle: !this.teamModalToggle, teamModalTeam: this.state.team2})}}>
                                    {/* <p class="text-center">{this.state.selection ? this.getTeamScore(this.state.team2) : 0}</p> */}
                                    <p class="text-center">{this.state.selection ? this.getTeamScore(this.state.team2) : 0}</p>
                                </div>
                                <div class="col-span-2 border-l-2 border-solid border-gray-500">
                                    <p class="text-center">Total points</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
            </div>
            <Modal open={this.state.modalToggle} onClose={() => this.setState({modalToggle: !this.state.modalToggle})} wrestler={this.state.modalWrestler} matches={this.state.matches} matchup={this.state.selection ? this.state.selection.value[0]: {}}>

            </Modal>
            <TeamScoreModal open={this.state.teamModalToggle} onClose={() => this.setState({teamModalToggle: !this.state.teamModalToggle})} team={this.state.teamModalTeam ? this.state.teamModalTeam : {}} matches={this.state.matches} matchup={this.state.selection ? this.state.selection.value[0]: {}}></TeamScoreModal>
          </div>
        );

    }
}

export default ScoreBoard;
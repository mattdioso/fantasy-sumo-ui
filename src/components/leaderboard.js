import React from 'react';

class LeaderBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        const teams_api = 'http://localhost:5000/api/teams';
        fetch(teams_api).then(res => res.json()).then((res) => {
            console.log(res);
            res.sort(function(a, b) {return b.wins - a.wins || b.total_points - a.total_points});
            this.setState({
                teams: res
            })
        });
    }

    getUserPic(team) {
      
        return "http://localhost:5000/api/users/<ID>/avatar".replace("<ID>", team.user.id);
      }

    getWrestlerPic(wrestler) {
        return "http://localhost:5000/api/wrestlers/<ID>/icon".replace("<ID>", wrestler.id);
    }

    render() {
        return (
            <div class="h-full w-full space-y-4">
                {
                    this.state.teams.map((team, i) => (
                        <div class="h-1/5 w-11/12 border border-black mx-auto grid grid-cols-10">
                            <div class="relative h-full col-span-1 ">
                                <p class="text-center text-2xl">{i + 1}</p>
                            </div>
                            <div class="relative h-full col-span-9 border-l z-50 shadow-xl grid grid-cols-7">
                                <div class="h-full col-span-1">
                                    <img class="mx-auto" src={this.state.teams ? this.getUserPic(team) : ""} width="111px" height="108px"></img>
                                    <p class="text-center">{team.wins}-{team.losses}</p>
                                </div>
                                {
                                    team.wrestlers.map((wrestler, x) => (
                                        <div class="h-full col-span-1">
                                            <img class="mx-auto" src={this.state.teams ? this.getWrestlerPic(wrestler) : ""} width="111px" height="108px"></img>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                
            </div>
        )
    }
}

export default LeaderBoard;
import React from 'react';

class LeaderBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            fantasy_tournaments: [],
            fantasy_tournament: "2ea49be1-cd3c-424c-8cb2-e7c829e34104"
        }
    }

    componentDidMount() {
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        const teams_api = api_protocol + '://' + api_url + ':' + api_port +'/api/teams';
        const fantasy_tournaments_api = api_protocol + '://' + api_url + ':' + api_port +'/api/fantasy_tournaments';
        fetch(fantasy_tournaments_api + '/' + this.state.fantasy_tournament).then(res => res.json()).then((res) => {
            let teams = res.teams.sort(function(a, b) {return b.wins - a.wins || b.total_points - a.total_points});
            this.setState({
                teams: teams
            })
        });
        fetch(fantasy_tournaments_api).then(res => res.json()).then((res) => {
            this.setState({
                fantasy_tournaments: res.map(tournament => ({value: tournament.id, label: tournament.name}))
            })
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tournament !== this.props.tournament) {
            
            const api_url = process.env.REACT_APP_API_URL;
            const api_protocol = process.env.REACT_APP_API_PROTOCOL;
            const api_port = process.env.REACT_APP_API_PORT;
            const teams_api = api_protocol + '://' + api_url + ':' + api_port +'/api/teams';
            const fantasy_tournaments_api = api_protocol + '://' + api_url + ':' + api_port +'/api/fantasy_tournaments';
            fetch(fantasy_tournaments_api + '/' + this.props.tournament).then(res => res.json()).then((res) => {
                let teams = res.teams.sort(function(a, b) {return b.wins - a.wins || b.total_points - a.total_points});
                this.setState({
                    teams: teams,
                    fantasy_tournament: this.props.tournament
                })
            });
        }
    }

    getUserPic(team) {
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        
        let user_img_src = api_protocol + "://" + api_url + ":" + api_port + "/api/users/<ID>/avatar".replace("<ID>", team.user.id);
        
        if (api_url !== "localhost") {
          
          user_img_src = team.user.avatar_store;
        }
        return user_img_src;
      }

    getWrestlerPic(wrestler) {
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        var wrestler_img_src = api_protocol + "://" + api_url + ":" + api_port + "/api/wrestlers/<ID>/icon".replace("<ID>", wrestler.id);
        
        
        if (api_url !== "localhost") {
          wrestler_img_src = wrestler.icon_store;
          
        }
        return wrestler_img_src
    }

    render() {
        return (
            <div class="h-full w-full space-y-2 py-2 mb-2 overflow-y-scroll">
                {
                    this.state.teams.map((team, i) => (
                        <div class="h-1/5 w-11/12 border border-black mx-auto grid grid-cols-10">
                            <div class="relative h-full col-span-1 ">
                                <p class="text-center text-2xl">{i + 1}</p>
                            </div>
                            <div class="relative h-full col-span-9 border-l shadow-xl grid grid-cols-7">
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
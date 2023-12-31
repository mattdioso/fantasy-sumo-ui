import React from 'react';
import '../styles/banzuke.css';
import Rank from '../components/rank';
import { ListGroup } from 'react-bootstrap';
import Select from 'react-select';

class Banzuke extends React.Component {
    constructor() {
        super();
        this.state = {
            rankings: [],
            tournament_id: "1faf296f-1e65-4572-8ad5-7d977c200cc5"
        }
    }

    componentDidMount() {
        const headers = { 'Content-Type': 'application/json' };
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        const rankings_api = api_protocol + '://' + api_url + ':' + api_port + '/api/rankings/';
        //const rankings_api = 'http://localhost:5000/api/rankings/';
        
        fetch(rankings_api + this.state.tournament_id, {headers}).then(res => res.json()).then(res => {
            this.setState({
                rankings: res
            })
        });
    }

    createRankList(west, east) {
        let ret = [];
        west.map((west_item, i) => {
            let east_item = east.find(item => item.rank === west_item.rank && item.division !== west_item.division);
            let rank = west_item.rank;
            let style="";
            if (rank === 'Y' || rank === 'O' || rank === 'S' || rank === 'K') {
                style = "sanyaku";
            }
            if (typeof east_item === 'undefined') {
                ret.push(<Rank west={west_item} style={style} />);
            } else {
                ret.push(<Rank west={west_item} east={east_item} style={style} />)
            }
        })
        return ret;
    }

    setTourney(selection) {
        console.log(selection);
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        const rankings_api = api_protocol + '://' + api_url + ':' + api_port + '/api/rankings/';
        //const rankings_api = 'http://localhost:5000/api/rankings/';
        this.setState({
            tournament_id: selection.value
        });
        fetch(rankings_api + selection.value).then(res => res.json()).then(res => {
            this.setState({
                rankings: res
            });
        });
    }

    render() {
        let yokozuna_east = this.state.rankings.filter(rank => rank.rank === 'Y' && rank.division === 'east');
        let yokozuna_west = this.state.rankings.filter(rank => rank.rank === 'Y' && rank.division === 'west')
        let ozeki_east = this.state.rankings.filter(rank => rank.rank === 'O' && rank.division === 'east');
        let ozeki_west = this.state.rankings.filter(rank => rank.rank === 'O' && rank.division === 'west');
        let sekiwake_east = this.state.rankings.filter(rank => rank.rank === 'S' && rank.division === 'east');
        let sekiwake_west = this.state.rankings.filter(rank => rank.rank === 'S' && rank.division === 'west');
        let komosubi_east = this.state.rankings.filter(rank => rank.rank === 'K' && rank.division === 'east');
        let komosubi_west = this.state.rankings.filter(rank => rank.rank === 'K' && rank.division === 'west');
        let maegashira_east = this.state.rankings.filter(rank => rank.rank.includes('M') && rank.division === 'east');
        let maegashira_west = this.state.rankings.filter(rank => rank.rank.includes('M') && rank.division === 'west');

        let y_list = this.createRankList(yokozuna_west, yokozuna_east);
        let o_list = this.createRankList(ozeki_west, ozeki_east);
        let s_list = this.createRankList(sekiwake_west, sekiwake_east);
        let k_list = this.createRankList(komosubi_west, komosubi_east);
        let m_list = this.createRankList(maegashira_west, maegashira_east);
        
        let selections = [
            { label: "November Basho", value: "1faf296f-1e65-4572-8ad5-7d977c200cc5" }
        ]
        
        return (
            <div class="[position:center] w-full px-[17%] py-16 overflow-y-scroll overflow-x-hidden">
                <Select name="tournaments" options={selections} onChange={(selection) => this.setTourney(selection)}/>
                <div class="w-[45rem] h-16 mt-2 rounded-t-lg bg-yellow-100 grid grid-cols-16 border border-black">
                    <div class="col-span-7 border-r border-black">
                        <h3>West</h3>
                    </div>
                    <div class="col-start-8 col-end-10">
                        <h3>Rank</h3>
                    </div>
                    <div class="col-span-7 border-l border-black">
                        <h3>East</h3>
                    </div>
                </div>
                {y_list}
                {o_list}
                {s_list}
                {k_list}
                {m_list}
            </div>
            
        );
    }

}

export default Banzuke;
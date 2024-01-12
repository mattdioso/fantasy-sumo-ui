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
        let processed = new Set();
        west.map((west_item, i) => {
            let east_item = east.find(item => item.rank === west_item.rank && item.division !== west_item.division);
            const e_item = east.indexOf(east_item);
            if (east_item && !processed.has(east_item.idWrestler)) {
                processed.add(east_item.idWrestler);
            } else {
                east_item = (function () { return; })(); //some hacky way to set variable to undefined
            }
            //east.splice(e_item);
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

    sortWrestlers(a, b) {
      
        let ranks =['Y', 'O', 'S', 'K', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M17', 'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', 'J11', 'J12', 'J13', 'J14', 'Ms1', 'Ms2', 'Ms3', 'Ms4', 'Ms5', 'Ms6', 'Ms7', 'Ms8', 'Ms9', 'Ms10', 'Ms11', 'Ms12', 'Ms13', 'Ms14', 'Ms15', 'TD', 'Ms16', 'Ms17', 'Ms18', 'Ms19', 'Ms20', 'Ms21', 'Ms22', 'Ms23', 'Ms24', 'Ms25', 'Ms26', 'Ms27', 'Ms28', 'Ms29', 'Ms30', 'Ms31', 'Ms32', 'Ms33', 'Ms34', 'Ms35', 'Ms36', 'Ms37', 'Ms38', 'Ms39', 'Ms40', 'Ms41', 'Ms42', 'Ms43', 'Ms44', 'Ms45', 'Ms46', 'Ms47', 'Ms48', 'Ms49', 'Ms50', 'Ms51', 'Ms52', 'Ms53', 'Ms54', 'Ms55', 'Ms56', 'Ms57', 'Ms58', 'Ms59', 'Ms60', 'Sd1', 'Sd2', 'Sd3', 'Sd4', 'Sd5', 'Sd6', 'Sd7', 'Sd8', 'Sd9', 'Sd10', 'Sd11', 'Sd12', 'Sd13', 'Sd14', 'Sd15', 'Sd16', 'Sd17', 'Sd18', 'Sd19', 'Sd20', 'Sd21', 'Sd22', 'Sd23', 'Sd24', 'Sd25', 'Sd26', 'Sd27', 'Sd28', 'Sd29', 'Sd30', 'Sd31', 'Sd32', 'Sd33', 'Sd34', 'Sd35', 'Sd36', 'Sd37', 'Sd38', 'Sd39', 'Sd40', 'Sd41', 'Sd42', 'Sd43', 'Sd44', 'Sd45', 'Sd46', 'Sd47', 'Sd48', 'Sd49', 'Sd50', 'Sd51', 'Sd52', 'Sd53', 'Sd54', 'Sd55', 'Sd56', 'Sd57', 'Sd58', 'Sd59', 'Sd60', 'Sd61', 'Sd62', 'Sd63', 'Sd64', 'Sd65', 'Sd66', 'Sd67', 'Sd68', 'Sd69', 'Sd70', 'Sd71', 'Sd72', 'Sd73', 'Sd74', 'Sd75', 'Sd76', 'Sd77', 'Sd78', 'Sd79', 'Sd80', 'Sd81', 'Sd82', 'Sd83', 'Sd84', 'Sd85', 'Sd86', 'Sd87', 'Sd88', 'Sd89', 'Sd90', 'Jd1', 'Jd2', 'Jd3', 'Jd4', 'Jd5', 'Jd6', 'Jd7', 'Jd8', 'Jd9', 'Jd10', 'Jd11', 'Jd12', 'Jd13', 'Jd14', 'Jd15', 'Jd16', 'Jd17', 'Jd18', 'Jd19', 'Jd20', 'Jd21', 'Jd22', 'Jd23', 'Jd24', 'Jd25', 'Jd26', 'Jd27', 'Jd28', 'Jd29', 'Jd30', 'Jd31', 'Jd32', 'Jd33', 'Jd34', 'Jd35', 'Jd36', 'Jd37', 'Jd38', 'Jd39', 'Jd40', 'Jd41', 'Jd42', 'Jd43', 'Jd44', 'Jd45', 'Jd46', 'Jd47', 'Jd48', 'Jd49', 'Jd50', 'Jd51', 'Jd52', 'Jd53', 'Jd54', 'Jd55', 'Jd56', 'Jd57', 'Jd58', 'Jd59', 'Jd60', 'Jd61', 'Jd62', 'Jd63', 'Jd64', 'Jd65', 'Jd66', 'Jd67', 'Jd68', 'Jd69', 'Jd70', 'Jd71', 'Jd72', 'Jd73', 'Jd74', 'Jd75', 'Jd76', 'Jd77', 'Jd78', 'Jd79', 'Jd80', 'Jd81', 'Jd82', 'Jd83', 'Jd84', 'Jd85', 'Jd86', 'Jd87', 'Jd88', 'Jd89', 'Jd90', 'Jd91', 'Jd92', 'Jd93', 'Jd94', 'Jd95', 'Jd96', 'Jd97', 'Jd98', 'Jd99', 'Jd100', 'Jk1', 'Jk2', 'Jk3', 'Jk4', 'Jk5', 'Jk6', 'Jk7', 'Jk8', 'Jk9', 'Jk10', 'Jk11', 'Jk12', 'Jk13', 'Jk14', 'Jk15', 'Jk16', 'Jk17', 'Jk18'];
      
            let a_index = 0;
            let b_index = 0;
            try {
              
              let a_rank = this.state.rankings.filter((ranking) => ranking.idWrestler === a.id)[0].rank;
              a_index = ranks.indexOf(a_rank);
  
            } catch (e) {
              a_index = 10000;
            }
            try {
              let b_rank = this.state.rankings.filter((ranking) => ranking.idWrestler === b.id)[0].rank
              b_index = ranks.indexOf(b_rank);
      
            } catch (e) {
              
              b_index = 10000;
            }
            if (a_index < b_index) {
              return -1;
            } else if (a_index > b_index) {
              return 1;
            }
            return 0;
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
        let maegashira_regex = "M[0-9]{1,2}"
        let yokozuna_east = this.state.rankings.filter(rank => rank.rank === 'Y' && rank.division === 'east');
        let yokozuna_west = this.state.rankings.filter(rank => rank.rank === 'Y' && rank.division === 'west')
        let ozeki_east = this.state.rankings.filter(rank => rank.rank === 'O' && rank.division === 'east');
        let ozeki_west = this.state.rankings.filter(rank => rank.rank === 'O' && rank.division === 'west');
        let sekiwake_east = this.state.rankings.filter(rank => rank.rank === 'S' && rank.division === 'east');
        let sekiwake_west = this.state.rankings.filter(rank => rank.rank === 'S' && rank.division === 'west');
        let komosubi_east = this.state.rankings.filter(rank => rank.rank === 'K' && rank.division === 'east');
        let komosubi_west = this.state.rankings.filter(rank => rank.rank === 'K' && rank.division === 'west');
        let maegashira_east = this.state.rankings.filter(rank => rank.rank.match(maegashira_regex) && rank.division === 'east');
        let maegashira_west = this.state.rankings.filter(rank => rank.rank.match(maegashira_regex) && rank.division === 'west');
        console.log("in render")
        console.log(maegashira_east[2]);
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
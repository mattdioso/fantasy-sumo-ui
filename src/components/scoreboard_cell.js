import React from 'react';

class ScoreBoardCell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isHeader = this.props.header;
        let cell = null;
        
        if (isHeader) {
            cell = <th class="text-sm font-medium text-gray-900 px-6 py-4">
                {this.props.text}
              </th>;
        } else {

            if (this.props.wrestler) {
                let wrestler = this.props.wrestler;
                let id = wrestler.id;
                let tournament_id = this.props.tournament_id;
                let day = this.props.text;
                // let tournament_api = 'http://localhost:5000/api/tournaments/' + tournament_id;
                // let tournament_res = "";
                // let headers = { 'Content-Type': 'application/json' };
                // fetch(tournament_api, {headers})
                //     .then(res => res.json()).then((res) => {
                //         console.log("tourney: " + res);
                //     })
                // console.log("tournament_res: " + tournament_res);s
                cell = <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {`Day: ` + this.props.text}
                        </td>;
            
            } else {
                cell = <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {this.props.text}
                        </td>;
            }
            
        }
        return (
            <>
                {cell}
            </>
        );
    }

}

export default ScoreBoardCell;
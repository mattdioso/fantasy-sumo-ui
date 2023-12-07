import React from 'react';
import ScoreBoardCell from './scoreboard_cell';
import ScoreBoardRow from './scoreboard_row';


class TeamScore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let header = [];
      for (let i = 0; i < 15; i++) {
        header.push(
          <ScoreBoardCell header={true} text="Cell" />
        );
      }

        let wrestlers = this.props.team.wrestlers;
        let tournament_id = this.props.tournament;
        let tournament_api = 'http://localhost:5000/api/tournaments/' + tournament_id;
        let tournament_res = "";
        let headers = { 'Content-Type': 'application/json' };
        fetch(tournament_api, {headers})
            .then(res => res.json()).then((res) => {
                console.log("tourney: " + res);
            })
        console.log("tournament_res: " + tournament_res);
        return (
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-x-auto">
                            <table class="rounded min-w-full border text-center">
                                <thead class="border-b">
                                    <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                                        {this.props.team.teamname}
                                    </th>
                                    {header}
                                    </tr>
                                </thead>
                                <tbody>
                                    {wrestlers.map((wrestler, i) => (
                                        <ScoreBoardRow key={i} header={false} wrestler={wrestler} tournament={tournament_id} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamScore;
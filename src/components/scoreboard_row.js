import React from 'react';
import ScoreBoardCell from './scoreboard_cell';

class ScoreBoardRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      let wrestler = this.props.wrestler;
      let tournament_id = this.props.tournament;
      
      let cells = [];
      console.log(wrestler);
      for (let i = 0; i < 15; i++) {
        cells.push(
          <ScoreBoardCell header={this.props.header} wrestler={wrestler} tournament_id={tournament_id} text={"Cell " + i} />
        )
      }
      
        return (
            <tr class="border-b">
              <ScoreBoardCell header={this.props.header} text={wrestler.ringname} tournament_id={tournament_id} />
              {cells}
            </tr>
        );
    }
}

export default ScoreBoardRow;
import React from 'react';
import Tabs from '../components/tabs';
import Team from '../components/team';

class Fantasy extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Tabs>
                    <div label="Teams">
                        <Team />
                        <Team />
                        <Team />
                        <Team />
                    </div>
                    <div label="Scoreboard">
                        This is where Fantasy Scores will go
                    </div>
                </Tabs>
            </div>
        );
    }

}

export default Fantasy;
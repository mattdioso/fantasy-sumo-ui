import React from 'react';
import '../styles/team.css';

class Team extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let user = this.props.team.user;
        let wrestlers = this.props.team.wrestlers;
        console.log("USERS: " + user.id);
        console.log("WRESTLERS: " + wrestlers)
        let user_icon = "http://localhost:5000/api/users/<ID>/avatar".replace("<ID>", user.id);
        let wrestler_icon = "http://localhost:5000/api/wrestlers/<ID>/icon";
        return (
            <div class="team">
                <div class="icon">
                    <img src={user_icon} width="112" height="108"></img>
                </div>
                <div class="wrestlers">
                    {wrestlers.map((wrestler) => (
                        <div class="wrestler">
                            <img src={wrestler_icon.replace("<ID>", wrestler.id)}></img>
                            <p><b>{wrestler.ringname}</b></p>
                        </div>
                    ))}
                    
                </div>
            </div>
        );
    }
}

export default Team;
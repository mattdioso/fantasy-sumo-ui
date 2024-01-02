import React from 'react';
import '../styles/team.css';

class Team extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        let user = this.props.team.user;
        let wrestlers = this.props.team.wrestlers;
        let user_icon = "http://localhost:5000/api/users/<ID>/avatar".replace("<ID>", user.id);
        let wrestler_icon = "http://localhost:5000/api/wrestlers/<ID>/icon";
        var wrestler_img_src = api_protocol + "://" + api_url + ":" + api_port + "/api/wrestlers/<ID>/icon".replace("<ID>", this.props.wrestler.id);
        let user_img_src = api_protocol + "://" + api_url + ":" + api_port + "/api/users/<ID>/avatar".replace("<ID>", user.id);
        
        if (api_url !== "localhost") {
          wrestler_img_src = this.props.wrestler.avatar_store;
          user_img_src = user.avatar_store;
        }
        return (
            <div class="team">
                <div class="icon">
                    <img src={user_img_src} width="111px" height="108px"></img>
                </div>
                <div class="wrestlers">
                    {wrestlers.map((wrestler) => (
                        <div class="wrestler">
                            <img src={wrestler_img_src}></img>
                            <p><b>{wrestler.ringname}</b></p>
                        </div>
                    ))}
                    
                </div>
            </div>
        );
    }
}

export default Team;
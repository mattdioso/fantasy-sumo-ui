import React from 'react';
import '../styles/team.css';

class Team extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div class="team">
                <div class="icon">
                    <img src="http://localhost:5000/api/users/8751360b-338e-463b-a067-4d118ae270a8/avatar" width="112" height="108"></img>
                </div>
                <div class="wrestlers">
                    <div class="wrestler">
                        <img src="http://localhost:5000/api/wrestlers/494b1e1f-5dd5-4eef-92c9-a08deb20de38/icon"></img>
                        <p><b>Terunofuji</b></p>
                    </div>
                    <div class="wrestler">
                        <img src="http://localhost:5000/api/wrestlers/f3d8b6db-1726-4b36-9db2-d0ebdf0123fd/icon"></img>
                        <p><b>Takakeisho</b></p>
                    </div>
                    <div class="wrestler">
                        <img src="http://localhost:5000/api/wrestlers/085acbed-2825-4c5e-8282-bde58d9a093a/icon"></img>
                        <p><b>Ichinojo</b></p>
                    </div>
                    <div class="wrestler">
                        <img src="http://localhost:5000/api/wrestlers/43303c72-a20a-48c7-9599-cd0cb2c12c06/icon"></img>
                        <p><b>Ura</b></p>
                    </div>
                    <div class="wrestler">
                        <img src="http://localhost:5000/api/wrestlers/746da4e3-0332-4d1c-a51d-3529e22ae283/icon"></img>
                        <p><b>Shodai</b></p>
                    </div>
                    <div class="wrestler">
                        <img src="http://localhost:5000/api/wrestlers/6815b730-ee93-4c13-b1b0-312ac166f42c/icon"></img>
                        <p><b>Wakatakakage</b></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Team;
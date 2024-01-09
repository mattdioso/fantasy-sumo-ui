import React from 'react';
import '../styles/match.css';

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            east_wrestler: "",
            west_wrestler: "",
            east_icon: "",
            west_icon: "",
            winning_technique: ""
        };
    }

    componentDidMount() {
        const api_url = process.env.REACT_APP_API_URL;
        const api_protocol = process.env.REACT_APP_API_PROTOCOL;
        const api_port = process.env.REACT_APP_API_PORT;
        const headers = { 'Content-Type': 'application/json'};
        const wrestler_api = api_protocol + '://' + api_url + ':' + api_port + '/api/wrestlers/';
        const technique_api = api_protocol + '://' + api_url + ':' + api_port + '/api/techniques/';
        //const wrestler_api = 'http://localhost:5000/api/wrestlers/';
        //const technique_api = 'http://localhost:5000/api/techniques/';

        fetch(wrestler_api + this.props.match.wrestler1.id, {headers}).then(res => res.json()).then((res) => {
            
            this.setState({
                east_wrestler: res.ringname,
                east_icon: res.icon_store
            })
        });
        fetch(wrestler_api + this.props.match.wrestler2.id, {headers}).then(res => res.json()).then((res) => {
            this.setState({
                west_wrestler: res.ringname,
                west_icon: res.icon_store
            })
        });
        fetch(technique_api + this.props.match.winTechniqueId, {headers}).then(res => res.json()).then((res) => {
            this.setState({
                winning_technique: res.techniquetype
            })
        })

    }

    componentDidUpdate(prevProps) {
        
        if (prevProps.match.wrestler1.id !== this.props.match.wrestler1.id || prevProps.match.wrestler2.id !== this.props.match.wrestler2.id) {
            const api_url = process.env.REACT_APP_API_URL;
            const api_protocol = process.env.REACT_APP_API_PROTOCOL;
            const api_port = process.env.REACT_APP_API_PORT;
            const headers = { 'Content-Type': 'application/json'};
            const wrestler_api = api_protocol + '://' + api_url + ':' + api_port + '/api/wrestlers/';
            const technique_api = api_protocol + '://' + api_url + ':' + api_port + '/api/techniques/';
            // const headers = { 'Content-Type': 'application/json'};
            // const wrestler_api = 'http://localhost:5000/api/wrestlers/';
            // const technique_api = 'http://localhost:5000/api/techniques/';
            fetch(wrestler_api + this.props.match.wrestler1.id, {headers}).then(res => res.json()).then((res) => {
                this.setState({
                    east_wrestler: res.ringname,
                    east_icon: res.icon_store
                })
            });
            fetch(wrestler_api + this.props.match.wrestler2.id, {headers}).then(res => res.json()).then((res) => {
                this.setState({
                    west_wrestler: res.ringname,
                    west_icon: res.icon_store
                })
            });
            fetch(technique_api + this.props.match.winTechniqueId, {headers}).then(res => res.json()).then((res) => {
                this.setState({
                    winning_technique: res.techniquetype
                })
            })
        }
    }

    render() {
        
        //var west_icon = "http://localhost:5000/api/wrestlers/<ID>/icon".replace("<ID>", this.props.match.wrestler2.id);
        
        var west_icon = this.state.west_icon;
        var east_icon = this.state.east_icon;
        //var east_icon = "http://localhost:5000/api/wrestlers/<ID>/icon".replace("<ID>", this.props.match.wrestler1.id);
        return (
            <div class="w-[40rem] h-28 rounded-lg grid grid-cols-16 mb-2 bg-yellow-100 shadow-md">
                <div class={`grid col-span-8 w-full h-full rounded-md justify-center grid-cols-8 [grid-template-rows:4] col-start-1 col-end-9 row-start-1 row-end-5 ${this.props.match.win2 ? "border-2 border-blue-500": "border-2 border-red-600"}`}>
                    <img class="row-start-1 rounded-full row-end-4 col-start-4 col-end-6 mt-2 border border-black h-12 w-12" src={west_icon}></img>
                    <p class="col-start-4 col-end-8 m-0">{this.state.west_wrestler}</p>
                    
                </div>
                <div class={`grid col-span-8 w-full h-full rounded-md justify-center grid-cols-8 [grid-template-rows:4] col-start-9 col-end-17 row-start-1 row-end-5 ${this.props.match.win1 ? "border-2 border-blue-500": "border-2 border-red-600"}`}>
                    <img class="row-start-1 rounded-full row-end-4 col-start-4 col-end-7 mt-2 border border-black h-12 w-12" src={east_icon}></img>
                    <p class="col-start-4 col-end-8 m-0">{this.state.east_wrestler}</p>
                    
                </div>
                <div class="justify-center col-start-7 col-end-11 row-start-3 row-end-5 win z-10 bg-yellow-100 rounded-md border-2 border-blue-500">
                    <p class="text-center">{this.state.winning_technique}</p>
                </div>
            </div>
        );
    }
}

export default Match;
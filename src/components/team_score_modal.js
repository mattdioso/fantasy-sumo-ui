import { X } from 'react-feather';

export default  function TeamScoreModal({open, onClose, team, matches, matchup}) {
    console.log("in team score modal")
    console.log(matchup);
    let day1 = matchup.day1;
    let day2 = matchup.day2;
    let day3 = matchup.day3;    
    //console.log(team);
    let team_id = team.id;
    let team_wrestlers = team.wrestlers;
    let display_data = [];
    let total_total = 0;
    let day1_total = 0;
    let day2_total = 0;
    let day3_total = 0;
    if (team_wrestlers) {
        for (let i = 0; i < team_wrestlers.length; i++) {
            let wrestler = team_wrestlers[i];
            let wrestler_matches = matches.filter(match => (match.wrestler1.id === wrestler.id || match.wrestler2.id === wrestler.id));
            let matchup_matches = wrestler_matches.filter(match => match.day >= day1 && match.day <= day3);
            let day1_match = matchup_matches.filter(match => match.day === day1);
            let day2_match = matchup_matches.filter(match => match.day === day2);
            let day3_match = matchup_matches.filter(match => match.day === day3);
            console.log(day1_match);
            let day1_score = day1_match.length > 0 ? ((day1_match[0].wrestler1.id === wrestler.id && day1_match[0].win1) ||(day1_match[0].wrestler2.id === wrestler.id && day1_match[0].win2) ? day1_match[0].match_score.score: 0) : 0;
            let day2_score = day2_match.length > 0 ? ((day2_match[0].wrestler1.id === wrestler.id && day2_match[0].win1) ||(day2_match[0].wrestler2.id === wrestler.id && day2_match[0].win2) ? day2_match[0].match_score.score: 0) : 0;
            let day3_score = day3_match.length > 0 ? ((day3_match[0].wrestler1.id === wrestler.id && day3_match[0].win1) ||(day3_match[0].wrestler2.id === wrestler.id && day3_match[0].win2) ? day3_match[0].match_score.score: 0) : 0;
            console.log(parseFloat(day1_score));
            
            let result = {
                "wrestler": wrestler.ringname,
                "day1_score": parseFloat(day1_score),
                "day2_score": parseFloat(day2_score),
                "day3_score": parseFloat(day3_score),
                "total": parseFloat(day1_score) + parseFloat(day2_score) + parseFloat(day3_score)
            }
            display_data.push(result);
            total_total += parseFloat(day1_score) + parseFloat(day2_score) + parseFloat(day3_score);
        }
        day1_total = display_data.reduce((total, obj) => obj.day1_score + total, 0).toFixed(1);
        day2_total = display_data.reduce((total, obj) => obj.day2_score + total, 0).toFixed(1);
        day3_total = display_data.reduce((total, obj) => obj.day3_score + total, 0).toFixed(1);
    }
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
            
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl w-1/2 h-1/3 shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div class="h-full w-full">
                    <p class="text-center text-xl">{team.teamname} Team Breakdown</p>
                    <br></br>
                    <div class="rounded-xl relative overflow-auto">
                        <table class="border-collapse table-fixed w-full">
                            <thead>
                                <tr>
                                    <th class="border-b border-r border-black"></th>
                                    <th class="border-b border-black">Day {day1}</th>
                                    <th class="border-b border-black">Day {day2}</th>
                                    <th class="border-b border-black">Day {day3}</th>
                                    <th class="border-b border-black">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    display_data.map((wrestler, i) => (
                                        <tr>
                                            <th class="border-b border-r border-black">{wrestler.wrestler}</th>
                                            <th class={`border-b border-black ${parseFloat(wrestler.day1_score) > 0 ? "text-green-900" : "text-red-900"}`}>{wrestler.day1_score}</th>
                                            <th class={`border-b border-black ${parseFloat(wrestler.day2_score) > 0 ? "text-green-900" : "text-red-900"}`}>{wrestler.day2_score}</th>
                                            <th class={`border-b border-black ${parseFloat(wrestler.day3_score) > 0 ? "text-green-900" : "text-red-900"}`}>{wrestler.day3_score}</th>
                                            <th class={`border-b border-black ${parseFloat(wrestler.total) > 0 ? "text-green-900" : "text-red-900"}`}>{wrestler.total}</th>
                                        </tr>
                                    ))
                                }
                                        <tr>
                                            <th class="border-b border-r border-black">Total</th>
                                            <th class={`border-b border-black ${parseFloat(day1_total) > 0 ? "text-green-900" : "text-red-900"}`}>{day1_total}</th>
                                            <th class={`border-b border-black ${parseFloat(day2_total) > 0 ? "text-green-900" : "text-red-900"}`}>{day2_total}</th>
                                            <th class={`border-b border-black ${parseFloat(day3_total) > 0 ? "text-green-900" : "text-red-900"}`}>{day3_total}</th>
                                            <th class={`border-b border-black ${parseFloat(total_total) > 0 ? "text-green-900" : "text-red-900"}`}>{total_total}</th>
                                        </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                    <X />
                </button>
                    
            </div>
        </div>
    )

}
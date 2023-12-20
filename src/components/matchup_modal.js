import { X } from 'react-feather';

export default  function Modal({open, onClose, wrestler, matches, matchup}) {
    
    let wrestler_matches = matches.filter(match => match.wrestler1.id == wrestler.id || match.wrestler2.id == wrestler.id);
    let day1 = matchup.day1;
    let day2 = matchup.day2;
    let day3 = matchup.day3;
    let day1_match = wrestler_matches.filter(match => match.day === day1);
    let day2_match = wrestler_matches.filter(match => match.day === day2);
    let day3_match = wrestler_matches.filter(match => match.day === day3);
    let day_matches = []
    if (day1_match.length > 0) {
        day_matches.push(day1_match[0]);
    }
    if (day2_match.length > 0) {
        day_matches.push(day2_match[0]);
    }
    if (day3_match.length > 0) {
        day_matches.push(day3_match[0]);
    }
    console.log(day_matches);
    return (
        <div onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
            {/* modal */}
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>

                <div class="w-56 text-center">
                    <p class="text-2xl text-center">{wrestler.ringname} has {wrestler_matches.length} matches</p>
                    {
                        day_matches.map((day_match, i) => (
                            <div>
                                <p class="text-xl text-center">{day_match.wrestler1.ringname} {day_match.win1 ? 'won' : 'lost'} vs. {day_match.wrestler2.ringname} {day_match.win1 ? `+${day_match.match_score.score}` : ""}</p>
                            </div>
                        ))
                    }
                </div>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                    <X />
                </button>
                    
            </div>
        </div>
    )
}
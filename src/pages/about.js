import React from 'react';

class About extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="h-screen w-full overflow-hidden">
                <div className="h-screen w-3/5 border border-black border-solid mx-auto mt-4">
                    <p><b>About:</b>Sumo wrestling is one of the oldest sports in Japan. Two wrestlers enter the dohyo (ring) with the intention of pushing the other out of bounds.
                    Wrestlers are ranked based on their skill - the rank of Yokozuna being the most prestigious title in the sport. The sanyaku consists of the top four ranks inthe tournament - 
                    Yokozuna, Ozeki, Sekiwake, and Komosubi. These are followed by the Maegashira in which there are 18 sub-classes. Tournaments are hosted every other month throughout the calndar
                    year and run for 15 days straight.
                    <br></br>
                    <b>Fantasy: </b>Fantasy Sumo is a format similar to other fantasy sports in which users draft teams of six and are awarded points based on how well their wrestlers do throughout
                    the course of the tournament. Wrestlers are awarded one for a win plus any bonus points and losses count as 0 points. Bonus points (0,1 each) are calculated if a wrestler wins a match
                    against an opponent of a higher rank and is given points equal to the difference in their rank. For example, a Maegashira 15 winning against a Maegashira 10 would be awarded 1.5 points - 
                    1 point for the win and 0.5 points for defeating a wrestler five ranks above him. A wrestler defeating an opponent ranked lower is only awarded 1.0 point. 
                    
                    Matches that are won by one wrestler withdrawing is only awarded 1 point no matter the difference in ranks.
                    <br></br>
                    <b>Teams:</b> Before the start of the tournament, users draft a team of six from the list of wrestlers. Throughout the tournament, as team results are scored, only the top four
                    performers on the team are counted for that day's score. It's a head-to-head matchup format and matchup scores are aggregatted over the days of a matchup (each matchup lasts for three days
                    Each team has the chanec to match up against all of the other teams throughout the tournament (max 6 teams per league). The leaderboard is determined by the most amount of wins a team has
                    throughout the tournament in all of their matchups.
                    
                    <br></br>
                    <b>Bonus Points: </b>At the end of the tournament, wrestlers are awarded special prizes based on their performances throughout the tournament. A kachi-koshi is awarded to a wrestle r
                    that secures at least 8 wins throughout the tournament, signifying they won a majority of their matches. In fantasy sumo, a wrestler who obtains kachi-koshi gains an extra 0.2
                    points for their team. The team that has the tournament winner is awarded an extra 2.0 points at the end of the tournament.
                    </p>
                </div>
            </div>
        )
    }
}

export default About;
'use client';
import { SelectDropdown, TournamentItems } from "@components/select_dropdown";
import { getFantasyTournamentMatches, getFantasyTournaments } from "@hooks/fantasy_tournaments";
import { useState, useEffect } from "react";
import { Matches } from "./components/matches";


const Matchups = () => {
    const [fantasyTournaments, setFantasyTournaments] = useState<any[]>([]);
    const [tournamentsDropdown, setTournamentsDropdown] = useState<TournamentItems[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<string>("");
    const [tournamentMatches, setTournamentMatches] = useState<any[]>([]);
    const [selectedMatch, setSelectedMatch] = useState<any>(undefined);

    const { tournaments: fantasy_tournaments, isError: tournamentsError } = getFantasyTournaments();
    const { matches, isError: matchesError } = getFantasyTournamentMatches(selectedTournament);

    useEffect(() => {
        if (fantasy_tournaments) {
            const filtered_arr = fantasy_tournaments.reduce(
                (acc: Array<any>, cur: any) => {
                    const new_obj = { id: cur.id, name: cur.name }
                    acc.push(new_obj);
                    return acc;
                },
                new Array()
            )
            setFantasyTournaments(fantasy_tournaments);
            setTournamentsDropdown(filtered_arr)
            setSelectedMatch(undefined);
        }
    }, [fantasy_tournaments])

    useEffect(() => {
        if (matches) {
            let matchDropdown = []
            const matchup1 = matches.filter((matchup: any) => matchup.day1 === 1);
            const matchup2 = matches.filter((matchup: any) => matchup.day1 === 4);
            const matchup3 = matches.filter((matchup: any) => matchup.day1 === 7);
            const matchup4 = matches.filter((matchup: any) => matchup.day1 === 10);
            const matchup5 = matches.filter((matchup: any) => matchup.day1 === 13);
            if (matchup1 && matchup1.length !== 0) {
                matchDropdown.push({
                    name: "Matchup 1",
                    value: matchup1
                })
            }
            if (matchup2 && matchup2.length !== 0) {
                matchDropdown.push({
                    name: "Matchup 2",
                    id: matchup2
                })
            }
            if (matchup1 && matchup3.length !== 0) {
                matchDropdown.push({
                    name: "Matchup 3",
                    id: matchup3
                })
            }
            if (matchup1 && matchup4.length !== 0) {
                matchDropdown.push({
                    name: "Matchup 4",
                    id: matchup4
                })
            }
            if (matchup1 && matchup5.length !== 0) {
                matchDropdown.push({
                    name: "Matchup 5",
                    id: matchup5
                })
            }
            setTournamentMatches(matchDropdown)
        }
    }, [selectedTournament, matches])

    if (tournamentsError) return <div>Failed to Load tournament data</div>
    if (!fantasy_tournaments) return <div>Loading tournament data...</div>
    return (
        <div className="text-white">
            <div className="flex justify-between">
                <SelectDropdown placeholder="Select a fantasy tournament" label="Fantasy Tournaments" items={tournamentsDropdown} setSelectedTournament={setSelectedTournament} />
                {
                    selectedTournament &&
                    <SelectDropdown placeholder="Select a match" label="Matches" items={tournamentMatches} setSelectedTournament={setSelectedMatch} />
                }
            </div>
            {
                selectedTournament && selectedMatch &&
                <Matches matchData={selectedMatch} />
            }
        </div>
    )
}

export default Matchups;
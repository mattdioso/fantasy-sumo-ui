'use client';
import { SelectDropdown } from "@components/select_dropdown";
import { useState, useEffect } from "react";
import { getTeams, getTeam } from "@hooks/teams";
import { getFantasyTournaments } from "@hooks/fantasy_tournaments";
import { TournamentItems } from "@components/select_dropdown";
import { LeagueTable } from '@components/league_table'

interface TournamentTeam {
    id: string;
    name: string;
    wrestlers: any[];
}

const Team = () => {
    const [tournaments, setTournaments] = useState<any[]>([]);
    const [tournamentsDropdown, setTournamentsDropdown] = useState<TournamentItems[]>([]);
    const [selectedTournament, setSelectedTournament] = useState<string>("");
    const [tournamentTeams, setTournamentTeams] = useState<any[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<any>();
    const [teamWrestlers, setTeamWrestlers] = useState<any[]>([]);

    const { teams, isError: teamsError } = getTeams();
    const { tournaments: tournamentData, isError: tournamentError } = getFantasyTournaments();
    const { team: teamData, isError: teamError } = getTeam(selectedTeam);
    const table_headers = [
        "", "Wrestler"
    ];
    const table_caption = "";

    useEffect(() => {
        if (tournamentData) {
            const filtered_arr = tournamentData.reduce(
                (acc: Array<any>, cur: any) => {
                    acc.push({ id: cur.id, name: cur.name })
                    return acc;
                },
                new Array()
            );
            setTournaments(tournamentData)
            setTournamentsDropdown(filtered_arr)
        }

    }, [tournamentData])

    useEffect(() => {
        const tournament = tournaments.find((item) => item.id === selectedTournament);
        if (tournament) {
            const tournament_teams = tournament.teams.reduce(
                (acc: Array<any>, cur: any) => {
                    const new_obj = { id: cur.id, name: cur.teamname, wrestlers: cur.wrestlers }
                    acc.push({ ...new_obj })
                    return acc;
                },
                new Array()
            )
            setTournamentTeams(tournament_teams);
        }
    }, [selectedTournament])

    useEffect(() => {
        const team = tournamentTeams.find((item) => item.id === selectedTeam);
        if (team) {
            const wrestlers = team.wrestlers.reduce(
                (acc: Array<any>, cur: any) => {
                    acc.push({ id: cur.id, teamname: cur.ringname, profile: cur.icon_store })
                    return acc;
                },
                new Array()
            )
            setTeamWrestlers(wrestlers);
        }
    }, [selectedTeam])

    if (teamsError) return <div>Failed to Load teams</div>
    if (!teams) return <div>Loading teams...</div>
    if (tournamentError) return <div>Failed to Load tournament data</div>
    if (!tournamentData) return <div>Loading tournament data...</div>
    if (teamError) return <div>Failed to load team</div>

    return (
        <div className=" text-white">
            <div className="flex justify-between">
                <SelectDropdown placeholder="Select a tournament" label="Tournaments" items={tournamentsDropdown} setSelectedTournament={setSelectedTournament} />
                {
                    selectedTournament &&
                    <SelectDropdown placeholder="Select a team" label="Teams" items={tournamentTeams} setSelectedTournament={setSelectedTeam} />
                }
            </div>
            {
                selectedTournament && selectedTeam &&
                <div className="h-full w-3/4 mx-auto">
                    <img src={teamData?.user.avatar_store} className="h-28 w-28 rounded-2xl mx-auto m-4" />
                    <LeagueTable caption={table_caption} headers={table_headers} data={teamWrestlers} />
                </div>
            }
        </div>
    )
}

export default Team;
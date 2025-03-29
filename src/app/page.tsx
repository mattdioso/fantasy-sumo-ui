'use client';
import { useState, useEffect } from "react";
import { getTeams } from "@hooks/teams";
import { getFantasyTournaments } from "@hooks/fantasy_tournaments";
import { SelectDropdown } from "@components/select_dropdown";
import { TournamentItems } from "@components/select_dropdown";
import { LeagueTable } from "@components/league_table";

export default function Home() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [tournamentsDropdown, setTournamentsDropdown] = useState<TournamentItems[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<string>("");
  const [tournamentTeams, setTournamentTeams] = useState<any>();

  const { teams, isError: teamError } = getTeams();
  const { tournaments: tournamentData, isError: tournamentError } = getFantasyTournaments();
  const table_headers = [
    "", "Team Name", "Record", "Total Points"
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
          const new_obj = { id: cur.id, losses: cur.losses, profile: cur.user.avatar_store, teamname: cur.teamname, total_points: cur.total_points, wins: cur.wins }
          acc.push({ ...new_obj })
          return acc;
        },
        new Array()
      )
      setTournamentTeams(tournament_teams.sort((a: any, b: any) => (b.wins - a.wins) || (b.total_points - a.total_points)));
    }
  }, [selectedTournament])

  if (teamError) return <div>Failed to Load teams</div>
  if (!teams) return <div>Loading teams...</div>
  if (tournamentError) return <div>Failed to Load tournament data</div>
  if (!tournamentData) return <div>Loading tournament data...</div>

  return (
    <div className="text-white">
      <SelectDropdown placeholder="Select a tournament" label="Tournaments" items={tournamentsDropdown} setSelectedTournament={setSelectedTournament} />
      {
        tournamentTeams &&

        <LeagueTable caption={table_caption} headers={table_headers} data={tournamentTeams} />

      }
    </div>
  );
}

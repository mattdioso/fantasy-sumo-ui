'use client';
import { Button } from "@components/ui/button"
import {
    Card,
    CardHeader,
} from "@components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@components/ui/table";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@components/ui/tabs"
import { WrestlerDrawer } from "./wrestler_drawer";
import { useState } from "react";
import { parse } from "path";

export function Matches({
    matchData
}: {
    matchData: any[]
}) {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [selectedWrestler, setSelectedWrestler] = useState<any>({})
    const all_matches = matchData.map(match => match.matches).reduce((a, b) => a.concat(b), []);

    const getWrestlerScore = (teamId: string, wrestlerId: string) => {
        const wrestler_matches = all_matches.filter((match: any) => match.wrestler1.id === wrestlerId || match.wrestler2.id === wrestlerId)

        let wrestler_score = 0.0;
        wrestler_matches?.forEach((match: any) => {
            const match_score = match.match_score;
            if (wrestlerId === match.wrestler1.id && match.win1) {
                wrestler_score += parseFloat(match_score.score);
            }
            if (wrestlerId === match.wrestler2.id && match.win2) {
                wrestler_score += parseFloat(match_score.score);
            }
        });

        return wrestler_score.toFixed(1);
    }

    const getTeamScoreForDay = (team_wrestlers: any[], day_matches: any[]): number => {
        let day_scores = [];
        for (let i = 0; i < team_wrestlers.length; i++) {
            const wrestler = team_wrestlers[i];
            const id = wrestler.id;
            const matches = day_matches.filter((match: any) => match.wrestler1.id === id || match.wrestler2.id === id);
            if (matches.length > 0) {
                const match = matches[0];

                if (match.wrestler1.id === id && match.win1) {
                    day_scores.push(parseFloat(match.match_score.score));
                } else if (match.wrestler2.id === id && match.win2) {
                    day_scores.push(parseFloat(match.match_score.score));
                } else {
                    day_scores.push(0);
                }
            }
        }

        return day_scores.reduce((a: any, b: any) => parseFloat(a) + parseFloat(b), 0);
    }

    const getTeamScore = (team: any, matchup: any) => {
        const { matches } = matchup;
        const { day1, day2, day3 } = matchup;
        const { wrestlers } = team;

        let score = 0.0;

        const day1_matches = matches.filter((match: any) => match.day === day1);
        score += getTeamScoreForDay(wrestlers, day1_matches);

        const day2_matches = matches.filter((match: any) => match.day === day2);
        score += getTeamScoreForDay(wrestlers, day2_matches);

        const day3_matches = matches.filter((match: any) => match.day === day3);
        score += getTeamScoreForDay(wrestlers, day3_matches);

        return score.toFixed(1);
    }

    return (
        <Tabs defaultValue={matchData[0].id} className="w-full h-full p-3">
            <TabsList className={`justify-between w-full`}>
                {
                    matchData.map((match: any, i: number) => (
                        <TabsTrigger key={i} value={match.id}>{match.team1.teamname} vs. {match.team2.teamname}</TabsTrigger>
                    ))
                }
            </TabsList>
            {
                matchData.map((match: any, i: number) => (
                    <TabsContent value={match.id} key={i}>
                        <Card className="h-full">
                            <CardHeader className="flex justify-between">
                                <img className="w-20 h-20 rounded-full" src={match.team1.user.avatar_store}></img>
                                <p className="text-6xl">{match.team1_score.toFixed(1)}</p>
                                <p className="text-6xl">{match.team2_score.toFixed(1)}</p>
                                <img className="w-20 h-20 rounded-full" src={match.team2.user.avatar_store}></img>
                            </CardHeader>

                            <Table>
                                <TableBody>
                                    {
                                        match.team1.wrestlers.map((wrestler: any, i: number) => {
                                            const team2Wrestler = match.team2.wrestlers[i];
                                            return (<TableRow key={i} className="text-center">
                                                <TableCell>{wrestler.ringname}</TableCell>
                                                <TableCell onClick={() => { setDrawerOpen(!drawerOpen); setSelectedWrestler(wrestler) }}>{getWrestlerScore(match.team1.id, wrestler.id)}</TableCell>
                                                <TableCell onClick={() => { setDrawerOpen(!drawerOpen); setSelectedWrestler(team2Wrestler) }}>{getWrestlerScore(match.team2.id, team2Wrestler.id)}</TableCell>
                                                <TableCell>{team2Wrestler.ringname}</TableCell>
                                            </TableRow>);
                                        })
                                    }
                                    <TableRow className="text-center">
                                        <TableCell>Total points</TableCell>
                                        <TableCell>{getTeamScore(match.team1, match)}</TableCell>
                                        <TableCell>{getTeamScore(match.team2, match)}</TableCell>
                                        <TableCell>Total points</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <WrestlerDrawer isOpen={drawerOpen} setOpen={setDrawerOpen} wrestler={selectedWrestler} matches={all_matches} matchup={matchData} />
                        </Card>
                    </TabsContent>
                ))
            }
        </Tabs>
    )
}
'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/table";

interface TeamItem {
    id: string;
    losses: number;
    profile: string;
    teamname: string;
    total_points: number;
    wins: number
}

export function LeagueTable({
    caption,
    headers,
    data
}: {
    caption: string;
    headers: string[];
    data: TeamItem[];
}) {
    return (
        <Table>
            <TableCaption>{caption}</TableCaption>
            <TableHeader>
                <TableRow>
                    {
                        headers.map((header, i) => (
                            <TableHead key={i}>{header}</TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((team: TeamItem, i: number) => (
                        <TableRow key={team.id}>
                            <TableCell><img src={team.profile} className="h-16 w-16 rounded-lg"></img></TableCell>
                            <TableCell>{team.teamname}</TableCell>
                            {
                                team.wins || team.losses ? 
                                <TableCell>{team.wins} - {team.losses}</TableCell> : null
                            }
                            { 
                                team.total_points ?
                                <TableCell>{team.total_points.toFixed(1)}</TableCell> : null
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
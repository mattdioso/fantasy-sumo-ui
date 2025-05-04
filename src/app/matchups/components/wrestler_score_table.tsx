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

export interface WrestlerScore {
    name: string;
    opponent: string;
    day: number;
    win: boolean;
    score: number;
}

export function WrestlerScoreTable({
    caption,
    headers,
    data
}: {
    caption: string;
    headers: string[];
    data: WrestlerScore[];
}) {

    return (
        <Table>
            <TableCaption>{caption}</TableCaption>
            <TableHeader>
                <TableRow>
                    {
                        headers.map((header, i) => (
                            <TableHead key={i}><span className="text-white">{header}</span></TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((wrestlerScore: WrestlerScore, i: number) => (
                        <TableRow key={wrestlerScore.day}>
                            <TableCell>{wrestlerScore.name}</TableCell>
                            <TableCell>{wrestlerScore.opponent}</TableCell>
                            <TableCell>{wrestlerScore.day}</TableCell>
                            <TableCell>{wrestlerScore.win ? "Y" : "N"}</TableCell>
                            <TableCell>{parseFloat(wrestlerScore.score.toString()).toFixed(1)}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
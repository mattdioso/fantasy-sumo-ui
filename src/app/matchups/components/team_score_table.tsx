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

export function TeamScoreTable({
    caption,
    headers,
    data,
    totals
}: {
    caption: string;
    headers: string[];
    data: any[];
    totals: number[];
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
                    data.map((wrestlerScore: any, i: number) => (
                        <TableRow className="text-center" key={wrestlerScore.wrestlerId}>
                            <TableCell>{wrestlerScore.wrestler}</TableCell>
                            <TableCell>{wrestlerScore.day1_score}</TableCell>
                            <TableCell>{wrestlerScore.day2_score}</TableCell>
                            <TableCell>{wrestlerScore.day3_score}</TableCell>
                            <TableCell>{wrestlerScore.total}</TableCell>
                        </TableRow>
                    ))
                }
                <TableRow className="text-center">
                    <TableCell>Total</TableCell>
                    <TableCell>{totals[0].toFixed(1)}</TableCell>
                    <TableCell>{totals[1].toFixed(1)}</TableCell>
                    <TableCell>{totals[2].toFixed(1)}</TableCell>
                    <TableCell>{totals.reduce((total, obj) => obj + total, 0).toFixed(1)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
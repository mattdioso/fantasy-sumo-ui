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
    data
}: {
    caption: string;
    headers: string[];
    data: any[];
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
        </Table>
    )
}
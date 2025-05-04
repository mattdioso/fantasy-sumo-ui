'use client';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@components/ui/drawer"
import { Dispatch, SetStateAction } from "react";
import { TeamScoreTable } from "./team_score_table";

export function TeamScoreDrawer({ isOpen, setOpen, team, matchup }: {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    team: any;
    matchup: any;
}) {
    const { day1, day2, day3 } = matchup;
    const headers = ["", `Day ${day1}`, `Day ${day2}`, `Day ${day3}`, "Total"];
    let total_total = 0;
    let table_data: any[] = [];
    team?.wrestlers?.forEach((wrestler: any) => {
        const wrestler_matches = matchup.matches.filter((match: any) => (match.wrestler1.id === wrestler.id) || (match.wrestler2.id === wrestler.id));
        const day1_match = Object.assign({}, ...wrestler_matches.filter((match: any) => match.day === day1));
        const day2_match = Object.assign({}, ...wrestler_matches.filter((match: any) => match.day === day2));
        const day3_match = Object.assign({}, ...wrestler_matches.filter((match: any) => match.day === day3));
        const day1_score = day1_match?.match_score?.score ?? 0;
        const day2_score = day2_match?.match_score?.score ?? 0;
        const day3_score = day3_match?.match_score?.score ?? 0;

        const result = {
            wrestlerId: wrestler.id,
            wrestler: wrestler.ringname,
            day1_score: day1_score,
            day2_score: day2_score,
            day3_score: day3_score,
            total: parseFloat(day1_score) + parseFloat(day2_score) + parseFloat(day3_score)
        }
        table_data.push(result);
        total_total += parseFloat(day1_score) + parseFloat(day2_score) + parseFloat(day3_score);
    });
    const day1_total = parseFloat(table_data.reduce((total, obj) => parseFloat(obj.day1_score) + total, 0));
    const day2_total = parseFloat(table_data.reduce((total, obj) => parseFloat(obj.day2_score) + total, 0));
    const day3_total = parseFloat(table_data.reduce((total, obj) => parseFloat(obj.day3_score) + total, 0));
    const totals = [day1_total, day2_total, day3_total];
    return (
        <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerContent>
                <div className="text-white mx-auto w-full max-w-md">
                    <DrawerHeader>
                        <DrawerTitle><span className="text-white">{team.teamname} Team Breakdown</span></DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <TeamScoreTable caption="" headers={headers} data={table_data} totals={totals} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}
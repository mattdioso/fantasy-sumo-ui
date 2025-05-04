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

import { WrestlerScore, WrestlerScoreTable } from "./wrestler_score_table";
import { Dispatch, SetStateAction } from "react";

export function WrestlerDrawer({ isOpen, setOpen, wrestler, matches, matchup }: {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    wrestler: any;
    matches: any;
    matchup: any;
}) {
    const headers = ["Wrestler", "Opponent", "Day", "Win", "Score"];
    const wrestler_matches = matches.filter((match: any) => match.wrestler1.id === wrestler.id || match.wrestler2.id === wrestler.id);
    const { day1, day2, day3 } = matchup;

    let day_matches = [
        ...wrestler_matches.filter((match: any) => match.day === day1),
        ...wrestler_matches.filter((match: any) => match.day === day2),
        ...wrestler_matches.filter((match: any) => match.day === day3)
    ];
    let table_data: WrestlerScore[] = [];
    for (let i = 0; i < day_matches.length; i++) {
        const item = {
            name: wrestler.ringname,
            opponent: wrestler.id === day_matches[i].wrestler1.id ? day_matches[i].wrestler2.ringname : day_matches[i].wrestler1.ringname,
            day: day_matches[i].day,
            win: wrestler.id === day_matches[i].wrestler1.id && day_matches[i].win1 || wrestler.id === day_matches[i].wrestler2.id && day_matches[i].win2,
            score: day_matches[i].match_score.score
        } as WrestlerScore;
        table_data.push(item)
    }
    return (
        <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerContent>
                <div className="text-white mx-auto w-full max-w-md">
                    <DrawerHeader>
                        <DrawerTitle><span className="text-white">{wrestler.ringname} matches</span></DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <div className="flex w-full space-x-6 pb-4">
                        <img className="h-48" src={wrestler.avatar_store}></img>
                        <WrestlerScoreTable caption="" headers={headers} data={table_data} />
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
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

export function TeamScoreDrawer({ isOpen, setOpen, team, matches, matchup }: {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    team: any;
    matches: any;
    matchup: any;
}) {
    const { day1, day2, day3 } = matchup;
    const headers = ["", `Day ${day1}`, `Day ${day2}`, `Day ${day3}`, "Total"];

    return (
        <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerContent>
                <div className="text-white mx-auto w-full max-w-md">
                    <DrawerHeader>
                        <DrawerTitle><span className="text-white">{team.teamname} Team Breakdown</span></DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
'use client';
import React from 'react';
import { Sidebar, SidebarContent } from '@components/ui/sidebar';
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@components/ui/sidebar";
import { ArrowUpCircleIcon } from "lucide-react";
import { NavMain } from './nav_main';

const navMain = [
    {
        title: "League",
        url: "/"
    },
    {
        title: "Team",
        url: "team"
    },
    {
        title: "Matchups",
        url: "matchups"
    },
    {
        title: "Scores",
        url: "scores"
    },
    {
        title: "Wrestlers",
        url: "wrestlers"
    },
    {
        title: "Draft Results",
        url: "draft"
    }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible='offcanvas' {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="#">
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                <span className="text-base font-semibold">Sumo</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
            </SidebarContent>
        </Sidebar>
    )
}
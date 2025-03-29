import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// TODO: generalize this interface so other components can use it.
export interface TournamentItems {
    id: string,
    name: string
}

export function SelectDropdown({
    placeholder,
    label,
    items,
    setSelectedTournament
}: {
    placeholder: string;
    label: string;
    items: TournamentItems[],
    setSelectedTournament: (tournament: string) => void;
}) {
    return (
        <Select onValueChange={setSelectedTournament}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {
                        items.map((item, i) => (
                            <SelectItem key={i} value={item.id}>{item.name}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
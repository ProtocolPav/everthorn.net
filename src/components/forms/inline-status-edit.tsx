import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {PencilIcon} from "@phosphor-icons/react";

export function InlineStatusSelect({ value, onChange, getStatusConfig }: {
    value: string;
    onChange: (value: string) => void;
    getStatusConfig: Function
}) {
    const [isEditing, setIsEditing] = useState(false);
    const statusConfig = getStatusConfig(value); // Your existing status config function

    if (isEditing) {
        return (
            <Select
                value={value}
                onValueChange={(newValue) => {
                    onChange(newValue);
                    setIsEditing(false);
                }}
                open={true}
                onOpenChange={setIsEditing}
            >
                <SelectTrigger className="w-auto">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="abandoned">Abandoned</SelectItem>
                </SelectContent>
            </Select>
        );
    }

    return (
        <Badge
            variant="secondary"
            className={cn(
                "cursor-pointer hover:opacity-80 transition-opacity",
                statusConfig.bgColor,
                statusConfig.color
            )}
            onClick={() => setIsEditing(true)}
        >
            {value}
            <PencilIcon className="w-3 h-3 ml-1 opacity-60" />
        </Badge>
    );
}

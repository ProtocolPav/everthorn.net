import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PencilIcon } from "@phosphor-icons/react";

export function InlineTypeSelect({
                                     value,
                                     onChange,
                                     getTypeConfig,
                                 }: {
    value: string;
    onChange: (value: string) => void;
    getTypeConfig: (value: string) => { bgColor: string; color: string };
}) {
    const [isEditing, setIsEditing] = useState(false);
    const typeConfig = getTypeConfig(value);

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
                <SelectTrigger className="w-auto capitalize">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="farm">Farm</SelectItem>
                    <SelectItem value="shop">Shop</SelectItem>
                    <SelectItem value="relic">Relic</SelectItem>
                </SelectContent>
            </Select>
        );
    }

    return (
        <Badge
            variant="secondary"
            className={cn(
                "cursor-pointer hover:opacity-80 transition-opacity capitalize",
                typeConfig.bgColor,
                typeConfig.color
            )}
            onClick={() => setIsEditing(true)}
        >
            {value}
            <PencilIcon className="w-3 h-3 ml-1 opacity-60" />
        </Badge>
    );
}

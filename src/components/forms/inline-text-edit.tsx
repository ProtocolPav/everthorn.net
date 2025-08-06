import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CheckIcon, PencilIcon, XCircleIcon} from "@phosphor-icons/react";

export function InlineEditText ({
                            value,
                            onChange,
                            placeholder,
                            className,
                            variant = "input",
                            rows = 3,
                            maxLength
                        }: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    variant?: "input" | "textarea";
    rows?: number;
    maxLength?: number;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const save = () => {
        onChange(tempValue);
        setIsEditing(false);
    };

    const cancel = () => {
        setTempValue(value);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            cancel();
        } else if (e.key === "Enter") {
            // For input: Enter saves
            // For textarea: Enter only saves with Ctrl/Cmd
            if (variant === "input" || (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                save();
            }
        }
    };

    if (isEditing) {
        return (
            <div className="flex items-start gap-2">
                {variant === "textarea" ? (
                    <Textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        rows={rows}
                        maxLength={maxLength}
                        autoFocus
                        className={cn("flex-1", className)}
                    />
                ) : (
                    <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        autoFocus
                        className={cn("flex-1", className)}
                    />
                )}
                <div className={cn("flex gap-1", variant === "textarea" ? 'flex-col': '')}>
                    <Button type="button" size="icon" variant="ghost" onClick={save}>
                        <CheckIcon className="w-3 h-3 text-green-600" />
                    </Button>
                    <Button type="button" size="icon" variant="ghost" onClick={cancel}>
                        <XCircleIcon className="w-3 h-3 text-red-400" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("group flex items-center gap-2 hover:bg-muted/20 rounded-lg px-2 py-1", className)}>
            <div className="flex-1 cursor-pointer" onClick={() => setIsEditing(true)}>
                {variant === "textarea" ? (
                    <div className="min-h-[60px] whitespace-pre-wrap">
                        {value || (
                            <span className="text-muted-foreground italic">
                                {placeholder || "Click to edit"}
                            </span>
                        )}
                    </div>
                ) : (
                    <span>
                        {value || (
                            <span className="text-muted-foreground italic">
                                {placeholder || "Click to edit"}
                            </span>
                        )}
                    </span>
                )}
            </div>

            <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="mt-0.5 shrink-0"
            >
                <PencilIcon className="w-3 h-3 text-muted-foreground" />
            </Button>
        </div>
    );
}

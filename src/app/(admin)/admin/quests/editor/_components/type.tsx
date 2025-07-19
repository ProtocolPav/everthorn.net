import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { formSchema } from "@/app/(admin)/admin/quests/editor/_types/schema";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface QuestTypeProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    disable?: boolean;
}

const questTypes = [
    { value: "story", label: "Story Quest" },
    { value: "side", label: "Side Quest" },
    { value: "minor", label: "Minor Quest" },
];

export function QuestType({ form, disable }: QuestTypeProps) {
    return (
        <FormField
            control={form.control}
            name="quest_type"
            render={({ field }) => (
                <FormItem className={'mt-2'}>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={disable}
                    >
                        <FormControl>
                            <SelectTrigger className={'w-full'}>
                                <SelectValue placeholder="Select a quest type..." />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {questTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

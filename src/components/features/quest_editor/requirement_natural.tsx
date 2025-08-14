import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../../../app/(admin)/admin/quests/editor/_types/schema";
import {FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import * as React from "react";
import {
    Timer,
    MapPinSimpleArea,
    HandGrabbing,
    Cube, Check
} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";
import {Badge} from "@/components/ui/badge";

interface RequirementProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    objective: any
    disable?: boolean
}

export function RequirementNatural({form, objective_index, objective, disable}: RequirementProps) {
    return (
        <div
            className={cn(
                objective.require_natural_block ? 'border-blue-500/50' : '',
                "relative grid cursor-pointer items-center gap-1 rounded-md border bg-secondary/40 p-2.5 text-sm shadow-sm",
                { hidden: objective.objective_type !== "mine" },
            )}
            onClick={() => {
                const newValue = !form.getValues(`objectives.${objective_index}.require_natural_block`);
                form.setValue(`objectives.${objective_index}.require_natural_block`, newValue);
            }}
            role="button"
        >
            <div className={'flex items-center gap-1'}>
                <Cube size={20} weight={'fill'}/>
                Require Natural Blocks
            </div>
            <div hidden={!objective.require_natural_block} className={'font-mono text-gray-500'}>
                Performance Impact
            </div>
            <div className={cn(
                {hidden: !objective.require_natural_block},
                'absolute -right-1 -top-1 rounded-sm p-0.5 bg-blue-500'
            )}>
                <Check size={12} weight={'bold'}/>
            </div>
        </div>
    )
}
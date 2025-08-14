import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../../../app/(admin)/admin/quests/editor/_types/schema";
import * as React from "react";
import {FastForwardCircle, Check} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";

interface RequirementProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    objective: any
    disable?: boolean
}

export function RequirementContinue({form, objective_index, objective, disable}: RequirementProps) {
    return (
        <div
            className={cn(
                objective.continue_on_fail ? 'border-blue-500/50' : '',
                "relative grid cursor-pointer items-center gap-1 rounded-md border bg-secondary/40 p-2.5 text-sm shadow-sm",
                {hidden: objective.objective_type === ''}
            )}
            onClick={() => {
                const newValue = !form.getValues(`objectives.${objective_index}.continue_on_fail`);
                form.setValue(`objectives.${objective_index}.continue_on_fail`, newValue);
            }}
            role="button"
        >
            <div className={'flex items-center gap-1'}>
                <FastForwardCircle size={20} weight={'fill'}/>
                Continue on Fail
            </div>
            <div hidden={!objective.continue_on_fail} className={'font-mono text-gray-500'}>
                Rewards won't be given
            </div>
            <div className={cn(
                {hidden: !objective.continue_on_fail},
                'absolute -right-1 -top-1 rounded-sm bg-blue-500 p-0.5'
            )}>
                <Check size={12} weight={'bold'}/>
            </div>
        </div>
    )
}
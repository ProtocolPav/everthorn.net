import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormDescription, FormField, FormItem, FormLabel} from "@/components/ui/form";
import * as React from "react";
import {
    Timer,
    MapPinSimpleArea,
    HandGrabbing,
    Cube
} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";

interface RequirementProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    objective: any
}

export function RequirementNatural({form, objective_index, objective}: RequirementProps) {
    return (
        <div className={cn({hidden: objective.objective_type !== "mine"}, "my-2 rounded-md border p-3 shadow-sm ")}>
            <FormField
                control={form.control}
                name={`objectives.${objective_index}.require_natural_block`}
                render={({ field }) => (
                    <FormItem>
                        <div className={'flex justify-between'}>
                            <FormLabel className={'flex items-center gap-1'}>
                                <Cube size={20} weight={'fill'}/>
                                Require Natural Blocks
                            </FormLabel>
                            <FormControl>
                                <Switch
                                    className="!m-0"
                                    checked={objective.require_natural_block}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </div>

                        <FormDescription className="text-xs">
                            Blocks will take ~2 seconds to be processed if enabled
                        </FormDescription>
                    </FormItem>
                )}
            />
        </div>
    )
}
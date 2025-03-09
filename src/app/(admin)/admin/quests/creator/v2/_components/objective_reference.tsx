import {FormControl, FormField, FormItem, FormMessage, FormDescription} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import * as React from "react";
import {ControllerRenderProps, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {VirtualizedCombobox} from "@/components/ui/virtualized-combobox";
import {blocks, entities} from "@/lib/minecraft/minecraft-data";
import {Input} from "@/components/ui/input";

interface ObjectiveProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    index: number
    objective: any
}


export function ObjectiveReference({ form, index, objective }: ObjectiveProps) {
    function getInputBox(field: any) {
        if (objective.objective_type !== 'encounter') {
            return (
                <VirtualizedCombobox
                    options={
                        form.getValues(`objectives.${index}.objective_type`) === "mine"
                            ? blocks
                            : entities
                    }
                    searchPlaceholder={'Select Objective'}
                    onOptionSelect={(value: string) => {
                        form.setValue(`objectives.${index}.objective`, value)
                    }}
                    preselect={objective.objective}
                />
            )
        }

        else {
            return ( <Input type={'text'} placeholder={'quest:your_event...'} {...field}/> )
        }

    }

    return (
        <FormField
            control={form.control}
            name={`objectives.${index}.objective`}
            render={({field}) => (
                <FormItem>
                    {getInputBox(field)}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
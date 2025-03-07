import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import * as React from "react";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {VirtualizedCombobox} from "@/components/ui/virtualized-combobox";
import {blocks, entities} from "@/lib/minecraft/minecraft-data";

interface ObjectiveProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    index: number
    objective: any
}

export function ObjectiveReference({ form, index, objective }: ObjectiveProps) {
    return (
        <FormField
            control={form.control}
            name={`objectives.${index}.objective`}
            render={() => (
                <FormItem>
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
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
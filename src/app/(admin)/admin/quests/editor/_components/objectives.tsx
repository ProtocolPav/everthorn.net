import {UseFormReturn} from "react-hook-form";
import {undefined, z} from "zod";
import {formSchema} from "../_types/schema";
import { useFieldArray, UseFormGetValues } from "react-hook-form"
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {Objective} from "./objective";

export function QuestObjectives({form, disable}: {form: UseFormReturn<z.infer<typeof formSchema>>, disable?: boolean}) {
    function addObjective() {
        let objectives = form.getValues("objectives")

        const new_objective = {
            objective: "",
            display: "",
            description: "",
            objective_count: 0,
            objective_type: "",
            require_natural_block: false,
            objective_timer: 0,
            mainhand: "",
            location: [null, null] as [number | null, number | null],
            location_radius: 100,
            continue_on_fail: false,
            required_deaths: 0,
            rewards: []
        }

        !objectives ? objectives = [new_objective] : objectives.push(new_objective)

        form.setValue("objectives", objectives)
    }

    const {fields: objective_fields} = useFieldArray({
        name: "objectives",
        control: form.control,
    })

    return (
        <div className={'mt-3'}>
            <FormField
                control={form.control}
                name="objectives"
                render={() => (
                    <div className={'flex flex-col gap-3'}>
                        <FormMessage/>

                        {objective_fields.map((field, index) => (
                            <Objective key={field.id} form={form} index={index} disable={disable}/>
                        ))}
                    </div>
                )}
            />

            <Button disabled={disable} variant={'secondary'} onClick={() => addObjective()} className={'mt-3 flex w-full justify-center gap-2'}>
                <PlusIcon size={18} /> Add Objective
            </Button>
        </div>

    )
}
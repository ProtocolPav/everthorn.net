import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import { useFieldArray, UseFormGetValues } from "react-hook-form"
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {Objective} from "./objective";

export function QuestObjectives({form}: {form: UseFormReturn<z.infer<typeof formSchema>>}) {
    function addObjective() {
        let objectives = form.getValues("objectives")

        const new_objective = {
            objective: "",
            display: "",
            description: "",
            objective_count: 0,
            objective_type: "",
            natural_block: false,
            require_timer: false,
            objective_timer: 0,
            require_mainhand: false,
            mainhand: "",
            require_location: false,
            location: undefined,
            location_radius: 100,
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
                            <Objective key={index} form={form} index={index}/>
                        ))}
                    </div>
                )}
            />

            <Button variant="secondary" onClick={() => addObjective()} className={'mt-3 flex w-full justify-center'}>
                <PlusIcon /> Add Objective
            </Button>
        </div>

    )
}
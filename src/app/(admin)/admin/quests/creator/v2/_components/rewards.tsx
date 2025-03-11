import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import { useFieldArray, UseFormGetValues } from "react-hook-form"
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {Objective} from "./objective";
import {TreasureChest} from "@phosphor-icons/react";
import {Reward} from "@/app/(admin)/admin/quests/creator/v2/_components/reward";

interface RewardProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    objective: any
}

export function Rewards({form, objective_index, objective}: RewardProps) {
    function addReward() {
        let rewards = form.getValues(`objectives.${objective_index}.rewards`)

        const new_reward = {
            reward: "",
            amount: 0,
            display_name: ""
        }

        !rewards ? rewards = [new_reward] : rewards.push(new_reward)

        form.setValue(`objectives.${objective_index}.rewards`, rewards)
    }

    const {fields: reward_fields} = useFieldArray({
        name: `objectives.${objective_index}.rewards`,
        control: form.control,
    })

    return (
        <div className={'mt-3'}>
            <div className={'mb-2 flex items-center justify-between gap-3'}>
                <h3>{objective.rewards.length} Reward{objective.rewards.length === 1 ? '' : 's'}</h3>
                <Button variant={'ghost'} size={'icon'} className={'flex h-8 w-fit gap-1 px-1'} onClick={() => addReward()}>
                    <PlusIcon size={18} /> Add Reward
                </Button>
            </div>

            <FormField
                control={form.control}
                name={`objectives.${objective_index}.rewards`}
                render={() => (
                    <div className={'flex flex-col gap-3'}>
                        <FormMessage/>

                        {reward_fields.map((field, index) => (
                            <Reward
                                key={field.id}
                                form={form}
                                reward_index={index}
                                objective_index={objective_index}
                                objective={objective}
                            />
                        ))}
                    </div>
                )}
            />
        </div>

    )
}
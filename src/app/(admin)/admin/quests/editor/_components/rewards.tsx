import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import { useFieldArray } from "react-hook-form"
import {FormField, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "@phosphor-icons/react";
import {Reward} from "@/app/(admin)/admin/quests/editor/_components/reward";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Input} from "@/components/ui/input";
import {VirtualizedCombobox} from "@/components/ui/virtualized-combobox";
import {rewards} from "@/lib/minecraft-data";

interface RewardProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    objective: any
    disable?: boolean
}

export function Rewards({form, objective_index, objective, disable}: RewardProps) {
    function addReward(reward: string, amount: number, display_name: string) {
        let rewards = form.getValues(`objectives.${objective_index}.rewards`)

        const new_reward = {
            reward: reward,
            amount: amount,
            display_name: display_name
        }

        !rewards ? rewards = [new_reward] : rewards.push(new_reward)

        form.setValue(`objectives.${objective_index}.rewards`, rewards)

        setTempReward("")
        setTempAmount(0)
        setTempDisplayName("")
        setOpen(false)
    }

    const {fields: reward_fields} = useFieldArray({
        name: `objectives.${objective_index}.rewards`,
        control: form.control,
    })

    const [tempReward, setTempReward] = React.useState<string>("")
    const [tempAmount, setTempAmount] = React.useState<number>(0)
    const [tempDisplayName, setTempDisplayName] = React.useState<string>("")
    const [open, setOpen] = React.useState(false)

    return (
        <div className={'mt-3'}>
            <div className={'mb-2 flex items-center justify-between gap-3'}>
                <h3>{objective.rewards.length} Reward{objective.rewards.length === 1 ? '' : 's'}</h3>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button disabled={disable} type={'button'} variant={'ghost'} size={'icon'} className={'flex h-8 w-fit gap-1 px-1'}>
                            <Plus weight={'fill'} size={18} /> Add Reward
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className={'w-fit items-center space-y-2 p-2'} align={'end'}>
                        <div className={'flex items-center gap-2'}>
                            <Input type={'number'} className={'w-20'} disabled={disable} placeholder={'0'} onChange={(e) => setTempAmount(Number(e.target.value))} /> of
                            <VirtualizedCombobox
                                disabled={disable}
                                options={rewards}
                                searchPlaceholder="Item"
                                onOptionSelect={(value: string) => {
                                    setTempReward(value)
                                }}
                            />
                        </div>

                        <Input disabled={disable} placeholder={'Display Name'} onChange={(e) => setTempDisplayName(e.target.value)} />
                        <Button disabled={disable} size={'sm'} variant={'secondary'} className={'w-full'} onClick={() => addReward(tempReward, tempAmount, tempDisplayName)}>
                            Confirm Create
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>

            <FormField
                control={form.control}
                name={`objectives.${objective_index}.rewards`}
                render={() => (
                    <div className={'flex flex-wrap gap-2'}>
                        <FormMessage/>

                        {reward_fields.map((field, index) => (
                            <Reward
                                disable={disable}
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
import {useFieldArray, useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/app/(admin)/admin/quests/editor/_types/schema";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {
    TreasureChest,
    Trash,
    Timer,
    MapPinSimpleArea,
    HandGrabbing,
    Cube,
    Sword,
    Shovel,
    BracketsCurly,
    Info,
    IconProps, Check
} from "@phosphor-icons/react";
import {VirtualizedCombobox} from "@/components/ui/virtualized-combobox";
import {rewards} from "@/lib/minecraft-data";
import {Input} from "@/components/ui/input";
import {PlusIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";

interface RewardProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    reward_index: number
    objective: any
    disable?: boolean
}

const inputProps = {
    type: "number",
    className: 'h-8 w-14 p-1 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
}

export function Reward({ form, objective_index, reward_index, objective, disable }: RewardProps) {
    function removeReward() {
        const rewards = form.getValues(`objectives.${objective_index}.rewards`)
        rewards?.splice(reward_index, 1)
        form.setValue(`objectives.${objective_index}.rewards`, rewards)
    }

    return (
        <Popover>
            <PopoverTrigger
                disabled={disable}
                className={"relative grid items-center gap-1 rounded-md border bg-secondary/40 p-2.5 text-sm shadow-sm"}
            >
                <div className={'flex items-center gap-1.5'}>
                    <TreasureChest size={20} weight={'fill'}/>
                    {objective.rewards[reward_index].display_name ? objective.rewards[reward_index].display_name : objective.rewards[reward_index].reward}
                </div>
                <div className={'font-mono text-gray-500'}>
                    {objective.rewards[reward_index].amount} of {objective.rewards[reward_index].reward}
                </div>

                <div className={'absolute -right-1 -top-1 flex gap-1.5 text-xs'}>
                    <div className={'size-4 rounded-sm bg-blue-500 p-0'}>
                        {reward_index + 1}
                    </div>

                    <Button type={'button'} size={'icon'} variant={'destructive'} className={'size-4 rounded-sm p-0'} onClick={removeReward}>
                        <Trash size={12} weight={'fill'}/>
                    </Button>
                </div>
            </PopoverTrigger>

            <PopoverContent className={'w-fit space-y-2 p-2'}>
                <FormField
                    control={form.control}
                    name={`objectives.${objective_index}.rewards.${reward_index}.display_name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input disabled={disable} className={'h-8'} placeholder={'Display Name'} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className={'flex items-center gap-1'}>
                    <FormField
                        control={form.control}
                        name={`objectives.${objective_index}.rewards.${reward_index}.amount`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className={'flex items-center gap-1'}>
                                        <Input disabled={disable} placeholder={'0'} {...inputProps} {...field} /> of
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={`objectives.${objective_index}.rewards.${reward_index}.reward`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <VirtualizedCombobox
                                        disabled={disable}
                                        className={'h-8'}
                                        options={rewards}
                                        searchPlaceholder="Item"
                                        onOptionSelect={(value: string) => {
                                            form.setValue(
                                                `objectives.${objective_index}.rewards.${reward_index}.reward`,
                                                value
                                            )
                                        }}
                                        preselect={form.getValues(`objectives.${objective_index}.rewards.${reward_index}.reward`)}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}
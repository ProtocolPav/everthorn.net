import {useFieldArray, useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/app/(admin)/admin/quests/creator/v2/_types/schema";
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
    IconProps
} from "@phosphor-icons/react";
import {VirtualizedCombobox} from "@/components/ui/virtualized-combobox";
import {rewards} from "@/lib/minecraft/minecraft-data";
import {Input} from "@/components/ui/input";
import {PlusIcon} from "lucide-react";

interface RewardProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    reward_index: number
    objective: any
}

const inputProps = {
    type: "number",
    className: 'h-8 w-14 p-1 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
}

export function Reward({ form, objective_index, reward_index, objective }: RewardProps) {
    function removeReward() {
        const rewards = form.getValues(`objectives.${objective_index}.rewards`)
        rewards?.splice(reward_index, 1)
        form.setValue(`objectives.${objective_index}.rewards`, rewards)
    }

    return (
        <Card className={'p-1.5'}>
            <FormField
                control={form.control}
                name={`objectives.${objective_index}.rewards.${reward_index}`}
                render={() => (
                    <div className={''}>
                        <FormLabel className={'flex items-center justify-between gap-2'}>
                            <div className={'flex items-center gap-1'}>
                                <TreasureChest size={20} weight={'fill'} className={'hidden md:block'} />

                                <FormField
                                    control={form.control}
                                    name={`objectives.${objective_index}.rewards.${reward_index}.amount`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className={'flex items-center gap-1'}>
                                                    <Input placeholder={'0'} {...inputProps} {...field} /> of
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
                                                <div className={'flex items-center gap-1'}>
                                                    <VirtualizedCombobox
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
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button size={'icon'} variant={'destructive'} className={'size-8'} onClick={removeReward}>
                                <Trash
                                    size={15}
                                    weight={'fill'}
                                />
                            </Button>
                        </FormLabel>
                    </div>
                )}
            />
        </Card>

    )
}
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Skull, Check, ArrowUUpLeft} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";
import {VirtualizedCombobox} from "@/components/ui/virtualized-combobox";
import {items} from "@/lib/minecraft/minecraft-data";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

interface RequirementProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    objective: any
    disable?: boolean
}

const inputProps = {
    type: "number",
    placeholder: "0",
    max: 20,
    className: 'h-fit w-10 p-1 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
}

export function RequirementDeaths({form, objective_index, objective, disable}: RequirementProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger disabled={disable} className={cn(
                objective.required_deaths ? 'border-blue-500/50' : '',
                "relative grid items-center gap-1 rounded-md border bg-secondary/40 p-2.5 text-sm shadow-sm",
                { hidden: objective.objective_type === '' },
            )}>
                <div className={'flex items-center gap-1'}>
                    <Skull size={20} weight={'fill'}/>
                    Require Deaths
                </div>
                <div hidden={!objective.required_deaths} className={'font-mono text-gray-500'}>
                    die fewer than {objective.required_deaths} times
                </div>
                <div className={cn(
                    {hidden: !objective.required_deaths},
                    'absolute -right-1 -top-1 rounded-sm bg-blue-500 p-0.5'
                )}>
                    <Check size={12} weight={'bold'}/>
                </div>
            </PopoverTrigger>

            <PopoverContent className={'w-80 space-y-2 p-2'}>
                <FormField
                    control={form.control}
                    name={`objectives.${objective_index}.required_deaths`}
                    render={({ field }) => (
                        <FormItem>
                            <div className={'flex items-center justify-between gap-1'}>
                                <h3 className={'text-lg'}>
                                    Die fewer than...
                                </h3>

                                <Button size={'sm'} type={'reset'} variant={'secondary'} className={'flex h-8 gap-1'} onClick={() => {
                                    form.setValue(`objectives.${objective_index}.required_deaths`, 0);
                                    setOpen(false);
                                }}>
                                    <ArrowUUpLeft size={15}/>
                                    Undo
                                </Button>
                            </div>
                            <FormControl>
                                <div className={'flex items-center gap-1'}>
                                    <Input disabled={disable} {...inputProps} {...field} value={!field.value ? '' : field.value} />
                                    times
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </PopoverContent>
        </Popover>
    )
}
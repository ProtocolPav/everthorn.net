import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {
    Timer, Check, ArrowUUpLeft
} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

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
    className: 'h-fit w-8 p-1 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
}

export function RequirementTimer({form, objective_index, objective, disable}: RequirementProps) {
    const [hour, setHour] = React.useState<number>(0)
    const [minute, setMinute] = React.useState<number>(0)
    const [second, setSecond] = React.useState<number>(0)
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        form.setValue(
            `objectives.${objective_index}.objective_timer`,
            second + minute * 60 + hour * 60 * 60
        );
    }, [hour, minute, second, objective_index, form]);

    function handleHours(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.valueAsNumber ? setHour(event.target.valueAsNumber) : setHour(0)
    }

    function handleMinutes(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.valueAsNumber ? setMinute(event.target.valueAsNumber) : setMinute(0)
    }

    function handleSeconds(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.valueAsNumber ? setSecond(event.target.valueAsNumber) : setSecond(0)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger disabled={disable} className={cn(
                objective.objective_timer ? 'border-blue-500/50' : '',
                "relative grid items-center gap-1 rounded-md border bg-secondary/40 p-2.5 text-sm shadow-sm",
                {hidden: objective.objective_type === ''},
            )}>
                <div className={'flex items-center gap-1'}>
                    <Timer size={20} weight={'fill'}/>
                    Require Timer
                </div>
                <div hidden={!objective.objective_timer} className={'font-mono text-gray-500'}>
                    within {hour ? `${hour}h` : ''} {minute ? `${minute}m` : ''} {second ? `${second}s` : ''}
                </div>
                <div className={cn(
                    {hidden: !objective.objective_timer},
                    'absolute -right-1 -top-1 rounded-sm bg-blue-500 p-0.5'
                )}>
                    <Check size={12} weight={'bold'}/>
                </div>
            </PopoverTrigger>

            <PopoverContent className={'w-fit space-y-2 p-2'}>
                <FormField
                    control={form.control}
                    name={`objectives.${objective_index}.objective_timer`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={'flex items-center justify-between gap-1'}>
                                <h3 className={'text-lg'}>
                                    Complete within...
                                </h3>

                                <Button size={'sm'} type={'reset'} variant={'secondary'} className={'flex h-8 gap-1'} onClick={() => {
                                    form.setValue(`objectives.${objective_index}.objective_timer`, 0);
                                    setHour(0);
                                    setMinute(0);
                                    setSecond(0);
                                    setOpen(false);
                                }}>
                                    <ArrowUUpLeft size={15}/>
                                    Undo
                                </Button>
                            </FormLabel>
                            <FormControl>
                                <div className={'flex gap-3 text-sm'}>
                                    <div className={'flex items-center gap-1'}>
                                        <Input value={hour === 0 ? '' : hour} disabled={disable} {...inputProps} onChange={handleHours} />
                                        Hours
                                    </div>
                                    <div className={'flex items-center gap-1'}>
                                        <Input value={minute === 0 ? '' : minute} disabled={disable} {...inputProps} onChange={handleMinutes} />
                                        Minutes
                                    </div>
                                    <div className={'flex items-center gap-1'}>
                                        <Input value={second === 0 ? '' : second} disabled={disable} {...inputProps} onChange={handleSeconds} />
                                        Seconds
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </PopoverContent>
        </Popover>
    )
}
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {
    Timer,
    MapPinSimpleArea,
    HandGrabbing,
    Cube
} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";

interface RequirementProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    objective_index: number
    objective: any
}

const inputProps = {
    type: "number",
    placeholder: "00",
    max: 20,
    className: 'h-fit w-8 p-1 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
}

export function RequirementTimer({form, objective_index, objective}: RequirementProps) {
    const [hour, setHour] = React.useState<number>(0)
    const [minute, setMinute] = React.useState<number>(0)
    const [second, setSecond] = React.useState<number>(0)

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
        <div className={cn(
            {hidden: objective.objective_type === ''},
            "rounded-md border bg-secondary/40 p-3 shadow-sm"
        )}>
            <FormField
                control={form.control}
                name={`objectives.${objective_index}.require_timer`}
                render={({ field }) => (
                    <FormItem className={'flex justify-between'}>
                        <FormLabel className={'flex items-center gap-1'}>
                            <Timer size={20} weight={'fill'}/>
                            Require Timer
                        </FormLabel>
                        <FormControl>
                            <Switch
                                className="!m-0"
                                checked={objective.require_timer}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />

            <div className={cn(!objective.require_timer ? "!hidden" : "", "mt-1.5 flex w-full justify-stretch gap-4")}>
                <FormField
                    control={form.control}
                    name={`objectives.${objective_index}.objective_timer`}
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <div className={'flex items-center gap-0.5 text-sm'}>
                                    <div className={'mr-0.5'}>Complete within</div>
                                    <Input {...inputProps} onChange={handleHours} /> h
                                    <Input {...inputProps} onChange={handleMinutes} /> m
                                    <Input {...inputProps} onChange={handleSeconds} /> s
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}
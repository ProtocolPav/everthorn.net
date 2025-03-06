import {useFieldArray, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/app/(admin)/admin/quests/creator/v2/_types/schema";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {useState} from "react";
import {ChevronDownIcon} from "lucide-react";
import {Trash, Timer, MapPinSimpleArea, HandGrabbing, Cube, Icon} from "@phosphor-icons/react";
import {cn} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";

interface ObjectiveProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    index: number
}

export function Objective({ form, index }: ObjectiveProps) {
    const [open, setOpen] = useState(true)

    const {fields: reward_fields} = useFieldArray({
        name: `objectives.${index}.rewards`,
        control: form.control,
    })

    function removeObjective() {
        const objectives = form.getValues("objectives")
        objectives.splice(index, 1)
        form.setValue("objectives", objectives)
    }

    function getRequirementIcons() {
        const objective = form.getValues(`objectives.${index}`);
        let icons = [];

        objective.require_location ? icons.push(MapPinSimpleArea) : null;
        objective.require_mainhand ? icons.push(HandGrabbing) : null;
        objective.require_timer ? icons.push(Timer) : null;
        objective.natural_block && objective.objective_type === 'mine' ? icons.push(Cube) : null;

        return (
            <>
                {icons.map((IconComponent, index) => (
                    <Button key={index} size={'icon'} variant={'ghost'} className={'size-8 bg-gray-400/5'}>
                        <IconComponent
                            size={20}
                            weight={'fill'}
                        />
                    </Button>
                ))}
            </>
        );
    }

    return (
        <Card className={'p-1.5'}>
            <FormField
                control={form.control}
                name={`objectives.${index}`}
                render={() => (
                    <Collapsible
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <div className={'flex justify-between gap-1.5'}>
                            <CollapsibleTrigger asChild>
                                <Button size={'icon'} variant={'ghost'} className={'size-8'}>
                                    <ChevronDownIcon
                                        size={15}
                                        className={cn({ "rotate-180": open }, "transition-all")}
                                    />
                                </Button>
                            </CollapsibleTrigger>

                            <CollapsibleTrigger asChild className={'w-full'}>
                                <FormLabel className="text-2xl font-semibold hover:cursor-pointer hover:font-extrabold">
                                    {`${index + 1}. ${form.getValues(`objectives.${index}.objective`)}`}
                                </FormLabel>
                            </CollapsibleTrigger>

                            <div className={'flex gap-1'}>
                                {getRequirementIcons()}

                                <Button size={'icon'} variant={'destructive'} className={'ml-1 size-8'} onClick={removeObjective}>
                                    <Trash
                                        size={15}
                                        weight={'fill'}
                                    />
                                </Button>
                            </div>
                        </div>


                        <CollapsibleContent className={'flex flex-col gap-2 p-1'}>
                            <FormField
                                control={form.control}
                                name={`objectives.${index}.description`}
                                render={({ field }) => (
                                    <FormItem className={'mt-3'}>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Objective flavour text goes here. Any big story reveals?"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className={'flex grid-cols-2 gap-2 md:grid-cols-3'}>
                                <FormField
                                    control={form.control}
                                    name={`objectives.${index}.objective_type`}
                                    render={({ field }) => (
                                        <FormItem className={'w-44'}>
                                            <FormControl>
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={'Kill...'} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="kill">Kill</SelectItem>
                                                        <SelectItem value="mine">Mine</SelectItem>
                                                        <SelectItem value="encounter">Custom Encounter</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`objectives.${index}.objective_count`}
                                    render={({ field }) => (
                                        <FormItem className={'md:w-20'}>
                                            <FormControl>
                                                <Input type="number" placeholder="43" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )}
            />
        </Card>

    )
}
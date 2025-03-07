import {useFieldArray, useForm, UseFormReturn} from "react-hook-form";
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
import {Trash, Timer, MapPinSimpleArea, HandGrabbing, Cube, Sword, Axe, BracketsCurly, IconProps} from "@phosphor-icons/react";
import {capitalizeCase, cn} from "@/lib/utils";
import {QuestDescription} from "@/app/(admin)/admin/quests/creator/v2/_components/description";
import {ObjectiveType} from "@/app/(admin)/admin/quests/creator/v2/_components/objective_type";
import {ObjectiveCount} from "@/app/(admin)/admin/quests/creator/v2/_components/objective_count";

interface ObjectiveProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    index: number
}

export function Objective({ form, index }: ObjectiveProps) {
    const [open, setOpen] = useState(true)

    const objective = form.watch(`objectives.${index}`);

    const {fields: reward_fields} = useFieldArray({
        name: `objectives.${index}.rewards`,
        control: form.control,
    })

    function removeObjective() {
        const objectives = form.getValues("objectives")
        objectives.splice(index, 1)
        console.log(objectives)
        form.setValue("objectives", objectives)
    }

    function getRequirementIcons() {
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

    function ObjectiveDisplayComponent() {
        const type = objective.objective_type

        const iconProps: IconProps = { weight: 'fill', size: 30, className: 'my-auto' }

        if (type && type !== 'encounter') {
            return (
                <div className={'flex gap-1'}>
                    {type === 'kill' ? <Sword {...iconProps}/> : <Axe {...iconProps}/>}
                    {capitalizeCase(type)}
                </div>
            )
        }
        return (<div>Objective {index+1}</div>)
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
                                <Button size={'icon'} variant={'ghost'} className={'flex size-9 gap-0.5 p-0.5'}>
                                    {index+1}
                                    <ChevronDownIcon
                                        size={15}
                                        className={cn({ "rotate-180": open }, "transition-all")}
                                    />
                                </Button>
                            </CollapsibleTrigger>

                            <CollapsibleTrigger asChild className={'w-full'}>
                                <FormLabel className="flex gap-1 text-2xl font-semibold hover:cursor-pointer hover:font-extrabold">
                                    <ObjectiveDisplayComponent />
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
                            <QuestDescription
                                form={form}
                                field_name={`objectives.${index}.description`}
                                placeholder={'Describe what people should be doing, how, and why. Storyify it up!'}
                            />

                            <div className={'flex grid-cols-2 gap-2 md:grid-cols-3'}>
                                <ObjectiveType form={form} index={index}/>
                                <ObjectiveCount form={form} index={index}/>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )}
            />
        </Card>

    )
}
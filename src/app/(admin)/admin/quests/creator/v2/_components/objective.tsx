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
import {useEffect, useState} from "react";
import {ChevronDownIcon} from "lucide-react";
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
import {capitalizeCase, cn} from "@/lib/utils";
import {QuestDescription} from "./description";
import {ObjectiveType} from "./objective_type";
import {ObjectiveCount} from "./objective_count";
import {ObjectiveReference} from "./objective_reference";
import {Separator} from "@/components/ui/separator";
import {RequirementNatural} from "./requirement_natural";
import {RequirementTimer} from "./requirement_timer";
import {RequirementLocation} from "@/app/(admin)/admin/quests/creator/v2/_components/requirement_location";
import {RequirementMainhand} from "@/app/(admin)/admin/quests/creator/v2/_components/requirement_mainhand";
import {Rewards} from "@/app/(admin)/admin/quests/creator/v2/_components/rewards";
import {ObjectiveDisplay} from "@/app/(admin)/admin/quests/creator/v2/_components/objective_display";

interface ObjectiveProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    index: number
}

export function Objective({ form, index }: ObjectiveProps) {
    const [open, setOpen] = useState(false)

    const objective = form.watch(`objectives.${index}`);

    function removeObjective() {
        const objectives = form.getValues("objectives")
        objectives.splice(index, 1)
        form.setValue("objectives", objectives)
    }

    function getRequirementIcons() {
        let icons = [];

        objective.require_location ? icons.push(MapPinSimpleArea) : null;
        objective.require_mainhand ? icons.push(HandGrabbing) : null;
        objective.require_timer ? icons.push(Timer) : null;
        objective.require_natural_block && objective.objective_type === 'mine' ? icons.push(Cube) : null;

        return (
            <div className={'flex gap-1'}>
                {icons.map((IconComponent, index) => (
                    <Button key={index} size={'icon'} variant={'ghost'} className={'size-8 bg-gray-400/5'}>
                        <IconComponent
                            size={20}
                            weight={'fill'}
                        />
                    </Button>
                ))}
            </div>
        );
    }

    function getRewardIcon() {
        return (
            <Button variant={'ghost'} className={'flex h-8 gap-1 bg-gray-400/5 p-1 text-xs'}>
                {objective.rewards && objective.rewards.length > 0 ? objective.rewards.length : 0}
                <TreasureChest
                    size={18}
                    weight={'fill'}
                />
            </Button>
        );
    }

    function ObjectiveDisplayComponent() {
        const type = objective.objective_type

        const iconProps: IconProps = { weight: 'fill', className: 'my-auto size-5 md:size-7' }

        if (type && type !== 'encounter') {
            return (
                <div className={'flex gap-1 text-xl font-semibold hover:cursor-pointer hover:font-extrabold md:text-2xl'}>
                    {type === 'kill' ? <Sword {...iconProps}/> : <Shovel {...iconProps}/>}
                    {capitalizeCase(type)} {objective.objective_count}
                    {objective.objective ? capitalizeCase(objective.objective.split(":")[1].replaceAll("_", " ")) : null}
                </div>
            )
        }
        else if (type === 'encounter' && objective.display) {
            return (
                <div className={'flex gap-1 text-lg font-semibold hover:cursor-pointer hover:font-extrabold md:text-2xl'}>
                    <BracketsCurly {...iconProps}/>
                    {capitalizeCase(objective.display)}
                </div>
            )
        }
        return (
            <div className={'text-lg font-semibold hover:cursor-pointer hover:font-extrabold md:text-2xl'}>
                Objective {index+1}
            </div>
        )
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
                                <Button variant={'ghost'} className={'flex size-9 gap-0.5 p-1.5'}>
                                    {index+1}
                                    <ChevronDownIcon
                                        size={15}
                                        className={cn({ "rotate-180": open }, "transition-all")}
                                    />
                                </Button>
                            </CollapsibleTrigger>

                            <CollapsibleTrigger asChild className={'w-full'}>
                                <FormLabel>
                                    <ObjectiveDisplayComponent />
                                </FormLabel>
                            </CollapsibleTrigger>

                            <div className={'hidden gap-1 md:flex'}>
                                {getRewardIcon()}
                                {getRequirementIcons()}

                                <Button size={'icon'} variant={'destructive'} className={'ml-1 size-8'} onClick={removeObjective}>
                                    <Trash
                                        size={15}
                                        weight={'fill'}
                                    />
                                </Button>
                            </div>
                        </div>

                        <div className={'flex justify-between gap-1 md:hidden'}>
                            {getRewardIcon()}
                            {getRequirementIcons()}

                            <Button size={'icon'} variant={'destructive'} className={'ml-1 size-8'} onClick={removeObjective}>
                                <Trash
                                    size={15}
                                    weight={'fill'}
                                />
                            </Button>
                        </div>

                        <CollapsibleContent className={'m-0 flex flex-col gap-2 p-0'}>
                            <div className={'p-1'}>
                                <QuestDescription
                                    form={form}
                                    field_name={`objectives.${index}.description`}
                                    placeholder={'Describe what people should be doing, how, and why. Storyify it up!'}
                                />

                                <div className={'flex w-full flex-wrap gap-2 md:gap-2'}>
                                    <div className={'flex gap-2'}>
                                        <ObjectiveType form={form} index={index} />
                                        <ObjectiveCount form={form} index={index} />
                                    </div>

                                    <ObjectiveReference form={form} index={index} objective={objective} />
                                </div>

                                <ObjectiveDisplay form={form} index={index} objective={objective} />

                                <Separator className={cn({hidden: objective.objective_type === ''}, 'my-4')}/>

                                <div className={'flex flex-col gap-2'}>
                                    <h3>Requirements</h3>
                                    <RequirementNatural form={form} objective_index={index} objective={objective} />
                                    <RequirementTimer form={form} objective_index={index} objective={objective} />
                                    <RequirementLocation form={form} objective_index={index} objective={objective} />
                                    <RequirementMainhand form={form} objective_index={index} objective={objective} />
                                </div>

                                <Separator className={'mt-4'}/>

                                <Rewards form={form} objective_index={index} objective={objective} />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )}
            />
        </Card>

    )
}
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/app/(admin)/admin/quests/editor/_types/schema";
import {FormField, FormLabel} from "@/components/ui/form";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {useState} from "react";
import {ChevronDownIcon, PlusIcon} from "lucide-react";
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
    IconProps, FastForwardCircle, Skull, Gear
} from "@phosphor-icons/react";
import {capitalizeCase, cn} from "@/lib/utils";
import {QuestDescription} from "./description";
import {ObjectiveType} from "./objective_type";
import {ObjectiveCount} from "./objective_count";
import {ObjectiveReference} from "./objective_reference";
import {Separator} from "@/components/ui/separator";
import {RequirementNatural} from "./requirement_natural";
import {RequirementTimer} from "./requirement_timer";
import {RequirementLocation} from "@/app/(admin)/admin/quests/editor/_components/requirement_location";
import {RequirementMainhand} from "@/app/(admin)/admin/quests/editor/_components/requirement_mainhand";
import {Rewards} from "@/app/(admin)/admin/quests/editor/_components/rewards";
import {ObjectiveDisplay} from "@/app/(admin)/admin/quests/editor/_components/objective_display";
import {RequirementContinue} from "@/app/(admin)/admin/quests/editor/_components/requirement_continue";
import {RequirementDeaths} from "@/app/(admin)/admin/quests/editor/_components/requirement_deaths";

interface TagsProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    disable?: boolean
}

export function Tags({ form, disable }: TagsProps) {
    const objectives = form.watch(`objectives`);

    function removeTag(tag: string) {
        const tags = form.getValues("tags")
        tags.filter((s) => s !== tag)
        form.setValue("tags", tags)
    }

    return (
        <Card className={'p-1.5 shadow-[0px_0px_17px_1px_rgba(0,_0,_0,_0.2)]'}>
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

                                <Button disabled={disable} size={'icon'} variant={'destructive'} className={'ml-1 size-8'} onClick={removeObjective}>
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

                            <Button disabled={disable} size={'icon'} variant={'destructive'} className={'ml-1 size-8'} onClick={removeObjective}>
                                <Trash
                                    size={15}
                                    weight={'fill'}
                                />
                            </Button>
                        </div>

                        <CollapsibleContent className={'m-0 flex flex-col gap-2 p-0'}>
                            <div className={'p-1'}>
                                <QuestDescription
                                    disable={disable}
                                    form={form}
                                    field_name={`objectives.${index}.description`}
                                    placeholder={'Describe what people should be doing, how, and why. Storyify it up!'}
                                />

                                <ObjectiveDisplay disable={disable} form={form} index={index} objective={objective} />

                                <div className={'w-full gap-2 md:flex'}>
                                    <div className={'flex gap-2'}>
                                        <ObjectiveType form={form} index={index} disable={disable} />
                                        <ObjectiveCount form={form} index={index} disable={disable} />
                                    </div>

                                    <ObjectiveReference form={form} index={index} objective={objective} disable={disable} />
                                </div>

                                <Separator className={cn({hidden: objective.objective_type === ''}, 'my-4')}/>

                                <h3 className={'flex justify-between'}>
                                    Customization

                                    <Button type={'button'} variant={'ghost'} size={'icon'} className={'flex h-8 w-fit gap-1 px-1'}>
                                        <Gear weight={'fill'} size={18}/>
                                        Advanced
                                    </Button>
                                </h3>
                                <div className={'mt-2 flex flex-wrap gap-2'}>
                                    <RequirementNatural form={form} objective_index={index} objective={objective} disable={disable} />
                                    <RequirementTimer form={form} objective_index={index} objective={objective} disable={disable} />
                                    <RequirementLocation form={form} objective_index={index} objective={objective} disable={disable} />
                                    <RequirementMainhand form={form} objective_index={index} objective={objective} disable={disable} />
                                    <RequirementContinue form={form} objective_index={index} objective={objective} disable={disable} />
                                    <RequirementDeaths form={form} objective_index={index} objective={objective} disable={disable} />
                                </div>

                                <Separator className={'mt-4'}/>

                                <Rewards form={form} objective_index={index} objective={objective} disable={disable} />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )}
            />
        </Card>

    )
}
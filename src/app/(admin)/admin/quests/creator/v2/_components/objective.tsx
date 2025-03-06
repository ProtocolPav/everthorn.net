import {useFieldArray, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/app/(admin)/admin/quests/creator/v2/_types/schema";
import {FormField} from "@/components/ui/form";
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
                        <div className={'flex justify-between'}>
                            <CollapsibleTrigger className={'align-center flex w-full gap-1.5'}>
                                <Button size={'icon'} variant={'ghost'} className={'size-8'}>
                                    <ChevronDownIcon
                                        size={15}
                                        className={cn(
                                            { "rotate-180": open },
                                            "transition-all"
                                        )}
                                    />
                                </Button>

                                <h4 className={'my-auto'}>
                                    {`${index + 1}. ${form.getValues(`objectives.${index}.objective`)}`}
                                </h4>
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


                        <CollapsibleContent>
                            dsadsadsa
                        </CollapsibleContent>
                    </Collapsible>
                )}
            />
        </Card>

    )
}
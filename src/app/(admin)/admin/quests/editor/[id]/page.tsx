"use client"
import * as React from "react";
import {Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {formSchema} from "../_types/schema"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {QuestTitle} from "../_components/title"
import {QuestDescription} from "@/app/(admin)/admin/quests/editor/_components/description";
import {QuestDates} from "@/app/(admin)/admin/quests/editor/_components/dates";
import {Separator} from "@/components/ui/separator";
import {QuestObjectives} from "@/app/(admin)/admin/quests/editor/_components/objectives";
import {formatApiToData, formatDataToApi} from "../_types/api_schema";
import {Toaster} from "@/components/ui/toaster";
import {useToast} from "@/components/ui/use-toast";
import {LoadJSON} from "@/app/(admin)/admin/quests/editor/_components/load_json";
import {useParams} from "next/navigation";
import {useQuest} from "@/hooks/use-quest";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export default function QuestsCreator() {
    const params = useParams<{ id: string }>()
    const [submitted, setSubmitted] = React.useState(params.id !== 'new');
    const { toast } = useToast()
    const { quest, isLoading, isError } = useQuest(params.id);

    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    })

    React.useEffect(() => {
        if (quest) {
            const data = formatApiToData(quest);
            form.setValue('title', data.title);
            form.setValue('description', data.description);
            form.setValue('range', data.range);
            form.setValue('objectives', data.objectives);
        }
    }, [quest, form]);

    async function onSubmit(form: z.infer<typeof formSchema>): Promise<void> {
        let apiReadyData = formatDataToApi(form)

        const questResponse = await fetch("/nexuscore-api/v0.2/quests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiReadyData),
        })

        if (questResponse.ok) {
            setSubmitted(true)
            toast({
                title: "Success!",
                description: "The quest has been submitted!",
            })
        } else {
            toast({
                title: "Error!",
                description: `
            Something went wrong!
            ${questResponse.status}: ${questResponse.statusText}
          `,
                variant: "destructive",
            })
        }
    }

    async function onCopy(form: z.infer<typeof formSchema>) {
        let apiReadyData = formatDataToApi(form)
        await navigator.clipboard.writeText(JSON.stringify(apiReadyData, null, 2))

        toast({
            title: "Copied To Clipboard",
            description: `${JSON.stringify(apiReadyData)}`,
        })
    }

    if (isLoading) {
        return (
            <div>Loading Quest Data...</div>
        )
    }

    return (
        <section className="grid items-center gap-6 pb-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className={'bg-gray-400/5 shadow-xl backdrop-blur-sm md:w-4/5'}>
                        {submitted &&
                            <CardContent className={'p-3'}>
                                <Alert className={'bg-attention/30'}>
                                    <AlertTitle>Read-Only Mode</AlertTitle>
                                    <AlertDescription>
                                        You're viewing a previously published quest. You can't save your edits just yet, but keep
                                        an eye out for that functionality in the future!
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        }

                        <CardContent className={'p-3'}>
                            <QuestTitle form={form} disable={submitted} />
                            <QuestDescription
                                form={form}
                                field_name={'description'}
                                placeholder={'A flavourful quest hook! Get people wishing they could do this quest!'}
                                disable={submitted}
                            />
                            <QuestDates form={form} disable={submitted} />
                            <Separator/>
                            <QuestObjectives form={form} disable={submitted} />
                        </CardContent>

                        <CardFooter className={'flex justify-between gap-3 p-3'}>
                            <Button variant={'secondary'} type={'submit'} disabled={submitted}>
                                Submit
                            </Button>

                            <div className={'flex gap-3'}>
                                <LoadJSON form={form}/>

                                <Button variant={'ghost'} type={'button'} onClick={async () => onCopy(form.getValues())}>
                                    Copy JSON
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
            <Toaster />
        </section>
    )
}
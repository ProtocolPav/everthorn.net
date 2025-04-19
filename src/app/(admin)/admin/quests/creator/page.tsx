"use client"
import * as React from "react";
import {Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {formSchema} from "./_types/schema"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {QuestTitle} from "./_components/title"
import {QuestDescription} from "@/app/(admin)/admin/quests/creator/_components/description";
import {QuestDates} from "@/app/(admin)/admin/quests/creator/_components/dates";
import {Separator} from "@/components/ui/separator";
import {QuestObjectives} from "@/app/(admin)/admin/quests/creator/_components/objectives";
import {formatDataToApi} from "./_types/api_schema";
import {Toaster} from "@/components/ui/toaster";
import {useToast} from "@/components/ui/use-toast";
import {LoadJSON} from "@/app/(admin)/admin/quests/creator/_components/load_json";

export default function QuestsCreator() {
    const [submitted, setSubmitted] = React.useState(false);
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    })

    async function onSubmit(form: z.infer<typeof formSchema>): Promise<void> {
        let apiReadyData = formatDataToApi(form)

        const questResponse = await fetch("/nexuscore-api/v0.1/quests", {
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

    return (
        <section className="grid items-center gap-6 pb-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className={'bg-gray-400/5 shadow-xl backdrop-blur-sm md:w-4/5'}>

                        <CardContent className={'p-3'}>
                            <QuestTitle form={form} />
                            <QuestDescription
                                form={form}
                                field_name={'description'}
                                placeholder={'A flavourful quest hook! Get people wishing they could do this quest!'}
                            />
                            <QuestDates form={form}/>
                            <Separator/>
                            <QuestObjectives form={form}/>
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
"use client"
import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {formSchema} from "./_types/schema"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {QuestTitle} from "./_components/title"
import {QuestDescription} from "@/app/(admin)/admin/quests/creator/v2/_components/description";
import {QuestDates} from "@/app/(admin)/admin/quests/creator/v2/_components/dates";
import {Separator} from "@/components/ui/separator";
import {QuestObjectives} from "@/app/(admin)/admin/quests/creator/v2/_components/objectives";

export default function QuestsCreator() {
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    })

    const handleonChange = (field: any) => async (event: any) => {
        form.setValue(field.name, event.target.value);
        await form.trigger(field.name);
    };

    async function onSubmit(form: z.infer<typeof formSchema>): Promise<void> {
        console.log('submitted')
        console.log(form)
    }

    return (
        <>
            <Alert className={'bg-attention/30'}>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription className={''}>
                    You're on the new Quest Creator. If you experience bugs, head over to the old one by clicking
                    <Button asChild variant={'link'} size={'sm'} className={'mx-1 h-fit p-0 text-xs'}>
                        <Link href={'/admin/quests/creator/'}>Here!</Link>
                    </Button>
                </AlertDescription>
            </Alert>

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
                            
                            <CardFooter className={'p-3'}>
                                <Button variant={'secondary'} type={'submit'}>
                                    Submit
                                </Button>
                                <Button variant={'secondary'} onClick={() => onSubmit(form.getValues())}>
                                    Copy
                                </Button>
                            </CardFooter>

                        </Card>
                    </form>
                </Form>
            </section>
        </>

    )
}
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
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {QuestTitle} from "./_components/title"
import {QuestDescription} from "@/app/(admin)/admin/quests/creator/v2/_components/description";
import {QuestDates} from "@/app/(admin)/admin/quests/creator/v2/_components/dates";

export default function QuestsCreator() {
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema)
    })

    const handleonChange = (field: any) => async (event: any) => {
        form.setValue(field.name, event.target.value);
        await form.trigger(field.name);
    };

    async function onSubmit(form: z.infer<typeof formSchema>): Promise<void> {
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
                        <Card className={'md:w-4/5'}>
                            <CardContent className={'px-3 py-2'}>
                                <QuestTitle form={form} />
                                <QuestDescription form={form}/>
                                <QuestDates form={form}/>
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            </section>
        </>

    )
}
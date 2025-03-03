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
            <Alert className={'lg:mx-5'}>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription className={''}>
                    You're on the new Quest Creator. If you experience bugs, head over to the old one by clicking
                    <Button asChild variant={'link'} size={'sm'} className={'mx-1 h-fit p-0 text-xs'}>
                        <Link href={'/admin/quests/creator/'}>Here!</Link>
                    </Button>
                </AlertDescription>
            </Alert>

            <section className="mx-5 grid items-center gap-6 pb-8 pt-6">
                <h2>Quest Creator</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card className={'p-0.5'}>
                            <CardTitle className={'m-2'}>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="my-4">
                                            <FormControl className={'text-xl'}>
                                                <Input
                                                    className={'border-none text-2xl focus-visible:ring-offset-0 md:text-3xl'}
                                                    placeholder="Quest Title"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardTitle>

                            <CardDescription className={'m-2'}>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="my-4">
                                            <FormControl className={'text-xl'}>
                                                <Textarea
                                                    className={'text-sm'}
                                                    placeholder="A flavourful quest hook! Get people wanting more..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardDescription>
                        </Card>
                    </form>
                </Form>
            </section>
        </>

    )
}
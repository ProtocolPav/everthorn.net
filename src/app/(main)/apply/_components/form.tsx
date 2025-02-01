"use client"
import {useToast} from "@/components/ui/use-toast";
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    Textarea
} from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge";
import {useSession} from "next-auth/react";
import {Toaster} from "@/components/ui/toaster";
import webhook_content from "@/app/(main)/apply/_components/webhook_content";

export default function ApplicationForm() {
    const { data: session, status } = useSession()

    const {toast} = useToast()

    const formSchema = z.object({
        username: z.string().optional(),
        age: z.coerce.number(),
        interests: z.string(),
        hours: z.string(),
        description: z.string(),
        heard_from: z.string().optional(),
        other: z.string().optional()
    });
    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),

    })

    async function submitToDiscord(values: z.infer < typeof formSchema >) {
        if (process.env.NEXT_PUBLIC_APPLY_WEBHOOK_URL) {
            let response = await fetch(
                process.env.NEXT_PUBLIC_APPLY_WEBHOOK_URL, {
                    method: "POST",
                    body: webhook_content(values),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
                )

            let status = response.status

            if (status === 204) {
                toast({
                    title: 'Application Submitted!',
                    description: 'If we accept your application, you can expect a Friend Request on Discord within 24 hours!'
                });
            } else {
                throw new Error(`Webhook error code ${status}`)
            }
        } else {
            throw new Error('Webhook not provided')
        }
    }

    function onSubmit(values: z.infer < typeof formSchema > ) {
        values.username = session?.user?.name ? session?.user?.name : 'Unknown'
        try {
            if (!session?.user.everthornMemberInfo.isMember) {
                submitToDiscord(values)
            } else {
                throw new Error('Already a member!')
            }

        } catch (error) {
            console.error("Form submission error", error);
            toast({
                title:'There was an error submitting your application.',
                description:'Please try again. If the issue persists, you can manually submit your application on Reddit to u/Skavandross',
                variant:'destructive'}
            );
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-8 pt-10">

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Username <Badge variant={'secondary'} className={'bg-cyan-600'}>Automatic</Badge>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="ProtocolPav"
                                    disabled={false}
                                    value={"@" + (session?.user?.name ? session?.user?.name : 'None')}
                                />
                            </FormControl>
                            <FormDescription>We need your Discord Username to be able to contact you :)</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Age <Badge variant={'secondary'}>Required</Badge>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="22"
                                    type="number"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Your age will not be shared with anyone other than Everthorn Staff</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                What interests you most about Minecraft? <Badge variant={'secondary'}>Required</Badge>
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Do you enjoy building, exploring, redstone? Elaborate!"
                                    className="resize-none"
                                    maxLength={900}
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="hours"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                How active can you be? <Badge variant={'secondary'}>Required</Badge>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Roughly how many days will you be able to play?" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1 day">1 Day Each Week</SelectItem>
                                    <SelectItem value="2 Days">2 Days Each Week</SelectItem>
                                    <SelectItem value="3 Days">3 Days Each Week</SelectItem>
                                    <SelectItem value="4+ Days">4+ Days Each Week</SelectItem>
                                    <SelectItem value="Weekends">Only Weekends</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Be honest, even if you can't be very active it's good to give us something to expect!
                                We understand that schedules change constantly.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Give us a short description about yourself <Badge variant={'secondary'}>Required</Badge>
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="I am a cool person and I do cool things"
                                    className="resize-none"
                                    maxLength={900}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>What's your best characteristics? Do you like working with others or do you prefer to be a lone wolf? Most importantly... Your thoughts on Diorite? 👀</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="heard_from"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>How did you hear about us?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="I heard about Everthorn from..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="friends">My Friends</SelectItem>
                                    <SelectItem value="recruitment_post">A Reddit Advertisement</SelectItem>
                                    <SelectItem value="website">I just stumbled across this website</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>Was it from a friend, an advertisement, or did you just stumble across us? We're curious!</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="other"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Is there anything else we should know?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""
                                    className="resize-none"
                                    maxLength={900}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Anything you'd like to mention but there wasn't a section for it?</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        <Toaster/>
        </Form>

    )
}
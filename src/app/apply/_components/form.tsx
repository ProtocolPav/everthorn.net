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

    function onSubmit(values: z.infer < typeof formSchema > ) {
        try {
            console.log(values);
            toast({title: 'Application Submitted!', description: JSON.stringify(values, null, 2)});
        } catch (error) {
            console.error("Form submission error", error);
            toast({title:'Error', description:'There was an error submitting your application.', variant:'destructive'});
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto pt-10">

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
                            <FormDescription>We need your Discord Username so we can contact you if your application gets accepted.</FormDescription>
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
                            <FormDescription>You age will not be shared with anyone other than the recruitment team</FormDescription>
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
                                    <SelectItem value="2-3 Days">2-3 Days Each Week</SelectItem>
                                    <SelectItem value="5+ Days">5 or More Days Each Week</SelectItem>
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
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>What's your best characteristics? Do you like working with others or do you prefer to be a lone wolf? Most importantly... Your thoughts on Diorite?</FormDescription>
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
                            <FormControl>
                                <Input
                                    placeholder="I heard about Everthorn from..."
                                    type=""
                                    {...field} />
                            </FormControl>
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
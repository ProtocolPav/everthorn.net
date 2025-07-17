"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useSession } from "next-auth/react"
import webhook_content from "./webhook_content"
import { useState } from "react"
import { toast } from 'sonner'
import { ChevronRight, ChevronLeft, Check, User, Clock, Heart, MessageSquare, Users, HelpCircle, Send } from 'lucide-react'

export default function ApplicationForm() {
    const { data: session, status } = useSession()
    const [submitted, setSubmitted] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const formSchema = z.object({
        username: z.string().optional(),
        timezone: z.string().optional(),
        age: z.coerce.number().min(1, "Please enter your age"),
        interests: z.string().min(10, "Please tell us a bit more about your interests"),
        hours: z.string().min(1, "Please select how active you can be"),
        description: z.string().min(20, "Please tell us a bit more about yourself"),
        heard_from: z.string().optional(),
        other: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    })

    const steps = [
        {
            id: 'welcome',
            title: "Welcome to Everthorn! 👋",
            subtitle: "Let's get to know you better",
            icon: User,
            component: WelcomeStep
        },
        {
            id: 'age',
            title: "Tell us about yourself",
            subtitle: "How old are you?",
            icon: User,
            component: AgeStep,
            field: 'age'
        },
        {
            id: 'interests',
            title: "What drives you?",
            subtitle: "What interests you most about Minecraft?",
            icon: Heart,
            component: InterestsStep,
            field: 'interests'
        },
        {
            id: 'activity',
            title: "Your availability",
            subtitle: "How active can you be?",
            icon: Clock,
            component: ActivityStep,
            field: 'hours'
        },
        {
            id: 'description',
            title: "Tell us more",
            subtitle: "Give us a short description about yourself",
            icon: MessageSquare,
            component: DescriptionStep,
            field: 'description'
        },
        {
            id: 'heard_from',
            title: "How did you find us?",
            subtitle: "We're curious about your discovery story",
            icon: Users,
            component: HeardFromStep,
            field: 'heard_from'
        },
        {
            id: 'other',
            title: "Anything else?",
            subtitle: "Last chance to share something special",
            icon: HelpCircle,
            component: OtherStep,
            field: 'other'
        },
        {
            id: 'submit',
            title: "Ready to submit?",
            subtitle: "Review and submit your application",
            icon: Send,
            component: SubmitStep
        }
    ]

    async function submitToDiscord(values: z.infer<typeof formSchema>) {
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
                toast.success('Application Submitted!', {
                    description: 'Thanks for applying. Check your discord for a friend request soon :)'
                });
            } else {
                throw new Error(`Webhook error code ${status}`)
            }
        } else {
            throw new Error('Webhook not provided')
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        values.username = session?.user?.name ? session?.user?.name : 'Unknown'
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            timeZoneName: 'shortOffset',
        }).formatToParts(new Date());

        const offsetPart = parts.find(part => part.type === 'timeZoneName');
        const offset = offsetPart?.value ?? '';

        values.timezone = `${tz} (${offset})`;
        try {
            if (!session?.user.everthornMemberInfo.isMember) {
                submitToDiscord(values)
                setSubmitted(true)
            } else {
                throw new Error('Already a member!')
            }

        } catch (error) {
            console.error("Form submission error", error);
            toast.error('There was an error submitting your application.', {
                description: 'Please try again. If the issue persists, you can manually submit your application on Reddit to u/Skavandross'
            });
        }
    }

    const nextStep = async () => {
        const currentStepData = steps[currentStep]

        if (currentStepData.field) {
            const isValid = await form.trigger(currentStepData.field)
            if (!isValid) return
        }

        if (currentStep < steps.length - 1) {
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentStep(currentStep + 1)
                setIsAnimating(false)
            }, 150)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentStep(currentStep - 1)
                setIsAnimating(false)
            }, 150)
        }
    }

    const progress = ((currentStep + 1) / steps.length) * 100
    const currentStepData = steps[currentStep]
    const StepComponent = currentStepData.component
    const IconComponent = currentStepData.icon

    return (
        <div className="h-screen w-screen bg-background p-4 md:p-6 overflow-x-hidden">
            <div className="mx-auto max-w-2xl h-full flex flex-col">
                {/* Progress Section - Fixed at top */}
                <div className="mb-6 md:mb-8 flex-shrink-0">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">
                            Step {currentStep + 1} of {steps.length}
                        </span>

                        {/* Progress motivation text */}
                        <div className="text-center">
                            <span className="text-xs text-muted-foreground">
                                {progress < 25 && "Just getting started! 🌱"}
                                {progress >= 25 && progress < 50 && "Making great progress! 🚀"}
                                {progress >= 50 && progress < 75 && "Almost halfway there! ⚡"}
                                {progress >= 75 && progress < 100 && "So close to the finish! 🎯"}
                                {progress >= 100 && "Application complete! 🎉"}
                            </span>
                        </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="relative">
                        {/* Background track */}
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                            {/* Gradient progress fill */}
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                                style={{ width: `${progress}%` }}
                            >
                                {/* Animated shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-pulse" />

                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-50 blur-sm" />
                            </div>
                        </div>

                        {/* Milestone markers positioned at actual milestones */}
                        <div className="absolute top-0 w-full h-3 flex items-center">
                            {steps.slice(0, -1).map((_, index) => {
                                const stepProgress = ((index + 1) / steps.length) * 100;
                                return (
                                    <div
                                        key={index}
                                        className={`absolute w-1 h-1 rounded-full transition-all duration-300 transform -translate-x-1/2 ${
                                            index < currentStep
                                                ? 'bg-white shadow-lg'
                                                : index === currentStep
                                                    ? 'bg-white/80 animate-pulse'
                                                    : 'bg-white/20'
                                        }`}
                                        style={{ left: `${stepProgress}%` }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>


                {/* Form Container */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col pb-5">
                        <div className="flex-1 overflow-y-auto">
                            <Card className={`pb-0 transition-all duration-300 bg-transparent border-none ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                                <CardHeader className="text-center pb-4">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center">
                                            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl md:text-2xl">
                                        {currentStepData.title}
                                    </CardTitle>
                                    <p className="text-muted-foreground text-sm md:text-base">
                                        {currentStepData.subtitle}
                                    </p>
                                </CardHeader>
                                <CardContent className="pt-0 px-3 pb-3">
                                    <StepComponent
                                        form={form}
                                        session={session}
                                        nextStep={nextStep}
                                        onSubmit={onSubmit}
                                        submitted={submitted}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Navigation - Fixed at bottom */}
                        <div className="flex justify-between items-center flex-shrink-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="flex items-center gap-2"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </Button>

                            {currentStep < steps.length - 1 && (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center gap-2"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

// Step Components
function WelcomeStep({ form, session, nextStep }) {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-4">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        Hello, {session?.user?.name || 'there'}! 👋
                    </h3>
                    <p className="text-muted-foreground">
                        Ready to join the Everthorn community? We're excited to learn more about you!
                    </p>
                </div>
            </div>

            <Card className="bg-muted/50 border-none">
                <CardContent className="">
                    <div className="text-center space-y-3">
                        <div className="flex justify-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <img src={session?.user?.image || ""} className="aspect-square rounded-full" alt="Avatar"/>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-lg">
                                @{session?.user?.name || 'Unknown'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Wow! Your profile looks stunning!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Button
                type="button"
                onClick={nextStep}
                className="w-full"
                size="lg"
            >
                Let's get started! 🚀
            </Button>
        </div>
    )
}

function AgeStep({ form, nextStep }) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                placeholder="Enter your age"
                                type="number"
                                className="text-center text-lg h-12 md:h-14"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            Don't worry, this stays between us and the staff
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button
                type="button"
                onClick={nextStep}
                className="w-full"
                size="lg"
                disabled={!form.watch('age')}
            >
                Continue
            </Button>
        </div>
    )
}

function InterestsStep({ form, nextStep }) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I love building massive castles and exploring caves! I'm also really into redstone contraptions..."
                                className="min-h-32 resize-none"
                                maxLength={900}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            Building? Exploring? Redstone? We want to know what makes you tick!
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button
                type="button"
                onClick={nextStep}
                className="w-full"
                size="lg"
                disabled={!form.watch('interests') || form.watch('interests').length < 10}
            >
                Sounds awesome!
            </Button>
        </div>
    )
}

function ActivityStep({ form, nextStep }) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                    <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="h-12 md:h-14">
                                    <SelectValue placeholder="Choose your activity level" />
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
                        <FormDescription className="text-center">
                            Be honest! Even if you're busy, we totally understand. Life happens!
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button
                type="button"
                onClick={nextStep}
                className="w-full"
                size="lg"
                disabled={!form.watch('hours')}
            >
                Perfect!
            </Button>
        </div>
    )
}

function DescriptionStep({ form, nextStep }) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I'm a friendly person who loves collaborating on builds! I'm pretty good at organizing projects and I think diorite is... actually not that bad?"
                                className="min-h-32 resize-none"
                                maxLength={900}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            Team player or lone wolf? And most importantly... thoughts on diorite?
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button
                type="button"
                onClick={nextStep}
                className="w-full"
                size="lg"
                disabled={!form.watch('description') || form.watch('description').length < 20}
            >
                Nice to meet you!
            </Button>
        </div>
    )
}

function HeardFromStep({ form, nextStep }) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="heard_from"
                render={({ field }) => (
                    <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="h-12 md:h-14">
                                    <SelectValue placeholder="How did you find us?" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="friends">My Friends</SelectItem>
                                <SelectItem value="recruitment_post">A Reddit Advertisement</SelectItem>
                                <SelectItem value="website">I stumbled across this website</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription className="text-center">
                            Just curious how you discovered our little corner of the internet!
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="space-y-3">
                <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full"
                    size="lg"
                    disabled={!form.watch('heard_from')}
                >
                    Cool!
                </Button>

                <div className="flex justify-center">
                    <Button
                        type="button"
                        variant="link"
                        onClick={nextStep}
                        className="text-muted-foreground hover:text-foreground text-sm"
                    >
                        I'll skip this one
                    </Button>
                </div>
            </div>
        </div>
    )
}

function OtherStep({ form, nextStep }) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I have a pet parrot that sometimes plays Minecraft with me..."
                                className="min-h-32 resize-none"
                                maxLength={900}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            Any fun facts, special skills, or random thoughts? This is totally optional!
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button
                type="button"
                onClick={nextStep}
                className="w-full"
                size="lg"
            >
                {form.watch('other') ? 'Awesome!' : 'All good, let\'s finish!'}
            </Button>
        </div>
    )
}

function SubmitStep({ form, onSubmit, submitted, session }) {
    const values = form.getValues()

    return (
        <div className="space-y-6">
            <div className="text-center space-y-4">
                <div className="mb-4 flex gap-2 justify-center items-center">
                    <h3 className="text-lg font-semibold mb-2">
                        Perfect, {session?.user?.name || 'there'}! 🎉
                    </h3>
                </div>
            </div>

            {/* What's Next Card */}
            <Card className="bg-muted/50 border-none">
                <CardContent>
                    <div className="text-center mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                            What happens next?
                        </p>
                    </div>

                    <div className="space-y-4 text-left">
                        <div className="flex gap-3 p-3 bg-background/50 rounded-lg">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">1</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-1">Application Review</p>
                                <p className="text-xs text-muted-foreground">
                                    Our team will review your application
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 p-3 bg-background/50 rounded-lg">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">2</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-1">Quick Interview</p>
                                <p className="text-xs text-muted-foreground">
                                    We'll contact you on Discord or Reddit for a short, friendly chat on our server
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 p-3 bg-background/50 rounded-lg">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">3</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-1">Get to Know Each Other</p>
                                <p className="text-xs text-muted-foreground">
                                    A chance for us to learn more about you, and for you to learn more about us!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-xs text-center text-muted-foreground">
                            <span className="font-bold">Don't worry!</span> The interview is relaxed and friendly.
                            It's just a casual conversation to see if we're a good fit for each other. 😊
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center space-y-4">
                <Button
                    type="submit"
                    disabled={submitted}
                    className="w-full"
                    size="lg"
                >
                    {submitted ? 'Application Sent! 🎊' : 'Submit Application 🚀'}
                </Button>

                {!submitted && (
                    <p className="text-xs text-muted-foreground">
                        We'll be in touch soon to set up your interview!
                    </p>
                )}
            </div>
        </div>
    )
}

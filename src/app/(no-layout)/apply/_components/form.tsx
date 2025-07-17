"use client"
import {useForm, UseFormReturn} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import webhook_content from "./webhook_content"
import React, { useState, useEffect } from "react"
import { toast } from 'sonner'
import {
    ChevronRight,
    ChevronLeft,
    User,
    Clock,
    Heart,
    MessageSquare,
    Users,
    HelpCircle,
    Send,
    Gamepad2,
    Shield,
    Wrench,
    Building,
    Compass,
    CheckIcon
} from 'lucide-react'
import {Session} from "next-auth";

type StepType = {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    component: React.ComponentType<any>;
    field?: string;
};

interface StepProps {
    form: UseFormReturn<any>; // Use any for now
    nextStep: () => Promise<void>;
    session?: Session | null;
    onSubmit?: (values: any) => void;
    submitted?: boolean;
}

export default function ApplicationForm() {
    const { data: session, status } = useSession()
    const [submitted, setSubmitted] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [dynamicSteps, setDynamicSteps] = useState<StepType[]>([])

    const formSchema = z.object({
        username: z.string().optional(),
        timezone: z.string().optional(),
        age: z.coerce.number().min(1, "Please enter your age"),
        experience: z.string().min(1, "Please select your experience level"),
        playstyle: z.string().min(10, "Please tell us about your playstyle"),
        building_experience: z.string().optional(),
        redstone_experience: z.string().optional(),
        leadership_experience: z.string().optional(),
        community_values: z.string().min(20, "Please tell us what you value in a community"),
        activity: z.string().min(1, "Please select your activity level"),
        conflict_resolution: z.string().min(15, "Please share your approach to handling conflicts"),
        heard_from: z.string().optional(),
        heard_from_details: z.string().optional(),
        other: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange'
    })

    // Base steps that are always shown
    const baseSteps = [
        {
            id: 'welcome',
            title: "Welcome to Everthorn! 👋",
            subtitle: "Let's start your adventure together",
            icon: User,
            component: WelcomeStep
        },
        {
            id: 'age',
            title: "First things first...",
            subtitle: "What's your age?",
            icon: User,
            component: AgeStep,
            field: 'age'
        },
        {
            id: 'experience',
            title: "Your Minecraft journey",
            subtitle: "How long have you been playing?",
            icon: Gamepad2,
            component: ExperienceStep,
            field: 'experience'
        },
        {
            id: 'playstyle',
            title: "Show us your style",
            subtitle: "What's your favorite way to play?",
            icon: Heart,
            component: PlaystyleStep,
            field: 'playstyle'
        }
    ]

    // Dynamic steps based on answers
    const getDynamicSteps = () => {
        const values = form.getValues()
        const steps = []

        // Add building experience if they mentioned building
        if (values.playstyle?.toLowerCase().includes('build') ||
            values.playstyle?.toLowerCase().includes('castle') ||
            values.playstyle?.toLowerCase().includes('architect')) {
            steps.push({
                id: 'building_experience',
                title: "Tell us about your builds",
                subtitle: "What's your building experience?",
                icon: Building,
                component: BuildingExperienceStep,
                field: 'building_experience'
            })
        }

        // Add redstone experience if they mentioned redstone/technical
        if (values.playstyle?.toLowerCase().includes('redstone') ||
            values.playstyle?.toLowerCase().includes('red stone') ||
            values.playstyle?.toLowerCase().includes('technical') ||
            values.playstyle?.toLowerCase().includes('farm') ||
            values.playstyle?.toLowerCase().includes('contraption')) {
            steps.push({
                id: 'redstone_experience',
                title: "Redstone wizardry",
                subtitle: "Share your technical experience",
                icon: Wrench,
                component: RedstoneExperienceStep,
                field: 'redstone_experience'
            })
        }

        // Add leadership experience if they're experienced/veteran
        if (values.experience === 'experienced' || values.experience === 'veteran') {
            steps.push({
                id: 'leadership_experience',
                title: "Leadership & mentoring",
                subtitle: "Have you helped guide other players?",
                icon: Users,
                component: LeadershipExperienceStep,
                field: 'leadership_experience'
            })
        }

        return steps
    }

    // Update dynamic steps when form values change
    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === 'playstyle' || name === 'experience') {
                const newDynamicSteps = getDynamicSteps()
                setDynamicSteps(newDynamicSteps)
            }
        })
        return () => subscription.unsubscribe()
    }, [form])

    // Final steps that are always shown
    const finalSteps = [
        {
            id: 'community_values',
            title: "Community matters",
            subtitle: "What makes a great community?",
            icon: Users,
            component: CommunityValuesStep,
            field: 'community_values'
        },
        {
            id: 'activity',
            title: "Let's talk time",
            subtitle: "How often can you join us?",
            icon: Clock,
            component: ActivityStep,
            field: 'activity'
        },
        {
            id: 'conflict_resolution',
            title: "Maturity check",
            subtitle: "How do you handle disagreements?",
            icon: Shield,
            component: ConflictResolutionStep,
            field: 'conflict_resolution'
        },
        {
            id: 'heard_from',
            title: "How did we cross paths?",
            subtitle: "We'd love to know how you found us",
            icon: Compass,
            component: HeardFromStep,
            field: 'heard_from'
        },
        {
            id: 'other',
            title: "Anything we missed?",
            subtitle: "Tell us something fun we didn't think to ask!",
            icon: HelpCircle,
            component: OtherStep,
            field: 'other'
        },
        {
            id: 'submit',
            title: "You're all set! 🎉",
            subtitle: "Ready to join the Everthorn family?",
            icon: Send,
            component: SubmitStep
        }
    ]

    // Combine all steps
    const allSteps = [...baseSteps, ...dynamicSteps, ...finalSteps]

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
        if (!session?.user.everthornMemberInfo.isMember) {
            submitToDiscord(values).then()
            setSubmitted(true)
        } else {
            console.error("Already a member. Cannot submit");
            toast.error('There was an error submitting your application.', {
                description: 'Please try again. If the issue persists, you can manually submit your application on Reddit to u/Skavandross'
            });
        }
    }

    const nextStep = async () => {
        const currentStepData = allSteps[currentStep]

        if (currentStepData.field) {
            const isValid = await form.trigger(currentStepData.field as keyof z.infer<typeof formSchema>)
            if (!isValid) return
        }

        if (currentStep < allSteps.length - 1) {
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

    const progress = ((currentStep + 1) / allSteps.length) * 100
    const currentStepData = allSteps[currentStep]
    const StepComponent = currentStepData.component
    const IconComponent = currentStepData.icon

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-6 overflow-x-hidden">
            <div className="mx-auto max-w-2xl h-full flex flex-col">
                {/* Progress Section - Fixed at top */}
                <div className="mb-6 md:mb-8 flex-shrink-0">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">
                            Step {currentStep + 1} of {allSteps.length}
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
                            {allSteps.slice(0, -1).map((_, index) => {
                                const stepProgress = ((index + 1) / allSteps.length) * 100;
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
                            <Card className={`relative backdrop-blur-sm bg-background/80 border border-border/50 shadow-lg transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                                {/* Animated gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-animated rounded-lg pointer-events-none animate-vibrant-gradient" />

                                <CardHeader className="text-center pb-4 relative">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                                            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl md:text-2xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                        {currentStepData.title}
                                    </CardTitle>
                                    <p className="text-muted-foreground text-sm md:text-base">
                                        {currentStepData.subtitle}
                                    </p>
                                </CardHeader>
                                <CardContent className="pt-0 px-6 pb-6 relative">
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
                        <div className="flex justify-between items-center flex-shrink-0 mt-6">
                            {/* Back Button */}
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="group flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/50 disabled:opacity-30"
                            >
                                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted-foreground/10 transition-colors duration-200">
                                    <ChevronLeft className="w-3 h-3" />
                                </div>
                                <span className="text-sm hidden sm:inline">Back</span>
                            </Button>

                            {/* Step indicator - scrollable on mobile */}
                            <div className="flex-1 mx-2 md:mx-4 overflow-hidden">
                                <div className="flex items-center gap-2 overflow-x-auto py-2 justify-center">
                                    {allSteps.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                                                index < currentStep
                                                    ? 'bg-primary'
                                                    : index === currentStep
                                                        ? 'bg-primary/60 w-6'
                                                        : 'bg-muted-foreground/20'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Next Button */}
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={nextStep}
                                className={`group flex items-center gap-2 px-3 py-2 text-foreground hover:text-primary transition-all duration-200 hover:bg-primary/5 ${
                                    currentStep >= allSteps.length - 1 ? 'invisible' : ''
                                }`}
                            >
                                <span className="text-sm hidden sm:inline">Next</span>
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                                    <ChevronRight className="w-3 h-3" />
                                </div>
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

// New dynamic step components
function BuildingExperienceStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="building_experience"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I've built several medieval castles, modern skyscrapers, and I'm currently working on a massive city project. I love using different materials and architectural styles..."
                                className="min-h-32 resize-none"
                                maxLength={500}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            Tell us about your favorite builds, projects, or building styles!
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
                disabled={!form.watch('building_experience') || form.watch('building_experience').length < 10}
            >
                Impressive builds!
            </Button>
        </div>
    )
}

function RedstoneExperienceStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="redstone_experience"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I've built automatic farms, complex sorting systems, and even a working calculator! I love creating contraptions that solve problems and make life easier..."
                                className="min-h-32 resize-none"
                                maxLength={500}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            Share your coolest redstone creations or technical achievements!
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
                disabled={!form.watch('redstone_experience') || form.watch('redstone_experience').length < 10}
            >
                Technical genius!
            </Button>
        </div>
    )
}

function LeadershipExperienceStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="leadership_experience"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I love helping newer players get started! I've shown friends how to build cool redstone contraptions, helped coordinate some fun group projects, and I'm always happy to share tips and tricks I've learned..."
                                className="min-h-32 resize-none"
                                maxLength={500}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            Do you enjoy helping other players? Share any times you've lent a hand! 😊
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
                disabled={!form.watch('leadership_experience') || form.watch('leadership_experience').length < 10}
            >
                Love helping others! 🤝
            </Button>
        </div>
    )
}

function HeardFromStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="heard_from"
                render={({ field }) => (
                    <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="h-12 md:h-14 w-full">
                                    <SelectValue placeholder="How did you find us?" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="friends">My Friends</SelectItem>
                                <SelectItem value="reddit">Reddit Advertisement</SelectItem>
                                <SelectItem value="website">I found your website</SelectItem>
                                <SelectItem value="youtube">YouTube</SelectItem>
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

            {/* Follow-up question for specific sources */}
            {(form.watch('heard_from') === 'friends' || form.watch('heard_from') === 'other') && (
                <FormField
                    control={form.control}
                    name="heard_from_details"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder={
                                        form.watch('heard_from') === 'friends'
                                            ? "Which friend told you about us? We'd love to thank them!"
                                            : "Tell us more about how you found us!"
                                    }
                                    className="min-h-20 resize-none"
                                    maxLength={200}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="text-center">
                                {form.watch('heard_from') === 'friends'
                                    ? "We love hearing about our community spreading through friends!"
                                    : "We're always curious about new discovery paths!"
                                }
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

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

function OtherStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I have a pet parrot that sometimes plays Minecraft with me, I'm learning to code, or I make Minecraft-themed art in my spare time..."
                                className="min-h-32 resize-none"
                                maxLength={900}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            Any fun facts, special skills, hobbies, or random thoughts? This is totally optional!
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

// Step Components
function WelcomeStep({ form, session, nextStep }: StepProps) {
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
                <CardContent className="pt-6">
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
                                Ready to become part of our community!
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

function AgeStep({ form, nextStep }: StepProps) {
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
                            We care about your privacy. This stays between you and our staff members
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

function ExperienceStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                    <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="h-12 md:h-14 w-full">
                                    <SelectValue placeholder="How long have you been playing?" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="new">New to Minecraft (Less than 6 months)</SelectItem>
                                <SelectItem value="beginner">Beginner (6 months - 1 year)</SelectItem>
                                <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                                <SelectItem value="experienced">Experienced (3-5 years)</SelectItem>
                                <SelectItem value="veteran">Veteran (5+ years)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription className="text-center">
                            Don't worry - we welcome players of all experience levels!
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
                disabled={!form.watch('experience')}
            >
                Perfect!
            </Button>
        </div>
    )
}

function PlaystyleStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="playstyle"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I love building medieval castles and exploring with friends! I'm also getting into redstone automation..."
                                className="min-h-32 resize-none"
                                maxLength={500}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            Building? Exploring? Redstone? PvP? Tell us what you enjoy most!
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
                disabled={!form.watch('playstyle') || form.watch('playstyle').length < 10}
            >
                Sounds awesome!
            </Button>
        </div>
    )
}

function CommunityValuesStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="community_values"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I value respect, collaboration, and helping newer players. I think a good community should be welcoming and supportive..."
                                className="min-h-32 resize-none"
                                maxLength={500}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            What do you think makes a gaming community great?
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
                disabled={!form.watch('community_values') || form.watch('community_values').length < 20}
            >
                Great perspective!
            </Button>
        </div>
    )
}

function ActivityStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                    <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="h-12 md:h-14 w-full">
                                    <SelectValue placeholder="Choose your activity level" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="daily">Daily (Most days of the week)</SelectItem>
                                <SelectItem value="frequent">Frequent (3-4 times per week)</SelectItem>
                                <SelectItem value="regular">Regular (1-2 times per week)</SelectItem>
                                <SelectItem value="casual">Casual (Few times per month)</SelectItem>
                                <SelectItem value="weekends">Weekends only</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription className="text-center">
                            Be honest! We understand everyone has different schedules
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
                disabled={!form.watch('activity')}
            >
                Perfect!
            </Button>
        </div>
    )
}

function ConflictResolutionStep({ form, nextStep }: StepProps) {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="conflict_resolution"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                placeholder="I try to listen to both sides, stay calm, and find a solution that works for everyone. If needed, I'd ask a staff member for help..."
                                className="min-h-32 resize-none"
                                maxLength={400}
                                {...field}
                            />
                        </FormControl>
                        <FormDescription className="text-center">
                            How would you handle a disagreement with another player?
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
                disabled={!form.watch('conflict_resolution') || form.watch('conflict_resolution').length < 15}
            >
                Great approach!
            </Button>
        </div>
    )
}

function SubmitStep({ form, onSubmit, submitted, session }: StepProps) {
    return (
        <div className="space-y-6">
            {/* User Avatar/Welcome Section */}
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img
                        src={session?.user?.image || ""}
                        className="w-12 h-12 rounded-full border-2 border-white"
                        alt="Avatar"
                    />
                </div>
                <p className="text-muted-foreground">
                    Great job, {session?.user?.name || 'there'}! 🎯
                </p>
            </div>

            {/* Next Steps */}
            <div className="rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">What happens next:</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        <span>We'll review your application</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                        <span>Quick friendly chat on Discord</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                        <span>Welcome to Everthorn!</span>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <Button
                    type="submit"
                    disabled={submitted}
                    className="w-full font-semibold"
                    size="lg"
                >
                    {submitted ? 'Application Sent! 🎊' : 'Submit Application 🚀'}
                </Button>

                {!submitted && (
                    <p className="text-sm text-muted-foreground mt-3">
                        We'll be in touch soon!
                    </p>
                )}
            </div>
        </div>
    )
}

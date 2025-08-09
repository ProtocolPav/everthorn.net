import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import React from "react";
import {StepProps} from "@/types/application-step";
import {Textarea} from "@/components/ui/textarea";

export function ExperienceStep({ form, nextStep }: StepProps) {
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

export function LeadershipExperienceStep({ form, nextStep }: StepProps) {
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
import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React from "react";
import {StepProps} from "@/types/application-step";

export function PlaystyleStep({ form, nextStep }: StepProps) {
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

export function BuildingExperienceStep({ form, nextStep }: StepProps) {
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

export function RedstoneExperienceStep({ form, nextStep }: StepProps) {
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
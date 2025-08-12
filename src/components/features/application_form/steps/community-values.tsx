import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React from "react";
import {StepProps} from "@/types/application-step";

export function CommunityValuesStep({ form, nextStep }: StepProps) {
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
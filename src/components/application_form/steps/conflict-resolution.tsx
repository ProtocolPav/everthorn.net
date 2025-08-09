import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React from "react";
import {StepProps} from "@/types/application-step";

export function ConflictResolutionStep({ form, nextStep }: StepProps) {
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
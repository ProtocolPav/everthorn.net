import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";
import {StepProps} from "@/types/application-step";

export function AgeStep({ form, nextStep }: StepProps) {
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
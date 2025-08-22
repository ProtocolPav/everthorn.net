import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import React from "react";
import {StepProps} from "@/types/application-step";

export function ActivityStep({ form, nextStep }: StepProps) {
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
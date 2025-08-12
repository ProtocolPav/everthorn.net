import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React from "react";
import {StepProps} from "@/types/application-step";

export function OtherStep({ form, nextStep }: StepProps) {
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
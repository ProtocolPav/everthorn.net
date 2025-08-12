import {FormControl, FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React from "react";
import {StepProps} from "@/types/application-step";

export function HeardFromStep({ form, nextStep }: StepProps) {
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
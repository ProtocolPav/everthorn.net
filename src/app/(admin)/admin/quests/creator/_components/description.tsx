import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Textarea} from "@/components/ui/textarea";

interface DescriptionProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    field_name: 'description' | `objectives.${number}.description`
    placeholder: string
}

export function QuestDescription({form, field_name, placeholder}: DescriptionProps) {
    return (
        <FormField
            control={form.control}
            name={field_name}
            render={({ field }) => (
                <FormItem className="my-4 max-w-full">
                    <FormControl className={'text-xl'}>
                        <Textarea
                            className={'text-sm'}
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
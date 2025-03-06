import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import * as React from "react";
import {Textarea} from "@/components/ui/textarea";

export function QuestDescription({form}: {form: UseFormReturn<z.infer<typeof formSchema>>}) {
    return (
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem className="my-4 max-w-full">
                    <FormControl className={'text-xl'}>
                        <Textarea
                            className={'text-sm'}
                            placeholder="A flavourful quest hook! Get people wanting more..."
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
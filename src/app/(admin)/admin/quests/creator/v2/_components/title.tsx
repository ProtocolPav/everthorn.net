import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as React from "react";

export function QuestTitle({form}: {form: UseFormReturn<z.infer<typeof formSchema>>}) {
    return (
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem className="">
                    <FormControl className={'text-xl font-semibold'}>
                        <Input
                            className={'border-none bg-transparent px-0 text-2xl md:text-3xl'}
                            placeholder="Quest Title"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
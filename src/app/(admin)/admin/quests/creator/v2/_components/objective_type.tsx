import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import * as React from "react";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "../_types/schema";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Sword, Axe, BracketsCurly} from "@phosphor-icons/react";

interface ObjectiveProps {
    form: UseFormReturn<z.infer<typeof formSchema>>
    index: number
}

export function ObjectiveType({ form, index }: ObjectiveProps) {
    return (
        <FormField
            control={form.control}
            name={`objectives.${index}.objective_type`}
            render={({ field }) => (
                <FormItem className={'w-44'}>
                    <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger>
                                <SelectValue placeholder={'Kill...'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kill">
                                    <div className={'flex gap-1 align-baseline'}>
                                        <Sword weight={'fill'} size={18}/> Kill
                                    </div>
                                </SelectItem>
                                <SelectItem value="mine">
                                    <div className={'flex gap-1 align-baseline'}>
                                        <Axe weight={'fill'} size={18}/> Mine
                                    </div>
                                </SelectItem>
                                <SelectItem value="encounter">
                                    <div className={'flex gap-1 align-baseline'}>
                                        <BracketsCurly weight={'fill'} size={18}/> Custom
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import * as React from "react";
import { useEffect, useState } from "react";
import { Trash } from "@phosphor-icons/react";

import { formSchema } from "@/app/(admin)/admin/quests/editor/_types/schema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TagsProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    disable?: boolean;
}

export function Tags({ form, disable }: TagsProps) {
    const [newTag, setNewTag] = useState("");

    const userTags = form.watch("tags") || [];

    const combinedTags = Array.from(new Set([...userTags]));

    /**
     * Adds a new tag to the form state if it's not empty and not an existing auto-tag.
     */
    const handleAddTag = () => {
        const trimmedTag = newTag.trim();
        if (trimmedTag && !userTags.includes(trimmedTag)) {
            const currentTags = form.getValues("tags") || [];
            form.setValue("tags", [...currentTags, trimmedTag], { shouldValidate: true, shouldDirty: true });
            setNewTag(""); // Clear input field
        }
    };

    /**
     * Removes a user-added tag. Auto-tags cannot be removed.
     * @param {string} tagToRemove - The tag to be removed.
     */
    const handleRemoveTag = (tagToRemove: string) => {
        const currentTags = form.getValues("tags") || [];
        form.setValue("tags", currentTags.filter(tag => tag !== tagToRemove), { shouldValidate: true, shouldDirty: true });
    };

    /**
     * Handles the 'Enter' key press in the input field to add a new tag.
     * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents form submission
            handleAddTag();
        }
    };

    return (
        <FormField
            control={form.control}
            name="tags"
            render={() => (
                <FormItem>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <FormControl>
                            <Input
                                placeholder="Add custom tags..."
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={disable}
                            />
                        </FormControl>
                        <Button
                            type="button"
                            onClick={handleAddTag}
                            disabled={!newTag.trim() || disable}
                        >
                            Add
                        </Button>
                    </div>

                    {/* Display for combined (auto and user) tags */}
                    <div className="flex flex-wrap gap-2 pb-2">
                        {combinedTags.length > 0 ? combinedTags.map((tag) => {
                            return (
                                <Badge
                                    key={tag}
                                    variant={"secondary"}
                                    className="flex items-center gap-1.5 pl-3 pr-1.5"
                                >
                                    {tag}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 rounded-full hover:bg-destructive/20"
                                        onClick={() => handleRemoveTag(tag)}
                                        disabled={disable}
                                    >
                                        <Trash size={12} weight="bold" />
                                    </Button>
                                </Badge>
                            );
                        }) : (
                            <p className="text-sm text-muted-foreground">No tags added yet.</p>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

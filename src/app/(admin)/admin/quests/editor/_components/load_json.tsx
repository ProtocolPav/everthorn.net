import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema, formatApiToData} from "@/app/(admin)/admin/quests/editor/_types/schema";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import * as React from "react";
import {useToast} from "@/components/ui/use-toast";

export function LoadJSON({form}: {form: UseFormReturn<z.infer<typeof formSchema>>}) {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [textArea, setTextArea] = React.useState('');
    const { toast } = useToast()

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} type={'button'}>
                    Load JSON
                </Button>
            </DialogTrigger>

            <DialogContent className={'gap-0 p-3'}>
                <DialogTitle className={'grid gap-3 py-2'}>
                    Load JSON File
                    <Alert className={'bg-attention/30'}>
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            Loading a JSON will override your existing data!
                        </AlertDescription>
                    </Alert>
                </DialogTitle>
                <div className={'grid gap-3 text-sm text-muted-foreground'}>
                    <div className={'grid gap-1'}>
                        Upload a JSON or text file
                        <Input
                            type="file"
                            accept=".json,.txt"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                try {
                                    const text = await file.text();
                                    JSON.parse(text)
                                    setTextArea(text);
                                } catch (err) {
                                    toast({
                                        title: "Oops",
                                        description: "Failed to load this file. Are you sure its valid JSON?",
                                    })
                                }
                            }}
                        />
                    </div>

                    <div className={'flex items-center justify-center gap-3'}>
                        <div className="border-1 grow border-t"/>
                        <div>OR</div>
                        <div className="border-1 grow border-t"/>
                    </div>

                    <Textarea
                        className={'text-white'}
                        placeholder={'Paste in your saved Quest JSON file to be able to edit it!'}
                        onChange={(e) => {
                            setTextArea(e.target.value)
                        }}
                    />

                    <Button variant={'secondary'} onClick={() => {
                        const data = formatApiToData(JSON.parse(textArea))
                        form.setValue('title', data.title)
                        form.setValue('description', data.description)
                        form.setValue('range', data.range)
                        form.setValue('objectives', data.objectives)
                        setDialogOpen(false);
                        toast({
                            title: "Happy Editing!",
                            description: `Successfully loaded ${data.title}. Edit away, my child!`,
                        })
                    }}>
                        Load JSON
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
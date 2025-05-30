import {Button} from "@/components/ui/button";
import {ThemeToggle} from "@/components/theme-toggle";

export default function TestComponents() {
    return (
        <div className={'flex flex-wrap gap-2'}>
            <ThemeToggle/>
            <Button variant={'default'}>
                Button
            </Button>
            <Button variant={'secondary'}>
                Button
            </Button>
            <Button variant={'link'}>
                Button
            </Button>
            <Button variant={'ghost'}>
                Button
            </Button>
            <Button variant={'patreon'}>
                Button
            </Button>
            <Button variant={'destructive'}>
                Button
            </Button>
            <Button variant={'invisible'}>
                Button
            </Button>
            <Button variant={'outline'}>
                Button
            </Button>
        </div>
    )
}
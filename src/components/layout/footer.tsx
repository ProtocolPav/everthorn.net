"use client"
import logo from '../../../public/everthorn.png';
import Image from "next/image";
import {ThemeToggle} from "@/components/theme-toggle";
import * as React from "react";



export default function SiteFooter() {
    const sections = [
        {
            title: "Community",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Team", href: "/team" },
                { name: "Features", href: "/features" },
                { name: "Apply To Join", href: "/apply" },
            ],
        },
        {
            title: "Resources",
            links: [
                { name: "Guidelines", href: "/guidelines" },
                { name: "Wiki", href: "/wiki" },
                { name: "Privacy", href: "/privacy" },
            ],
        },
    ];

    return (
        <footer className={'rounded-t-xl border-t border-t-border bg-background/60 px-5 md:px-16'}>
            <div className="mt-6 flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">

                <div className="flex w-full max-w-96 shrink flex-col items-center justify-between lg:items-start">
                    <span className="flex items-center justify-center gap-4 lg:justify-start">
                        <Image src={logo} alt={'logo'} width={40} />
                        <h4 className={'text-muted-foreground'}>Everthorn</h4>
                    </span>
                    <p className="mb-2 mt-6 text-sm text-muted-foreground">
                        A Minecraft Bedrock Community that's been going on for 5+ years.
                    </p>

                    <ThemeToggle/>
                </div>

                <div className="mx-auto grid grid-cols-2 gap-6 lg:gap-20">
                    {sections.map((section, sectionIdx) => (
                        <div key={sectionIdx}>
                            <h3 className="mb-3">{section.title}</h3>
                            <ul className="space-y-4 text-sm text-muted-foreground">
                                {section.links.map((link, linkIdx) => (
                                    <li
                                        key={linkIdx}
                                        className="font-medium hover:text-white"
                                    >
                                        <a href={link.href}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 flex flex-col justify-between gap-4 border-t text-center lg:flex-row lg:items-center lg:text-left">
                <p className={'mb-3 text-xs'}>Together We Stand. © 2025 Everthorn. All rights reserved.</p>
            </div>
        </footer>
    )
}
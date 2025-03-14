"use client";

import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/app/(no-layout)/map/_components/map"), { ssr: false });

export default function Home() {
    return (
        <div className="relative flex h-screen items-center justify-center">
            <WorldMap/>
        </div>
    );
};

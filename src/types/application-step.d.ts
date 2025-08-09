import React from "react";
import {UseFormReturn} from "react-hook-form";
import {Session} from "next-auth";

type StepType = {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    component: React.ComponentType<any>;
    field?: string;
};

interface StepProps {
    form: UseFormReturn<any>; // Use any for now
    nextStep: () => Promise<void>;
    session?: Session | null;
    onSubmit?: (values: any) => void;
    submitted?: boolean;
}
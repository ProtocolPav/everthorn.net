"use client"
import React, { createContext, useContext, useState } from 'react';

interface PageTitleContextType {
    title: string;
    setTitle: (title: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export function PageTitleProvider({ children }: { children: React.ReactNode }) {
    const [title, setTitle] = useState('Admin Dashboard');

    return (
        <PageTitleContext.Provider value={{ title, setTitle }}>
    {children}
    </PageTitleContext.Provider>
);
}

export function usePageTitle() {
    const context = useContext(PageTitleContext);
    if (context === undefined) {
        throw new Error('usePageTitle must be used within a PageTitleProvider');
    }
    return context;
}

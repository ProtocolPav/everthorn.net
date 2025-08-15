import { useRef, useEffect } from 'react';

export function useInfiniteScroll(
    callback: () => void,
    isLoading: boolean,
    hasMore: boolean
) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement>(null);
    const lastTriggered = useRef<number>(0);
    const THROTTLE_MS = 1000;

    useEffect(() => {
        if (isLoading || !hasMore) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const now = Date.now();
                    if (now - lastTriggered.current > THROTTLE_MS) {
                        lastTriggered.current = now;
                        callback();
                    }
                }
            },
            { threshold: 0.1 }
        );

        const currentElement = loadingRef.current;
        if (currentElement) {
            observerRef.current.observe(currentElement);
        }

        return () => {
            if (observerRef.current && currentElement) {
                observerRef.current.unobserve(currentElement);
            }
        };
    }, [callback, isLoading, hasMore]);

    return loadingRef;
}

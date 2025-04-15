'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CardProps {
    heading: string;
    icon: React.ReactNode; // SVG icons
    count: number;
    children: React.ReactNode;
    isPositive?: boolean; // Optional prop to indicate positive state
}

export function Card({ heading, icon, count, children, isPositive }: CardProps) {
    const [currentCount, setCurrentCount] = useState(isPositive ? count : 0); // Start at count for positive cards
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [prevCount, setPrevCount] = useState(isPositive ? count : 0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isPositive && currentCount > 0) {
            // Fade down to 0 for positive cards
            const decrementInterval = 2000 / count; // Calculate interval for each decrement
            interval = setInterval(() => {
                setPrevCount(currentCount);
                setCurrentCount((prev) => {
                    if (prev - 1 <= 0) {
                        clearInterval(interval!);
                        return 0;
                    }
                    return prev - 1;
                });
            }, decrementInterval);
        } else if (!isPositive && currentCount < count) {
            // Increment up for non-positive cards
            const incrementInterval = 2000 / count; // Calculate interval for each increment
            interval = setInterval(() => {
                setPrevCount(currentCount);
                setCurrentCount((prev) => {
                    if (prev + 1 >= count) {
                        clearInterval(interval!);
                        return count;
                    }
                    return prev + 1;
                });
            }, incrementInterval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [count, currentCount, isPositive]);

    // Determine the color based on the count or isPositive prop
    const countColor =
        isPositive || currentCount === 0 ? "text-green-500" : "text-red-500";

    return (
        <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-4xl mb-2">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{heading}</h3>
            <div className="relative h-10 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`count-${currentCount}`} // Ensure unique key for each count
                        className={`w-full text-3xl font-semibold ${countColor}`}
                        initial={{ y: isPositive ? "-100%" : "100%" }} // Reverse animation for positive cards
                        animate={{ y: "0%" }}
                        exit={{ y: isPositive ? "100%" : "-100%" }} // Reverse exit for positive cards
                        transition={{ duration: 0.2 }} // Smooth transition for each number
                    >
                        {currentCount}
                    </motion.div>
                </AnimatePresence>
            </div>
            <p className="text-sm text-gray-600 mt-2">{children}</p>
        </motion.div>
    );
}

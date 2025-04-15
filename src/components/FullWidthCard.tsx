'use client';
import { motion } from "framer-motion";

interface FullWidthCardProps {
    heading: string;
    subheading: string;
    children: React.ReactNode;
}

export function FullWidthCard({
    heading,
    subheading,
    children,
}: FullWidthCardProps) {
    return (
        <>
            <motion.div
                className="bg-blue-50 shadow-md rounded-lg p-8 w-full text-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-2xl font-bold mb-2">{heading}</h3>
                <p className="text-lg text-gray-700 mb-4">{subheading}</p>
                <div>{children}</div>
            </motion.div>
        </>
    );
}

'use client';

import { motion, type Variant } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

interface AnimatedSectionProps {
    children: ReactNode;
    direction?: AnimationDirection;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

const directionVariants: Record<AnimationDirection, { hidden: Variant; visible: Variant }> = {
    up: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    down: {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    left: {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    right: {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
};

export function AnimatedSection({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
}: AnimatedSectionProps) {
    const variant = directionVariants[direction];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-80px' }}
            variants={{
                hidden: variant.hidden,
                visible: {
                    ...variant.visible,
                    transition: {
                        duration,
                        delay,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

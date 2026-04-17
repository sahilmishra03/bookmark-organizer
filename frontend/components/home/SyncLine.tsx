"use client"

const PATH = "M 20,40 C 150,15 250,65 400,40 C 550,15 650,65 800,40 C 950,15 1050,65 1180,40"

export const SyncLine = () => {
    return (
        <svg viewBox="0 0 1200 80" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <path
                d={PATH}
                fill="none"
                stroke="#4b5563"
                strokeWidth="1.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
            />

            <circle r="3.5" fill="#3b82f6" filter="url(#glow)">
                <animateMotion dur="3.5s" repeatCount="indefinite" path={PATH} />
            </circle>

            <circle cx="20" cy="40" r="13" strokeWidth="1.5" className="fill-white dark:fill-[#0f0f0f] stroke-neutral-300 dark:stroke-neutral-700" />
            <circle cx="20" cy="40" r="6" fill="#3b82f6" filter="url(#glow)" />

            <circle cx="600" cy="40" r="13" strokeWidth="1.5" className="fill-white dark:fill-[#0f0f0f] stroke-neutral-300 dark:stroke-neutral-700" />
            <circle cx="600" cy="40" r="6" fill="#3b82f6" filter="url(#glow)" />

            <circle cx="1180" cy="40" r="13" strokeWidth="1.5" className="fill-white dark:fill-[#0f0f0f] stroke-neutral-300 dark:stroke-neutral-700" />
            <circle cx="1180" cy="40" r="6" fill="#3b82f6" filter="url(#glow)" />
        </svg>
    )
}

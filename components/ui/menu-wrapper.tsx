import React from "react";

export function MenuWrapper({ children}: {children?: React.ReactNode}) {
    return (
        <div
            className="top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
                {children}
                <div className="ml-auto flex">
                    Karl Lundvall
                </div>
            </div>
        </div>
    );
}

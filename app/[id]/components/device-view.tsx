"use client";

import {Device} from "@/components/types/device";
import {MenuWrapper} from "@/components/ui/menu-wrapper"
import {Card, CardContent} from "@/components/ui/card";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ProductImage} from "@/components/ui/product-image";
import React from "react";
import {getImageSrc} from "@/components/utils/helper";
import {ProductInfo} from "./product-info";
import {useRouter} from "next/navigation";

export function DeviceView({response}: { response?: Device | null }) {
    const device = response;
    const router = useRouter();
    return (
        <>
            <MenuWrapper>
                <div className="text-sm text-muted-foreground">Device</div>
            </MenuWrapper>
            <main className="mx-auto max-w-7xl px-4 pb-16 pt-6">
                <div className="mb-6">
                    <Button variant="outline" size="sm" className="gap-2 rounded-xl" onClick={() => router.push('/')}>
                        <ChevronLeft className="h-4 w-4"/> Back
                    </Button>
                </div>
                <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
                    <Card className="rounded-3xl">
                        <CardContent className="p-6 rounded-3xl">
                            {device && <ProductImage height={640} src={getImageSrc(device, 640)} width={640}/>}
                        </CardContent>
                    </Card>
                    <Card className="relative rounded-3xl">
                        <CardContent className="p-8">
                            {device && <ProductInfo device={device}/>}
                            {!device && <div className="text-center text-sm text-muted-foreground">No device found</div>}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
};

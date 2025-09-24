"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Pagination} from "./components/pagination";
import {Products} from "@/app/components/table/components/products";

export function DevicesTable() {
    return (
        <div className="mx-auto max-w-7xl p-4">
            <Card className="overflow-hidden">
                <CardHeader className="py-3">
                    <CardTitle className="text-base">Device List</CardTitle>
                </CardHeader>
                <Separator/>
                <CardContent className="p-0">
                    <Products/>
                    <Pagination/>
                </CardContent>
            </Card>
        </div>
    )
}

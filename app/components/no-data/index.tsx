import {MenuWrapper} from "@/components/ui/menu-wrapper";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

export function NoData() {
    return (
        <>
            <MenuWrapper/>
            <div className="mx-auto max-w-7xl p-4">
                <Card className="overflow-hidden">
                    <CardHeader className="py-3">
                        <CardTitle className="text-base">Device List</CardTitle>
                    </CardHeader>
                    <Separator/>
                    <CardContent className="p-0">
                        <div className="p-6 text-center text-sm text-muted-foreground">No devices found</div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
};

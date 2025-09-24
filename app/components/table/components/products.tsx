import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import ProductImage from "@/components/ui/product-image";
import {getImageSrc} from "@/components/utils/helper";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useDevicesUI} from "@/components/state/DevicesUIContext";

export function Products() {
    const {view, response: {devices}} = useDevicesUI();

    if (view === "list") {
        return (
            <Table className="text-sm">
                <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                        <TableHead className="w-[220px]"></TableHead>
                        <TableHead className="w-[220px]">Product Line</TableHead>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {devices.map((d) => (
                        <TableRow key={d.id} className="hover:bg-muted/30">
                            <TableCell><ProductImage src={getImageSrc(d)}/></TableCell>
                            <TableCell className="font-medium">{d.product.abbrev}</TableCell>
                            <TableCell>{d.product.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    return (
        <div
            className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {devices.map((d) => (
                <Card key={d.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold">{d.product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-xs text-muted-foreground">{d.product.abbrev}</CardContent>
                </Card>
            ))}
        </div>
    );
}

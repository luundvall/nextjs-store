import type {NextApiRequest, NextApiResponse} from 'next'
import { Device } from "@/components/types/device";

const fetchUrl = 'https://static.ui.com/fingerprint/ui/public.json';

type ResponseError = {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Device | ResponseError>
) {
    let prevDeviceId: string | null = null;
    let nextDeviceId: string | null = null;
    try {
        const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);
        const id = url.searchParams.get('id');
        if (!id) {
            res.status(400).json({message: 'deviceId is required'});
            return;
        }

        const r = await fetch(fetchUrl, {cache: "force-cache"});
        if (!r.ok) {
            throw new Error()
        }
        const raw = (await r.json()) as { devices?: Device[] };
        const devices: Device[] = raw.devices ?? [];
        devices.sort((a, b) => (a.product?.name || "").localeCompare(b.product?.name || ""));
        const device = devices.find(d => d.id === id);
        const index = devices.findIndex(d => d.id === id);

        if (index !== -1) {
            prevDeviceId = index > 0 ? devices[index - 1].id : null;
            nextDeviceId = index < devices.length - 1 ? devices[index + 1].id : null;
        }

        if (!device) {
            res.status(404).json({message: `device with id ${id} not found`});
            return;
        }
        res.json({
            ...device,
            meta: {
                prevDeviceId, nextDeviceId
            }
        });
    } catch (error: any) {
        res.status(500).json({message: `something wen wrong: ${error?.message}`})
    }
}

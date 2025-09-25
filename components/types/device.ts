export type Device = {
    fcc: string;
    guids: string[];
    ic: string;
    icon: {
        id: string;
        resolutions: [number, number][];
    };
    id: string;
    images: {
        default: string;
        nopadding: string;
        topology: string;
        [key: string]: string;
    };
    line: { id: string; name: string };
    product: { abbrev: string; name: string };
    shortnames: string[];
    sku: string;
    unifi?: {
        adoptability: 'adoptable' | string;
        network?: {
            numberOfPorts: number;
            radios?: {
                na?: { maxPower?: number; maxSpeedMegabitsPerSecond: number };
                ng?: { maxPower?: number; maxSpeedMegabitsPerSecond: number };
            };
            type: string;
        };
    };
    meta: {
        prevDeviceId?: string | null;
        nextDeviceId?: string | null;
    }
}

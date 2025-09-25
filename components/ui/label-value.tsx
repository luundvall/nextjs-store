export function LabelValue({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="grid grid-cols-2 gap-x-6 py-2">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-muted-foreground/80 text-right">{value}</span>
        </div>
    );
}

export function BookSkeleton() {
    return (
        <div className="animate-pulse rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.04]">
            <div className="h-44 bg-white/[0.04]" />
            <div className="p-5 space-y-3">
                <div className="h-4 bg-white/[0.06] rounded-full w-3/4" />
                <div className="h-3 bg-white/[0.04] rounded-full w-1/2" />
                <div className="h-3 bg-white/[0.03] rounded-full w-full" />
            </div>
        </div>
    );
}

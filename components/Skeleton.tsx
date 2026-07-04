'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-surface-muted animate-pulse rounded-lg ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-3xl shadow-sm p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-4">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-surface-muted px-6 py-4 flex gap-4">
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 flex-1" />
      </div>

      {/* Rows */}
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="px-6 py-4 flex gap-4 border-t border-border">
          <Skeleton className="h-6 flex-1" />
          <Skeleton className="h-6 flex-1" />
          <Skeleton className="h-6 flex-1" />
          <div className="flex-1 flex gap-2">
            <Skeleton className="h-8 flex-1 rounded-lg" />
            <Skeleton className="h-8 flex-1 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ImageSkeleton() {
  return <Skeleton className="w-full h-48 rounded-3xl" />;
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-5/6' : 'w-full'}`} />
      ))}
    </div>
  );
}

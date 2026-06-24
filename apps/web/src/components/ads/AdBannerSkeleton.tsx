import { Skeleton } from '@/components/ui/Skeleton';

export function AdBannerSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="w-full h-[120px] md:h-[200px] xl:h-[250px] shadow-sm" />
    </div>
  );
}

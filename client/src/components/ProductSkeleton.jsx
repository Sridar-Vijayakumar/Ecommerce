const ProductSkeleton = () => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white" aria-hidden="true">
    <div className="aspect-[4/3] animate-pulse bg-slate-200" />
    <div className="space-y-4 p-5">
      <div className="h-3 w-20 animate-pulse rounded-full bg-slate-200" />
      <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
      <div className="h-3 w-28 animate-pulse rounded-full bg-slate-100" />
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="h-11 w-16 animate-pulse rounded-full bg-slate-200" />
      </div>
    </div>
  </div>
);

export const ProductSkeletonGrid = ({ count = 6 }) => (
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Loading products">
    {Array.from({ length: count }, (_, index) => <ProductSkeleton key={index} />)}
  </div>
);

export default ProductSkeleton;

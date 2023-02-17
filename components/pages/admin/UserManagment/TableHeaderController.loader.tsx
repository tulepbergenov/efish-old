import { ShimmerBadge } from "react-shimmer-effects";

export const TableHeaderController = () => {
  return (
    <div className="mb-[35px] flex items-center justify-between">
      <div className="flex items-center gap-x-[20px]">
        <ShimmerBadge width={422} />
        <ShimmerBadge width={328} />
      </div>
      <ShimmerBadge width={320} />
    </div>
  );
};

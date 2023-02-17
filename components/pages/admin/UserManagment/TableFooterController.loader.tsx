import { ShimmerThumbnail } from "react-shimmer-effects";

export const TableFooterController = () => {
  return (
    <div className="mt-[29px] flex items-center gap-x-[30px]">
      <ShimmerThumbnail height={17} width={166} rounded />
      <ShimmerThumbnail height={17} width={186} rounded />
      <ShimmerThumbnail height={17} width={112} rounded />
    </div>
  );
};

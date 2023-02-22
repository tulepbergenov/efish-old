import { Oval } from "react-loader-spinner";

export const PreLoaderV2 = () => {
  return (
    <div className="flex w-full justify-center">
      <Oval
        height={80}
        width={80}
        color="#52A5FC"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#C1DFFF"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

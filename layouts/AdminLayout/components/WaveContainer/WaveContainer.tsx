import classNames from "classnames";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useLayoutEffect,
} from "react";

interface IWaveContainer
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export const WaveContainer = ({ className, children }: IWaveContainer) => {
  useLayoutEffect(() => {
    document.body.classList.add("bg-[#F4FAFF]");

    return () => document.body.classList.remove("bg-[#F4FAFF]");
  }, []);

  return (
    <div
      className={classNames(
        "relative flex flex-auto flex-col before:absolute before:-left-[423px] before:-top-[390px] before:h-[664px] before:w-[664px] before:rounded-full before:bg-[#52A5FC] before:blur-[400px] before:content-[''] after:absolute after:-bottom-[473px] after:-right-[423px] after:h-[664px] after:w-[664px] after:rounded-full after:bg-[#52A5FC] after:blur-[400px] after:content-['']",
        className
      )}
    >
      <div className="z-10 flex-auto pb-[273px] pt-[43px] before:absolute before:bottom-0 before:left-0 before:w-full before:bg-wave before:bg-[length:100%_100%] before:bg-left-bottom before:bg-no-repeat before:content-[''] before:xl:h-[100px] before:2xl:h-[140px]">
        {children}
      </div>
    </div>
  );
};

import { IRole } from "@/interfaces/roles.interface";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";

export const AddCreateRefRoles = ({
  roles,
  onToggleRole,
  setIsOpen,
  selectedRoles,
}: {
  roles: IRole[];
  onToggleRole: (id: number) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedRoles: number[];
}) => {
  return (
    <div className="max-w-[538px]">
      <div className="flex items-center justify-between gap-x-[10px] bg-[#52A5FC] px-[20px] pb-[15px] pt-[15px] text-[18px] font-semibold leading-[24px] text-white">
        <p>Выбирете роль для добавления</p>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="flex h-[25px] w-[25px] items-center justify-center rounded-[5px] border border-white"
        >
          <IoMdClose className="text-white" />
        </button>
      </div>
      <ul className="gap-t-[10px] grid grid-cols-2 gap-y-[10px] gap-x-[15px] px-[20px] py-[15px] pb-[50px]">
        <AnimatePresence>
          {roles.map((role) => (
            <motion.li
              key={role.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => onToggleRole(role.id)}
                className={classNames(
                  "text-start text-[14px] leading-[17px] transition-colors duration-300 ease-in-out",
                  {
                    ["text-[#5ABB5E] hover:text-[#F19797]"]:
                      selectedRoles.some((el) => el === role.id) === true,
                    ["text-[#0A091D] hover:text-[#52A5FC]"]:
                      selectedRoles.some((el) => el === role.id) !== true,
                  }
                )}
              >
                {role.description}
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

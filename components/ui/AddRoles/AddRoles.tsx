import { IRole } from "@/interfaces/roles.interface";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { IoMdClose } from "react-icons/io";

export const AddRoles = ({
  roles,
  lockRoleItem,
  onAddRole,
  setIsOpen,
}: {
  roles: IRole[];
  onAddRole: (id: number) => void;
  lockRoleItem: (id: number) => boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
              className={classNames({
                ["sr-only"]: lockRoleItem(role.id) === true,
              })}
            >
              <button
                type="button"
                className="text-start text-[14px] leading-[17px] transition-colors duration-300 ease-in-out hover:text-[#52A5FC]"
                disabled={lockRoleItem(role.id)}
                onClick={() => onAddRole(role.id)}
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

import { AdminLayoutProps } from "./AdminLayout.props";
import { Header, Sidebar } from "./components";
import { motion } from "framer-motion";
import { WaveContainer } from "./components/WaveContainer/WaveContainer";

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <WaveContainer>
      <div className="mx-auto grid max-w-[1720px] grid-cols-[252px_1fr] gap-[35px_30px] px-[30px]">
        <Header className="col-span-2" />
        <Sidebar />
        <motion.main
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "linear", delay: 0.5 }}
        >
          <section className="min-h-[550px] rounded-[10px] bg-white px-[40px] pt-[42px] pb-[61px] shadow-[0px_8px_50px_rgba(210,232,254,0.4)]">
            {children}
          </section>
        </motion.main>
      </div>
    </WaveContainer>
  );
};

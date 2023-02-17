import { TooltipProps } from "./Tooltip.props";
import styles from "./Tooltip.module.css";

export const Tooltip = ({ label, children }: TooltipProps) => {
  return (
    <div className={styles.tooltip}>
      <span className={styles.label}>{label}</span>
      {children}
    </div>
  );
};

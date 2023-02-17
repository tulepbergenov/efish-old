interface FormatStatusProps {
  value: string | number;
}

export const FormatStatus = ({ value }: FormatStatusProps) => {
  if (value === 0) {
    return <p className="text-[#5ABB5E]">Активный</p>;
  }

  if (value === 1) {
    return <p className="text-[#F19797]">Заблокирована</p>;
  }

  if (value === "create") {
    return <p className="text-[#0A091D]">Создана</p>;
  }

  return null;
};

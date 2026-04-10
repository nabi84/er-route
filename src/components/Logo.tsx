import { assets } from "../data/assets";
import { useI18n } from "../i18n/I18nProvider";

type LogoProps = {
  stacked?: boolean;
  className?: string;
};

export function Logo({ stacked = false, className }: LogoProps) {
  const { t } = useI18n();

  return (
    <img
      src={stacked ? assets.logoStacked : assets.logoSymbol}
      alt={t("common.appName")}
      className={className}
      draggable={false}
    />
  );
}

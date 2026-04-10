import { Logo } from "./Logo";
import { LanguageMenuButton } from "./LanguageMenuButton";

type HeaderBarProps = {
  title: string;
};

export function HeaderBar({ title }: HeaderBarProps) {
  return (
    <header className="header-bar">
      <Logo className="logo-symbol" />
      <p className="header-title">{title}</p>
      <LanguageMenuButton />
    </header>
  );
}

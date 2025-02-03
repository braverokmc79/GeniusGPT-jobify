import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const links: NavLink[] = [
  {
    href: "/add-job",
    label: "일자리 추가",
    icon: <Layers />,
  },

  {
    href: "/jobs",
    label: "일자리 목록",
    icon: <AppWindow />,
  },

  {
    href: "/stats",
    label: "통계",
    icon: <AreaChart />,
  },
];

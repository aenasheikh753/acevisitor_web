import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Construction,
  DoorOpen,
  Globe2,
  HeartPulse,
  IdCard,
  KeyRound,
  Layers3,
  LockKeyhole,
  MapPinned,
  Menu,
  MessageCircle,
  Monitor,
  School,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import type { IconName } from "@/lib/types";

const icons = {
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  audit: BadgeCheck,
  badge: IdCard,
  building: Building2,
  calendar: CalendarDays,
  check: Check,
  "chevron-down": ChevronDown,
  clock: Clock3,
  contractor: Construction,
  door: DoorOpen,
  globe: Globe2,
  health: HeartPulse,
  id: IdCard,
  key: KeyRound,
  layers: Layers3,
  lock: LockKeyhole,
  map: MapPinned,
  menu: Menu,
  message: MessageCircle,
  monitor: Monitor,
  school: School,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  "user-check": UserRoundCheck,
  users: UsersRound,
  x: X,
};

export default function IconBox({
  icon,
  size = "md",
  className = "",
}: {
  icon: IconName;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const Icon = icons[icon];
  const dimensions = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
    >
      <Icon className={dimensions} strokeWidth={1.8} />
    </span>
  );
}

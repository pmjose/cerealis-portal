import {
  Activity, BadgeCheck, BadgePercent, BarChart3, Bot, Boxes, Cable, CalendarClock, CalendarRange, Castle, ChefHat, CloudSun, Cookie, Cpu, Database,
  Factory, FileCheck2, FileSignature, Flag, FlaskConical, Gauge, GitBranch, Globe2, GraduationCap, HardHat, Headset, Heart, HeartPulse, Landmark,
  LayoutGrid, Leaf, Lightbulb, LineChart, Map, Megaphone, Merge, MessageSquare, MessageSquareHeart, MessagesSquare, Network, Package, Percent,
  PieChart, Recycle, ShieldCheck, Ship, ShoppingBasket, Sparkles, Sprout, Store, Sun, TrendingUp, Truck, Users, Wallet, Wheat, Wrench, Zap,
  IdCard, Cog, Circle, type LucideIcon,
} from 'lucide-react';

// Registo explícito: mantém o bundle pequeno (sem importar a biblioteca inteira).
const ICONS: Record<string, LucideIcon> = {
  Activity, BadgeCheck, BadgePercent, BarChart3, Bot, Boxes, Cable, CalendarClock, CalendarRange, Castle, ChefHat, CloudSun, Cookie, Cpu, Database,
  Factory, FileCheck2, FileSignature, Flag, FlaskConical, Gauge, GitBranch, Globe2, GraduationCap, HardHat, Headset, Heart, HeartPulse, Landmark,
  LayoutGrid, Leaf, Lightbulb, LineChart, Map, Megaphone, Merge, MessageSquare, MessageSquareHeart, MessagesSquare, Network, Package, Percent,
  PieChart, Recycle, ShieldCheck, Ship, ShoppingBasket, Sparkles, Sprout, Store, Sun, TrendingUp, Truck, Users, Wallet, Wheat, Wrench, Zap, IdCard, Cog,
};

export function Icon({ name, size = 18, color }: { name: string; size?: number; color?: string }) {
  const I = ICONS[name] ?? Circle;
  return <I size={size} color={color} />;
}

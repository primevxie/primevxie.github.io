import type { LucideIcon } from 'lucide-react';
import {
  Crosshair,
  Zap,
  Sparkles,
  Volume2,
  MousePointerClick,
  Bird,
  Blocks,
  Sun,
  ShieldOff,
  Radar,
  Gauge,
  Swords,
} from 'lucide-react';

export interface ModuleInfo {
  name: string;
  category: string;
  description: string;
  icon: LucideIcon;
}

export const modules: ModuleInfo[] = [
  {
    name: 'Reach',
    category: 'combat',
    description: 'Extend your attack range with adjustable, configurable distance.',
    icon: Swords,
  },
  {
    name: 'Velocity',
    category: 'combat',
    description: 'Reduce or cancel incoming knockback to stay on target.',
    icon: Gauge,
  },
  {
    name: 'KillEffects',
    category: 'visual',
    description: 'Custom particle & sound effects triggered on every elimination.',
    icon: Sparkles,
  },
  {
    name: 'HitSounds',
    category: 'audio',
    description: 'Distinct audio feedback the instant your hits register.',
    icon: Volume2,
  },
  {
    name: 'AutoClicker',
    category: 'combat',
    description: 'Human-like randomized click timing for consistent CPS.',
    icon: MousePointerClick,
  },
  {
    name: 'AimAssist',
    category: 'combat',
    description: 'Subtle aim correction that keeps your crosshair locked on.',
    icon: Crosshair,
  },
  {
    name: 'Eagle',
    category: 'movement',
    description: 'Automated crouch-on-edge for flawless, faster speedbridging.',
    icon: Bird,
  },
  {
    name: 'Scaffold',
    category: 'movement',
    description: 'Smooth, safe auto-bridging with rotation and timer fixes.',
    icon: Blocks,
  },
  {
    name: 'Fullbright',
    category: 'visual',
    description: 'See clearly in caves and at night without a gamma mod.',
    icon: Sun,
  },
  {
    name: 'NoFall',
    category: 'movement',
    description: 'Removes fall damage from misjudged jumps and clutches.',
    icon: ShieldOff,
  },
  {
    name: 'ESP',
    category: 'visual',
    description: 'Track players and entities through walls at a glance.',
    icon: Radar,
  },
  {
    name: 'TriggerBot',
    category: 'combat',
    description: 'Fires automatically the moment your crosshair finds a target.',
    icon: Zap,
  },
];

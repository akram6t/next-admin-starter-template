'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Package,
  List,
  Settings,
  Users,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

const menuItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/users', icon: Users, label: 'Users' },
  { href: '/products', icon: Package, label: 'Products' },
  { href: '/categories', icon: List, label: 'Categories' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'bg-background border-r transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full p-4">
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Button
                  asChild
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    pathname === item.href && 'bg-muted',
                    isCollapsed && 'justify-center p-2'
                  )}
                >
                  <Link href={item.href} className="flex items-center">
                    <item.icon
                      className={cn('w-4 h-4', !isCollapsed && 'mr-2')}
                    />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto space-y-2">
          <ModeToggle />
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start',
              isCollapsed && 'justify-center p-1'
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 mr-2" />
                Collapse
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

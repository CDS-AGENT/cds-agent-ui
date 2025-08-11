import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'
import { useTheme } from '@/components/theme-provider'
import {
  LayoutDashboard,
  UserSearch,
  ClipboardClock,
  AlertTriangle,
  FileSliders,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Users,
  Sun,
  Moon,
  Bell,
  User,
  LogOut,
  Stethoscope,
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  currentPage: string
  onPageChange: (page: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { 
    id: 'patients', 
    label: 'Patients', 
    icon: Users,
    subItems: [
      { id: 'existing-patients', label: 'Existing Patients', icon: UserSearch },
      { id: 'enroll-patients', label: 'Enroll Patients', icon: UserPlus },
    ]
  },
  { id: 'diagnosis', label: 'Previous Diagnosis', icon: ClipboardClock },
  { id: 'flagged', label: 'Flagged for Review', icon: AlertTriangle },
  { id: 'config', label: 'Configurations', icon: FileSliders },
]

export function Sidebar({ collapsed, onToggle, currentPage, onPageChange }: SidebarProps) {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [notifications] = useState(3) // Mock notification count
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['patients']) // Default expand patients

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId)
  const isCurrentPageInSubmenu = (item: { subItems?: { id: string }[] }) => {
    if (!item.subItems) return false
    return item.subItems.some((subItem: { id: string }) => subItem.id === currentPage)
  }

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">MedCare</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const hasSubItems = item.subItems && item.subItems.length > 0
            const isExpanded = hasSubItems && isMenuExpanded(item.id)
            const isParentActive = currentPage === item.id || isCurrentPageInSubmenu(item)
            
            return (
              <div key={item.id}>
                {/* Main Menu Item */}
                <Button
                  variant={isParentActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full h-10',
                    collapsed 
                      ? 'justify-center px-0' 
                      : 'justify-start px-3'
                  )}
                  title={collapsed ? (hasSubItems ? `${item.label} (Click to expand menu)` : item.label) : undefined}
                  onClick={() => {
                    if (hasSubItems) {
                      if (collapsed) {
                        // When collapsed, expand the sidebar and show sub-menu
                        onToggle()
                        // Ensure the menu is expanded
                        if (!isMenuExpanded(item.id)) {
                          toggleMenu(item.id)
                        }
                      } else {
                        // When expanded, toggle the sub-menu
                        toggleMenu(item.id)
                      }
                    } else {
                      // Regular menu items without sub-items
                      onPageChange(item.id)
                    }
                  }}
                >
                  <Icon className={cn(
                    'h-4 w-4 shrink-0', 
                    collapsed ? '' : 'mr-2'
                  )} />
                  {!collapsed && (
                    <span className="truncate text-left flex-1">{item.label}</span>
                  )}
                  {/* Chevron for expandable menus */}
                  {hasSubItems && !collapsed && (
                    <div className="ml-auto">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  )}
                  {/* Notification badge for flagged items */}
                  {item.id === 'flagged' && !collapsed && notifications > 0 && (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center shrink-0">
                      {notifications}
                    </span>
                  )}
                </Button>

                {/* Sub Menu Items */}
                {hasSubItems && isExpanded && !collapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon
                      return (
                        <Button
                          key={subItem.id}
                          variant={currentPage === subItem.id ? 'secondary' : 'ghost'}
                          className="w-full h-9 justify-start px-3 text-sm"
                          onClick={() => onPageChange(subItem.id)}
                        >
                          <SubIcon className="h-3.5 w-3.5 shrink-0 mr-2" />
                          <span className="truncate text-left flex-1">{subItem.label}</span>
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-border p-4 space-y-4">
        {/* Theme Toggle */}
        <div className={cn(
          'flex items-center', 
          collapsed ? 'justify-center' : 'justify-start'
        )}>
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "sm"}
            onClick={toggleTheme}
            title={collapsed ? (theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode') : undefined}
            className={cn(
              'transition-colors',
              collapsed ? 'h-8 w-8' : 'w-full h-8 justify-start px-2'
            )}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {!collapsed && (
              <span className="ml-2 text-sm">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
          </Button>
        </div>

        <Separator />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'w-full h-auto min-h-[3rem]',
                collapsed ? 'justify-center p-2' : 'justify-start p-2'
              )}
            >
              <div className={cn(
                'flex items-center w-full', 
                collapsed ? 'justify-center' : 'space-x-3'
              )}>
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex-1 text-left overflow-hidden min-w-0">
                    <p className="text-sm font-medium truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      @{user?.username}
                    </p>
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align={collapsed ? 'center' : 'end'}
            side="top"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              {notifications > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                  {notifications}
                </span>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

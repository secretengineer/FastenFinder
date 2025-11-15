import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Dashboard } from '@/components/dashboard';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Logo className="size-5" />
              </div>
              <h1 className="text-xl font-semibold transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0">
                SortMaster
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {/* Can add navigation items here in the future */}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex h-full flex-col">
            <header className="flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-lg font-semibold md:text-xl">Dashboard</h1>
              </div>
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/firebase/studio" target="_blank">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </header>
            <Dashboard />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface PageWrapperProps {
  children: React.ReactNode;
  hideNav?: boolean;
  hideFooter?: boolean;
}

export function PageWrapper({ children, hideNav = false, hideFooter = false }: PageWrapperProps) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {!hideNav && <Navbar />}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

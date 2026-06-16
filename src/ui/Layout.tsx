import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export interface LayoutProps {
  /** Slot para contenido extra en el navbar */
  rightContent?: React.ReactNode;
}

export default function Layout({ rightContent }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar rightContent={rightContent} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

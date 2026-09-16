import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { CartDrawer } from '../components/cart/CartDrawer';
import { StyleAssistantModal } from '../components/common/StyleAssistantModal';

export const MainLayout = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navbar onOpenAssistant={() => setIsAssistantOpen(true)} />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <CartDrawer />
      <StyleAssistantModal isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
};
export default MainLayout;

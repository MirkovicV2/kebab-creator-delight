import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ScrollManager from "@/features/layout/components/ScrollManager";
import { Toaster as Sonner } from "@/shared/ui/sonner";
import { Toaster } from "@/shared/ui/toaster";
import { TooltipProvider } from "@/shared/ui/tooltip";

import ContactPage from "./pages/ContactPage.tsx";
import Index from "./pages/Index.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();
const routerBase = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        basename={routerBase}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/carta" element={<MenuPage />} />
          <Route path="/carta.pdf" element={<Navigate replace to="/carta" />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/pedido-online" element={<Navigate replace to="/carta" />} />
          <Route path="/nosotros" element={<Navigate replace to="/contacto" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNews from "./pages/AdminNews";
import AdminGallery from "./pages/AdminGallery";
import ParentsSpace from "./pages/ParentsSpace";
import TeachersSpace from "./pages/TeachersSpace";
import NotFound from "./pages/NotFound";
import PortesOuvertes from "./pages/news/PortesOuvertes";
import ConcoursMatematiques from "./pages/news/ConcoursMatematiques";
import OptionTheatre from "./pages/news/OptionTheatre";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/portes-ouvertes" element={<PortesOuvertes />} />
          <Route path="/news/concours-matematiques" element={<ConcoursMatematiques />} />
          <Route path="/news/option-theatre" element={<OptionTheatre />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/parents" element={<ParentsSpace />} />
          <Route path="/teachers" element={<TeachersSpace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

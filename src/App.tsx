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
import PrivateSpace from "./pages/PrivateSpace";
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
          <Route path="/students" element={<PrivateSpace type="students" />} />
          <Route path="/parents" element={<PrivateSpace type="parents" />} />
          <Route path="/teachers" element={<PrivateSpace type="teachers" />} />
          <Route path="/admin" element={<PrivateSpace type="admin" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

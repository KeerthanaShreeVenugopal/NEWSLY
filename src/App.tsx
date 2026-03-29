import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import BriefingsPage from "./pages/BriefingsPage";
import StoryTrackerPage from "./pages/StoryTrackerPage";
import VideoStudioPage from "./pages/VideoStudioPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import { AuthProvider } from "@/context/AuthContext";
import GlobalBackground from "./components/GlobalBackground";

import { LanguageProvider } from "./components/Language"; // ✅ ADDED

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider> {/* ✅ ADDED HERE */}
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GlobalBackground />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/news/:id" element={<ArticlePage />} />
              <Route path="/news/:id/briefing" element={<BriefingsPage />} />
              <Route path="/news/:id/story" element={<StoryTrackerPage />} />
              <Route path="/news/:id/video" element={<VideoStudioPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider> {/* ✅ ADDED HERE */}
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
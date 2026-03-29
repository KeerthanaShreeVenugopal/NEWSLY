import { useEffect } from "react";
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
import { LanguageProvider } from "./components/Language";

// ✅ ADD THIS
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // ✅ get session after redirect
    supabase.auth.getSession().then(({ data }) => {
      console.log("SESSION:", data.session);
    });

    // ✅ listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("EVENT:", event);
        console.log("SESSION:", session);
      }
    );

    // ✅ clean ugly URL (#access_token)
    if (window.location.hash.includes("access_token")) {
      window.history.replaceState({}, document.title, "/");
    }

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
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
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
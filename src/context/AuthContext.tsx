import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleUser = async (user: any) => {
            // ✅ UPSERT profile (fixes your issue)
            const { data: profile, error } = await supabase
                .from("profiles")
                .upsert([
                    {
                        id: user.id,
                        name: user.user_metadata?.name || "User",
                    },
                ])
                .select()
                .maybeSingle();

            if (error) {
                console.error("Profile error:", error);
            }

            setUser((prev: any) => {
                if (prev?.id === user.id) return prev; // prevent re-render
                return {
                    ...user,
                    name: profile?.name || user.user_metadata?.name,
                };
            });

            setLoading(false);
        };

        // initial check
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) handleUser(data.user);
            else setLoading(false);
        });

        // listener
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session?.user) {
                    await handleUser(session.user);
                } else {
                    setUser(null);
                    setLoading(false);
                }
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
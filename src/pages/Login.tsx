import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({    // form data
        name: "",
        email: "",
        password: "",
    });



    // 🔐 EMAIL AUTH
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });

                if (error) throw error;

                navigate("/"); // ✅ ADD THIS
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: { name: formData.name },
                    },
                });

                if (error) throw error;

                navigate("/"); // ✅ ADD THIS
            }
        } catch (err: any) {
            alert(err.message);
        }

        setLoading(false);
    };

    // 🔴 GOOGLE LOGIN
    const handleGoogleLogin = async () => {
        setLoading(true);

        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin,
            },
        });
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">

            <Navbar />
            {/* <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden"> */}
            <div className="flex items-center justify-center min-h-screen pt-20">

                {/* 🌌 BACKGROUND */}
                <AnimatedBackground />

                {/* 🔐 AUTH CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10"
                >
                    <h1 className="text-3xl font-bold text-center mb-6">
                        {isLogin ? "Sign In" : "Sign Up"}
                    </h1>

                    {/* TOGGLE */}
                    <div className="flex mb-6 bg-white/10 rounded-lg">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 p-2 ${isLogin ? "bg-blue-600 rounded-lg" : ""
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 p-2 ${!isLogin ? "bg-blue-600 rounded-lg" : ""
                                }`}
                        >
                            Signup
                        </button>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <input
                                name="name"
                                placeholder="Full Name"
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-white/10"
                            />
                        )}

                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-white/10"
                        />

                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-white/10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full p-3 bg-blue-600 rounded"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Submit"}
                        </button>
                    </form>

                    {/* GOOGLE */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full mt-4 p-3 bg-white text-black rounded"
                    >
                        Continue with Google
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

/* 🌌 BACKGROUND COMPONENT */
function AnimatedBackground() {
    return (
        <div className="absolute inset-0">
            <motion.div
                className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 6 }}
            />
        </div>
    );
}
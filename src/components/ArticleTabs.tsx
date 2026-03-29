import { Link, useParams, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ArticleTabs = () => {
    const { id } = useParams();
    const location = useLocation();

    const tabs = [
        { name: "Article", path: "" },
        { name: "Briefing", path: "briefing" },
        { name: "Story", path: "story" },
        { name: "Video", path: "video" },
    ];

    const isActive = (path: string) => {
        if (path === "") return location.pathname === `/news/${id}`;
        return location.pathname === `/news/${id}/${path}`;
    };

    return (
        // <div className="max-w-4xl mx-auto px-4 mb-6 flex items-center justify-between border-b border-border pb-3">
        <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* LEFT: Back */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>

                {/* RIGHT: Tabs */}
                <div className="flex gap-6">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.name}
                            to={tab.path === "" ? `/news/${id}` : `/news/${id}/${tab.path}`}
                            className={`text-sm font-medium ${isActive(tab.path)
                                ? "text-gold border-b-2 border-gold pb-1"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticleTabs;
const FooterSection = () => {
  return (
    <footer className="relative border-t border-border/50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-gold)" }}>
                <span className="text-primary-foreground font-bold text-sm font-['Space_Grotesk']">ET</span>
              </div>
              <span className="text-lg font-semibold tracking-tight font-['Space_Grotesk']">
                My <span className="text-gradient-gold">ET</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The future of business news. Personalized, intelligent, and built for 2026.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Dashboard", "Navigator", "Video Studio", "Pricing"] },
            { title: "Company", links: ["About", "Careers", "Press", "Blog", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-4 font-['Space_Grotesk']">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 My ET — The Economic Times. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Built with AI for the next generation of business news readers.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

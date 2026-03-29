const tickerItems = [
  { text: "SENSEX ▲ 82,450.32 (+1.2%)", positive: true },
  { text: "NIFTY ▲ 24,890.15 (+0.8%)", positive: true },
  { text: "USD/INR ▼ 83.42 (-0.3%)", positive: false },
  { text: "CRUDE OIL ▲ $78.90 (+2.1%)", positive: true },
  { text: "GOLD ▲ ₹72,340 (+0.5%)", positive: true },
  { text: "BTC ▼ $68,200 (-1.8%)", positive: false },
  { text: "ADANI GREEN ▲ ₹1,845 (+3.2%)", positive: true },
  { text: "TCS ▼ ₹3,890 (-0.4%)", positive: false },
  { text: "RELIANCE ▲ ₹2,940 (+1.1%)", positive: true },
  { text: "INFOSYS ▲ ₹1,620 (+0.9%)", positive: true },
];

const NewsTicker = () => {
  return (
    <div className="w-full overflow-hidden border-y border-border/40 bg-secondary/40">
      <div className="animate-ticker flex whitespace-nowrap py-2.5">
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="mx-6 text-sm font-medium tracking-wide">
            <span className={item.positive ? "text-emerald-400" : "text-red-400"}>
              {item.text}
            </span>
            <span className="mx-4 text-foreground/20">│</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;

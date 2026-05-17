export default function Footer() {
  const month = new Date().toLocaleString("en", { month: "long", year: "numeric" }).toLowerCase();
  return (
    <footer className="relative mt-20 py-10" style={{ borderTop: "1px solid var(--border-color)" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--gold), transparent)",
          opacity: 0.5,
        }}
      />
      <div className="container-x flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
        <div>designed & built by ragavaa mani</div>
        <div>last updated {month} · software engineer</div>
      </div>
    </footer>
  );
}

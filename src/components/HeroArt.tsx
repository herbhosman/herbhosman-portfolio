export function HeroArt() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-background"
    >
      <div className="mesh absolute right-[-8%] top-[-10%] h-[88%] w-[58%] max-w-[720px] rounded-[46%_54%_42%_58%] bg-[radial-gradient(circle_at_28%_28%,#3d6b7a_0%,transparent_52%),radial-gradient(circle_at_78%_68%,#c45c26_0%,transparent_46%),linear-gradient(150deg,#243038_0%,#3a4a52_48%,#1a1714_100%)] opacity-95 max-sm:right-[-28%] max-sm:w-[78%]" />
      <div className="absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,#f3f1ec_0%,#f3f1ec_62%,rgba(243,241,236,0.72)_82%,transparent_100%)] max-sm:w-[78%]" />
      <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-[linear-gradient(180deg,transparent_0%,rgba(243,241,236,0.7)_40%,#f3f1ec_100%)]" />
      <div className="absolute bottom-[24%] right-[9%] hidden h-24 w-24 border border-surface/40 lg:block" />
      <div className="absolute bottom-[30%] right-[15%] hidden h-16 w-16 bg-signal lg:block" />
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.38em] text-clay">Commissions</p>
        <h2 className="display text-[clamp(2.8rem,8vw,6.4rem)] leading-[0.9] tracking-[-0.03em]">
          A piece made
          <br />
          for your table.
        </h2>
        <p className="mx-auto mt-8 max-w-lg text-ivory/70">
          Studio visits, custom vessels, and small collections. Tell Fereshte what the room needs —
          a candle, a cup, or something that watches back.
        </p>
        <a
          href="mailto:studio@ferbm.art?subject=Studio%20inquiry"
          className="mt-12 inline-flex items-center gap-4 border border-ivory/30 px-8 py-4 text-[0.72rem] uppercase tracking-[0.32em] transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
        >
          Write to the studio
        </a>
      </div>

      <footer className="mx-auto mt-28 flex max-w-[1600px] flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-[0.62rem] uppercase tracking-[0.28em] text-ivory/45 md:flex-row">
        <span>FERBM · Fereshte</span>
        <span>Handmade ceramics</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}

import Image from "next/image";

export function About() {
  return (
    <section id="studio" className="relative overflow-hidden bg-ivory text-ink">
      <div className="mx-auto grid max-w-[1600px] items-stretch lg:grid-cols-12">
        <div className="relative min-h-[70vh] lg:col-span-5">
          <Image
            src="/images/fereshte-portrait.jpg"
            alt="Fereshte, ceramic artist"
            fill
            className="object-cover object-[center_18%]"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ivory/10" />
        </div>

        <div className="flex flex-col justify-center px-6 py-20 md:px-14 lg:col-span-7 lg:py-28">
          <p className="mb-5 text-[0.68rem] uppercase tracking-[0.38em] text-amber">The studio</p>
          <h2 className="display max-w-xl text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.92] tracking-[-0.03em]">
            Quiet hands.
            <br />
            Loud glaze.
          </h2>
          <div className="mt-10 max-w-xl space-y-6 text-[1.05rem] leading-8 text-smoke/85">
            <p>
              Fereshte works in clay the way some people keep a diary — slowly, with the whole body
              leaning in. On the wheel a vessel rises; in the fire it becomes weather. Teal pools
              against amber. A rim crumples. A small guardian appears in the palm.
            </p>
            <p>
              FERBM is her mark: handmade ceramics that feel both ancient and newly born. Functional
              pieces you can drink from. Sculptures that watch the room. Objects that still carry
              the hour they were made.
            </p>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-ink/10 pt-8 text-sm">
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-amber">Practice</dt>
              <dd className="mt-2 display text-2xl">Wheel &amp; hand-build</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-amber">Firing</dt>
              <dd className="mt-2 display text-2xl">Glaze, then kiln</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-amber">Editions</dt>
              <dd className="mt-2 display text-2xl">One of one</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

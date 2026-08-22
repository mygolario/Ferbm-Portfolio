"use client";

import Image from "next/image";
import { works } from "@/lib/works";

export function Collection() {
  return (
    <section id="collection" className="relative bg-ink px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-col justify-between gap-8 border-b border-ivory/15 pb-10 md:mb-24 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.38em] text-clay">Collection</p>
            <h2 className="display max-w-2xl text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.03em]">
              Vessels, sculpture, and small gods of glaze.
            </h2>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-ivory/70">
            Each piece is thrown or built by hand, then glazed until the surface feels like weather —
            teal tides, amber drips, crumpled walls that still hold a fingerprint.
          </p>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {works.map((work, index) => (
            <article
              key={work.slug}
              className="work-card group mb-5 break-inside-avoid overflow-hidden bg-smoke"
            >
              <div className="relative">
                <Image
                  src={work.src}
                  alt={work.title}
                  width={work.span === "wide" ? 1536 : 819}
                  height={work.span === "wide" ? 1024 : 1456}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="mb-2 text-[0.62rem] uppercase tracking-[0.28em] text-clay">
                    {work.kind} · {work.year}
                  </p>
                  <h3 className="display text-3xl tracking-[-0.02em]">{work.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-ivory/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {work.story}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

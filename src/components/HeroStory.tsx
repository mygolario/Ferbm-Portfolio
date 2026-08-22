"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  kicker: string;
  lines: string[];
  start: number;
  end: number;
};

const chapters: Chapter[] = [
  {
    kicker: "A ceramic practice",
    lines: ["FERBM"],
    start: 0,
    end: 0.16,
  },
  {
    kicker: "01  —  Throw",
    lines: ["Hands in clay.", "Time in the wheel."],
    start: 0.16,
    end: 0.38,
  },
  {
    kicker: "02  —  Glaze",
    lines: ["Color like weather.", "A rim that remembers."],
    start: 0.38,
    end: 0.62,
  },
  {
    kicker: "03  —  Fire",
    lines: ["Objects", "with a pulse."],
    start: 0.62,
    end: 0.84,
  },
  {
    kicker: "The maker",
    lines: ["Fereshte"],
    start: 0.84,
    end: 1,
  },
];

function chapterOpacity(progress: number, start: number, end: number): number {
  const fade = Math.min(0.08, (end - start) * 0.35);
  if (progress < start || progress > end) return 0;
  const fadeIn = start === 0 ? 0 : fade;
  if (fadeIn > 0 && progress < start + fadeIn) return (progress - start) / fadeIn;
  if (progress > end - fade) return Math.max(0, (end - progress) / fade);
  return 1;
}

export function HeroStory() {
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const kickerRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const lineRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    let duration = 14.7;

    const applyProgress = (progress: number) => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        duration = video.duration;
      }
      const t = Math.min(Math.max(progress, 0), 0.999) * Math.max(duration - 0.04, 0.1);
      if (Math.abs(video.currentTime - t) > 0.02) {
        video.currentTime = t;
      }

      chapters.forEach((chapter, index) => {
        const opacity = chapterOpacity(progress, chapter.start, chapter.end);
        const node = chapterRefs.current[index];
        const kicker = kickerRefs.current[index];
        if (node) node.style.opacity = String(opacity);
        if (kicker) kicker.style.opacity = String(opacity);

        chapter.lines.forEach((_, lineIndex) => {
          const line = lineRefs.current[index]?.[lineIndex];
          if (!line) return;
          const y = (1 - opacity) * 110;
          line.style.transform = `translateY(${y}%)`;
        });
      });

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(progress < 0.08 ? 1 - progress / 0.08 : 0);
      }
    };

    const ready = () => {
      video.pause();
      duration = video.duration || duration;
    };

    video.addEventListener("loadedmetadata", ready);
    void video.play().then(() => video.pause()).catch(() => undefined);

    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.85,
      onUpdate: (self) => {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => applyProgress(self.progress));
      },
    });

    applyProgress(0);

    return () => {
      cancelAnimationFrame(frameRef.current);
      video.removeEventListener("loadedmetadata", ready);
      trigger.kill();
    };
  }, []);

  return (
    <section id="story" className="relative">
      <div ref={pinRef} className="relative h-[520vh]">
        <div className="sticky top-0 h-dvh w-full overflow-hidden bg-ink">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            poster="/video/hero-poster.jpg"
            disablePictureInPicture
          >
            <source src="/video/hero.mp4" type="video/mp4" media="(min-width: 1600px)" />
            <source src="/video/hero-720.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/20 to-ink/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(20,17,14,0.28)_70%)]" />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="relative w-full max-w-5xl text-center">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.kicker}
                  ref={(el) => {
                    chapterRefs.current[index] = el;
                  }}
                  className={`absolute inset-x-0 top-1/2 -translate-y-1/2 ${
                    index === 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <p
                    ref={(el) => {
                      kickerRefs.current[index] = el;
                    }}
                    className="mb-6 text-[0.72rem] uppercase tracking-[0.42em] text-ivory/70"
                  >
                    {chapter.kicker}
                  </p>
                  <h1 className="display text-[clamp(3.1rem,10vw,8.6rem)] leading-[0.88] tracking-[-0.03em]">
                    {chapter.lines.map((line, lineIndex) => (
                      <span key={line} className="chapter-line block">
                        <span
                          ref={(el) => {
                            const bucket = lineRefs.current[index] ?? [];
                            bucket[lineIndex] = el;
                            lineRefs.current[index] = bucket;
                          }}
                        >
                          {line}
                        </span>
                      </span>
                    ))}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-ivory/15 md:block">
            <div
              ref={progressRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-ivory"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div
            ref={hintRef}
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.62rem] uppercase tracking-[0.38em] text-ivory/70"
          >
            <span>Scroll to enter the studio</span>
            <span className="block h-10 w-px animate-pulse bg-ivory/50" />
          </div>
        </div>
      </div>
    </section>
  );
}

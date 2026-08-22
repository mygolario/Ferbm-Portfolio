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

const FRAME = 1 / 20;

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

  useEffect(() => {
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    let duration = 14.7;
    let pendingTime = 0;
    let seekQueued = false;

    const paintChapters = (progress: number) => {
      chapters.forEach((chapter, index) => {
        const opacity = chapterOpacity(progress, chapter.start, chapter.end);
        const node = chapterRefs.current[index];
        const kicker = kickerRefs.current[index];
        if (node) node.style.opacity = String(opacity);
        if (kicker) kicker.style.opacity = String(opacity);

        chapter.lines.forEach((_, lineIndex) => {
          const line = lineRefs.current[index]?.[lineIndex];
          if (!line) return;
          line.style.transform = `translate3d(0, ${(1 - opacity) * 110}%, 0)`;
        });
      });

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(progress < 0.08 ? 1 - progress / 0.08 : 0);
      }
    };

    const flushSeek = () => {
      seekQueued = false;
      if (video.seeking) return;
      const t = pendingTime;
      if (Math.abs(video.currentTime - t) < FRAME * 0.45) return;
      video.currentTime = t;
    };

    const applyProgress = (progress: number) => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        duration = video.duration;
      }
      const raw = Math.min(Math.max(progress, 0), 0.999) * Math.max(duration - FRAME, 0.1);
      pendingTime = Math.round(raw / FRAME) * FRAME;
      paintChapters(progress);
      if (!seekQueued) {
        seekQueued = true;
        requestAnimationFrame(flushSeek);
      }
    };

    const onSeeked = () => {
      if (Math.abs(video.currentTime - pendingTime) >= FRAME * 0.45) {
        flushSeek();
      }
    };

    const ready = () => {
      duration = video.duration || duration;
      video.pause();
    };

    video.addEventListener("loadedmetadata", ready);
    video.addEventListener("seeked", onSeeked);
    void video.play().then(() => video.pause()).catch(() => undefined);

    const trigger = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => applyProgress(self.progress),
    });

    applyProgress(0);

    return () => {
      video.removeEventListener("loadedmetadata", ready);
      video.removeEventListener("seeked", onSeeked);
      trigger.kill();
    };
  }, []);

  return (
    <section id="story" className="relative">
      <div ref={pinRef} className="relative h-[420vh]">
        <div className="sticky top-0 h-dvh w-full overflow-hidden bg-ink">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
            muted
            playsInline
            preload="auto"
            poster="/video/hero-poster.jpg"
            disablePictureInPicture
            src="/video/hero-scrub.mp4"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/20 to-ink/70" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(20,17,14,0.28)_70%)]" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
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

          <div className="pointer-events-none absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-ivory/15 md:block">
            <div
              ref={progressRef}
              className="absolute inset-x-0 top-0 h-full origin-top bg-ivory"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div
            ref={hintRef}
            className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.62rem] uppercase tracking-[0.38em] text-ivory/70"
          >
            <span>Scroll to enter the studio</span>
            <span className="block h-10 w-px animate-pulse bg-ivory/50" />
          </div>
        </div>
      </div>
    </section>
  );
}

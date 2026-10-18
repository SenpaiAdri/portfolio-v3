"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import Image from "next/image";
import { projects } from "@/data/projects";

interface Preview {
  src: string;
  title: string;
}

// Masked text rise, staggered per column via the --i custom property and by
// the row's --stagger cascade offset (text starts 110% down behind an
// overflow-hidden mask).
const textRevealClass =
  "reveal-text block translate-y-[110%] transition-transform duration-[600ms] ease-[cubic-bezier(0.33,1,0.68,1)] delay-[calc(var(--stagger,0ms)+var(--i)*100ms)] motion-reduce:transition-none group-data-[inview=true]/reveal:translate-y-0";

export function ProjectSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const pushedRef = useRef(false);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // The thumbnail button to return focus to when the viewer closes.
  const openerRef = useRef<HTMLElement | null>(null);
  // Pending "scroll the freshly opened row into view" (small screens only).
  const openScrollTimer = useRef<number | null>(null);
  const isPreviewOpen = preview !== null;

  const closePreview = useCallback(() => {
    // Let the browser back navigation drive the close so the
    // history entry added on open is cleaned up.
    if (pushedRef.current) {
      window.history.back();
    } else {
      setPreview(null);
    }
  }, []);

  useEffect(() => {
    if (!isPreviewOpen) return;

    document.body.style.overflow = "hidden";
    window.history.pushState({ lightbox: true }, "");
    pushedRef.current = true;
    dialogRef.current?.focus();

    const handlePopState = () => {
      pushedRef.current = false;
      setPreview(null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePreview();
      } else if (e.key === "Tab") {
        // The viewer holds one focusable element, so keep focus there instead
        // of letting Tab walk the page behind the overlay.
        e.preventDefault();
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus();
      openerRef.current = null;
    };
  }, [isPreviewOpen, closePreview]);

  // Drop any pending scroll-on-open timeout when the section goes away.
  useEffect(() => {
    return () => {
      if (openScrollTimer.current !== null) {
        window.clearTimeout(openScrollTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const rows = Array.from(list.querySelectorAll(":scope > li"));
    const staggerMs = 50;
    let cascadeEnd = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const now = performance.now();
        const hits = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => rows.indexOf(a) - rows.indexOf(b));

        for (const row of hits) {
          const start = Math.max(now, cascadeEnd);
          row.style.setProperty("--stagger", `${Math.round(start - now)}ms`);
          cascadeEnd = start + staggerMs;
          row.dataset.inview = "true";
          observer.unobserve(row);
        }
      },
      // Fire when a row has mostly entered the viewport so the reveal is visible.
      { rootMargin: "0px 0px -10% 0px" },
    );

    // Only project rows — not the tech <li>s nested inside expanded content.
    for (const row of rows) observer.observe(row);

    return () => observer.disconnect();
  }, []);

  const wipeSide = (row: HTMLElement, clientY: number) => {
    const rect = row.getBoundingClientRect();
    return clientY < rect.top + rect.height / 2
      ? "calc(-100% - 1px)"
      : "calc(100% + 1px)";
  };

  const handleRowMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const row = e.currentTarget;
    const panel = row.querySelector<HTMLElement>("[data-wipe]");
    if (!panel) return;
    delete panel.dataset.wipe;
    panel.style.setProperty("--from", wipeSide(row, e.clientY));
    void panel.offsetWidth; // force the reset to land before the wipe starts
    panel.dataset.wipe = "in";
  };

  const handleRowMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    const row = e.currentTarget;
    const panel = row.querySelector<HTMLElement>("[data-wipe]");
    if (!panel) return;
    panel.dataset.wipe = "out";
    panel.style.setProperty("--from", wipeSide(row, e.clientY));
  };

  const handleRowClick = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    const nextOpen = openIndex === index ? null : index;
    setOpenIndex(nextOpen);

    if (openScrollTimer.current !== null) {
      window.clearTimeout(openScrollTimer.current);
      openScrollTimer.current = null;
    }
    if (nextOpen === null || window.innerWidth >= 800) return;

    // Once the accordion has opened (0.5s), pull the row into view.
    const row = e.currentTarget.closest("li");
    if (!row) return;
    openScrollTimer.current = window.setTimeout(() => {
      const top = row.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top });
    }, 500);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="flex flex-col py-[30vh] bg-foreground text-background px-4"
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>

      {/* Column labels */}
      <div
        aria-hidden
        className="grid grid-cols-[1fr_1.5fr_0.6fr] items-end px-1 text-[12px] uppercase tracking-[0.15em] text-background/75 sm:grid-cols-[1fr_1fr_1fr]"
      >
        <span>Project</span>
        <span className="text-center">Role</span>
        <span className="text-right">Year</span>
      </div>

      <ul ref={listRef} className="flex flex-col border-t border-background/50">
        {projects.map((project, i) => {
          const isOpen = openIndex === i;
          // Index is part of the key: project titles may repeat.
          return (
            <li key={`${project.title}-${i}`} className="group/reveal relative">
              {/* Bottom stroke — draws left-to-right once the row's text has landed */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 origin-left scale-x-0 border-b border-background/50 transition-transform delay-[calc(var(--stagger,0ms)+300ms)] duration-1500 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none group-data-[inview=true]/reveal:scale-x-100"
              />
              {/* Row header */}
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`project-${i}`}
                onClick={(e) => handleRowClick(e, i)}
                onMouseEnter={handleRowMouseEnter}
                onMouseLeave={handleRowMouseLeave}
                className="group/row relative isolate overflow-hidden grid w-full cursor-pointer grid-cols-[1fr_1.5fr_0.6fr] items-center px-1 py-1.5 text-left text-sm leading-5 transition-colors duration-200 outline-none focus-visible:bg-background focus-visible:text-foreground sm:grid-cols-[1fr_1fr_1fr] sm:text-[15px]"
              >
                <span
                  aria-hidden
                  data-wipe
                  className="absolute inset-0 z-0 translate-y-(--from,calc(-100%-1px)) bg-background data-[wipe=in]:translate-y-0 data-[wipe=in]:transition-transform data-[wipe=in]:duration-250 data-[wipe=in]:ease-[cubic-bezier(0.33,1,0.68,1)] data-[wipe=out]:transition-transform data-[wipe=out]:duration-250 data-[wipe=out]:ease-[cubic-bezier(0.33,1,0.68,1)]"
                />
                <span className="relative z-10 overflow-hidden pr-2 transition-[color,padding] duration-300 group-hover/row:pl-3.5 group-hover/row:text-foreground">
                  <span
                    className={`truncate ${textRevealClass}`}
                    style={{ "--i": 0 } as CSSProperties}
                  >
                    {project.title}
                  </span>
                </span>
                <span className="relative z-10 overflow-hidden text-center transition-[color,padding] duration-300 group-hover/row:text-foreground">
                  <span
                    className={`truncate ${textRevealClass}`}
                    style={{ "--i": 1 } as CSSProperties}
                  >
                    {project.role}
                  </span>
                </span>
                <span className="relative z-10 overflow-hidden text-right transition-[color,padding] duration-300 group-hover/row:pr-3.5 group-hover/row:text-foreground">
                  <span
                    className={`tabular-nums ${textRevealClass}`}
                    style={{ "--i": 2 } as CSSProperties}
                  >
                    {project.date}
                  </span>
                </span>
              </button>

              {/* Expanded detail — the reference's 0fr→1fr grid accordion */}
              <div
                id={`project-${i}`}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-5 pb-20">
                    <p className="max-w-4xl text-xl leading-tight font-normal text-balance sm:text-2xl md:text-[2rem]">
                      {project.description}
                    </p>

                    {project.tech.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-background/50 px-3.5 py-1 text-[10px] tracking-wide"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1 rounded-full bg-background px-3.5 py-1.5 text-[11px] font-medium text-foreground transition-opacity hover:opacity-75"
                      >
                        Visit website <span aria-hidden>↗</span>
                      </a>
                    )}

                    {/* Images */}
                    <div className="mt-6 grid w-full grid-cols-1 gap-3 pb-1 sm:grid-cols-3 sm:gap-4">
                      {project.image.slice(0, 3).map((src) => (
                        <button
                          key={src}
                          type="button"
                          onClick={(e) => {
                            openerRef.current = e.currentTarget;
                            setPreview({ src, title: project.title });
                          }}
                          aria-label={`View ${project.title} image fullscreen`}
                          className="group relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl bg-background/10 outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                        >
                          <Image
                            src={src}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <span
                            aria-hidden
                            className="absolute right-2 bottom-2 rounded-full bg-foreground/70 px-2.5 py-1 text-[10px] font-medium text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                          >
                            View ⤢
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Fullscreen image viewer */}
      {preview && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          aria-label={`${preview.title} image viewer. Press Escape, browser back, or click anywhere to close.`}
          onClick={closePreview}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-4 outline-none backdrop-blur-sm sm:p-8"
        >
          <img
            src={preview.src}
            alt={`${preview.title} fullscreen preview`}
            className="h-auto max-h-[85vh] w-auto max-w-[calc(100vw-2rem)] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

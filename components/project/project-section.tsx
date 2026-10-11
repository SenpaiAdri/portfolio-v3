"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";

export function ProjectSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="flex flex-col py-[25vh] bg-foreground text-background px-4"
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>

      {/* Column labels */}
      <div
        aria-hidden
        className="grid grid-cols-[1fr_1.5fr_0.6fr] items-end px-1 pb-1 text-xs uppercase tracking-[0.15em] text-background/75 sm:grid-cols-[1fr_1fr_1fr]"
      >
        <span>Project</span>
        <span className="text-center">Role</span>
        <span className="text-right">Year</span>
      </div>

      <ul className="flex flex-col">
        {projects.map((project, i) => {
          const isOpen = openIndex === i;
          return (
            <li
              key={project.title}
              className="border-t border-background last:border-b"
            >
              {/* Row header — hover uses the project background color */}
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`grid w-full cursor-pointer grid-cols-[1fr_1.5fr_0.6fr] items-center px-1 py-1.5 text-left text-sm transition-colors duration-200 outline-none hover:bg-background hover:text-foreground focus-visible:bg-(--row-bg) focus-visible:text-foreground sm:grid-cols-[1fr_1fr_1fr] sm:text-[15px]`}
              >
                <span className="truncate pr-2">{project.title}</span>
                <span className="truncate text-center">{project.role}</span>
                <span className="text-right tabular-nums">{project.date}</span>
              </button>

              {/* Expanded detail */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-5 pb-20">
                    <p className="max-w-3xl text-xl leading-tight font-normal text-balance sm:text-2xl md:text-[2rem]">
                      {project.description}
                    </p>

                    {project.tech.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-background/40 px-3.5 py-1 text-[10px] tracking-wide"
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
                        onClick={(e) => e.stopPropagation()}
                        className="mt-4 inline-flex items-center gap-1 rounded-full bg-background px-3.5 py-1.5 text-[11px] font-medium text-foreground transition-opacity hover:opacity-80"
                      >
                        Visit website <span aria-hidden>↗</span>
                      </a>
                    )}

                    {/* Images */}
                    <div className="mt-6 grid w-full grid-cols-1 gap-3 pb-1 sm:grid-cols-3 sm:gap-4">
                      {project.image.slice(0, 3).map((src) => (
                        <div
                          key={src}
                          className="relative aspect-video w-full overflow-hidden rounded-2xl bg-background/10"
                        >
                          <Image
                            src={src}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

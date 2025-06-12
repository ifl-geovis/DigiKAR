"use client";
import fetcher from "@/lib/fetcher";
import { Changelog } from "@/types/Changelog";
import useSWRImmutable from "swr/immutable";
import { Skeleton } from "./ui/skeleton";
import { formatDateTimeDE } from "@/lib/format";
import MarkdownRenderer from "./MarkdownRenderer";

export default function ChangelogClient() {
  const { data, error, isLoading } = useSWRImmutable<Changelog[]>(
    "https://api.geohistoricaldata.org/digikar/changelog?order=date.desc",
    fetcher,
  );

  return (
    <article className="flex justify-center">
      <div className="mx-5 w-full max-w-prose">
        <h2>Changelog</h2>
        <div className="flex flex-col gap-10">
          {isLoading &&
            new Array(3).fill(null).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="block h-4 w-1/10 rounded" />
                <Skeleton className="block h-8 w-1/3 rounded" />
                <Skeleton className="block h-16 w-full rounded" />
              </div>
            ))}
          {error && (
            <div className="p-10 text-red-500">
              Fehler beim Laden des Changelogs.
            </div>
          )}
          {data &&
            data.map((d) => (
              <div key={d.date}>
                <time className="-mb-8 block font-mono" dateTime={d.date}>
                  {formatDateTimeDE(d.date)}
                </time>
                <MarkdownRenderer className="prose" components={{ p: "h3" }}>
                  {d.short_title}
                </MarkdownRenderer>
                <MarkdownRenderer className="prose">
                  {d.description}
                </MarkdownRenderer>
              </div>
            ))}
        </div>
      </div>
    </article>
  );
}

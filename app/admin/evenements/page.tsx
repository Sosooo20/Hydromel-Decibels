import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatTimeRange } from "@/lib/format";
import { deleteEvent } from "./actions";
import { IconPencil, IconTrash } from "../icons";
import {
  buttonClass,
  iconButtonClass,
  iconDangerButtonClass,
  tableClass,
  tableWrapperClass,
  tdClass,
  theadClass,
  thClass,
  trClass,
  typeBadgeClass,
} from "@/app/admin/ui";

const TYPE_LABELS: Record<string, string> = {
  CONCERT: "Concert",
  ACTIVITY: "Activité",
  FEAST: "Festin",
};

export default async function AdminEvenementsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startTime: "asc" },
    include: { artist: true, stage: true },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-brown">Événements</h2>
        <Link href="/admin/evenements/nouveau" className={buttonClass}>
          + Nouvel événement
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="font-heading text-center text-sm italic text-brown-mid">
          Aucun événement pour le moment.
        </p>
      ) : (
        <div className={tableWrapperClass}>
          <table className={tableClass}>
            <thead className={theadClass}>
              <tr>
                <th className={thClass}>Événement</th>
                <th className={`${thClass} w-28`}>Type</th>
                <th className={`${thClass} w-40`}>Quand</th>
                <th className={`${thClass} w-24`}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className={trClass}>
                  <td className={tdClass}>
                    <p className="font-display truncate font-bold">{event.title}</p>
                    <p className="truncate text-[11px] text-brown-mid">
                      {event.stage.name}
                      {event.artist ? ` · ${event.artist.name}` : ""}
                    </p>
                  </td>
                  <td className={tdClass}>
                    <span className={typeBadgeClass}>{TYPE_LABELS[event.type] ?? event.type}</span>
                  </td>
                  <td className={`${tdClass} text-[12px]`}>
                    <p className="font-semibold">{event.day}</p>
                    <p className="text-brown-mid">{formatTimeRange(event.startTime, event.endTime)}</p>
                  </td>
                  <td className={tdClass}>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/evenements/${event.id}`}
                        aria-label="Modifier"
                        title="Modifier"
                        className={iconButtonClass}
                      >
                        <IconPencil />
                      </Link>
                      <form action={deleteEvent.bind(null, event.id)}>
                        <button
                          type="submit"
                          aria-label="Supprimer"
                          title="Supprimer"
                          className={iconDangerButtonClass}
                        >
                          <IconTrash />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

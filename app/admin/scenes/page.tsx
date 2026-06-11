import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteStage } from "./actions";
import DeleteButton from "../DeleteButton";
import { IconPencil } from "../icons";
import {
  buttonClass,
  iconButtonClass,
  tableClass,
  tableWrapperClass,
  tdClass,
  theadClass,
  thClass,
  trClass,
} from "@/app/admin/ui";

export default async function AdminScenesPage() {
  const stages = await prisma.stage.findMany({
    orderBy: { id: "asc" },
    include: { _count: { select: { events: true } } },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-brown">Scènes</h2>
        <Link href="/admin/scenes/nouveau" className={buttonClass}>
          + Nouvelle scène
        </Link>
      </div>

      {stages.length === 0 ? (
        <p className="font-heading text-center text-sm italic text-brown-mid">
          Aucune scène pour le moment.
        </p>
      ) : (
        <div className={tableWrapperClass}>
          <table className={tableClass}>
            <thead className={theadClass}>
              <tr>
                <th className={thClass}>Nom</th>
                <th className={thClass}>Slug</th>
                <th className={`${thClass} w-32 text-right`}>Événements</th>
                <th className={`${thClass} w-24`}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {stages.map((stage) => (
                <tr key={stage.id} className={trClass}>
                  <td className={`${tdClass} font-display font-bold`}>{stage.name}</td>
                  <td className={`${tdClass} text-brown-mid`}>{stage.slug}</td>
                  <td className={`${tdClass} text-right`}>{stage._count.events}</td>
                  <td className={tdClass}>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/scenes/${stage.id}`}
                        aria-label="Modifier"
                        title="Modifier"
                        className={iconButtonClass}
                      >
                        <IconPencil />
                      </Link>
                      <form action={deleteStage.bind(null, stage.id)}>
                        <DeleteButton
                          confirmMessage={`Supprimer la scène « ${stage.name} » ?`}
                        />
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

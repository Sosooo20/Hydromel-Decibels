import Link from "next/link";
import prisma from "@/lib/prisma";
import { deletePoi } from "./actions";
import { CATEGORY_LABELS } from "./labels";
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
  typeBadgeClass,
} from "@/app/admin/ui";

export default async function AdminPointsInteretPage() {
  const points = await prisma.pointOfInterest.findMany({ orderBy: { id: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-brown">Points d&apos;intérêt</h2>
        <Link href="/admin/points-interet/nouveau" className={buttonClass}>
          + Nouveau point
        </Link>
      </div>

      {points.length === 0 ? (
        <p className="font-heading text-center text-sm italic text-brown-mid">
          Aucun point d&apos;intérêt pour le moment.
        </p>
      ) : (
        <div className={tableWrapperClass}>
          <table className={tableClass}>
            <thead className={theadClass}>
              <tr>
                <th className={thClass}>Nom</th>
                <th className={`${thClass} w-36`}>Catégorie</th>
                <th className={`${thClass} w-40`}>Coordonnées</th>
                <th className={`${thClass} w-24`}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {points.map((point) => (
                <tr key={point.id} className={trClass}>
                  <td className={`${tdClass} font-display truncate font-bold`}>{point.name}</td>
                  <td className={tdClass}>
                    <span className={typeBadgeClass}>
                      {CATEGORY_LABELS[point.category] ?? point.category}
                    </span>
                  </td>
                  <td className={`${tdClass} text-[12px] text-brown-mid`}>
                    {point.lat.toFixed(5)}, {point.lng.toFixed(5)}
                  </td>
                  <td className={tdClass}>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/points-interet/${point.id}`}
                        aria-label="Modifier"
                        title="Modifier"
                        className={iconButtonClass}
                      >
                        <IconPencil />
                      </Link>
                      <form action={deletePoi.bind(null, point.id)}>
                        <DeleteButton
                          confirmMessage={`Supprimer le point d'intérêt « ${point.name} » ?`}
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

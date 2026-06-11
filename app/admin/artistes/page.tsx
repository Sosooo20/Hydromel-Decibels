import Link from "next/link";
import prisma from "@/lib/prisma";
import { deleteArtist } from "./actions";
import { IconPencil, IconTrash } from "../icons";
import {
  badgeClass,
  buttonClass,
  iconButtonClass,
  iconDangerButtonClass,
  tableClass,
  tableWrapperClass,
  tdClass,
  theadClass,
  thClass,
  trClass,
} from "@/app/admin/ui";

export default async function AdminArtistesPage() {
  const artists = await prisma.artist.findMany({ orderBy: { id: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-brown">Artistes</h2>
        <Link href="/admin/artistes/nouveau" className={buttonClass}>
          + Nouvel artiste
        </Link>
      </div>

      {artists.length === 0 ? (
        <p className="font-heading text-center text-sm italic text-brown-mid">
          Aucun artiste pour le moment.
        </p>
      ) : (
        <div className={tableWrapperClass}>
          <table className={tableClass}>
            <thead className={theadClass}>
              <tr>
                <th className={thClass}>Nom</th>
                <th className={thClass}>Genre</th>
                <th className={`${thClass} w-24`}>
                  <span className="sr-only">Recherché</span>
                </th>
                <th className={`${thClass} w-24`}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist.id} className={trClass}>
                  <td className={`${tdClass} font-display font-bold`}>{artist.name}</td>
                  <td className={`${tdClass} truncate text-brown-mid`}>{artist.genre}</td>
                  <td className={tdClass}>
                    {artist.featured && <span className={badgeClass}>Recherché</span>}
                  </td>
                  <td className={tdClass}>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/artistes/${artist.id}`}
                        aria-label="Modifier"
                        title="Modifier"
                        className={iconButtonClass}
                      >
                        <IconPencil />
                      </Link>
                      <form action={deleteArtist.bind(null, artist.id)}>
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

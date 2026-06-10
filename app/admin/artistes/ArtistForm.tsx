import Link from "next/link";
import type { Artist } from "@/app/generated/prisma/client";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/app/admin/ui";

export default function ArtistForm({
  artist,
  action,
  submitLabel,
}: {
  artist?: Artist;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={artist?.name}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>
            Identifiant (slug)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            pattern="[a-z0-9-]+"
            placeholder="echoes-of-valhalla"
            defaultValue={artist?.slug}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="genre" className={labelClass}>
          Genre
        </label>
        <input
          id="genre"
          name="genre"
          type="text"
          required
          placeholder="Folk Viking"
          defaultValue={artist?.genre}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={artist?.description}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className={labelClass}>
          Image (URL)
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://..."
          defaultValue={artist?.imageUrl ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bounty" className={labelClass}>
            Prime (Lutins d&apos;Or)
          </label>
          <input
            id="bounty"
            name="bounty"
            type="number"
            min={0}
            placeholder="1500"
            defaultValue={artist?.bounty ?? ""}
            className={inputClass}
          />
        </div>

        <label className="font-heading mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-brown-mid">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={artist?.featured}
            className="h-4 w-4 accent-gold"
          />
          Avis de Recherche (mis en avant)
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className={buttonClass}>
          {submitLabel}
        </button>
        <Link href="/admin/artistes" className={secondaryButtonClass}>
          Annuler
        </Link>
      </div>
    </form>
  );
}

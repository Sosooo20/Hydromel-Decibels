import Link from "next/link";
import type { Artist, Event, Stage } from "@/app/generated/prisma/client";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/app/admin/ui";
import { toDatetimeLocal } from "./datetime";

const TYPE_OPTIONS = [
  { value: "CONCERT", label: "Concert" },
  { value: "ACTIVITY", label: "Activité" },
  { value: "FEAST", label: "Festin" },
];

export default function EventForm({
  event,
  artists,
  stages,
  action,
  submitLabel,
}: {
  event?: Event;
  artists: Artist[];
  stages: Stage[];
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="flex max-w-xl flex-col gap-4">
      <div>
        <label htmlFor="title" className={labelClass}>
          Titre
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={event?.title}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            defaultValue={event?.slug}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="type" className={labelClass}>
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={event?.type ?? "CONCERT"}
            className={inputClass}
          >
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
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
          defaultValue={event?.description}
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
          defaultValue={event?.imageUrl ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="day" className={labelClass}>
            Jour
          </label>
          <input
            id="day"
            name="day"
            type="text"
            required
            placeholder="Vendredi"
            defaultValue={event?.day}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="startTime" className={labelClass}>
            Début
          </label>
          <input
            id="startTime"
            name="startTime"
            type="datetime-local"
            required
            defaultValue={event ? toDatetimeLocal(event.startTime) : ""}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="endTime" className={labelClass}>
            Fin
          </label>
          <input
            id="endTime"
            name="endTime"
            type="datetime-local"
            required
            defaultValue={event ? toDatetimeLocal(event.endTime) : ""}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="stageId" className={labelClass}>
            Scène
          </label>
          <select
            id="stageId"
            name="stageId"
            required
            defaultValue={event?.stageId ?? ""}
            className={inputClass}
          >
            <option value="" disabled>
              Choisir une scène
            </option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="artistId" className={labelClass}>
            Artiste
          </label>
          <select
            id="artistId"
            name="artistId"
            defaultValue={event?.artistId ?? ""}
            className={inputClass}
          >
            <option value="">Aucun</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="prize" className={labelClass}>
          Récompense
        </label>
        <input
          id="prize"
          name="prize"
          type="text"
          placeholder="50 Lutins d'Or"
          defaultValue={event?.prize ?? ""}
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className={buttonClass}>
          {submitLabel}
        </button>
        <Link href="/admin/evenements" className={secondaryButtonClass}>
          Annuler
        </Link>
      </div>
    </form>
  );
}

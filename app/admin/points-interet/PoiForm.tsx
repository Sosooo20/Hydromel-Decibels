import Link from "next/link";
import type { PointOfInterest } from "@/app/generated/prisma/client";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/app/admin/ui";
import { CATEGORY_LABELS } from "./labels";

export default function PoiForm({
  point,
  action,
  submitLabel,
}: {
  point?: PointOfInterest;
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
            defaultValue={point?.name}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>
            Catégorie
          </label>
          <select
            id="category"
            name="category"
            defaultValue={point?.category ?? "STAGE"}
            className={inputClass}
          >
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
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
          rows={3}
          defaultValue={point?.description ?? ""}
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
          defaultValue={point?.imageUrl ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lat" className={labelClass}>
            Latitude
          </label>
          <input
            id="lat"
            name="lat"
            type="number"
            step="any"
            required
            placeholder="43.1962"
            defaultValue={point?.lat}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lng" className={labelClass}>
            Longitude
          </label>
          <input
            id="lng"
            name="lng"
            type="number"
            step="any"
            required
            placeholder="2.3636"
            defaultValue={point?.lng}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className={buttonClass}>
          {submitLabel}
        </button>
        <Link href="/admin/points-interet" className={secondaryButtonClass}>
          Annuler
        </Link>
      </div>
    </form>
  );
}

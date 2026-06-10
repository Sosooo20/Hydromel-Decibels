import Link from "next/link";
import { createStage } from "../actions";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/app/admin/ui";

export default function NewStagePage() {
  return (
    <div>
      <h2 className="font-display mb-6 text-lg font-bold text-brown">Nouvelle scène</h2>

      <form action={createStage} className="flex max-w-md flex-col gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nom
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
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
            placeholder="le-nid-du-dragon"
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className={buttonClass}>
            Créer
          </button>
          <Link href="/admin/scenes" className={secondaryButtonClass}>
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

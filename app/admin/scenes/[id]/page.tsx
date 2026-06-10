import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { updateStage } from "../actions";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/app/admin/ui";

export default async function EditStagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stage = await prisma.stage.findUnique({ where: { id: Number(id) } });

  if (!stage) {
    notFound();
  }

  return (
    <div>
      <h2 className="font-display mb-6 text-lg font-bold text-brown">Modifier la scène</h2>

      <form action={updateStage.bind(null, stage.id)} className="flex max-w-md flex-col gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={stage.name}
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
            defaultValue={stage.slug}
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className={buttonClass}>
            Enregistrer
          </button>
          <Link href="/admin/scenes" className={secondaryButtonClass}>
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}

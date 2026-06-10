import PoiForm from "../PoiForm";
import { createPoi } from "../actions";

export default function NewPoiPage() {
  return (
    <div>
      <h2 className="font-display mb-6 text-lg font-bold text-brown">Nouveau point d&apos;intérêt</h2>
      <PoiForm action={createPoi} submitLabel="Créer" />
    </div>
  );
}

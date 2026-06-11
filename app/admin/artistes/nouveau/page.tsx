import ArtistForm from "../ArtistForm";
import { createArtist } from "../actions";

export default function NewArtistPage() {
  return (
    <div>
      <h2 className="font-display mb-6 text-lg font-bold text-black">Nouvel artiste</h2>
      <ArtistForm action={createArtist} submitLabel="Créer" />
    </div>
  );
}

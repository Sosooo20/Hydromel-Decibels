export default async function Home({
    params,
} : { params : Promise<{ evenementId: string}>;
}) {
    return (
        <h1>Détail d'un événement</h1>
    )
}
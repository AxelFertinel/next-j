import contacts from "../../data/contacts";
import Link from "next/link";
export default async function ContactsDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const contact = contacts.find((c) => c.id === id);

    if (!contact) {
        return <div>Contact non trouvé</div>;
    }

    return (
        <div>
            <Link href="/contacts">
                <strong>Retour à la liste des contact</strong>
            </Link>
            <div className="mt-5">
                <h1>
                    Fiche du Contact <strong>{contact.name}</strong>
                </h1>
                <p>email : {contact.email}</p>
                <p>téléphone : {contact.phone}</p>
            </div>
        </div>
    );
}

import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { Contact } from "@/app/contacts/[id]/page";

interface UserFormProps {
    contact: Contact | null;
    setContact: Dispatch<SetStateAction<Contact | null>>;
    setShowUpdate: Dispatch<SetStateAction<boolean>>;
    onCreate?: (
        data: { name: string; email: string; phone: string },
        resetForm: () => void
    ) => void;
}

export function UserForm({
    contact,
    setContact,
    setShowUpdate,
    onCreate,
}: UserFormProps) {
    const [name, setName] = useState(contact ? contact.name : "");
    const [email, setEmail] = useState(contact ? contact.email : "");
    const [phone, setPhone] = useState(contact ? contact.phone : "");
    const [loading, setLoading] = useState(false);

    function resetForm() {
        setName("");
        setEmail("");
        setPhone("");
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        if (!contact && onCreate) {
            // Mode création
            await onCreate({ name, email, phone }, resetForm);
            setLoading(false);
            return;
        }
        // Mode édition
        const res = await fetch(`/api/user/${contact!.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone }),
        });
        if (res.ok) {
            const updated = await res.json();
            setContact(updated);
            setShowUpdate(false);
            toast.success("Mise à jour réalisée avec succès");
        } else {
            alert("Erreur lors de la mise à jour.");
        }
        setLoading(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 mt-6 max-w-sm"
        >
            <label>Nom</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nom"
                className="border p-2 rounded"
            />
            <label>Email</label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Email"
                className="border p-2 rounded"
            />
            <label>Téléphone</label>
            <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Téléphone"
                className="border p-2 rounded"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
                disabled={loading}
            >
                {loading
                    ? contact
                        ? "Mise à jour..."
                        : "Ajout..."
                    : contact
                    ? "Enregistrer"
                    : "Ajouter"}
            </button>
        </form>
    );
}

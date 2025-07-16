"use client";

import {
    useState,
    useEffect,
    FormEvent,
    Dispatch,
    SetStateAction,
} from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { UserForm } from "@/components/UserForm";

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface ParamsProps {
    params: { id: number };
}

export default function ContactsDetails({ params }: ParamsProps) {
    const id = params.id;
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);
    const [showUpdate, setShowUpdate] = useState(false);

    // Charger le contact au montage
    useEffect(() => {
        fetch(`/api/user/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setContact(data);
                setLoading(false);
            });
    }, [id]);

    async function handleDelete() {
        if (!confirm("Voulez-vous vraiment supprimer ce contact ?")) return;
        const res = await fetch(`/api/user/${id}`, { method: "DELETE" });
        if (res.ok) {
            toast.success("Suppression du contact avec succès");
            setTimeout(() => {
                window.location.href = "/contacts";
            }, 1000); // attend 1 seconde avant de rediriger
        } else {
            alert("Erreur lors de la suppression.");
        }
    }

    function handleShowUpdate() {
        setShowUpdate((v) => !v);
    }

    if (loading) return <div>Chargement...</div>;
    if (!contact) return <div>Contact non trouvé</div>;

    return (
        <div>
            <Link href="/contacts">
                <strong>Retour à la liste des contacts</strong>
            </Link>
            <div className="mt-5">
                <h1>
                    Fiche du Contact <strong>{contact.name}</strong>
                </h1>
                <div className="card">
                    <p>Nom : {contact.name}</p>
                    <p>email : {contact.email}</p>
                    <p>téléphone : {contact.phone}</p>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 "
                        >
                            Supprimer
                        </button>
                        <button
                            onClick={handleShowUpdate}
                            className="bg-yellow-500 hover:bg-yellow-600 "
                        >
                            {showUpdate ? "Annuler" : "Mettre à jour"}
                        </button>
                    </div>
                </div>
                {showUpdate && (
                    <UserForm
                        contact={contact}
                        setContact={setContact}
                        setShowUpdate={setShowUpdate}
                    />
                )}
            </div>
        </div>
    );
}

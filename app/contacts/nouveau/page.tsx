"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { UserForm } from "@/components/UserForm";
import { Contact } from "@/app/contacts/[id]/page";

export default function NouveauContact() {
    // Pour la création, pas de contact initial
    const [contact, setContact] = useState<Contact | null>(null);
    const [showForm, setShowForm] = useState(true);

    // Handler pour la création d'un contact
    async function handleCreateContact(
        data: { name: string; email: string; phone: string },
        resetForm: () => void
    ) {
        try {
            const res = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                toast.success("Contact ajouté avec succès");
                resetForm();
                setTimeout(() => {
                    window.location.href = "/contacts";
                }, 1000);
            } else {
                const result = await res.json();
                toast.error(
                    result.error || "Erreur lors de la création du contact."
                );
            }
        } catch (e) {
            toast.error(
                "Erreur lors de la création du contact. Veuillez réessayer."
            );
        }
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
                Nouveau contact
            </h1>
            {showForm && (
                <UserForm
                    contact={null}
                    setContact={setContact}
                    setShowUpdate={setShowForm}
                    onCreate={handleCreateContact}
                />
            )}
        </div>
    );
}

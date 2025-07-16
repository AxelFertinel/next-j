import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Récupère un utilisateur par id
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return NextResponse.json(
                { error: "Contact non trouvé." },
                { status: 404 }
            );
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la récupération du contact." },
            { status: 500 }
        );
    }
}

// PUT: Met à jour un utilisateur par id
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const { name, email, phone } = await request.json();
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: "Tous les champs sont obligatoires." },
                { status: 400 }
            );
        }
        const updated = await prisma.user.update({
            where: { id },
            data: { name, email, phone },
        });
        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour du contact." },
            { status: 500 }
        );
    }
}

// DELETE: Supprime un utilisateur par id
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la suppression du contact." },
            { status: 500 }
        );
    }
}

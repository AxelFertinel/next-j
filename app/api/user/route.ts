import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Liste tous les utilisateurs
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la récupération des utilisateurs." },
            { status: 500 }
        );
    }
}

// POST: Crée un nouvel utilisateur
export async function POST(request: Request) {
    try {
        const { name, email, phone } = await request.json();
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: "Tous les champs sont obligatoires." },
                { status: 400 }
            );
        }
        const user = await prisma.user.create({
            data: { name, email, phone },
        });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la création du contact." },
            { status: 500 }
        );
    }
}

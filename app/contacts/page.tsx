import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
    const users = await prisma.user.findMany();
    return (
        <div>
            <h1>Liste de contact</h1>
            <div className="mb-2">
                <Link href="/contacts/nouveau">
                    <button className=" bg-green-700  hover:bg-green-800">
                        Ajouter un contact
                    </button>
                </Link>
            </div>

            <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
                {users.map((user) => (
                    <li key={user.id} className="mb-2">
                        <Link
                            className="underline hover:no-underline"
                            href={`/contacts/${user.id}`}
                        >
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}

import Link from "next/link";
import contacts from "../data/contacts";

export default async function Contacts() {
    return (
        <div>
            <h1>Bienvenue sur la page Contacts</h1>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
                esse repellat, magni, ad, necessitatibus expedita omnis eius
                distinctio rerum sit ut placeat voluptate est veniam! Tenetur
                itaque in rerum alias?
            </p>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        <Link
                            className="underline"
                            href={`/contacts/${contact.id}`}
                        >
                            {contact.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

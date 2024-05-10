import { Link } from "@inertiajs/react";

export default function Pagination({ links }){
    return(
        <nav className="text-center mt-4">
            {links.map((link) => (
                <Link
                preserveScroll
                href={link.url || ""}
                key={link.label}
                className={"inline-block py-2 px-3 rounded-lg text-dark-200 text-xs" +
                (link.active ? "bg-red-500": " ")+
                (!link.url ? "!text-red-500 cursor-not-allowed" : "hover:bg-yellow-500")
                }
                dangerouslySetInnerHTML={{__html: link.label}}></Link>
            ))}
        </nav>
    )
}
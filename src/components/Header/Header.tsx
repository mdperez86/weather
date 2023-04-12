import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { HeaderProps } from "./types";

export default function Header({ title, description, backHref }: HeaderProps) {
  return (
    <header className="flex items-center gap-4">
      {backHref && (
        <Link
          href={backHref}
          className="rounded-full w-8 h-8 flex items-center justify-center text-stone-800/80"
          aria-label="Back"
          replace
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
        </Link>
      )}

      <div>
        <h1 className="text-xl font-medium text-stone-800/80">{title}</h1>

        {description && (
          <p className="text-xs text-stone-800/70 mt-1">{description}</p>
        )}
      </div>
    </header>
  );
}

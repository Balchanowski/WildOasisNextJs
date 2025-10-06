import Link from "next/link";
import { authConfig } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";

export default async function Navigation() {
  const session = await getServerSession(authConfig);
  console.log(session);
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center"
            >
              <img
                src={session.user.image}
                alt="User Avatar"
                className="h-8 rounded-full inline-block mr-2"
                referrerPolicy="no-referrer"
              />
              <span>Your account</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

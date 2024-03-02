import QuoteListing from "@/components/Quote/QuoteListing";
import { getQuotes } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

async function page() {
  const quotesPromise = getQuotes({ limit: 10, page: 1 });
  const userPromise = currentUser();
  const [quotes, user] = await Promise.all([quotesPromise, userPromise]);
  const isAdmin = user?.publicMetadata.isAdmin;
  return (
    <div className="app">
      <QuoteListing initialData={quotes}>
        {isAdmin && (
          <li className="flex flex-col items-center self-stretch justify-center gap-5 border border-black rounded-xl py-7">
            <Link prefetch={false} href="/quotes/create">
              <Image
                alt="add new"
                src="/add-new.png"
                width={100}
                height={100}
                className="object-contain cursor-pointer"
              />
            </Link>
          </li>
        )}
      </QuoteListing>
    </div>
  );
}

export default page;

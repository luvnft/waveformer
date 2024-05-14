import React from "react";
import Link from "next/link";
import { ArrowRightIcon, TelevisionIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";

const FooterPromo = () => {
  return (
    <div className="md:grid gap-4 md:grid-cols-2 md:mt-10 mt-6">
      <div className="p-6 mb-6 bg-gray-100 rounded-lg">
        <div className="max-w-prose">
          <h2 className="font-bold md:text-2xl text-xl mb-4">
            <TelevisionIcon className="h-6 w-6 inline-block pb-1"></TelevisionIcon> NFTV Discord
          </h2>
          <p className="mb-4"> Sell your AImusic in our NFTV Discord as a broker in the marketplace, your first AImusic LUV NFT is on the house for a limited time only.</p>
          <Link href="https://nftv.luvnft.com" className="bg-black text-white px-5 py-3 mt-2 rounded" type="submit">
            Subscribe to NFTV <ArrowRightIcon className="h-5 w-5 inline-block"></ArrowRightIcon>
          </Link>
        </div>
      </div>
      <div className="p-6 mb-6 bg-gray-100 rounded-lg">
        <div className="max-w-prose">
          <h2 className="font-bold md:text-2xl text-xl mb-4">
            <MusicalNoteIcon className="h-6 w-6 inline-block"></MusicalNoteIcon> AImusic
          </h2>
          <p className="mb-4">AImusic was made with LUV by <Link className="underline" href="https://linkedin.com/in/hahzterry">The Wizard of Hahz</Link></p>
          <p className="mb-4">It uses AI to create music. It was trained on 20,000 hours of licensed music.</p>
          <p><Link className="underline" href="mailto:info@luvnft.com">Contact for special AImusic requests</Link></p>
        </div>
      </div>
    </div>
  );
};

export default FooterPromo;

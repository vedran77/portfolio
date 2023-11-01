"use client";

import Link from "next/link";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Header() {
  const projectsRef = useRef<HTMLAnchorElement>();

  useEffect(() => {
    if (!projectsRef || !projectsRef.current) {
      return;
    }
  }, []);

  return (
    <nav className="bg-black flex justify-center">
      <div className="container flex w-full justify-between items-center">
        <Link href="#" className="text-white">
          <p className="text-3xl py-4 px-2">
            <span className="font-bold">Vedran</span> Vučić
          </p>
        </Link>
        <div className="flex gap-4">
          <Link
            href="#"
            className="text-white font-bold"
            // @ts-expect-error
            ref={(el) => (projectsRef.current = el)}
          >
            Projects
          </Link>
          <Link href="#" className="text-white">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

"use client";
import Link from "next/link";
import { Twitter, Facebook, Instagram } from "lucide-react";

const SOCIALS = [
  { href: "https://twitter.com/yourProfile", label: "Twitter", Icon: Twitter },
  { href: "https://facebook.com/yourProfile", label: "Facebook", Icon: Facebook },
  { href: "https://instagram.com/yourProfile", label: "Instagram", Icon: Instagram },
];

export default function SocialLinks() {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
      <div className="flex space-x-4">
        {SOCIALS.map(({ href, label, Icon }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-primary transition"
            aria-label={label}
          >
            <Icon size={24} />
          </Link>
        ))}
      </div>
    </div>
  );
}

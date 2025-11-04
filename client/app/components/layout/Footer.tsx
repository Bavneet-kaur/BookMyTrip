import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

type FooterLink = { label: string; href: string };
type FooterSection = { title: string; links: FooterLink[] };

const sections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Safety", href: "#" },
      { label: "Guidelines", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const socialIcons = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
];

const Footer: React.FC = () => (
  <footer className="bg-transparent border-t text-gray-200">
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
      <div className="flex flex-col md:flex-row w-full md:w-auto gap-8">
        {sections.map(section => (
          <div key={section.title}>
            <h5 className="font-semibold text-black mb-2">{section.title}</h5>
            <ul>
              {section.links.map(link => (
                <li key={link.label} className="mb-2">
                  <a href={link.href} className="text-gray-600 hover:text-blue-700 transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2 md:mt-0">
        {socialIcons.map(({ icon: Icon, label, href }) => (
          <a key={label} href={href} aria-label={label} className="text-gray-400 hover:text-blue-700 text-xl transition">
            <Icon />
          </a>
        ))}
      </div>
    </div>
    <div className="border-t text-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
        © 2025 BookMyTrip. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

import { rooms } from "@/data/roomsData";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const footerData = {
    copyRight: "© 2026 Reserviq. All rights reserved.",
    developedBy: "Crafted by",
    companyName: "Atul Kumar (Frontend Developer)",
    Footer: [
      {
        id: 1,
        heading: "Quick Links",
        type: "links",
        links: [
          { title: "Browse Rooms", url: "/dashboard" },
          { title: "My Bookings", url: "/my-bookings" },
          { title: "About Us", url: "/aboutus" },
          { title: "Contact", url: "/contact" },
          { title: "Booking Policy", url: "/booking_policy" },
          { title: "Terms & Conditions", url: "/terms_&_conditions" },
        ],
      },
      {
        id: 2,
        heading: "Featured Rooms",
        type: "rooms",
        rooms: rooms.slice(0, 5).map(r => ({
            name: r.name,
            url: `/dashboard/rooms/${r.id}`
        })),
      },
      {
        id: 3,
        heading: "Contact Info",
        type: "contact",
        contactInfo: [
          { icon: "location", info: "789 Botanical Blvd, California, USA" },
          { icon: "phone", info: "+91 987654321" },
          { icon: "mail", info: "hello@reserviq.com" },
        ],
      },
    ],
  };

  return (
    <footer className="w-full bg-[#1E293B] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {footerData.Footer.map((section) => (
            <div key={section.id}>
              <h3 className="text-xl text-white font-black mb-8 uppercase tracking-widest">
                {section.heading}
              </h3>

              {/* Links */}
              {section.type === "links" && (
                <ul className="space-y-4">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} className="text-white/80 hover:text-white transition-colors font-medium">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* Rooms */}
              {section.type === "rooms" && (
                <ul className="space-y-4">
                  {section.rooms.map((room, index) => (
                    <li key={index}>
                      <a
                        href={room.url}
                        className="text-white/80 hover:text-white transition-colors font-medium"
                      >
                        {room.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* Contact */}
              {section.type === "contact" && (
                <div className="space-y-5">
                  {section.contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      {item.icon === "location" && (
                        <MapPin className="w-5 h-5 text-white/60 shrink-0" />
                      )}
                      {item.icon === "phone" && (
                        <Phone   className="w-5 h-5 text-white/60 shrink-0" />
                      )}
                      {item.icon === "mail" && (
                        <Mail className="w-5 h-5 text-white/60 shrink-0" />
                      )}
                      <p className="text-white/80 font-medium">{item.info}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-white/60">
  
  <p>{footerData.copyRight}</p>

  <div className="flex items-center gap-2">
    <span>{footerData.developedBy}</span>

    <Heart 
      className="w-4 h-4 shrink-0" 
      color="red"
      fill="red"
    />

    <a
      href="https://www.linkedin.com/in/atulkumar1107"
      className="text-white hover:underline transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      {footerData.companyName}
    </a>
  </div>

</div>

      </div>
    </footer>
  );
};

export default Footer;

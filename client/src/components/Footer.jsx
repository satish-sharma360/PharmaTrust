import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Truck,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/5 to-transparent rounded-full blur-3xl"></div>

      {/* Main Footer */}
      <footer className="relative backdrop-blur-xl bg-slate-900/80 border-t border-white/10">
        {/* Top decorative border */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand & About */}
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Pharma<span className="text-green-600">Trust</span>
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Your trusted pharmaceutical management system providing
                  quality healthcare solutions 24/7.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="text-white font-semibold text-lg">Legal</h5>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#!"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm hover:underline"
                    >
                      Terms and Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <div>
                <h5 className="text-white font-semibold text-lg mb-4">
                  Customer Service
                </h5>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#!"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm hover:underline"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm hover:underline"
                    >
                      Support Center
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg border border-white/10">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">24/7 Hotline</p>
                    <p className="text-emerald-400 font-semibold">0115656994</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg border border-white/10">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Email Support</p>
                    <p className="text-cyan-400 font-semibold">
                      sales@pharmatrack.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h5 className="text-white font-semibold text-lg">Our Location</h5>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-white/10">
                  <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">
                      PharmaTrust Pharmacy
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      south Delhi,
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-white/10">
                  <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">
                      Operating Hours
                    </p>
                    <p className="text-gray-400 text-sm">
                      24/7 Online Service
                      <br />
                      Store: 8:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Delivery */}
            <div className="space-y-6">
              <h5 className="text-white font-semibold text-lg">
                Connect With Us
              </h5>

              {/* Social Links */}
              <div className="space-y-3">
                {[
                  {
                    icon: Facebook,
                    name: "Facebook",
                    color: "text-blue-400 hover:text-blue-300",
                  },
                  {
                    icon: Instagram,
                    name: "Instagram",
                    color: "text-pink-400 hover:text-pink-300",
                  },
                  {
                    icon: Twitter,
                    name: "Twitter",
                    color: "text-sky-400 hover:text-sky-300",
                  },
                ].map(({ icon: Icon, name, color }) => (
                  <a
                    key={name}
                    href="#!"
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-all duration-300 group"
                  >
                    <Icon className={`w-5 h-5 ${color} transition-colors`} />
                    <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                      {name}
                    </span>
                  </a>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-lg border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-emerald-400" />
                  <h6 className="text-white font-medium">Fast Delivery</h6>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Delhi City Limits and Suburbs
                </p>
                <p className="text-emerald-400 text-sm font-medium mt-1">
                  Delivery within 24hrs*
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  *Subject to availability of stocks
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-slate-950/50 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 PharmaTrust - All Rights Reserved.
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Powered by Advanced Healthcare Technology</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400">System Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative border */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
      </footer>
    </div>
  );
};

export default Footer;

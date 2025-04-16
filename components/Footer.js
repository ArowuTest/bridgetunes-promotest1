import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-mtn-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-mtn-yellow">MyNumba Don Win</h3>
            <p className="text-sm">
              A promotional campaign by Bridgetunes in partnership with MTN Nigeria.
              Recharge your MTN line daily and win amazing cash prizes!
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-mtn-yellow">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-mtn-yellow transition-colors">Home</a></li>
              <li><a href="/opt-in" className="hover:text-mtn-yellow transition-colors">Opt-In</a></li>
              <li><a href="#how-it-works" className="hover:text-mtn-yellow transition-colors">How It Works</a></li>
              <li><a href="#prize-structure" className="hover:text-mtn-yellow transition-colors">Prize Structure</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-mtn-yellow">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@bridgetunes.com</li>
              <li>Phone: +234 800 123 4567</li>
              <li>SMS: Send "HELP" to 5050</li>
              <li>USSD: Dial *123*1# for assistance</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Bridgetunes. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="text-gray-400 hover:text-mtn-yellow transition-colors mx-2">Terms & Conditions</a>
            <a href="#" className="text-gray-400 hover:text-mtn-yellow transition-colors mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-mtn-yellow transition-colors mx-2">FAQ</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

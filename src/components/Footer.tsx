import React from "react";

const Footer = () => {
  // A little JavaScript to automatically get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {currentYear} Jeffrey Huang. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          {/* Replace "#" with your actual links later */}
          <a href="#" className="hover:text-gray-300 transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const Footer = () => {
  return (
    <footer className="bg-white border-t py-10 px-8 text-sm text-gray-600">
      <div className="flex justify-between max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <img src="/Logo.png" alt="logo" className="w-6" />
            <span className="font-bold text-indigo-900">CureBuddy</span>
          </div>
          <p className="mt-2 max-w-xs">
            Connecting you with trusted doctors across India. Book appointments, manage records, and
            get care — all in one place.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">COMPANY</h4>
          <ul className="space-y-1">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-gray-400">
        Copyright © 2025 CureBuddy - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";


const Footer = () => {
  return (
    <footer className="bg-purple-200 text-black py-1 px-2">
      <div className="ml-10 mr-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-2">
          
          <div className="p-6">
            <h2 className="font-bold text-lg">COMPANY</h2>
            <p className="mt-4 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nisi dolorem aperiam commodi possimus voluptatibus eum enim vitae eligendi perspiciatis.
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                📞 Call Us
              </h3>
              <p className="ml-9">9971345674</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                📍 Location
              </h3>
              <p className="ml-9">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia quae ipsam veniam aperiam eligendi sint?</p>
            </div>
            
          </div>

          
          <div className="p-6">
            <h2 className="font-bold text-lg">SERVICES</h2>
            <p className="mt-4 text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae nisi reprehenderit similique ab corporis ea.</p>
          </div>

          

        </div>
        <div className="mt-8 text-center text-sm mb-5">
          © 2024 All Rights Reserved By ShowcaseX
        </div>
      </div>
    </footer>
  );
};

export default Footer;

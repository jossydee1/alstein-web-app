import React from "react";

const Header = () => {
  return (
    <div>
      <header
        className="flex h-[265px] items-center justify-center rounded-[20px] bg-brandColor bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/contact-us.png')`,
        }}
      >
        <h1 className="m-6 text-center text-[80px] font-semibold text-white">
          Get in Touch
        </h1>
      </header>
    </div>
  );
};

export default Header;

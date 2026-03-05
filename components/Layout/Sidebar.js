import Link from "next/link";

function Siderbar() {
  return (
    <div
      className="w-1/2 md:w-1/3 lg:w-64 fixed md:hrefp-0 md:left-0 h-screen lg:block bg-[#2f4050] border-r z-20"
      id="main-nav"
    >
      <div className="w-full h-20 border-b border-gray-100 flex px-4 items-center mb-4">
        <Link
          href="/"
          className="w-full text-white hover:font-bold  flex items-center h-10 pl-4 rounded-lg cursor-pointer"
        >
          <p className="font-semibold text-3xl text-white pl-4">I M P A C T</p>
        </Link>
      </div>

      <div className="mb-4 px-4">
        <Link
          href="/check-in"
          className="w-full text-white hover:font-bold hover:text-black  flex items-center h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span className="">Check In</span>
        </Link>

        <Link
          href="/check-out"
          className="w-full text-white hover:font-bold hover:text-black  flex items-center h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span className="">Check Out</span>
        </Link>
        <Link
          href="/performance"
          className="w-full text-white hover:font-bold hover:text-black  flex items-center h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <span className="">Performance</span>
        </Link>
      </div>
    </div>
  );
}

export default Siderbar;

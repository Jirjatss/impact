import Siderbar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Siderbar />
      <div className="w-full pl-0 md:pl-64 min-h-screen py-4 card-mentor bg-cover">
        <div className="md:mx-10">{children}</div>
      </div>
    </>
  );
}

export default Layout;

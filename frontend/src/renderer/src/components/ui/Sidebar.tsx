import BackForwardNav from "./BackForwardNav";
import NavItem from "./NavItem";
import { User } from "lucide-react";
import { Gauge } from "lucide-react";
import { ReceiptIndianRupee } from "lucide-react";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-[100%] bg-primary sticky p-2 ">
      <BackForwardNav />
      <div className="my-10 space-y-5 flex flex-col items-center">
        <NavItem icon={<Gauge />} to="/dashboard" />
        <NavItem icon={<User />} to="/donors" />
        <NavItem icon={<ReceiptIndianRupee />} to="/donations" />
        <NavItem icon={<LogOut />} signout={true} to="/login" />
      </div>
    </div>
  );
};

export default Sidebar;

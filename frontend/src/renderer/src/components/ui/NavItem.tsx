import { Button } from "./button";
import { useAuthStore } from "@renderer/zustand/authStore";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@renderer/lib/utils";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  signout?: boolean
};

const NavItem = ({ to, icon, signout = false }: NavItemProps) => {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Button
      className={cn(
        " h-12 w-12 p-2",
        location.pathname.includes(to) 
          ? "bg-foreground text-muted hover:bg-foreground hover:text-muted"
          : "bg-muted",
      )}
      onClick={() =>{
        if(signout){
          logout()
          navigate('/login')
        }else{
        navigate(to)
        }
      }}
    >
      {icon}
    </Button>
  );
};

export default NavItem;

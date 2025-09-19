import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
const BackForwardNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="space-x-1 flex">
        <Button
          // disabled={canGoBack}
          className="h-8 w-8"
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon className="" />
        </Button>
        <Button
          // disabled={canGoForward}
          className="h-8 w-8"
          variant="outline"
          size="icon"
          onClick={() => navigate(1)}
        >
          <ChevronRightIcon className="" />
        </Button>
      </div>
    </>
  );
};

export default BackForwardNav;

import { useQuery} from "@tanstack/react-query";
import { getDashboardDetails } from "@renderer/api/Dashboard";

export const useGetDashboardDetailsQuery = () => {
    return useQuery({
      queryKey: ["dashboard"],
      queryFn: () => getDashboardDetails(),
    });
  };


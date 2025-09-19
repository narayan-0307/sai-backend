// import DonorList from "@renderer/components/Donor/DonorList";
import { useGetDonorsQuery } from "@renderer/hooks/api/donorApi";
import { Card } from "@renderer/components/ui/card";
import { DataTable } from "@renderer/components/ui/data-table";
import {
  columns,
  filters,
} from "@renderer/components/Donor/Donor Table/columns";

import { LoadingSpinner } from "@renderer/components/ui/loadingSpinner";

import AddDonorModal from "@renderer/components/Donor/AddDonorModal";
// import { useDebouncedState } from "@mantine/hooks";

const DonorListScreen = () => {
  // const [queryName, setQueryName] = useDebouncedState("", 200);
  // const [queryNumber, setQueryNumber] = useDebouncedState("", 200);
  const donors = useGetDonorsQuery({});

  const donorListJSX = () => {
    if (donors.isLoading) {
      return <LoadingSpinner className={"my-5 mx-auto"} />;
    } else if (donors.isError) {
      return <>Error</>;
    } else if (donors.data) {
      return (
        <>
          <div className="flex"></div>
          <Card className="p-6">
            <DataTable columns={columns} filters={filters} data={donors.data} />
          </Card>
        </>
      );
    }
    return <>{"No Results"}</>;
  };

  return (
    <>
      <div className=" w-full py-10  flex flex-col ">
        <div className="flex gap-10">
          {/* <SearchInput
            placeholder="Search Name"
            className="w-[30%] bg-card"
            defaultValue={queryName}
            onChange={(e) => {
              setQueryName(e.target.value);
            }}
          />
          <SearchInput
            placeholder="Search Identification number"
            className="w-[30%] bg-card"
            type="text"
            defaultValue={queryNumber}
            onChange={(e) => {
              setQueryNumber(e.target.value.toString());
            }}
          /> */}
        </div>

        <div className="my-2 text-2xl font-semibold flex gap-2">
          <p>Donor List</p> <AddDonorModal />
        </div>
        {donorListJSX()}
        <div className="flex justify-start "></div>
      </div>
    </>
  );
};

export default DonorListScreen;

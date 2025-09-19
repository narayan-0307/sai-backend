import { useParams } from "react-router-dom";
import { UseGetDonationQuery } from "@renderer/hooks/api/donationApi";
import ThanksLetterModal from "@renderer/components/Certificates/ThanksLetterModal";
import ReceiptModal from "@renderer/components/Certificates/ReceiptModal";
import EightyGModal from "@renderer/components/Certificates/EightyGModal";
import { LoadingSpinner } from "@renderer/components/ui/loadingSpinner";
import { Card } from "@renderer/components/ui/card";

const DonationScreen = () => {
  const { donationId } = useParams();
  let donationIdString = "";
  if (donationId) {
    donationIdString = donationId;
  }

  const donation = UseGetDonationQuery(donationIdString);

  if (donation.isLoading) {
    return <LoadingSpinner className={"my-5 mx-auto"} />;
  } else if (donation.isError) {
    return <>Error</>;
  } else if (donation.data) {
    return (
      <div className="w-full py-10">
        <div className="my-2 text-2xl font-semibold flex gap-2">
          <p>Donation Details</p>
        </div>
        <Card className=" p-4 mb-4 grid grid-cols-3 gap-3 ">
          <p>
            <span className="font-semibold text-lg">
              Accountant Submission Date:{" "}
            </span>
            {new Date(
              donation.data.AccountantSubmissionDate,
            ).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-lg">Amount: </span>
            {donation.data.amount}
          </p>
          <p>
            <span className="font-semibold text-lg">Bank: </span>
            {donation.data.bank}
          </p>
          <p>
            <span className="font-semibold text-lg">Branch: </span>
            {donation.data.branch}
          </p>
          <p>
            <span className="font-semibold text-lg">Cheque Date: </span>
            {new Date(donation.data.chequeDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-lg">Cheque No: </span>
            {donation.data.chequeNo}
          </p>
          <p>
            <span className="font-semibold text-lg">Clearance Date: </span>
            {new Date(donation.data.clearanceDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-lg">Created At: </span>
            {new Date(donation.data.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-lg">Date of Issue: </span>
            {new Date(donation.data.dateOfIssue).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-lg">Deposit Bank: </span>
            {donation.data.depositBank}
          </p>
          <p>
            <span className="font-semibold text-lg">Deposit Date: </span>
            {new Date(donation.data.depositDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-lg">Donor Name: </span>
            {donation.data.donorId?.name}
          </p>
          <p>
            <span className="font-semibold text-lg">Eighty G: </span>
            {donation.data.eightyG}
          </p>
          <p>
            <span className="font-semibold text-lg">Remark: </span>
            {donation.data.remark}
          </p>
          <p>
            <span className="font-semibold text-lg">Submission Date: </span>
            {new Date(donation.data.submissionDate).toLocaleDateString()}
          </p>
        </Card>
        <div className="flex gap-4">
          <ThanksLetterModal donation={donation.data} />
          <ReceiptModal donation={donation.data} />
          <EightyGModal donation={donation.data} />
        </div>
      </div>
    );
  }

  return <></>;
};

export default DonationScreen;

import Modal from "../ui/Modal";
import { Button } from "../ui/button";
import AddDonorForm from "./AddDonorForm";

export type AddDonorModalProps = {
  name?: string;
}

const AddDonorModal = ({name =''}: AddDonorModalProps) => {
  return (
    <Modal
      trigger={<Button className="bg-primary w-[6rem]">Add Donor</Button>}
    >
      <AddDonorForm name={name}/>
    </Modal>
  );
};

export default AddDonorModal;

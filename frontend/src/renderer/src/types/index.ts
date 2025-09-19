type Donor = {
  _id: string;
  name: string;
  birthDate: Date;
  email: string;
  contactNo: string;
  address: string;
  identificationNo: string;
  donations?: Donation[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

type Donation = {
  AccountantSubmissionDate: Date;
  amount: number;
  bank: string;
  branch: string;
  chequeDate: Date;
  chequeNo: string;
  clearanceDate: Date;
  createdAt: Date;
  dateOfIssue: Date;
  depositBank: string;
  depositDate: Date;
  donorId?: Donor;
  eightyG: string;
  remark: string;
  // donations?: Donation[];
  submissionDate: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
};

export type DonationFormData = {
  AccountantSubmissionDate: Date;
  amount: number;
  bank: string;
  branch: string;
  chequeDate: Date;
  chequeNo: string;
  clearanceDate: Date;
  createdAt: Date;
  dateOfIssue: Date;
  depositBank: string;
  depositDate: Date;
  donorId: string;
  eightyG: string;
  remark: string;
  submissionDate: Date;
};

type User = {
  email: string;
  name: string;
  token: string;
  user_id: string;
};

export type HighestDonation = {
  _id: string;
  highestAmount: number;
}

export type DashboardData = {
  totalDonors: number;
  totalDonations: number;
  highestDonation: HighestDonation[];
  totalAmountCollected: number;
}


export type { Donor, User, Donation };

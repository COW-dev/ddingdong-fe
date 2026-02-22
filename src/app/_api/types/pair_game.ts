export type PairGameMetadataItem = {
  clubName: string;
  category: string;
  imageUrl: string;
};

export type PairGameAppliersAmount = {
  amount: number;
};

export type CreatePairGameApplierRequest = {
  request: {
    name: string;
    studentNumber: string;
    department: string;
    phoneNumber: string;
  };
  file: File;
};

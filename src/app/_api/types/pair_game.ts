export type PairGameMetadataItem = {
  clubName: string;
  category: string;
  imageUrl: string;
};

export type PairGameAppliersAmount = {
  amount: number;
};

export type PairGameSubmitFormValues = {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
};

export type CreatePairGameApplierRequest = {
  request: PairGameSubmitFormValues;
  file: File;
};

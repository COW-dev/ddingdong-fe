export type MemberAPIResponse = {
  clubName: string;
  clubMembers: Member[];
};

export type Member = {
  id: number;
  name: string;
  studentNumber: string;
  phoneNumber: string;
  position: string;
  department: string;
};

export type UpdateMemberAPIRequest = {
  member: Member;
};

export type DeleteMemberAPIRequest = {
  id: number;
};

export type AddMemberAPIRequest = {
  member: Omit<Member, 'id'>;
};

import UserType from "./UserType.tsx";

interface DebtType {
    _id: string;
    receiverId: UserType;
    refunderId: UserType;
    idUser: UserType;
    amount: number;
}

export default DebtType;
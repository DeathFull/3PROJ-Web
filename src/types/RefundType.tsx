import UserType from "./UserType.tsx";

interface RefundType {
    _id: string;
    payerId: UserType;
    refunderId: UserType;
    idUser: UserType;
    amount: number;
    date: Date;
}

export default RefundType;
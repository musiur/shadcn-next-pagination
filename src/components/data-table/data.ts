import { TGetPaymentDataResponse, TPayment } from "./types";


export const GetPaymentData = async ({ page, limit }: { page: string, limit: string }): TGetPaymentDataResponse => {
  const response = await fetch(
    `${process.env.TRANSACTION_ENDPOINT}?page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CATOPAY_API_TOKEN}`,
      },
    }
  );
  const result = await response.json();
  console.log(result?.meta)
  const formatedResult: TPayment[] = result?.data?.map((item: {id: string, amount: number, status: string}) => {
    const { id, amount, status } = item;
    return {
      id,
      amount,
      status,
    }
  });
  return {
    list: formatedResult,
    meta: result?.meta
  };
}
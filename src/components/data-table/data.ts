import { TGetPaymentDataResponse, TPayment } from "./types";


export const GetPaymentData = async ({ page, limit, searchText }: { page?: string, limit?: string, searchText?: string }): TGetPaymentDataResponse => {
  let url = `${process.env.TRANSACTION_ENDPOINT}?page=${page}&limit=${limit}`;

  if (searchText?.length) {
    url += `&search=${searchText}`;
  }

  const response = await fetch(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CATOPAY_API_TOKEN}`,
      },
    }
  );
  const result = await response.json();
  console.log(result)
  const formatedResult: TPayment[] = result?.data?.map((item: { id: string, amount: number, status: string }) => {
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
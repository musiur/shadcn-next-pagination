import { TGetPaymentDataResponse, TPayment } from "./types";


export const GetPaymentData = async (payload: Record<string, string>): TGetPaymentDataResponse => {
  let url = `${process.env.TRANSACTION_ENDPOINT}`;
  Object.entries(payload).forEach(([key, value], index) => {
    if (value?.length) {
      url += `${index === 0 ? "?" : "&"}${key}=${value}`;
    }
  });

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
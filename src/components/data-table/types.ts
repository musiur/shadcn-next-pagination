"use client"

import { ColumnDef } from "@tanstack/react-table"

export type TPayment = {
    id: string
    amount: number
    status: "Pending" | "Completed" | "Failed" | "Cancelled"
}

export interface IDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export type TGetPaymentData = {
    list: TPayment[],
    meta: {
        page: number,
        limit: number,
        total: number
    }
}
export type TGetPaymentDataResponse = Promise<TGetPaymentData> 
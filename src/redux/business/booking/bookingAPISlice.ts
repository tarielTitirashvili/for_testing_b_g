import { apiSlice } from "@/redux/APISlice";

export interface OrdersResponse {
    data: OrderItem[];
    totalItemCount: number;
    pageCount: number;
    page: number;
    offset: number;
}

export interface OrderItem {
    id: number;
    startDate: string;
    client: Client;
    services: IServiceItem[]; 
    staff: IStaff;
    durationMinutes: number;
    price: number | null;
    statusId: IStatus;
    tableCategoryId: number | null;
    guestCount: number | null;
    endDate: string;
    reminder: string | null;
    notes: string | null;
    cancellationReason: string | null;
    isExternal: boolean;
}

interface Client {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string | null;
}

interface IServiceItem {
    id: number;
    name: string;
    durationMinutes: number;
    price: number;
}

export interface IStaff {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    file?:{
        id: string;
        isProfile: boolean;
        url: string;
    } | null
}

export interface IStatus {
    id: number;
    name: string;
}

export interface IConfirmBookingPayload {
    orderId: number
}


export const bookingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllOrders: builder.query<OrdersResponse, void>({
            query: () => ({
                url: "/business/orders",
                method: "GET"
            }),
            providesTags: ['Bookings']
        }),
        confirmBooking: builder.mutation<void, IConfirmBookingPayload>({
            query: (payload) => ({
                url: `/business/orders/${payload.orderId}/confirm`,
                method: "POST"
            }),
            invalidatesTags: ['Bookings'],
        }),
        cancelBooking: builder.mutation<void, IConfirmBookingPayload>({
            query: (payload) => ({
                url: `/business/orders/${payload.orderId}/cancel`,
                method: "POST"
            }),
            invalidatesTags: ['Bookings'],
        }),
    })
})

export const { useGetAllOrdersQuery, useConfirmBookingMutation, useCancelBookingMutation } = bookingApiSlice
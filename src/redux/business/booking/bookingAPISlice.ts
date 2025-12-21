import type { IAddBooking } from "@/components/features/addBookingModal";
import { apiSlice } from "@/redux/APISlice";

export interface OrdersResponse {
    data: OrderItem[];
    totalItemCount: number;
    pageCount: number;
    page: number;
    offset: number;
}

interface IGetAllOrdersParams {
    page: number,
    offset: number
}

export interface OrderItem {
    id: number;
    startDate: string;
    client: IClient;
    services: IServiceItem[];
    tableCategory: IServiceItem
    table: IServiceItem | null
    staff: IStaff | null;
    durationMinutes: number;
    price: number | null;
    statusId: IStatus;
    // tableCategoryId: number | null;
    guestCount: number | null;
    endDate: string;
    reminder: string | null;
    notes: string | null;
    cancellationReason: string | null;
    isExternal: boolean;
}

interface IClient {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string | null;
}

interface IServiceItem {
    id: number;
    name: string;
    // durationMinutes: number;
    // price: number;
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

        getAllOrders: builder.query<OrdersResponse, IGetAllOrdersParams>({
            query: ({ page = 1, offset = 10 }) => ({
                url: `/business/orders?page=${page}&offset=${offset}`,
                method: "GET"
            }),
            providesTags: ['Bookings']
        }),
        
        confirmBooking: builder.mutation<void, IConfirmBookingPayload>({
            query: (payload) => ({
                url: `/business/orders/${payload.orderId}/confirm`,
                method: "POST"
            }),
            invalidatesTags: ['Bookings', 'calendarBookings'],
        }),

        cancelBooking: builder.mutation<void, IConfirmBookingPayload>({
            query: (payload) => ({
                url: `/business/orders/${payload.orderId}/cancel`,
                method: "POST"
            }),
            invalidatesTags: ['Bookings', 'calendarBookings'],
        }),

        createExternalBooking: builder.mutation<void, IAddBooking>({
            query: (data) => ({
                url: "/business/order/create-external",
                method: "POST",
                data
            }),
            invalidatesTags: ['Bookings', 'calendarBookings']
        }),

        changeNoShowStatus: builder.mutation<void, number | undefined>({
            query: (orderId) => ({
                url: `/business/orders/${orderId}/usershowuplate`,
                method: "POST"
            })
        })
    })
})

export const { 
    useGetAllOrdersQuery, 
    useConfirmBookingMutation, 
    useCancelBookingMutation, 
    useCreateExternalBookingMutation,
    useChangeNoShowStatusMutation
} = bookingApiSlice
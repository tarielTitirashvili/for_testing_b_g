import * as signalR from "@microsoft/signalr";

import type { INotification } from "@/pages/business/notifications/Notifications";

import { apiSlice } from "@/redux/APISlice";


// სერვისების საქაღალდეში გადატანა
const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://bookitcrm.runasp.net/notificationsHub?access_token=" + localStorage.getItem("accessToken"), {
      withCredentials: false,
      skipNegotiation: true,
      logMessageContent: true,
      logger: signalR.LogLevel.Information,
      transport: signalR.HttpTransportType.WebSockets
    })
    .withAutomaticReconnect()
    .build();


export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getNotifications: builder.query<INotification[], void>({
        queryFn: () => {
          return { data: [] };
        },
        keepUnusedDataFor: 120,
        onCacheEntryAdded: async (_arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) => {
          await cacheDataLoaded;

          if (hubConnection.state === signalR.HubConnectionState.Disconnected) {
            try {
              await hubConnection.start();
              console.log("SignalR connected");
            } catch (e) {
              console.log("Already connected or connecting...");
            }
          }

          const handler = (payload: INotification) => {
            if (!payload) return;

            updateCachedData((draft) => {
              draft.push(payload);
            });
          };

          hubConnection.on("ReceiveNotification", handler);

          await cacheEntryRemoved;
          hubConnection.off("ReceiveNotification", handler);
        },
      }),
    }),
});


export const { useGetNotificationsQuery } = notificationApi
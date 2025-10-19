
import type { FunctionComponent } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import SubscriptionCard from "./components/SubscriptionCard"
import CardsAndBillings from "./components/CardsAndBillings"
import PaymentsHistory from "./components/PaymentsHistory"
import { t } from "i18next"

const Subscription: FunctionComponent = () => {
    return (
        <div className="bg-white p-5 rounded-md flex flex-col gap-6">
            <div className="subscription_header flex flex-col gap-3">
                <p className="text-4xl font-semibold">{ t("subscription.title") }</p>
                <p className="font-normal text-[#6C6C6C]">{ t("subscription.subtitle") }</p>
            </div>
            <div className="subscription_body">
                <Tabs defaultValue="1" className="flex flex-col gap-6">
                    <div className="tabs_btns flex justify-center w-full">
                        <TabsList className="max-w-[770px] w-full p-2 gap-2 h-full">
                            <TabsTrigger className="py-1 px-4 font-medium rounded-sm" value="1">{ t("subscription.tab.plans") }</TabsTrigger>
                            <TabsTrigger className="py-1 px-4 font-medium rounded-sm" value="2">{ t("subscription.tab.cardAndPayment") }</TabsTrigger>
                            <TabsTrigger className="py-1 px-4 font-medium rounded-sm" value="3">{ t("subscription.tab.paymentHistory") }</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="1">
                        <SubscriptionCard />
                    </TabsContent>
                    <TabsContent value="2">
                        <CardsAndBillings />
                    </TabsContent>
                    <TabsContent value="3">
                        <PaymentsHistory />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Subscription
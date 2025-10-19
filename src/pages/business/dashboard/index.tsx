import type { FunctionComponent } from "react";


import ChartInfoCard from "@/components/shared/trendsCard/ChartInfoCard";
import DateInfoSwitcher from "@/pages/business/dashboard/components/DateInfoSwitcher";
import ClicksInfo from "@/components/shared/trendsCard/ClicksInfo";
import LatestBooksList from "@/pages/business/dashboard/components/LatestBooksList";
import DateInfoSelectInput from "./components/DateInfoSelectInput";

const Dashboard: FunctionComponent = () => {
  return (
    <>
      <div className="dashboard_header w-full">
        <div className="large_size_screens hidden w-full sm:flex lg:flex justify-between items-center">
          <div className="last_update_info font-normal text-[#6C6C6C]">
            Updated: 5th July, 2025
          </div>
          <DateInfoSwitcher />
        </div>
        <div className="small_size_screens w-full flex flex-col gap-3  sm:hidden">
          <div className="last_update_info font-normal text-[#6C6C6C]">
            Updated: 5th July, 2025
          </div>
          <DateInfoSelectInput />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 mt-6">
        <ChartInfoCard cardType="books" booksCount={165} percentage={15} />
        <ChartInfoCard
          cardType="reviews"
          reviewsCount={20}
          percentage={10}
          rating={2.8}
        />
        <ChartInfoCard cardType="views" views={1321} percentage={-4} />
        <ClicksInfo
          menuClicks={320}
          menuClicksPercent={14}
          ratingClicks={84}
          ratingClicksPercent={9}
          bookingClicks={193}
          bookingClicksPercent={17}
        />
      </div>
      <div className="bg-white mt-10 p-6 rounded-sm border-1">
        <LatestBooksList />
      </div>
    </>
  );
};

export default Dashboard;

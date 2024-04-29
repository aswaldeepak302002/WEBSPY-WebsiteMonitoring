import { useTheme } from "../ThemeProvider";
import { Tabs } from "../ui/bigtabs";
import {
  sslBlack,
  sslLight,
  co2DetailBlack,
  co2DetailLight,
  pageInsightsDetailsBlack,
  pageInsightsDetailsLight,
  uptimeBlack,
  uptimeLight,
} from "@/assets";

const ImageSkeleton = ({ lightImageSrc, darkImageSrc }) => {
  const { theme } = useTheme();
  const imageSrc = theme === "dark" ? darkImageSrc : lightImageSrc;
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
      <img src={imageSrc} alt="" className="w-full rounded-t-lg" />
    </div>
  );
};

const BigTabsComponent = () => {
  const tabs = [
    {
      title: "Uptime",
      value: "Uptime",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black dark:bg-white dark:text-black">
          <p className="mb-1">Uptime</p>
          <ImageSkeleton
            lightImageSrc={uptimeLight}
            darkImageSrc={uptimeBlack}
          />
        </div>
      ),
    },
    {
      title: "SSL Checker",
      value: "SSL Checker",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black dark:bg-white dark:text-black">
          <p className="mb-1">SSL Checker</p>
          <ImageSkeleton
            lightImageSrc={sslLight}
            darkImageSrc={sslBlack}
          />
        </div>
      ),
    },
    {
      title: "Page Insights",
      value: "Page Insights",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black dark:bg-white dark:text-black">
          <p className="mb-1">Page Insights</p>
          <ImageSkeleton
            lightImageSrc={pageInsightsDetailsLight}
            darkImageSrc={pageInsightsDetailsBlack}
          />
        </div>
      ),
    },
    {
      title: "Co2 Emission",
      value: "Co2 Emission",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black dark:bg-white dark:text-black">
          <p className="mb-1">Co2 Emission</p>
          <ImageSkeleton
            lightImageSrc={co2DetailLight}
            darkImageSrc={co2DetailBlack}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-4">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default BigTabsComponent;

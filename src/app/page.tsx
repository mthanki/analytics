'use client'
import { Card } from "@/components/Card";
import { FullWidthCard } from "@/components/FullWidthCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import { useEffect } from "react";
import { toastMessages } from "@/data/toastMessages"; // Import messages from a separate file

const IgnoredAlertsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-10 h-10 text-red-600"
  >
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 15a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1-5.5h-2V7h2v4.5z" />
  </svg>
);

const WronglyClosedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-10 h-10 text-yellow-600"
  >
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.95 13.536l-1.414 1.414L12 13.414l-3.536 3.536-1.414-1.414L10.586 12 7.05 8.464l1.414-1.414L12 10.586l3.536-3.536 1.414 1.414L13.414 12l3.536 3.536z" />
  </svg>
);

const ActiveThreatsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-10 h-10 text-orange-600"
  >
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 15a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1-5.5h-2V7h2v4.5z" />
  </svg>
);

const PositiveIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8 text-green-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

export default function Home() {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      toast(
        (t) => (
          <div className="flex items-center justify-between gap-4">
            <span className="text-yellow-800 font-medium">{toastMessages[index]}</span>
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
              onClick={() => toast.dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        ),
        {
          icon: "⚠️",
          style: {
            background: "#FEF3C7", // Light yellow background
            border: "1px solid #FBBF24", // Yellow border
          },
        }
      );
      index = (index + 1) % toastMessages.length; // Cycle through messages
    }, 5000); // Show a new toast every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="space-y-16 p-8 bg-gray-100 min-h-screen relative">
      <Toaster position="bottom-left" toastOptions={{ duration: 3000 }} /> {/* Toast container */}
      {/* Without Simbian Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Without Simbian</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Card heading="Ignored Alerts" icon={IgnoredAlertsIcon} count={200}>
            Wasting valuable analyst time on false positives.
          </Card>
          <Card heading="Wrongly Closed Alerts" icon={WronglyClosedIcon} count={35}>
            Processing one alert at a time, missing the big picture.
          </Card>
          <Card heading="Active Threats" icon={ActiveThreatsIcon} count={5}>
            More time fixing SOAR automation, less time on real threats.
          </Card>
        </div>
      </section>

      {/* With Simbian Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">With Simbian</h2>

        {/* Horizontal Carousel */}
        <Slider {...carouselSettings} className="mb-8">
          <FullWidthCard
            heading="Triaged & Reported"
            subheading="SOC Agent handled investigation and reporting"
          >
            Alerts are triaged and reported efficiently.
          </FullWidthCard>
          <FullWidthCard
            heading="Automated Response"
            subheading="Incident automatically contained"
          >
            AI automates responses to incidents.
          </FullWidthCard>
          <FullWidthCard
            heading="Comprehensive Analysis"
            subheading="AI recognized patterns"
          >
            Patterns are identified for better detection.
          </FullWidthCard>
          <FullWidthCard
            heading="Accurate Detection"
            subheading="Zero false positives"
          >
            No false positives ensure accurate detection.
          </FullWidthCard>
          <FullWidthCard
            heading="24/7 Coverage"
            subheading="No analyst fatigue"
          >
            Around-the-clock coverage without analyst fatigue.
          </FullWidthCard>
        </Slider>

        {/* Positive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <Card heading="Ignored Alerts" icon={PositiveIcon} count={200} isPositive>
            All alerts are handled efficiently with no ignored alerts.
          </Card>
          <Card heading="Wrongly Closed Alerts" icon={PositiveIcon} count={35} isPositive>
            Accurate responses ensure no wrongly closed alerts.
          </Card>
          <Card heading="Active Threats" icon={PositiveIcon} count={5} isPositive>
            Active threats are resolved proactively and effectively.
          </Card>
        </div>
      </section>
    </div>
  );
}

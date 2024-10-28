"use client";

import { AreaChartComponent } from "@/components/AreaChartComponent";
import { useQuery } from '@tanstack/react-query';
import { getDataToday, getGaugeData } from '@/app/utils/api';
import { SaveButton } from "@/components/SaveButton";
import Loading from "@/components/Loading";
import { GaugeChartComponent } from "@/components/GaugeChartComponent";

export default function Home() {
  const { data: sensorData, isLoading: loadingSensorData } = useQuery({
    queryKey: ['sensorData'],
    queryFn: getDataToday,
    refetchInterval: 5000,
  });

  const { data: gaugeData, isLoading: loadingGaugeData } = useQuery({
    queryKey: ['gaugeData'], 
    queryFn: getGaugeData, 
    refetchInterval: 5000, 
  });

  const isLoading = loadingSensorData || loadingGaugeData;

  return (
    <div className="mt-10 mb-8 flex flex-col">
      <h1 className="text-3xl font-medium text-center mt-8">
        Data From <span className="text-sky-600">Latest</span>
      </h1>
      <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
        <div className="rounded-lg w-full h-[410px]">
          {isLoading ? <Loading /> :
            <AreaChartComponent label="Temperature" dataKey="temperature" chartData={sensorData} />
          }
        </div>
        <div className="rounded-lg w-full h-[410px]">
          {isLoading ? <Loading /> :
            <AreaChartComponent label="Humidity" dataKey="humidity" chartData={sensorData} />
          }
        </div>
      </div>
      {!isLoading && <SaveButton data={sensorData} />}
        <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
        {isLoading ? <Loading /> :
          <>
            <GaugeChartComponent label="Temperature" value={gaugeData?.temperature} color="#FF6B6B" />
            <GaugeChartComponent label="Humidity" value={gaugeData?.humidity} color="#6BCBFF" />
          </>
        }
      </div>
    </div>
  );
}

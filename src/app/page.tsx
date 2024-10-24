"use client"

import { AreaChartComponent } from "@/components/AreaChartComponent";
import { useQuery } from '@tanstack/react-query';
import { getDataToday } from '@/app/utils/api';
import { SaveButton } from "@/components/SaveButton";
import Loading from "@/components/Loading";

export default function Home() {

  const { data, isLoading } = useQuery({
    queryKey: ['sensorData'],
    queryFn: getDataToday,
    refetchInterval: 5000,
  });

  return (
    <div className="mt-10 mb-8 flex flex-col">
      <h1 className="text-3xl font-medium text-center mt-8">
        Data From <span className="text-sky-600">Latest</span>
      </h1>
      <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
        <div className="rounded-lg w-full h-[410px]">
          {isLoading ? <Loading /> :
            <AreaChartComponent label="Temperature" dataKey="temperature" chartData={data} />
          }
        </div>
        <div className="rounded-lg w-full h-[410px]">
          {isLoading ? <Loading /> :
            <AreaChartComponent label="Humidity" dataKey="humidity" chartData={data} />
          }
        </div>
      </div>
      {isLoading ? '' :
        <SaveButton data={data} />
      }
    </div>
  );
}

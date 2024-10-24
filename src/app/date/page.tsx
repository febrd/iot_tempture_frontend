'use client'

import { AreaChartComponent } from '@/components/AreaChartComponent'
import { useSearchParams } from 'next/navigation';
import { formatId } from '@/app/utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import { SaveButton } from "@/components/SaveButton";
import { getDataByRange } from '../utils/api';

import Loading from '@/components/Loading';

export default function DateRangePage() {
    const dates = useSearchParams();
    const startDate = dates.get('start');
    const endDate = dates.get('end');

    const { data, isLoading } = useQuery({
        queryKey: ['dataRange', startDate, endDate],
        queryFn: () => getDataByRange({ start: startDate, end: endDate }),
        refetchInterval: 5000,
    });

    return (
        <div className="mt-10 mb-8 flex flex-col">
            <h1 className="text-3xl font-medium text-center mt-8">
                Data From <span className="text-sky-600">{formatId(startDate)} - {formatId(endDate)}</span>
            </h1>
            <div className="w-full max-lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
                <div className="bg-primary-content border dark:border-none dark:bg-base-200 text-black rounded-lg w-full h-[410px]">
                    {isLoading ? <Loading /> :
                        <AreaChartComponent label="Temperature" dataKey="temperature" chartData={data} />
                    }
                </div>
                <div className="bg-primary-content border dark:border-none dark:bg-base-200 text-black rounded-lg w-full h-[410px]">
                    {isLoading ? <Loading /> :
                        <AreaChartComponent label="Humidity" dataKey="humidity" chartData={data} />
                    }
                </div>
            </div>
            {isLoading ? '' :
                <SaveButton data={data} />
            }
        </div>
    )
}

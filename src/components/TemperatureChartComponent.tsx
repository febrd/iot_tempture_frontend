"use client";

import React from 'react';
import GaugeComponent from 'react-gauge-component';

interface TemperatureChartProps {
  label: string;
  value: number;
  minValue?: number;
  maxValue?: number;
}

export const TemperatureChartComponent = ({ label, value, minValue, maxValue }: TemperatureChartProps) => {
  return (
    <div className="text-center">
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          subArcs: [
            {
              limit: 15,
              color: '#EA4228',
              showTick: true,
              tooltip: { text: 'Too low temperature!' },
              onClick: () => console.log("Low temperature clicked"),
              onMouseMove: () => console.log("Mouse over low temperature"),
              onMouseLeave: () => console.log("Mouse left low temperature"),
            },
            {
              limit: 17,
              color: '#F5CD19',
              showTick: true,
              tooltip: { text: 'Low temperature!' },
            },
            {
              limit: 28,
              color: '#5BE12C',
              showTick: true,
              tooltip: { text: 'OK temperature!' },
            },
            {
              limit: 37,
              color: '#F5CD19',
              showTick: true,
              tooltip: { text: 'High temperature!' },
            },
            {
              color: '#EA4228',
              tooltip: { text: 'Too high temperature!' },
            }
          ]
        }}
        pointer={{
          color: '#345243',
          length: 0.80,
          width: 15,
        }}
        labels={{
          valueLabel: { formatTextValue: value => `${value}ºC` },
          tickLabels: {
            type: 'outer',
            defaultTickValueConfig: {
              formatTextValue: (value: number) => `${value}ºC`,
              style: { fontSize: 10 }
            },
            ticks: [
              { value: 13 },
              { value: 22.5 },
              { value: 32 }
            ],
          }
        }}
        value={value}
        minValue={minValue}
        maxValue={maxValue}
      />
      <p className="mt-2 text-lg font-medium">{label}: {value}ºC</p>
    </div>
  );
};

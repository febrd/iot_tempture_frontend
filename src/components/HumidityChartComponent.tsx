"use client";

import React from 'react';
import GaugeComponent from 'react-gauge-component';

interface HumidityGaugeProps {
  label: string;
  value: number;
  minValue?: number;  
  maxValue?: number;  
}

export const HumidityGaugeComponent = ({ label, value }: HumidityGaugeProps) => {
  return (
    <div className="text-center">
      <div style={{ width: '355px', height: '250px', margin: '0 auto' }}>  {/* Adjust size here */}
        <GaugeComponent
          type="radial"
          value={value}
          labels={{
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 20 },
                { value: 40 },
                { value: 60 },
                { value: 80 },
                { value: 100 }
              ]
            }
          }}
          arc={{
            colorArray: ['#5BE12C', '#EA4228'],
            subArcs: [
              { limit: 10 },
              { limit: 30 },
              {}, // Center section with default color gradient
              {}, 
              {}
            ],
            padding: 0.02,
            width: 0.3
          }}
          pointer={{
            elastic: true,
            animationDelay: 0
          }}
        />
      </div>
      <p className="mt-2 text-lg font-medium">{label}: {value}%</p>
    </div>
  );
};

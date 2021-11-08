import React from 'react';
import { View, Text } from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation 
} from '@rainbow-me/animated-charts';
import { SIZES, COLORS, FONTS } from '../constants';
import moment from 'moment';

const Chart = ({ containerStyle, chartPrices }) => {
  // Points
  const startUnixTimestamp = moment().subtract(7, 'day').unix();

  const data = chartPrices ? chartPrices?.map((item, index) => ({
    x: startUnixTimestamp + (index + 1) * 3600,
    y: item
  })) : [];

  const points = monotoneCubicInterpolation({ data, range: 40 });

  return (
    <View
      style={{ ...containerStyle }}
    >
      {/* Chart */}
      {data.length > 0 &&
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: 'bezier'
          }}
        >
          <ChartPath 
            height={150}
            width={SIZES.width} 
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />
        </ChartPathProvider>
      }
       {/* <Text style={{ color: COLORS.white }}>Chart</Text> */}
    </View>
  )
}

export default Chart;

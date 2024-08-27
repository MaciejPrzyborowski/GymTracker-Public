import {View, Text, Dimensions} from 'react-native';

import {LineChart} from 'react-native-chart-kit';

import MeasureUtilities from '../../Utilities/MeasureUtilities';

import COLORS from '../../Assets/Styles/Colors.json';
import SIZES from '../../Assets/Styles/Sizes.json';
import STYLES from '../../Assets/Styles/Styles';

interface TextMeasureListProps {
  date: string;
  value: number;
  nextValue: number | null;
  suffix: string;
}

interface GraphMeasureListProps {
  dataX: string[];
  dataY: number[];
  suffixDataY: string;
  height: number;
}

export default function TextMeasureList({
  date,
  value,
  nextValue,
  suffix,
}: TextMeasureListProps) {
  const difference = MeasureUtilities.calculateDifference(value, nextValue);
  return (
    <View
      accessible={true}
      accessibilityLabelledBy={date}
      style={STYLES.rowMarginContainer}>
      <View style={{flex: 5}}>
        <Text style={STYLES.boldStandardText}>{date}</Text>
      </View>
      <View style={[STYLES.separatorLineVertical, {flex: 2}]}>
        <Text style={STYLES.centerStandardText}>
          {value} {suffix}
        </Text>
      </View>
      <View style={{flex: 2}}>
        <Text style={STYLES.darkCenterStandardText}>
          {difference} {difference != '-' ? suffix : ''}
        </Text>
      </View>
    </View>
  );
}

export function GraphMeasureList({
  dataX,
  dataY,
  suffixDataY,
  height,
}: GraphMeasureListProps) {
  return (
    <LineChart
      data={{
        labels: dataX,
        datasets: [
          {
            data: dataY,
          },
        ],
      }}
      yAxisSuffix={suffixDataY}
      height={height}
      width={Dimensions.get('window').width - (SIZES.baseMargin / 3) * 4}
      withVerticalLines={false}
      chartConfig={{
        backgroundGradientFrom: COLORS.secondaryGrey,
        backgroundGradientTo: COLORS.secondaryGrey,
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: COLORS.secondaryGrey,
        },
      }}
      bezier
      xLabelsOffset={SIZES.baseMargin / 3}
      yLabelsOffset={SIZES.baseMargin}
    />
  );
}

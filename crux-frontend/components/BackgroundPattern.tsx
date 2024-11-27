import Svg, {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';

interface BackgroundPatternProps {
  color: string;
  opacity?: number;
}

export const BackgroundPattern = ({
  color,
  opacity = 0.1,
}: BackgroundPatternProps) => {
  return (
    <Svg style={StyleSheet.absoluteFill} viewBox="0 0 169 150">
      <Path
        d="M300.195 49.8956C300.195 49.8956 272.687 90.9668 246.011 92.8567C208.144 95.5396 191.19 56.6964 153.735 52.0255C114.434 47.1244 113.226 159.551 73.8415 155.221C35.1963 150.972 84.0944 1.29502 45.1842 5.34897C19.6784 8.00634 -6.72573 46.5074 -6.72573 46.5074"
        stroke={color}
        strokeWidth="24"
        strokeLinecap="round"
        opacity={opacity}
      />
    </Svg>
  );
};

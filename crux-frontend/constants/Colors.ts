/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const theme = {
  colors: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#FF69B4', // Pink color used for buttons
    secondary: '#F0F0F0', // Light gray for input backgrounds
    accent: '#4169E1', // Blue color used for some text and buttons
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  title: {
    fontSize: theme.fontSizes.xlarge,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium,
  },
  subtitle: {
    fontSize: theme.fontSizes.medium,
    color: '#666',
    marginBottom: theme.spacing.large,
  },
  input: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 25,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    padding: theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.medium,
    fontWeight: 'bold',
  },
};

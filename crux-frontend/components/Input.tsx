import React, {MutableRefObject} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {InputModeOptions} from 'react-native';

type BaseInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  inputMode?: InputModeOptions;
  style?: StyleSheet;
};

export const Input: React.FC<BaseInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  inputMode = 'text',
}) => (
  <View style={styles.inputContainer}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      inputMode={inputMode}
      placeholderTextColor="#999"
    />
  </View>
);

type VerificationInputProps = {
  code: string[];
  inputRefs: MutableRefObject<(TextInput | null)[]>;
  handleCodeChange: (text: string, index: number) => void;
};

export const VerificationInput: React.FC<VerificationInputProps> = ({
  code,
  inputRefs,
  handleCodeChange,
}) => (
  <View style={styles.codeContainer}>
    {code.map((digit, index) => (
      <React.Fragment key={index}>
        {index === 3 && <Text style={styles.separator}>-</Text>}
        <TextInput
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={styles.input}
          maxLength={1}
          inputMode="numeric"
          value={digit}
          onChangeText={(text) => handleCodeChange(text, index)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
          accessibilityLabel={`Verification code digit ${index + 1} of 6`}
          accessibilityHint="Enter a single digit"
          accessibilityRole="spinbutton"
        />
      </React.Fragment>
    ))}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 8,
    fontSize: 16,
  },
});

import {
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Feather from 'react-native-vector-icons/Feather';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const schema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
});

export default function App() {
  const [password, setPassword] = React.useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = React.useState(false);
  const [uppercase, setUppercase] = React.useState(false);
  const [lowercase, setLowercase] = React.useState(true);
  const [numbers, setNumbers] = React.useState(false);
  const [symbols, setSymbols] = React.useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const uppercaseList = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    const lowercaseList = 'qwertyuiopasdfghjklzxcvbnm';
    const numbersList = '0123456789';
    const symbolList = '!@#$%^&*()';
    if (uppercase) {
      characterList += uppercaseList;
    }
    if (lowercase) {
      characterList += lowercaseList;
    }
    if (numbers) {
      characterList += numbersList;
    }
    if (symbols) {
      characterList += symbolList;
    }

    const passwordCreated = createPassword(characterList, passwordLength);

    setPassword(passwordCreated);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let passwordCreated = '';
    for (let index = 0; index < passwordLength; index++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      passwordCreated += characters[randomIndex];
    }

    return passwordCreated;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setUppercase(false);
    setLowercase(true);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.scrollViewContainer}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.textHeader}>Password Generator</Text>
          <Text style={styles.textDescription}>
            Generate a secure password with just a click.
          </Text>
          {isPasswordGenerated && (
            <View style={styles.passwordContainer}>
              <Text style={[styles.textPassword]} selectable>
                {password}
              </Text>
              <TouchableOpacity
                style={styles.copyButton}
                disabled={password === ''}>
                <Feather name="copy" size={28} color="black" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.form}>
            <View>
              <Text style={styles.textFormHeader}>Password Options</Text>
              <View style={styles.bouncyContainer}>
                <BouncyCheckbox
                  innerIconStyle={styles.bouncyInnerIconStyle}
                  iconStyle={styles.bouncyIconStyle}
                  fillColor="grey"
                  textStyle={styles.bouncyTextStyle}
                  size={20}
                  text="Lowercase"
                  onPress={(isChecked: boolean) => setLowercase(isChecked)}
                  isChecked={lowercase}
                  style={styles.bouncyStyle}
                />
                <BouncyCheckbox
                  innerIconStyle={styles.bouncyInnerIconStyle}
                  iconStyle={styles.bouncyIconStyle}
                  fillColor="grey"
                  textStyle={styles.bouncyTextStyle}
                  size={20}
                  text="Uppercase"
                  onPress={(isChecked: boolean) => setUppercase(isChecked)}
                  isChecked={uppercase}
                  style={styles.bouncyStyle}
                />
                <BouncyCheckbox
                  innerIconStyle={styles.bouncyInnerIconStyle}
                  iconStyle={styles.bouncyIconStyle}
                  fillColor="grey"
                  textStyle={styles.bouncyTextStyle}
                  size={20}
                  text="Numbers"
                  onPress={(isChecked: boolean) => setNumbers(isChecked)}
                  isChecked={numbers}
                  style={styles.bouncyStyle}
                />
                <BouncyCheckbox
                  innerIconStyle={styles.bouncyInnerIconStyle}
                  iconStyle={styles.bouncyIconStyle}
                  fillColor="grey"
                  textStyle={styles.bouncyTextStyle}
                  size={20}
                  text="Symbols"
                  onPress={(isChecked: boolean) => setSymbols(isChecked)}
                  isChecked={uppercase}
                  style={styles.bouncyStyle}
                />
              </View>
            </View>
            <Formik
              initialValues={{passwordLength: ''}}
              validationSchema={schema}
              onSubmit={values =>
                generatePasswordString(+values.passwordLength)
              }>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
                errors,
                values,
                isValid,
              }) => (
                <View>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.formTextInput}
                    placeholder="Ex. 8"
                    onChangeText={handleChange('passwordLength')}
                    onBlur={handleBlur('passwordLength')}
                    value={values.passwordLength}
                  />
                  {errors && errors.passwordLength && (
                    <Text style={styles.formError}>
                      * {errors.passwordLength}
                    </Text>
                  )}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.formButton, styles.confirmButton]}
                      disabled={!isValid}
                      onPress={
                        handleSubmit as unknown as (
                          e: GestureResponderEvent,
                        ) => void
                      }>
                      <Text style={styles.buttonText}>Generate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.formButton, styles.resetButton]}
                      onPress={() => {
                        resetPassword();
                        resetForm();
                      }}>
                      <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {flex: 1, backgroundColor: '#EAF0F1'},
  container: {
    flex: 1,

    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 24,
    minHeight: '100%',
  },
  textHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  textDescription: {
    // text-gray-600 dark:text-gray-400 mb-6
    color: 'gray',
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 10,
    marginTop: 10,
    maxWidth: '100%',
    textAlign: 'left',
  },
  textPassword: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 12,
    maxWidth: '100%',
    textAlign: 'left',
  },
  textFormHeader: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    maxWidth: '100%',
    textAlign: 'left',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  copyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    aspectRatio: 1,
    borderRadius: 5,
  },
  form: {
    marginTop: 20,
  },
  bouncyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  bouncyStyle: {marginBottom: 4, marginTop: 4},
  bouncyInnerIconStyle: {
    borderRadius: 4,
    borderColor: 'black',
  },
  bouncyTextStyle: {
    textDecorationLine: 'none',
  },
  bouncyIconStyle: {
    borderRadius: 4,
  },
  formTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  formButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    gap: 10,
  },
  confirmButton: {
    backgroundColor: '#DC5F00',
    borderColor: '#DC5F00',
  },
  resetButton: {
    backgroundColor: 'gray',
    borderColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formError: {
    color: 'red',
    marginTop: -12,
    marginBottom: 12,
    marginLeft: 4,
  },
});

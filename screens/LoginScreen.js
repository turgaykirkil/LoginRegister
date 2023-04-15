import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";

export default function LoginScreen({ navigation }) {
  const handleLogin = (values) => {
    console.log(values);
    // Login işlemleri burada yapılacak
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/favicon.png")}
          />
          <Text style={styles.logoText}>My App</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (!/\S+@\S+.\S+/.test(values.email)) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else if (
              !/(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&])/.test(values.password)
            ) {
              errors.password =
                "Password must contain at least one uppercase letter, one number, and one special character";
            } else if (values.password.length < 8) {
              errors.password = "Password must be at least 8 characters long";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            handleLogin(values);
            resetForm();
            Keyboard.dismiss();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  touched.email &&
                    errors.email && { borderColor: "red", borderWidth: 1 },
                ]}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  touched.password &&
                    errors.password && { borderColor: "red", borderWidth: 1 },
                ]}
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.linkText}>
                  Don't have an account? Sign up!
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    height: 30,
  },
  button: {
    backgroundColor: "#f39c12",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: "#333",
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

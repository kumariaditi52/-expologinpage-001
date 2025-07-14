// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';

// const Login = ({ navigation, route }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (route.params?.registeredEmail) {
//       setFormData(prev => ({
//         ...prev,
//         email: route.params.registeredEmail
//       }));
//     }
//   }, [route.params]);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = () => {
//     if (validateForm()) {
//       Alert.alert(
//         'Login Successful!',
//         'Welcome back!',
//         [
//           {
//             text: 'Continue',
//             onPress: () => navigation.navigate('Home', { 
//               userEmail: formData.email 
//             })
//           }
//         ]
//       );
//     }
//   };

//   const navigateToRegister = () => {
//     navigation.navigate('Register');
//   };

//   const handleForgotPassword = () => {
//     Alert.alert('Forgot Password', 'Password reset feature coming soon!');
//   };

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <View style={styles.formContainer}>
//         <Text style={styles.title}>Welcome Back!</Text>
//         <Text style={styles.subtitle}>Sign in to your account</Text>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={[styles.input, errors.email && styles.inputError]}
//             placeholder="Enter your email"
//             value={formData.email}
//             onChangeText={(value) => handleInputChange('email', value)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             autoCorrect={false}
//           />
//           {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Password</Text>
//           <TextInput
//             style={[styles.input, errors.password && styles.inputError]}
//             placeholder="Enter your password"
//             value={formData.password}
//             onChangeText={(value) => handleInputChange('password', value)}
//             secureTextEntry
//             autoCapitalize="none"
//           />
//           {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
//         </View>

//         <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
//           <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginButtonText}>Sign In</Text>
//         </TouchableOpacity>

//                 <View style={styles.registerContainer}>
//           <Text style={styles.registerText}>Don't have an account? </Text>
//           <TouchableOpacity onPress={navigateToRegister}>
//             <Text style={styles.registerLink}>Create Account</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   formContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 30,
//     color: '#666',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#333',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 15,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   inputError: {
//     borderColor: '#ff4444',
//   },
//   errorText: {
//     color: '#ff4444',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   forgotPasswordContainer: {
//     alignItems: 'flex-end',
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     color: '#4CAF50',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   loginButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   registerText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   registerLink: {
//     fontSize: 16,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
// });

// export default Login;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// IMPORTANT: Replace with your actual IP address
const YOUR_IP = '192.168.29.77'; // Change this to your actual IP
const API_BASE_URL = `http://${YOUR_IP}:5000/api`;

const Login = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params?.registeredEmail) {
      setFormData(prev => ({
        ...prev,
        email: route.params.registeredEmail
      }));
    }
  }, [route.params]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Login data:', { email: formData.email });
    
    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }

    setIsLoading(true);
    
    try {
      const requestData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };

      console.log('Sending login request to:', `${API_BASE_URL}/users/login`);
      
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Login response status:', response.status);

      const data = await response.json();
      console.log('Login response data:', data);

      if (response.ok && data.success) {
        Alert.alert(
          'Login Successful! 🎉',
          `Welcome back, ${data.data.user.firstName}!`,
          [
            {
              text: 'Continue',
              onPress: () => {
                navigation.navigate('Home', { 
                  userData: data.data.user,
                  token: data.data.token
                });
              }
            }
          ]
        );
      } else {
        const errorMessage = data.message || 'Login failed';
        Alert.alert('Login Failed', errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. ';
      
      if (error.message.includes('Network request failed')) {
        errorMessage += 'Please check your connection and make sure the backend server is running.';
      } else {
        errorMessage += error.message;
      }
      
      Alert.alert('Connection Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset feature will be implemented soon!');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        {/* Connection Status */}
        <View style={styles.connectionStatus}>
          <Text style={styles.connectionText}>Server: {YOUR_IP}:5000</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            editable={!isLoading}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleLogin}
            editable={!isLoading}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>

        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={navigateToRegister} activeOpacity={0.7} disabled={isLoading}>
            <Text style={styles.registerLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  connectionStatus: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  connectionText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 50,
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default Login;



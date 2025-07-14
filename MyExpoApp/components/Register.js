// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform
// } from 'react-native';

// const Register = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // First Name validation
//     if (!formData.firstName || !formData.firstName.trim()) {
//       newErrors.firstName = 'First name is required';
//     }

//     // Last Name validation
//     if (!formData.lastName || !formData.lastName.trim()) {
//       newErrors.lastName = 'Last name is required';
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email || !formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!emailRegex.test(formData.email.trim())) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     // Confirm Password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     // Phone validation - more flexible
//     if (!formData.phone || !formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (formData.phone.replace(/\D/g, '').length < 10) {
//       newErrors.phone = 'Please enter a valid phone number';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRegister = async () => {
//     console.log('Register button pressed'); // Debug log
//     console.log('Form data:', formData); // Debug log
    
//     setIsLoading(true);
    
//     try {
//       if (validateForm()) {
//         console.log('Form is valid'); // Debug log
        
//         // Simulate API call delay
//         setTimeout(() => {
//           Alert.alert(
//             'Registration Successful! 🎉',
//             `Welcome ${formData.firstName}! Your account has been created successfully.`,
//             [
//               {
//                 text: 'Continue to Login',
//                 onPress: () => {
//                   console.log('Navigating to Login'); // Debug log
//                   navigation.navigate('Login', { 
//                     registeredEmail: formData.email.trim()
//                   });
//                 }
//               }
//             ]
//           );
//           setIsLoading(false);
//         }, 1000);
//       } else {
//         console.log('Form validation failed:', errors); // Debug log
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setIsLoading(false);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     }
//   };

//   const navigateToLogin = () => {
//     console.log('Navigating to Login from link'); // Debug log
//     navigation.navigate('Login');
//   };

//   return (
//     <KeyboardAvoidingView 
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView 
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Create Account</Text>
//           <Text style={styles.subtitle}>Join us today!</Text>

//           {/* First Name */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>First Name *</Text>
//             <TextInput
//               style={[styles.input, errors.firstName && styles.inputError]}
//               placeholder="Enter your first name"
//               value={formData.firstName}
//               onChangeText={(value) => handleInputChange('firstName', value)}
//               autoCapitalize="words"
//               returnKeyType="next"
//             />
//             {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
//           </View>

//           {/* Last Name */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Last Name *</Text>
//             <TextInput
//               style={[styles.input, errors.lastName && styles.inputError]}
//               placeholder="Enter your last name"
//               value={formData.lastName}
//               onChangeText={(value) => handleInputChange('lastName', value)}
//               autoCapitalize="words"
//               returnKeyType="next"
//             />
//             {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
//           </View>

//           {/* Email */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Email *</Text>
//             <TextInput
//               style={[styles.input, errors.email && styles.inputError]}
//               placeholder="Enter your email"
//               value={formData.email}
//               onChangeText={(value) => handleInputChange('email', value)}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               autoCorrect={false}
//               returnKeyType="next"
//             />
//             {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
//           </View>

//           {/* Phone */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Phone Number *</Text>
//             <TextInput
//               style={[styles.input, errors.phone && styles.inputError]}
//               placeholder="Enter your phone number"
//               value={formData.phone}
//               onChangeText={(value) => handleInputChange('phone', value)}
//               keyboardType="phone-pad"
//               returnKeyType="next"
//             />
//             {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
//           </View>

//           {/* Password */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Password *</Text>
//             <TextInput
//               style={[styles.input, errors.password && styles.inputError]}
//               placeholder="Enter your password (min 6 characters)"
//               value={formData.password}
//               onChangeText={(value) => handleInputChange('password', value)}
//               secureTextEntry
//               autoCapitalize="none"
//               returnKeyType="next"
//             />
//             {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
//           </View>

//           {/* Confirm Password */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Confirm Password *</Text>
//             <TextInput
//               style={[styles.input, errors.confirmPassword && styles.inputError]}
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChangeText={(value) => handleInputChange('confirmPassword', value)}
//               secureTextEntry
//               autoCapitalize="none"
//               returnKeyType="done"
//               onSubmitEditing={handleRegister}
//             />
//             {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
//           </View>

//           {/* Register Button */}
//           <TouchableOpacity 
//             style={[styles.registerButton, isLoading && styles.buttonDisabled]} 
//             onPress={handleRegister}
//             disabled={isLoading}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.registerButtonText}>
//               {isLoading ? 'Creating Account...' : 'Create Account'}
//             </Text>
//           </TouchableOpacity>

//           {/* Login Link */}
//           <View style={styles.loginContainer}>
//             <Text style={styles.loginText}>Already have an account? </Text>
//             <TouchableOpacity onPress={navigateToLogin} activeOpacity={0.7}>
//               <Text style={styles.loginLink}>Sign In</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Debug Info - Remove in production */}
//           <View style={styles.debugContainer}>
//             <Text style={styles.debugText}>
//               Fields filled: {Object.values(formData).filter(val => val.trim()).length}/6
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   formContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 28,
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
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//     minHeight: 50,
//   },
//   inputError: {
//     borderColor: '#ff4444',
//     borderWidth: 2,
//   },
//   errorText: {
//     color: '#ff4444',
//     fontSize: 14,
//     marginTop: 5,
//     fontWeight: '500',
//   },
//   registerButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: 10,
//     minHeight: 50,
//     justifyContent: 'center',
//   },
//   buttonDisabled: {
//     backgroundColor: '#cccccc',
//   },
//   registerButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   loginText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   loginLink: {
//     fontSize: 16,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   debugContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 5,
//   },
//   debugText: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//   },
// });

// export default Register;



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// IMPORTANT: Replace with your actual IP address from ipconfig
const YOUR_IP = '192.168.29.77'; // Change this to your actual IP
const API_BASE_URL = `http://${YOUR_IP}:5000/api`;

// Test connection function (keep for internal use)
const testConnection = async () => {
  try {
    console.log('Testing connection to:', `http://${YOUR_IP}:5000/health`);
    
    const response = await fetch(`http://${YOUR_IP}:5000/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Backend connection test successful:', data);
    return data;
  } catch (error) {
    console.error('Backend connection failed:', error.message);
    return null;
  }
};

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Test connection on component mount (silent check)
  React.useEffect(() => {
    const checkConnection = async () => {
      const result = await testConnection();
      if (!result) {
        console.warn('Backend connection failed on component mount');
      } else {
        console.log('Backend connection successful on component mount');
      }
    };
    checkConnection();
  }, []);

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

    // First Name validation
    if (!formData.firstName || !formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName || !formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    console.log('=== REGISTRATION ATTEMPT ===');
    console.log('Form data:', formData);
    console.log('API URL:', API_BASE_URL);

    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }

    setIsLoading(true);

    try {
      // First test connection silently
      const connectionTest = await testConnection();
      if (!connectionTest) {
        throw new Error('Cannot connect to backend server');
      }

      console.log('Connection test passed, sending registration request...');
      
      const requestData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.replace(/\D/g, '') // Remove non-digits
      };

      console.log('Sending request to:', `${API_BASE_URL}/users/register`);
      console.log('Request data:', requestData);

      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Invalid response from server');
      }

      console.log('Registration response:', data);

      if (response.ok && data.success) {
        Alert.alert(
          'Registration Successful! 🎉',
          `Welcome ${formData.firstName}! Your account has been created successfully.`,
          [
            {
              text: 'Continue to Login',
              onPress: () => {
                // Clear form
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  phone: ''
                });
                
                navigation.navigate('Login', { 
                  registeredEmail: formData.email.trim()
                });
              }
            }
          ]
        );
      } else {
        // Handle server errors
        const errorMessage = data.message || data.error || 'Registration failed';
        console.error('Registration failed:', errorMessage);
        
        if (data.errors && Array.isArray(data.errors)) {
          Alert.alert('Registration Failed', data.errors.join('\n'));
        } else {
          Alert.alert('Registration Failed', errorMessage);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. ';
      
      if (error.message.includes('Network request failed')) {
        errorMessage += 'Please check:\n\n• Backend server is running\n• Correct IP address is used\n• Phone and computer are on same WiFi\n• No firewall blocking the connection';
      } else if (error.message.includes('timeout')) {
        errorMessage += 'Request timed out. Please try again.';
      } else if (error.message.includes('Cannot connect')) {
        errorMessage += 'Cannot connect to server. Make sure the backend is running.';
      } else {
        errorMessage += error.message;
      }
      
      Alert.alert('Connection Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us today!</Text>

          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              placeholder="Enter your first name"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              autoCapitalize="words"
              returnKeyType="next"
              editable={!isLoading}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          </View>

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              placeholder="Enter your last name"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              autoCapitalize="words"
              returnKeyType="next"
              editable={!isLoading}
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
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

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="Enter your 10-digit phone number"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
              maxLength={10}
              returnKeyType="next"
              editable={!isLoading}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password *</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Enter your password (min 6 characters)"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleRegister}
              editable={!isLoading}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Register Button */}
          <TouchableOpacity 
            style={[styles.registerButton, isLoading && styles.buttonDisabled]} 
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin} activeOpacity={0.7} disabled={isLoading}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
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
    padding: 12,
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
  registerButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    minHeight: 50,
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default Register;

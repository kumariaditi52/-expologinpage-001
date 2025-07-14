// Create this file in MyExpoApp/config/api.js
const getApiUrl = () => {
  // Replace with your actual IP address
  const YOUR_IP = '192.168.1.100'; // CHANGE THIS TO YOUR IP
  
  // For development
  if (__DEV__) {
    return `http://${YOUR_IP}:5000/api`;
  }
  
  // For production
  return 'https://your-production-api.com/api';
};

export const API_BASE_URL = getApiUrl();

// Test connection function
export const testConnection = async () => {
  try {
    const response = await fetch(API_BASE_URL.replace('/api', '/health'));
    const data = await response.json();
    console.log('Backend connection test:', data);
    return data;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return null;
  }
};

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   SafeAreaView,
//   Dimensions,
//   AsyncStorage
// } from 'react-native';

// const { width } = Dimensions.get('window');

// const Home = ({ navigation, route }) => {
//   const [userData, setUserData] = useState(null);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Get user data from navigation params or AsyncStorage
//     const initializeUserData = async () => {
//       try {
//         if (route.params?.userData) {
//           setUserData(route.params.userData);
//           // Store in AsyncStorage for persistence
//           await AsyncStorage.setItem('userData', JSON.stringify(route.params.userData));
//         } else if (route.params?.userEmail) {
//           // If only email is passed, create basic user data
//           const basicUserData = {
//             email: route.params.userEmail,
//             firstName: 'User',
//             lastName: '',
//             phone: '',
//             createdAt: new Date().toISOString()
//           };
//           setUserData(basicUserData);
//           await AsyncStorage.setItem('userData', JSON.stringify(basicUserData));
//         } else {
//           // Try to get from AsyncStorage
//           const storedUserData = await AsyncStorage.getItem('userData');
//           if (storedUserData) {
//             setUserData(JSON.parse(storedUserData));
//           }
//         }
//       } catch (error) {
//         console.error('Error loading user data:', error);
//       }
//     };

//     initializeUserData();

//     // Update time every second
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [route.params]);

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: async () => {
//             setIsLoading(true);
//             try {
//               console.log('🚪 Logging out user...');
              
//               // Clear all stored data
//               await AsyncStorage.multiRemove(['userToken', 'userData']);
//               console.log('✅ AsyncStorage cleared');
              
//               // Clear user data state
//               setUserData(null);
              
//               // Reset navigation stack to Register screen
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'Register' }],
//               });
              
//               console.log('✅ Navigation reset to Register');
              
//             } catch (error) {
//               console.error('❌ Logout error:', error);
//               Alert.alert('Error', 'Failed to logout properly. Please try again.');
//             } finally {
//               setIsLoading(false);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleProfilePress = () => {
//     if (!userData) {
//       Alert.alert('Error', 'User data not available');
//       return;
//     }

//     Alert.alert(
//       'Profile Information',
//       `Name: ${userData.firstName} ${userData.lastName}\nEmail: ${userData.email}\nPhone: ${userData.phone || 'Not provided'}\nJoined: ${new Date(userData.createdAt).toLocaleDateString()}`,
//       [
//         { text: 'OK' }
//       ]
//     );
//   };

//   const handleSettingsPress = () => {
//     Alert.alert('Settings', 'Settings feature will be implemented soon!');
//   };

//   const handleNotificationsPress = () => {
//     Alert.alert('Notifications', 'Notifications feature will be implemented soon!');
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     });
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getGreeting = () => {
//     const hour = currentTime.getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   const quickActions = [
//     { id: 1, title: 'Profile', icon: '👤', onPress: handleProfilePress },
//     { id: 2, title: 'Settings', icon: '⚙️', onPress: handleSettingsPress },
//     { id: 3, title: 'Notifications', icon: '🔔', onPress: handleNotificationsPress },
//   ];

//   // Loading state
//   if (!userData) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Header Section */}
//         <View style={styles.header}>
//           <View style={styles.welcomeContainer}>
//             <Text style={styles.greetingText}>{getGreeting()}!</Text>
//             <Text style={styles.welcomeText}>
//               {userData.firstName} {userData.lastName}
//             </Text>
//             <Text style={styles.emailText}>{userData.email}</Text>
//           </View>
//           <TouchableOpacity 
//             style={[styles.logoutButton, isLoading && styles.buttonDisabled]} 
//             onPress={handleLogout}
//             disabled={isLoading}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.logoutButtonText}>
//               {isLoading ? 'Logging out...' : 'Logout'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Time and Date Card */}
//         <View style={styles.timeCard}>
//           <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
//           <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
//         </View>

//         {/* User Info Card */}
//         <View style={styles.userInfoCard}>
//           <Text style={styles.sectionTitle}>Account Information</Text>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Full Name:</Text>
//             <Text style={styles.infoValue}>
//               {userData.firstName} {userData.lastName}
//             </Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Email:</Text>
//             <Text style={styles.infoValue}>{userData.email}</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Phone:</Text>
//             <Text style={styles.infoValue}>{userData.phone || 'Not provided'}</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Member Since:</Text>
//             <Text style={styles.infoValue}>
//               {new Date(userData.createdAt).toLocaleDateString()}
//             </Text>
//           </View>
//           {userData.lastLogin && (
//             <View style={styles.infoRow}>
//               <Text style={styles.infoLabel}>Last Login:</Text>
//               <Text style={styles.infoValue}>
//                 {new Date(userData.lastLogin).toLocaleString()}
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Quick Actions */}
//         <View style={styles.quickActionsContainer}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <View style={styles.actionsGrid}>
//             {quickActions.map((action) => (
//               <TouchableOpacity
//                 key={action.id}
//                 style={styles.actionCard}
//                 onPress={action.onPress}
//                 activeOpacity={0.7}
//               >
//                 <Text style={styles.actionIcon}>{action.icon}</Text>
//                 <Text style={styles.actionTitle}>{action.title}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Stats Section */}
//         <View style={styles.statsContainer}>
//           <Text style={styles.sectionTitle}>Dashboard Stats</Text>
//           <View style={styles.statsGrid}>
//             <View style={styles.statCard}>
//               <Text style={styles.statNumber}>1</Text>
//               <Text style={styles.statLabel}>Account</Text>
//             </View>
//             <View style={styles.statCard}>
//               <Text style={styles.statNumber}>✓</Text>
//               <Text style={styles.statLabel}>Active</Text>
//             </View>
//             <View style={styles.statCard}>
//               <Text style={styles.statNumber}>0</Text>
//               <Text style={styles.statLabel}>Messages</Text>
//             </View>
//             <View style={styles.statCard}>
//               <Text style={styles.statNumber}>🔒</Text>
//               <Text style={styles.statLabel}>Secure</Text>
//             </View>
//           </View>
//         </View>

//         {/* Recent Activity */}
//         <View style={styles.activityContainer}>
//           <Text style={styles.sectionTitle}>Recent Activity</Text>
//           <View style={styles.activityList}>
//             <View style={styles.activityItem}>
//               <View style={styles.activityDot} />
//               <View style={styles.activityContent}>
//                 <Text style={styles.activityTitle}>Logged In Successfully</Text>
//                 <Text style={styles.activityTime}>Just now</Text>
//               </View>
//             </View>
//             <View style={styles.activityItem}>
//               <View style={[styles.activityDot, { backgroundColor: '#2196F3' }]} />
//               <View style={styles.activityContent}>
//                 <Text style={styles.activityTitle}>Account Created</Text>
//                 <Text style={styles.activityTime}>
//                   {new Date(userData.createdAt).toLocaleDateString()}
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.activityItem}>
//               <View style={[styles.activityDot, { backgroundColor: '#FF9800' }]} />
//               <View style={styles.activityContent}>
//                 <Text style={styles.activityTitle}>Profile Verified</Text>
//                 <Text style={styles.activityTime}>
//                   {new Date(userData.createdAt).toLocaleDateString()}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#666',
//   },
//   scrollContainer: {
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 20,
//   },
//   welcomeContainer: {
//     flex: 1,
//   },
//   greetingText: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 4,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   emailText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   logoutButton: {
//     backgroundColor: '#ff4444',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//     minWidth: 80,
//     alignItems: 'center',
//   },
//   buttonDisabled: {
//     backgroundColor: '#cccccc',
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   timeCard: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 15,
//     padding: 20,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   timeText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 5,
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#fff',
//     opacity: 0.9,
//   },
//   userInfoCard: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   infoValue: {
//     fontSize: 14,
//     color: '#333',
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'right',
//   },
//   quickActionsContainer: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   actionsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   actionCard: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//     width: (width - 60) / 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   actionIcon: {
//     fontSize: 30,
//     marginBottom: 10,
//   },
//   actionTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//   },
//   statsContainer: {
//     marginBottom: 20,
//   },
//   statsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//    statCard: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//     width: (width - 50) / 2,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   statNumber: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginBottom: 5,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   activityContainer: {
//     marginBottom: 20,
//   },
//   activityList: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   activityItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   activityDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: '#4CAF50',
//     marginRight: 15,
//   },
//   activityContent: {
//     flex: 1,
//   },
//   activityTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 2,
//   },
//   activityTime: {
//     fontSize: 12,
//     color: '#999',
//   },
// });

// export default Home;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const Home = ({ navigation, route }) => {
  const [userEmail, setUserEmail] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (route.params?.userEmail) {
      setUserEmail(route.params.userEmail);
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [route.params]);

  // FIXED LOGOUT FUNCTION
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('🚪 Logging out...');
            
            // Reset navigation stack completely
            navigation.reset({
              index: 0,
              routes: [{ name: 'Register' }],
            });
            
            console.log('✅ Navigated to Register screen');
          },
        },
      ]
    );
  };

  const handleProfilePress = () => {
    Alert.alert('Profile', 'Profile feature coming soon!');
  };

  const handleSettingsPress = () => {
    Alert.alert('Settings', 'Settings feature coming soon!');
  };

  const handleNotificationsPress = () => {
    Alert.alert('Notifications', 'Notifications feature coming soon!');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const quickActions = [
    { id: 1, title: 'Profile', icon: '👤', onPress: handleProfilePress },
    { id: 2, title: 'Settings', icon: '⚙️', onPress: handleSettingsPress },
    { id: 3, title: 'Notifications', icon: '🔔', onPress: handleNotificationsPress },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.emailText}>{userEmail}</Text>
          </View>
          {/* FIXED LOGOUT BUTTON */}
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeCard}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={action.onPress}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Dashboard</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Overdue</Text>
            </View>
          </View>
        </View>

        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Account Created</Text>
                <Text style={styles.activityTime}>Just now</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#2196F3' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Profile Updated</Text>
                <Text style={styles.activityTime}>2 minutes ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: '#FF9800' }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Login Successful</Text>
                <Text style={styles.activityTime}>5 minutes ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  emailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timeCard: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: (width - 60) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: (width - 50) / 2,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activityContainer: {
    marginBottom: 20,
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default Home;

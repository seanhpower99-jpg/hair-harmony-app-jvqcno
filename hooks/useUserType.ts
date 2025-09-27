
import { useState, useEffect } from 'react';
import { UserType } from '../types';

export const useUserType = () => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user type from storage or API
    const loadUserType = async () => {
      try {
        // In a real app, this would come from AsyncStorage or API
        // For demo purposes, we'll default to customer
        setTimeout(() => {
          setUserType('customer');
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log('Error loading user type:', error);
        setIsLoading(false);
      }
    };

    loadUserType();
  }, []);

  const switchUserType = (type: UserType) => {
    setUserType(type);
    console.log('Switched to user type:', type);
  };

  return {
    userType,
    isLoading,
    switchUserType,
  };
};

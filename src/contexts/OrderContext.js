import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  // Check if there's an active order
  const hasActiveOrder = () => {
    return activeOrder !== null && activeOrder.status === 'in_progress';
  };

  // Create new order
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: 'in_progress',
      orderTime: new Date(),
      estimatedDeliveryTime: new Date(Date.now() + orderData.deliveryTimeMinutes * 60 * 1000),
      completionTime: null
    };

    setActiveOrder(newOrder);
    return newOrder;
  };

  // Complete the current order
  const completeOrder = () => {
    if (activeOrder) {
      const completedOrder = {
        ...activeOrder,
        status: 'completed',
        completionTime: new Date()
      };
      
      setOrderHistory(prev => [completedOrder, ...prev]);
      setActiveOrder(null);
      return completedOrder;
    }
  };

  // Cancel the current order
  const cancelOrder = () => {
    if (activeOrder) {
      const cancelledOrder = {
        ...activeOrder,
        status: 'cancelled',
        completionTime: new Date()
      };
      
      setOrderHistory(prev => [cancelledOrder, ...prev]);
      setActiveOrder(null);
      return cancelledOrder;
    }
  };

  // Get remaining delivery time in minutes
  const getRemainingDeliveryTime = () => {
    if (!activeOrder || activeOrder.status !== 'in_progress') return 0;
    
    const now = new Date();
    const deliveryTime = new Date(activeOrder.estimatedDeliveryTime);
    const remainingMs = deliveryTime.getTime() - now.getTime();
    const remainingMinutes = Math.ceil(remainingMs / (1000 * 60));
    
    return Math.max(0, remainingMinutes);
  };

  // Auto-complete order when delivery time is reached
  useEffect(() => {
    if (!activeOrder || activeOrder.status !== 'in_progress') return;

    const checkDeliveryCompletion = () => {
      const remainingTime = getRemainingDeliveryTime();
      if (remainingTime <= 0) {
        completeOrder();
      }
    };

    const interval = setInterval(checkDeliveryCompletion, 1000); // Check every second
    
    return () => clearInterval(interval);
  }, [activeOrder]);

  const value = {
    activeOrder,
    orderHistory,
    hasActiveOrder,
    createOrder,
    completeOrder,
    cancelOrder,
    getRemainingDeliveryTime
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
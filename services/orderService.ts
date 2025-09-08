// services/orderService.ts

// The URL of your backend server.
// Replace with your computer's local IP address.
const BASE_URL = "http://YOUR_LOCAL_IP:3000/api/v1";

// This function fetches all orders with 'failed' status
export const getFailedOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orders/failed`);
    if (!response.ok) {
      // Throw an error for non-successful HTTP status codes
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching failed orders:", error);
    throw error;
  }
};

// This function fetches reschedule suggestions for a specific order
export const getSuggestions = async (orderId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/reschedule-suggestions`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
};

// This function confirms the reschedule of an order with a selected slot
export const confirmReschedule = async (orderId: string, slot: any) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/reschedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedSlot: slot }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error confirming reschedule:", error);
    throw error;
  }
};
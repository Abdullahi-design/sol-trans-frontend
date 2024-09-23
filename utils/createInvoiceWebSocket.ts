const WEBSOCKET_URL = 'ws://localhost:6060'; // Replace with your WebSocket server URL

interface UserReturn {
    token?: string | null;
    tempAcc?: string | null;
    solAmount?: number; // Add solAmount here
    errorMessage?: string;
    successMessage?: string;
}
  

// WebSocket client utility
export const createInvoiceWebSocket = (publicKey: string, solAmount: number): Promise<UserReturn> => {
  return new Promise((resolve, reject) => {
    // Open WebSocket connection
    const socket = new WebSocket(WEBSOCKET_URL);

    // Handle connection open
    socket.onopen = () => {
      // Send invoice data to WebSocket server
      const payload = { publicKey, solAmount };
      socket.send(JSON.stringify(payload));
    };

    // Handle receiving data from the server
    socket.onmessage = (event) => {
      const responseData = JSON.parse(event.data);

      if (responseData.errorMessage) {
        reject({ errorMessage: responseData.errorMessage });
      } else {
        resolve({
          successMessage: responseData.successMessage || "Invoice created successfully",
          token: responseData.token || null,
        });
      }
    };

    // Handle WebSocket error
    socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
      reject({ errorMessage: "WebSocket connection error" });
    };

    // Handle connection close
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  });
};

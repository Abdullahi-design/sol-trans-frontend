"use client";

import { z } from "zod";
const WEBSOCKET_URL = 'ws://localhost:6060'; 
interface FormData {
  get: (key: string) => FormDataEntryValue | null;
}

interface PrevState {}

interface UserReturn {
    token?: null;
    tempAcc?: null;
    solAmount?: null; 
    errorMessage?: string;
    successMessage?: string;
    signature?: string;
}

export const createInvoiceWebSocket = (publicKey: string, solAmount: number): Promise<UserReturn> => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(WEBSOCKET_URL);

    // Handle WebSocket connection open
    socket.onopen = () => {
      const payload = { publicKey, solAmount };
      console.log('Sending payload:', payload);
      socket.send(JSON.stringify(payload));
    };

    // Handle WebSocket message (capture both tempAcc and signature separately)
    socket.onmessage = async (event) => {
      const responseData = JSON.parse(event.data);
      console.log("Received WebSocket data:", responseData);

        if (responseData.errorMessage) {
            reject({ errorMessage: responseData.errorMessage });
        } else {
            // Show the temporary account first and return successMessage
            if (responseData.tempAcc) {
            console.log('Temporary Account:', responseData.tempAcc);
            resolve({
                successMessage: responseData.successMessage || "Invoice created successfully",
                tempAcc: responseData.tempAcc,
                solAmount: responseData.solAmount,
            });
            }

            // Now wait for the signature and store it in a cookie when it arrives
            if (responseData.signature) {
                console.log('Transaction Signature:', responseData.signature);

                if (typeof window !== 'undefined') {
                    // Set the local storage
                    localStorage.setItem('signature', responseData.signature);
                
                    // Verify that the cookie is set
                    const savedSignature = localStorage.getItem('signature');
                    console.log('Signature stored in localStorage:', savedSignature);
                }
                

                // Once the signature is received, resolve with the signature as well
                resolve({
                    successMessage: "Payment confirmed",
                    signature: responseData.signature,
                });
            }
        }
    };

    // Handle WebSocket error
    socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
      reject({ errorMessage: "WebSocket connection error" });
    };

    // Handle WebSocket connection close
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  });
};


// cerate user invoice
export async function createInvoice(
  prevState: PrevState,
  formData: FormData
): Promise<UserReturn> {

    const schema = z.object({
        publicKey: z.string().nonempty("PublicKey is required"),
        solAmount: z.number().positive("Sol Amount is required")
    });

    // Get the form data and convert solAmount to a float
    const publicKey = formData.get('publicKey') as string;
    const solAmountString = formData.get('solAmount') as string;

    const solAmount = parseFloat(solAmountString); // Convert solAmount to a number

    // Parse and validate the form data
    const data = schema.safeParse({
        publicKey,
        solAmount, // Ensure solAmount is a number for validation
    });

    // Check if validation failed
    if (!data.success) {
        const errorMessages = data.error.errors.map(err => err.message).join(', ');
        return { errorMessage: errorMessages };
    }

    // console.log(data);
    // return {successMessage: "hi"}
    

    try {
        // Use WebSocket to send data to the server
        const response = await createInvoiceWebSocket(publicKey, solAmount);

        console.log(response, 'response here');
        
        return response;
        
    } catch (error) {
        // Handle network or other errors
        console.log(`The error message: ${(error as Error).message}`);
        return { errorMessage: `Failed to Login` };
    }
}
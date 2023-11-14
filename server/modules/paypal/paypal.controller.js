// controllers/paypal.controller.js

// const PayPalController = {
//     createOrder: async (req, res) => {
//       // use the cart information passed from the front-end to calculate the order amount detals
//       const { cart } = req.body;
  
//       try {
//         const order = await createOrder(cart);
//         res.status(200).json(order);
//       } catch (error) {
//         console.error("Failed to create order:", error);
//         res.status(500).json({ error: "Failed to create order." });
//       }
//     },
  
//     captureOrder: async (req, res) => {
//       const { orderID } = req.params;
  
//       try {
//         const capture = await captureOrder(orderID);
//         res.status(200).json(capture);
//       } catch (error) {
//         console.error("Failed to capture order:", error);
//         res.status(500).json({ error: "Failed to capture order." });
//       }
//     },
//   };
  
//   module.exports = PayPalController;
  
// //  import { createOrder, captureOrder } from "../services/paypal.service";

// // export async function createOrderController(req, res) {
// //   try {
// //     const { cart } = req.body;
// //     const order = await createOrder(cart);
// //     res.status(order.httpStatusCode).json(order.jsonResponse);
// //   } catch (error) {
// //     console.error("Failed to create order:", error);
// //     res.status(500).json({ error: "Failed to create order." });
// //   }
// // }

// // export async function captureOrderController(req, res) {
// //   try {
// //     const { orderID } = req.params;
// //     const order = await captureOrder(orderID);
// //     res.status(order.httpStatusCode).json(order.jsonResponse);
// //   } catch (error) {
// //     console.error("Failed to capture order:", error);
// //     res.status(500).json({ error: "Failed to capture order." });
// //   }
// // }

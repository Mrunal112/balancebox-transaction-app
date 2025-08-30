import express from "express";
import db from "@balancebox/db/client";

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  // Handle the webhook event
  console.log("Webhook received:", req.body);

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  const checkStatus = await db.onRampTransaction.findFirst({
    where:{
      token: paymentInformation.token
    }
  })

  if(checkStatus?.status === "Success"){
    console.log("Transaction already processed:", paymentInformation.token);
    return res.status(200).json({
      message: "Transaction already processed"
    });
  }

  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),

      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({
      message: "Captured",
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({
      message: "Error while processing",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Webhook server is running!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Webhook server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📞 Webhook endpoint: http://localhost:${PORT}/hdfcWebhook`);
});

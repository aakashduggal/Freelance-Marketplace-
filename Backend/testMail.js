import { publishEvent } from "./queue/producer.js";

const simulateOrder = async () => {
    console.log(" Firing a Fake Order Action from Main API...");
    
    // Gira diya message dabbe main
    await publishEvent("ORDER_NOTIFICATION", {
        orderId: "MOCK_ORDER_9999",
        title: "E-Commerce Website Development",
        buyer: "MockUser_123",
        status: "Completed"
    });

    console.log("✅ Main API finished instantly. Waiting 3 seconds to let Background Worker process email...");
    
    // Thoda wait takki Consumer mail pakad le uske bad script off kardenge
    setTimeout(() => {
        process.exit();
    }, 3000);
}

simulateOrder();

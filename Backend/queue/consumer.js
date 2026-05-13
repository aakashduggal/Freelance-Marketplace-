import redisClient from "../DB/redis.js"
import nodemailer from "nodemailer"

const subscriber = redisClient.duplicate()

export const startConsumer = async ()=>{
    try {
        await subscriber.connect()
        
        // Nodemailer: Ethereal ka Fake Test account automatically generate karva lia Server On hone par
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // TLS false kyunke local testing hai
            auth: {
                user: testAccount.user, // Server ne automatic chabi generate kr di
                pass: testAccount.pass,
            },
        });

        await subscriber.subscribe("ORDER_NOTIFICATION", async (message)=>{
            try {
                const data = JSON.parse(message)

                const mailOptions = {
                    from: '"Fiverr Bot" <bot@fiverrclone.com>',
                    to: "buyer@dummymail.com", // Asli app me 'data.buyerId' ka use krke email mngvayenge DB se
                    subject: `Congratulation! Your Order Placed: ${data.title} `, 
                    text: `Hello Buyer!\n\nYour Order for "${data.title}" (Order ID: ${data.orderId}) has been successfully sent to the seller.\n\nThank you for choosing FiverrClone!`
                };
                
                // Asli email sender chal pada
                let info = await transporter.sendMail(mailOptions);

                console.log("Background machine sent the mail! ASYNC WORKER FIRED!");
                console.log(`Order ID: ${data.orderId}`);
                console.log(`Congratulations for Gig: ${data.title}`);
                console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
                console.log("Uper diye gaye Preview URL Link ko copy kar ke Browser me khol k dkh asli Inbox me mail dikhega!!");
            } catch (err) {
                console.error("Error processing order notification:", err.message);
            }
        })
   console.log("Consumer listening continously with fake Mails");
    } catch (error) {
        console.error("Consumer is making start:", error.message);
    }
}
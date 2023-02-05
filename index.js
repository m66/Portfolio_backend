import express from "express";
import cors from "cors";
import nodeMailer from "nodemailer";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/postFormData", (req, res) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let infoSendingData = {
    from: req.body.email,
    to: "manasyan.workspace@gmail.com",
    subject: req.body.subject,
    text: `mail: ${req.body.email} 
    name: ${req.body.name}
    message: ${req.body.message}`,
  };

  transporter.sendMail(infoSendingData, (err) => {
    if (err) {
      res.send("Occured message", err);
    } else {
      res.send("Sent successfully!");
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

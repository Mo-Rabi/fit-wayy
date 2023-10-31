import { createTransport } from "nodemailer";

export const sendToEmail = async (email, token) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "mostafa.rapi3@gmail.com",
      pass: "vylvyjahuqvxgxbx",
    },
  });

  const link = `http://localhost:4000/user/verify/${token}`;

  const info = await transporter.sendMail({
    from: '"Mo Rabi" <mostafa.rapi3@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Welcome to our team ✅", // Subject line
    text: "Hello world", // plain text body
    html: `Please click this link to verify your email: <a href="${link}">${link}</a>`,
  });

  console.log("Message sent: %s", info.messageId);
};

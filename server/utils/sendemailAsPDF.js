import nodemailer from 'nodemailer';
import pdfkit from 'pdfkit';
import cron from 'cron';
import exerciseModel from "../../db/model/exercise.model.js";
import { createTransport } from "nodemailer";
// Rest of the code remains the same

async function generatePDF(html) {
  const pdf = new pdfkit();
  pdf.text(html);
  const buffer = await pdf.toBuffer();
  return buffer;
}

async function sendEmailAsPDF() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abdallahramdan222@gmail.com",
      pass: "ictjksnuljojvbdp",
    },
  });

  let getAllExer = await exerciseModel.find({ isCorrect: true });

const html = `
  <h1>Weekly gym report</h1>
  <table>
    <tr>
      <th>Exercise</th>
      <th>Weight loss (lbs)</th>
      <th>Calories lost</th>
    </tr>
    ${getAllExer.map((exercise) => `
      <tr>
        <td>${exercise.name}</td>
        <td>${exercise.difficulty == 'first' ? 200 : ''} ${exercise.difficulty == 'seconed' ? 300 : ''} ${exercise.difficulty == 'thired' ? 400 : ''}</td>
        <td>${exercise.difficulty == 'first' ? 2.0 : ''} ${exercise.difficulty == 'seconed' ? 3.0 : ''} ${exercise.difficulty == 'thired' ? 4.0 : ''}</td>
      </tr>
    `).join('')}
  </table>
  <h1>Weekly Exercise</h1>
  <table>
    <tr>
      <th>Exercise Name</th>
    </tr>
    ${getAllExer.map((exercise) => `
      <tr>
        <td>${exercise.name}</td>
      </tr>
    `).join('')}
  </table>
`;
  const pdfBuffer = await generatePDF(html);
 const sendToEmail = async (email, token, userType ) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "mostafa.rapi3@gmail.com",
      pass: "vylvyjahuqvxgxbx",
    },
  });
  const info = await transporter.sendMail({
    from: '"Mo Rabi" <mostafa.rapi3@gmail.com>', // sender address
    to: 'abdallahramdan222@gmail.com', // list of receivers
    subject: "Welcome to our team ✅", // Subject line
    text: "Hello world", // plain text body
    html: pdfBuffer,
  });
};
}

// Schedule the report generation
const job = new cron.CronJob('0 0 * * *', async () => {
  const report = await generateReport();
  await sendReport(sendEmailAsPDF());
});

// Start the job
job.start();

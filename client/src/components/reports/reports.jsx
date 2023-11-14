import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create a PDFDocument component to render the PDF content
const PDFDocument = ({ reports }) => (
  
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Weekly Gym Report</Text>
        {reports.map(report => (
         report.isCorrect? <View key={report._id} style={styles.report}>
         <Text style={styles.label}>Exercise Name</Text>
         <Text style={styles.text}>{report.name}</Text>
         <Text style={styles.label}>loss weight:</Text>
         <Text style={styles.text}>{report.difficulty == 'first' ? '25.9 g' : ''} {report.difficulty == 'seconed' ? '38.9 g' : ''} {report.difficulty == 'thired' ? '51.94 g' : ''}</Text>
         <Text style={styles.label}>lost caloirs:</Text>
         <Text style={styles.text}>{report.difficulty == 'first' ? 200 : ''} {report.difficulty == 'seconed' ? 300 : ''} {report.difficulty == 'thired' ? 400 : ''}</Text>
       </View>:null
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Weekly Exercise</Text>
        {weeklyPlan.map(item => (
          <View key={item._id} style={styles.item}>
         <Text style={styles.label}>day</Text>
         <Text style={styles.text}>{item.day}</Text>
         <Text style={styles.label}>Exercise</Text>
         <Text style={styles.text}>{item.exercise}</Text>
         <Text style={styles.label}>Sets</Text>
         <Text style={styles.text}>{item.sets }</Text>
         <Text style={styles.label}>Reps</Text>
         <Text style={styles.text}>{item.reps }</Text>

       </View>
        ))}
      </View>
    </Page>
  </Document>
);

const weeklyPlan = [
  { day: 'Monday', exercise: 'Push-ups', sets: 3, reps: 10 },
  { day: 'Tuesday', exercise: 'Squats', sets: 4, reps: 12 },
  { day: 'Wednesday', exercise: 'Plank', sets: 2, reps: 30 },
  { day: 'Thursday', exercise: 'Lunges', sets: 3, reps: 12 },
  { day: 'Friday', exercise: 'Burpees', sets: 3, reps: 10 },
  { day: 'Saturday', exercise: 'Sit-ups', sets: 2, reps: 20 },
  { day: 'Sunday', exercise: 'Rest Day', sets: 0, reps: 0 },
];


const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#333',
    textDecoration: 'underline',
  },
  report: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  item: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  text: {},
});

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .post('http://localhost:4000/allExercise')
      .then(response => {
        setReports(response.data.getAllExer);
        setIsLoading(false);
        console.log(response)
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  // Render the component
  return (
    <>
      <div className="py-5 container mt-5">
        <h4 className="text-center mb-4">Weekly gym report</h4>

        <table className='table table-secondary text-center p-3 border  border-dark  table-striped table-hover  '>
    <thead>
    <tr>
      <th>Exercise Name</th>
      <th>Weight loss (lbs)</th>
      <th>Calories lost</th>
    </tr>
    </thead>
    {reports.map((exercise) =>
     exercise.isCorrect? <tr>
     <td className='p-2'>{exercise.name}</td>
     <td className='p-2'>{exercise.difficulty == 'first' ?  '25.9 g': ''} {exercise.difficulty == 'seconed' ? '38.9 g' : ''} {exercise.difficulty == 'thired' ? '51.94 g' : ''}</td>
     <td className='p-2'>{exercise.difficulty == 'first' ? 200 : ''} {exercise.difficulty == 'seconed' ? 300 : ''} {exercise.difficulty == 'thired' ? 400 : ''}</td>
   </tr>:null 
    )}
  </table>
  <h4 className='text-center mb-4 mt-3 '> Weekly Exercise</h4>
  <table  className='table table-success table-secondary p-3 border  border-dark'>
   {/* <thead> <tr>
      
            <th>Day</th>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
         
    </tr></thead>
    {reports.map((exercise) => 
      <tr>
        <td className='p-2'>{exercise.name}</td>
      </tr>
    )} */}


        <thead>
          <tr>
            <th>Day</th>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          {weeklyPlan.map(item => (
            <tr key={item.day}>
              <td>{item.day}</td>
              <td>{item.exercise}</td>
              <td>{item.sets}</td>
              <td>{item.reps}</td>
            </tr>
          ))}
        </tbody>
      </table>

        <div className="w-25 mx-auto">
          {!isLoading && reports.length > 0 ? (
          <button className='btn btn-success'>  <PDFDownloadLink document={<PDFDocument reports={reports} />} fileName="gym_report.pdf">
              {({ loading }) => (loading ? 'Loading...' : 'Download as PDF')}
            </PDFDownloadLink></button>
          ) : (
            <p>No data available to generate PDF.</p>
          )}
        </div>
      </div>
    </>
  );
}
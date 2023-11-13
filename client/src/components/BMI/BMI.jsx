import React, { useState } from 'react';
import bg from '../../components/assets/images/gym/bg2.jpg';
import { Link } from 'react-router-dom';

export default function () {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBmi] = useState(0);
    const [message, setMessage] = useState('');
    const [calories, setCalories] = useState('');
    const [imgSrc, setImgSrc] = useState(null);

    let calcBmi = (event) => {
        event.preventDefault();
        if (weight === 0 || height === 0) {
            alert('Please enter a valid value');
        } else {
            const height2 = height * height;
            let calculatedBmi = weight / height2;
            setBmi(calculatedBmi.toFixed(1))

            if (calculatedBmi < 18.5) {
                setMessage('You are underweight');
                setImgSrc(require('../../components/media/yello.png'));
            } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
                setMessage('You are healthy');
                setImgSrc(require('../../components/media/green.png'));
            } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
                setMessage('You are overweight');
                setImgSrc(require('../../components/media/red.png'));
            } else {
                setMessage('You are obese');
                setImgSrc(require('../../components/media/red.png'));
            }
            const basalMetabolicRate = 66 + (6.23 * weight) + (12.7 * height * 100) - (6.8 * 25);
            const calorieRecommendation = calculateCalories(calculatedBmi, basalMetabolicRate);

            setCalories(`Calories Recommendation: ${calorieRecommendation}`);
        }
    };

    const calculateCalories = (bmi, basalMetabolicRate) => {
        if (bmi < 18.5) {
            return basalMetabolicRate * 1.2; 
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return basalMetabolicRate * 1.55; 
        } else if (bmi >= 25 && bmi <= 29.9) {
            return basalMetabolicRate * 1.725;
        } else {
            return basalMetabolicRate * 1.9;
        }
    };

    let reload = () => {
        window.location.reload();
    }

    return (
        <div>
            <div className="card bg-dark text-white">
                <img src={bg} className="card-img" alt="..." />
                <div className="card-img-overlay">
                    <div className='mx-auto w-25 mt-5'>
                        <h2 className='text-center'>BMI calculator</h2>
                        <form onSubmit={calcBmi}>
                            <div>
                                <label>Weight (KG)</label>
                                <input className='form-control' value={weight} onChange={(e) => setWeight(e.target.value)} /> <br />
                            </div>
                            <div>
                                <label>Height (M)</label>
                                <input className='form-control' value={height} onChange={(e) => setHeight(e.target.value)} /> <br />
                            </div>
                            <div className=''>
                                <button className='btn btn-success w-100 mb-2' type='submit'>Submit</button>
                                <button className='btn btn-outline-warning w-100 mb-2' type='submit' onClick={reload}>Reload</button>
                                <Link className='btn btn-primary w-100' to={"/gymn"}>Return</Link>
                            </div>
                        </form>
                        <div className='text-center mt-2'>
                            <h3>Your BMI is: {bmi}</h3>
                            <h4>{message}</h4>
                            <p>{calories}</p>
                        </div>
                        <div className='img-container text-center'>
                            {imgSrc && <img src={imgSrc} alt='' style={{ width: '100px', height: '100px' }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

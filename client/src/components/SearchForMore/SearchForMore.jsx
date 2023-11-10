import React, { useState } from "react";
import styles from './SearchForMore.module.css'
import Calories from '../Calories/Calories'
import Recipes from "../Recipes/Recipes";
import Exercises from "../Exercises/Exercises";

export default function SearchForMore() {
  const [selectedTopic, setSelectedTopic] = useState("topic1");
  return (
    <div className="container mt-5 pt-5 text-light">
      <h4 className="text-center">Hello Mr. Trainee, do you want to know more and more?</h4>
      <h5 className="text-center">Lets search together about one of these three topics</h5>
      {selectedTopic && (

        <div className="row mt-4 mb-5">
          <div className="col-lg-4 col-sm-12 mt-1">
            <button className="btn btn-primary" onClick={() => setSelectedTopic("Macronutrients")}>Macronutrients count in your food</button>
          </div>
          <div className="col-lg-4 col-sm-12 mt-1">
            <button className="btn btn-primary" onClick={() => setSelectedTopic("Recipes")}>Recipes to follow during your regime</button>
          </div>
          <div className="col-lg-4 col-sm-12 mt-1">
            <button className="btn btn-primary" onClick={() => setSelectedTopic("Exercises")}>Exercises based on muscles</button>
          </div>
        </div>
      )}

      {
        selectedTopic === "Macronutrients" && <Calories />
      }
      {
        selectedTopic === "Recipes" && <Recipes />
      }
      {
        selectedTopic === "Exercises" && <Exercises />
      }
    </div>
  )
}

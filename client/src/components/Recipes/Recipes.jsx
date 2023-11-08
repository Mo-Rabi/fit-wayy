import React, { useState } from "react";
import styles from './Recipes.module.css'
import axios from "axios";
import f18 from '../assets/images/recipes/f18.jpg'
import f17 from '../assets/images/recipes/f17.jpg'
import image from '../assets/account/bg.png'

export default function Recipes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSearch = () => {
    axios.get(`https://api.api-ninjas.com/v1/recipe?query=${searchTerm}`, {
      headers: { 'x-api-key': apiKey }
    })
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error(error);
        setRecipes([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <section className="jarallax" data-jarallax data-speed="0.5" id={styles.backgroundSection}>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-7 col-6 px-0">
              <div className="card rounded-0 bg-dark">
                <div className="row align-items-center g-0">
                  <div className="col-md-6">
                    <img src={image} className="img-fluid"/>
                  </div>
                  <div className="col-md-6 text-light">
                    <h4>Search for any recipe you like</h4>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter recipe you want"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="btn btn-warning" onClick={handleSearch}>
                        {isLoading ? <i className='fa fa-spin fa-spinner'></i> : <><i className='fa fa-search'></i> Search </>}
                      </button>
                    </div>

                  </div>
                </div>
                <div className="row align-items-center g-0 mt-2">
                  <div className="col-md-6 order-md-1 order-2">
                    {recipes && recipes.length > 0 && (
                      <div>
                        {recipes.map((recipe, index) => (
                          <div key={index}>
                            <button
                              type="button"
                              className="btn btn-dark text-light mb-1 w-100 shadow-md"
                              data-bs-toggle="modal"
                              data-bs-target={`#staticBackdrop-${index}`}
                            >
                              {recipe.title}
                            </button>
                            <div className="modal fade text-light" id={`staticBackdrop-${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${index}`} aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content text-light bg-dark">
                                  <div className="modal-header">
                                    <h6 className="modal-title fs-5" id={`staticBackdropLabel-${index}`}> <i class="fa-solid fa-utensils"></i>  {recipe.title.toUpperCase()}</h6>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body">
                                    <p><i class="fa-solid fa-bowl-rice"></i> <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Servings:</span> {recipe.servings}</p>
                                    <p><i class="fa-solid fa-pepper-hot"></i> <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}> Ingredients:</span> {recipe.ingredients}</p>
                                    <p><span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Follow these instructions:</span> {recipe.instructions}</p>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    )}
                    {recipes && recipes.length === 0 && !isLoading && (
                      <p style={{ color: 'red' }}>No recipes found. Please search for one.</p>
                    )}
                  </div>
                  <div className="col-md-6 order-md-2 order-1">
                    <img src={f18} className="img-fluid"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
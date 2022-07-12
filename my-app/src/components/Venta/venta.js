import { useEffect, useState } from 'react'
import {  httpGetAuthorization, httpPostAuthorization, httpGet} from "../../utils/httpFunctions";
import { useHistory } from "react-router-dom";
import Vivienda from '../Vivienda/vivienda'

const Venta = () => {
  const [productData, setProductData] = useState({})
  const [userData, setUserData] = useState({})
  const [name, setName] = useState([])
  const [category, setCategory] = useState([])
  const [description, setDescription] = useState([])
  const [price, setPrice] = useState([])
  const [features, setFeatures] = useState([])
  const [offerPercentage, setOfferPercentage] = useState([])
  const [filterProducts] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    httpGetAuthorization('api/me').then((res) => setUserData(res.data))
  }, [])



  useEffect(() => {
    httpGetAuthorization('api/product').then((res) => setProductData(res.data))
  }, [])



  const history = useHistory();

  const createProduct = (e) => {
    e.preventDefault()
    httpPostAuthorization('api/product/', { name: name, category: category, description: description, price: price, features: features, offerPercentage: offerPercentage ,
      "usuario": userData.id})
        .then(
            history.push('/')
        )
  }






  const fetchProducts = () => {
    httpGet('api/product/')
        .then((res) => setProducts(res.data))
  }


  useEffect(fetchProducts, [])


  let finalProducts;


  if (filterProducts) {
    finalProducts = products.filter((product) => {
      return product.usuario.username === userData.username;
    })
  } else {
    finalProducts = [];
  }





  return (
      <div className='login-screen-p'>
      <div className="container">

        <div className="row  mt-5">

          <div className="col-md-8 offset-md-2 bg-white shadow p-3 mb-5 bg-white rounded">
            <ul className="nav nav-tabs" id="myTab" role="tablist">

              <li className="nav-item" role="presentation">
                <button className="nav-link p-3" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                        role="tab" aria-controls="profile" aria-selected="false">Publicá tu Propiedad</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link p-3" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                        role="tab" aria-controls="contact" aria-selected="false">Tus Publicaciones</button>
              </li>
            </ul>


            <div className="tab-content" id="myTabContent">

              <form className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" onSubmit={createProduct}>
                <div className="row mt-5 mb-4 ">

                  <div className="col-10 offset-1">
                    <div className="form-group row mb-4">
                      <label for="codigo" className="col-4 col-md-3"> Direccion:</label>
                      <div className="col-8">
                        <input type="text" className="form-control border border-secondary" value={name}
                               onChange={(e) => setName(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group row mb-4">
                      <label for="codigo" className="col-4 col-md-3 "> Localidad:</label>
                      <div className="col-8">
                        <input type="text" className="form-control border border-secondary" value={category}
                               onChange={(e) => setCategory(e.target.value)} />
                      </div>
                    </div>

                    <div className="form-group row mb-4">
                      <label for="codigo" className="col-4 col-md-3"> Descripción:</label>
                      <div className="col-8">
                    <textarea type="text" className="form-control border border-secondary" value={description}
                              onChange={(e) => setDescription(e.target.value)}></textarea>
                      </div>
                    </div>

                    <div className="form-group row mb-4">
                      <label for="codigo" className="col-4 col-md-3"> Precio:</label>
                      <div className="col-8">
                        <input type="text" className="form-control border border-secondary" value={price}
                               onChange={(e) => setPrice(e.target.value)} />
                      </div>
                    </div>

                    <div className="form-group row mb-4">
                      <label for="codigo" className="col-4 col-md-3"> Descripción zona:</label>
                      <div className="col-8">
                    <textarea type="text" className="form-control border border-secondary" value={features}
                              onChange={(e) => setFeatures(e.target.value)}></textarea>
                      </div>
                    </div>


                    <div className="form-group row mb-4">
                      <label for="codigo" className="col-4 col-md-3"> Telefono </label>
                      <div className="col-8">
                        <input type="text" className="form-control border border-secondary" value={offerPercentage}
                               onChange={(e) => setOfferPercentage(e.target.value)} />
                      </div>
                    </div>


                    <div className="form-group text-center ">
                      <button type="submit" className="btn btn-primary m-2 ">Publicar Vivienda</button>
                      <button className="btn btn-danger m-2">Cancelar</button>
                    </div>
                  </div>
                </div>


              </form>
              <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                <div className="row mt-5 mb-4 ">

                  <h1>Tus Propiedades Publicadas</h1>
                  {
                    finalProducts.map((products) => {
                      return <Vivienda product={products} />;
                    })
                  }

                </div>


              </div>




            </div>
          </div>
        </div>
      </div>
      </div>


  );
};




export default Venta;
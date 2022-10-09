import React, { Component } from 'react'

// import ReactDOM from 'react-dom'; 
// import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.css';
// https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp
 

const NODE_SERVER_URL = 'http://localhost:3001'
const GET_PROFILE_DATA_ENDPOINT = `${NODE_SERVER_URL}/api/getProfileData`
const POST_PROFILE_DATA_ENDPOINT = `${NODE_SERVER_URL}/api/postProfileData`
const PRODUCT_DATA_ENDPOINT = 'https://dummyjson.com/products'



class App extends Component { 
  constructor(props){ 
    super(props)  
    // Set initial state 
    this.state = {  
	  	username: "",
		biogaphy: "",
		profile_url : "",
		image: '',
		products: []

	}  
    // Binding this keyword 
    this.handleFormSubmission = this.handleFormSubmission.bind(this) 
    this.handleInput = this.handleInput.bind(this) 
  } 
    

  componentDidMount() {

	// Expressjs API
    fetch(GET_PROFILE_DATA_ENDPOINT)
    .then((response) => response.json())
    .then(data => {
		console.log(data);
        this.setState({ 
			username: data.username ,
			biogaphy: data.biogaphy ,
			profile_url: data.profile_url , 
		 });
    });

	// 3rd part API for Products
    fetch(PRODUCT_DATA_ENDPOINT)
    .then((response) => response.json())
    .then(data => {
		this.setState( { ...this.state, products: data.products});
		console.log(this.state.products);

    });



}

  handleFormSubmission(){ 
	const formData = new FormData();  
	formData.append("firstName", 'some name');
	formData.append("username", `${this.state.username}`);
	formData.append("biogaphy", `${this.state.biogaphy}`);  
	formData.append('image', {
		uri: this.state.image,
		type: `image/png`,
		name: "image.png",
	});
	console.log(formData);
 
	// fetch(POST_PROFILE_DATA_ENDPOINT, {
    //     // cache: false,
    //     contentType: false,
    //     processData: false,
    //     data: formData,
    //     method: 'POST', 
	// 	body: formData
	// });
	
	// axios
	// .post(POST_PROFILE_DATA_ENDPOINT, formData)
	// .then((res) => {
	//   alert("File Upload success");
	// })
  } 




  handleInput(event) {
    const name = event.target.name;  
    const value = event.target.value;  
	if(name=='profile_url'){  
		this.setState({ 
			...this.state,
			image: event.target.files[0] , 
			profile_url: URL.createObjectURL(event.target.files[0]), 
	   
		});
	} 
	else{ 
		this.setState({ 
			  ...this.state,
			  [name]: value 
		  });
	}


    // const newState = {};
    // newState[name] = event.target.value;
    // this.setState(newState)
    // event.preventDefault();
  } 
  render(){ 

	const Submit = (e) => {
		e.preventDefault();  
	  };

    return ( 
		<>
		
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<a href="#" class="navbar-brand">
						<img src="https://animationvisarts.com/wp-content/uploads/2020/12/Amazon-current-Logo-2.jpg" height="40" alt="CoolBrand"/>
					</a>
					<button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarCollapse">
						<div class="navbar-nav">
							<a href="#" class="nav-item nav-link active">Brand Name</a> 
						</div>
						<div class="navbar-nav ms-auto">
							{/* <a href="#" class="nav-item nav-link">Login</a> */}
						</div>
					</div>
				</div>
			</nav>

		
      <div  class="mx-3">  

        <div class="row row-align">
			<div id="bg1" class=" ">
				<img class="logoMaxSize rounded-corners m-3" src={this.state.profile_url} width="300" height="300"/>
				<span class="txt1 mx-1">
					<h3>{this.state.username}</h3>
					<p>{this.state.biogaphy}</p>
				</span> 
          </div>
        </div>

		<br/>
		<div class="bg-secondary pt-2">  </div> 
		<br/>



		<div>
			<form onSubmit={Submit}>
					<div class="form-group">
						<label for="exampleInputEmail1">Email address</label>
						<input type="text"  class="form-control" id="username" name='username' onChange={this.handleInput} value={this.state.username} placeholder="Username"/> 
					</div>
					<div class="form-group">
						<label for="exampleInputPassword1">Biography</label>
						<textarea type="text" rows={5} class="form-control" id="biogaphy" name='biogaphy' onChange={this.handleInput} value={this.state.biogaphy} placeholder="Password"> </textarea>
					</div>


					<div class="form-group mt-3">
						<label for="profile_image">Profile Image</label>
						<input type="file" class="form-control-file" id="profile_image" accept="image/*" name='profile_url' onChange={this.handleInput} />
					</div>


					<br/> 

					<button   class="btn btn-primary" onClick={this.handleFormSubmission} >Submit Information</button>
			</form>
		</div>

		<br/>
		<div class="bg-secondary pt-2">  </div> 
		<br/> 
        

		<div class="container">
			<div class="row"> 
				{
					this.state.products.map(product=>{
					return	<div class="col-md-3" id={product.id}>
							<div class="ibox">
								<div class="ibox-content product-box">
									<div class="product-imitation">
										<img src={product.images[0]} width='150' height='150'></img>header
									</div>
									<div class="product-desc">
										<span class="product-price">
											${product.price}
										</span>
										<small class="text-muted">{product.category}</small>
										<a href="/" class="product-name"> {product.brand}</a>

										<div class="small m-t-xs">
											{product.description}
										</div>
										<div class="m-t text-righ">

											<a href="/" class="btn btn-xs btn-outline btn-primary">Info <i class="fa fa-long-arrow-right"></i> </a>
										</div>
									</div>
								</div>
							</div>
						</div>
					})
				}
   
  
    
			</div>
</div>
   
      </div> 
		</>

    ) 
  } 
} 
    
export default App;
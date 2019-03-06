import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
	return (
		<div>
			<div>
				<p className = 'f3'>
				{'This App will detect faces in your pictures :)  '} 
				</p>
			</div>
			<div className='center'>
			<div className = 'form center pa4 br3 shadow-5'>
				<input className = 'f4 pa2 w-70 center'type = 'tex' placeholder='Enter the link here..' onChange={onInputChange}/>
				<button className = 'w-30 grow f4 link ph3 pv2 white bg-light-purple'
				 		onClick={onButtonSubmit}>Detect</button>
			</div>
			</div>
			</div>
		);
	}

export default ImageLinkForm;
import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ( {facebox, imageUrl}) =>{

    const boundBox = facebox.map((user, index) => {
    	return <div className = 'bounding_box' style = {{top: facebox[index].top, right:facebox[index].right , bottom: facebox[index].bottom, left: facebox[index].left}}></div>
    })

	return(

		<div className= 'center ma'>
			<div className= 'absolute mt2'>
				<img id = 'inputImage'  src={imageUrl} style = {{ width: 'auto', height: '500px'}} />
				{boundBox}
			</div>
		</div>

		);
}

export default FaceRecognition;
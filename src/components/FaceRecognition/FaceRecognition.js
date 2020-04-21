import React from 'react';
import './FaceRecognition.css'

const FaceRecognitionComponent = ({imageUrl, box}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='annotated response' src={imageUrl} width='300px' height='auto'/>
                <div 
                    className='bounding-box' 
                    style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognitionComponent;
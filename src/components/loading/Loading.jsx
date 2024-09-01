import React from 'react'
import './loading.css'

const Loading = () => {
  return (
		<div className='loadingWrapper'>
			<span class="loader"></span>
            <div className='loadingTitle'>درحال بارگزاری اطلاعات ... </div>
		</div>
	);
}

export default Loading
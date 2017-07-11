import React from 'react'

const Contact = (props) => (
	<li className='contact-list-item'>
		<div className='contact-avatar' style={{backgroundImage:`url(${props.contact.avatarURL})`}}>
		</div>
		<div className='contact-details'>
			<p>{props.contact.name} </p>
			<p>{props.contact.email} </p>
		</div>
		<button className='contact-remove' onClick={()=>props.onDeleteContact(props.contact)}>Remove</button>
	</li>
)

export default Contact

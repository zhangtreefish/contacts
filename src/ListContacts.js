import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
	state = {query: ''}
	updateQuery = (val) => {
		this.setState({query: val})
	}

	render() {
		const { query } = this.state
		const { contacts, onDeleteContact } = this.props
		let showingContacts
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
		if(query) {
			showingContacts = contacts.filter(c => match.test(c.name))
		} else {
			showingContacts = contacts
		}
		showingContacts = showingContacts.sort(sortBy('name'))

	    return (
	    	<div className='list-contacts'>
	    	 	<div>
	    	 		<input
	    	 			className='search-contacts'
	    	 			type='text'
	    	 			value={query}
	    	 			onChange={(e)=> this.updateQuery(e.target.value)}
	    	 			placeholder='Filter Contacts' />
	    	 	</div>
			  	<ol className='contact-list'>
					{showingContacts.map(contact =>
						<li key={contact.id} className='contact-list-item'>
							<div className='contact-avatar' style={{backgroundImage:`url(${contact.avatarURL})`}}>
							</div>
							<div className='contact-details'>
								<p>{contact.name} </p>
								<p>{contact.email} </p>
							</div>
							<button className='contact-remove' onClick={()=>onDeleteContact(contact)}>Remove</button>
						</li>
					)}
			    </ol>
			</div>
		)
	}
}

ListContacts.propTypes = {
	contacts: PropTypes.array.isRequired,
	onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts

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
		let showingContacts
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
		if(this.state.query) {
			showingContacts = this.props.contacts.filter(c => match.test(c.name))
		} else {
			showingContacts = this.props.contacts
		}
		showingContacts = showingContacts.sort(sortBy('name'))

	    return (
	    	<div className='list-contacts'>
	    	 	<div>
	    	 		<input
	    	 			className='search-contacts'
	    	 			type='text'
	    	 			value={this.state.query}
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
							<button className='contact-remove' onClick={()=>this.props.onDeleteContact(contact)}>Remove</button>
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

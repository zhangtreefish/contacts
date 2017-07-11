import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Contact from './Contact'

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
		const clearFilter = () => this.setState({query:''})

	    return (
	    	<div className='list-contacts'>
	    	 	<div className='list-contacts-top'>
	    	 		<input
	    	 			className='search-contacts'
	    	 			type='text'
	    	 			value={query}
	    	 			onChange={(e)=> this.updateQuery(e.target.value)}
	    	 			placeholder='Filter Contacts'
    	 			/>
    	 			<Link
				    	to='/create'
				    	onClick={this.props.onClickCreate}
				    	className='add-contact'
				    > Create Contact</Link>
	    	 	</div>
	    	 	<div>
	    	 		<span>showing {showingContacts.length} of {contacts.length} contacts </span>
	    	 		{contacts.length !== showingContacts.length && (
	    	 			<div className='showing-contacts'>
	    	 				<button onClick={clearFilter}>Show All</button>
	    	 			</div>
	    	 		)}
	    	 	</div>
			  	<ol className='contact-list'>
					{showingContacts.map(contact =>
						<Contact
							key={contact.id}
							contact={contact}
							onDeleteContact={onDeleteContact}
						/>
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

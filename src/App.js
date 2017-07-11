import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/contactsAPI'
import CreateContact from './CreateContact'

class App extends Component {
  state = {
    contacts: []
   }

  componentDidMount() {
    ContactsAPI.getAll().then(contacts =>
        this.setState({contacts})
    )
  }

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id!==contact.id)
    }))
    ContactsAPI.remove(contact)
  }

  createContact = contact => {
    contact.id = contact.name
    ContactsAPI.create(contact).then(
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    )}

  render() {
    return (
      <div className="App">
        <Route path='/' exact render={()=> (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )} />
        <Route path='/create' render={({history}) => (
          <CreateContact
            onCreateContact={
              c => {
                this.createContact(c)
                history.push('/')
              }
            }
          />
        )} />
      </div>
    )
  }
}

export default App;

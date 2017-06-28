import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/contactsAPI'
import CreateContact from './CreateContact'

class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
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

  goToCreate = () => {
    this.setState({screen: 'create'})
  }

  render() {
    return (
      <div className="App">
        {this.state.screen === 'list' && (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            onClickCreate={this.goToCreate} />
        )}
        {this.state.screen === 'create' && (
          <CreateContact onClickList={()=>this.setState({screen:'list'})} />
        )}
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react'
import { embedCheckout } from '@bigcommerce/checkout-sdk'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      embeddedCheckoutUrl: "",
      pristine: true,
    }

    this.handleChange = this.handleChange.bind(this)
    this.loadCheckout = this.loadCheckout.bind(this)
  }

  handleChange(e) {
    this.setState({embeddedCheckoutUrl: e.target.value, pristine: false})
  }

  loadCheckout() {
     embedCheckout({
       containerId: 'bc-embedded-checkout',
       url: this.state.embeddedCheckoutUrl,
       styles: {
         button: {
           backgroundColor: "#34313f",
           borderColor: "#000000",
           color: "#FFFFFF"
         },
         text: {
           color: "#4e75f8"
         }
       },
       onComplete: event => alert(`complete!
     event:
     ${JSON.stringify(event, null, 2)}`),
       onError: event => alert(`error!
     event:
     ${JSON.stringify(event, null, 2)}`),
       onFrameError: event => alert(`frame error!
     event:
     ${JSON.stringify(event, null, 2)}`),
       onFrameLoad: event => alert(`loaded!
     event: 
     ${JSON.stringify(event, null, 2)}`),
       onSignOut: event => alert(`signed out!
     event: 
     ${JSON.stringify(event, null, 2)}`),
     })
    }

  render() {
    const urlIsValid = (url) => /https:\/\/.+\..+\/cart.php\?embedded=1&action=loadInCheckout&id=.+&token=.+/.test(url)


    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Embedded Checkout POC</h1>
          </div>
        </div>
        <div className="row">
        <div className="col-5">
          <div><label for="url">Enter Redirect URL</label></div>
          <div><input 
            name="url"
            type="text"
            value={this.state.embeddedCheckoutUrl}
            onChange={this.handleChange}
          /></div>
          <div><button 
            onClick={this.loadCheckout}
            disabled={!urlIsValid(this.state.embeddedCheckoutUrl)}>Load Checkout</button></div>
        {!this.state.pristine && !urlIsValid(this.state.embeddedCheckoutUrl)
          ? <div style={{color:"red"}}>Embedded Checkout URL doesn't look right</div>
          : null }
        </div>
          <div className="col-7">
            <div id="bc-embedded-checkout">
            </div>
          </div>
        </div>


      </div>
    )
  }
}

export default App

import Web3 from 'web3';
import Identicon from 'identicon.js';
import Staking from '../abis/staking.json';
import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Staking.networks[5777]
    if(networkData) {
      const staking = web3.eth.Contract(Staking.abi, networkData.address)
      this.setState({ staking })
      const stakeCount = await staking.methods.stakeCount().call()
      this.setState({ stakeCount })
      // Load Posts
      console.log(stakeCount)
      for (var i = 1; i <= stakeCount; i++) {
        const stake = await staking.methods.userAddr(i).call()
        console.log(stake);
        this.setState({
          stakes: [...this.state.stakes, stake]
        })
      }
      // Sort stakes. Show highest tipped posts first
      this.setState({ loading: false})
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      staking: null,
      postCount: 0,
      stakes: [],
      loading: true
    }

    this.createAmount = this.createAmount.bind(this)

  }

  async createAmount(amount) {
    this.setState({loading:true})
    console.log(parseInt(amount))
    await this.state.staking.methods.createStake(parseInt(amount))
    .send({ from : this.state.account})
    .once('receipt', (receipt) => {
      this.setState({loading:false})
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          const val = this.amount.value
          this.createAmount(val)
        }}>
          <input 
            id="amount"
            type="text"
            ref={(input) => {this.amount = input}}
            placeholder = "input amount"
            />
            <button type="submit">stake</button>
          </form>
      </div>
    );
  }
}

export default App;

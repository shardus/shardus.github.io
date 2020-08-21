const tokenAddress = '0x09617f6fd6cf8a71278ec86e23bbab29c04353a7'
const tokenSymbol = 'ULT'
const tokenDecimals = 18
const tokenImage = 'https://shardus.com/assets/img/logo.svg'

let wasAdded = false

async function addTokenToMetamask () {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    wasAdded = await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage // A string url of the token logo
        }
      }
    })

    if (wasAdded) {
      console.log('Thanks for your interest!')
    } else {
      console.log('Your loss!')
    }
  } catch (error) {
    console.log(error)
  }
}



/* global BigNumber, Web3, factoryABI, exchangeABI, tokenABI, ERC20_ABI, tokenDB, $ */

let UniswapConvertWidget = async function(config) {
    
    const ERC20_ABI=[{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_spender",type:"address"},{name:"_value",type:"uint256"}],name:"approve",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_from",type:"address"},{name:"_to",type:"address"},{name:"_value",type:"uint256"}],name:"transferFrom",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"decimals",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_value",type:"uint256"}],name:"transfer",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"},{name:"_spender",type:"address"}],name:"allowance",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{payable:!0,stateMutability:"payable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"owner",type:"address"},{indexed:!0,name:"spender",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Transfer",type:"event"}];
    const factoryABI = [{"name": "NewExchange", "inputs": [{"type": "address", "name": "token", "indexed": true}, {"type": "address", "name": "exchange", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "initializeFactory", "outputs": [], "inputs": [{"type": "address", "name": "template"}], "constant": false, "payable": false, "type": "function", "gas": 35725}, {"name": "createExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": false, "payable": false, "type": "function", "gas": 187911}, {"name": "getExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": true, "payable": false, "type": "function", "gas": 715}, {"name": "getToken", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "exchange"}], "constant": true, "payable": false, "type": "function", "gas": 745}, {"name": "getTokenWithId", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "uint256", "name": "token_id"}], "constant": true, "payable": false, "type": "function", "gas": 736}, {"name": "exchangeTemplate", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "tokenCount", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 663}];
    const tokenABI = [{"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "__init__", "outputs": [], "inputs": [{"type": "bytes32", "name": "_name"}, {"type": "bytes32", "name": "_symbol"}, {"type": "uint256", "name": "_decimals"}, {"type": "uint256", "name": "_supply"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "deposit", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function", "gas": 74279}, {"name": "withdraw", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 108706}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 543}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 745}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 74698}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110600}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 37888}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1025}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 723}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 753}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 783}];
    const exchangeABI = [{"name": "TokenPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "eth_sold", "indexed": true}, {"type": "uint256", "name": "tokens_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "EthPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "tokens_sold", "indexed": true}, {"type": "uint256", "name": "eth_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "setup", "outputs": [], "inputs": [{"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 175875}, {"name": "addLiquidity", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_liquidity"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 82605}, {"name": "removeLiquidity", "outputs": [{"type": "uint256", "name": "out"}, {"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "amount"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 116814}, {"name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function"}, {"name": "ethToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 12757}, {"name": "ethToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 12965}, {"name": "ethToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 50463}, {"name": "ethToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 50671}, {"name": "tokenToEthSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 47503}, {"name": "tokenToEthTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 47712}, {"name": "tokenToEthSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 50175}, {"name": "tokenToEthTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 50384}, {"name": "tokenToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51007}, {"name": "tokenToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51098}, {"name": "tokenToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 54928}, {"name": "tokenToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 55019}, {"name": "tokenToExchangeSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49342}, {"name": "tokenToExchangeTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49532}, {"name": "tokenToExchangeSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53233}, {"name": "tokenToExchangeTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53423}, {"name": "getEthToTokenInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5542}, {"name": "getEthToTokenOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6872}, {"name": "getTokenToEthInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5637}, {"name": "getTokenToEthOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6897}, {"name": "tokenAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1413}, {"name": "factoryAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 1645}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 75034}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110907}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 38769}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1925}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1623}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1653}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1683}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1713}]
    // let web3 = new Web3(Web3.givenProvider || 'wss://some.local-or-remote.node:8546');
    let web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws');
    
    let exchangeAddresses
    let tokenSymbols
    let tokenAddressess = {}
    let exchangeContracts = {}
    let tokenContracts = {}
    const ALLOWED_SLIPPAGE = 0.025;
    let mainToken = config.mainToken
    let tokenDB
    // get Token list
    $.getJSON(config.tokenListUrl)
        .done(data => {
            tokenDB = data
            init()
        })
    function initiateMetamask() {
        console.log("Requesting metamask...")
        if (!window.ethereum) {
            $('#noAccountModal').modal('show')
        }
        window.ethereum.enable()
    }
    function init() {
        // initiateMetamask()
        exchangeAddresses = tokenDB.exchangeAddresses
        tokenSymbols = Object.keys(exchangeAddresses)
        
        for (let i = 0; i < tokenSymbols.length; i += 1) {
            exchangeContracts[tokenSymbols[i]] = new web3.eth.Contract(exchangeABI, exchangeAddresses[tokenSymbols[i]])
        }
        
        tokenSymbols.forEach(async token => {
            const contract = exchangeContracts[token]
            tokenAddressess[token] = await contract.methods.tokenAddress().call()
            tokenContracts[token] = new web3.eth.Contract(tokenABI, tokenAddressess[token])
        })
        drawUI(config)
        
        $('#convert-btn').on('click', async function(e) {
            let isUserLoggedIn = await isLoggedIn()
            if (!isUserLoggedIn) {
                $('#swapModal').modal('hide')
                $('#noAccountModal').modal('show')
            }
            else {
                const accounts = await web3.eth.getAccounts()
                let inputCurrency = $('#inputCurrency').val()
                let inputValue = $('#inputValue').val()
                let balance = await getAccountBalance(inputCurrency, accounts[0])
                if (parseFloat(inputValue) > parseFloat(balance)) {
                    alert(`Your wallet does not have enough ${inputCurrency} to create this transaction`)
                    return
                }
                let data = {}
                $('#uniswap-form')
                    .serializeArray()
                    .forEach(input => {
                        data[input.name]= input.value
                    })
                $('.alert').hide()
                $('.alert-check').show()
                $(this).attr('disabled', true)
                try {
                    swap(data)
                } catch(e) {
                    alert('Network Error. Please try again')
                    $('#convert-btn').attr('disabled', false)
                    $('.alert').hide()
                }
            }
        })
        
        $('#unlock-token-btn').on('click', async e => {
            e.preventDefault()
            $('#swapModal').modal('hide')
            $('#approvalModal').modal('show')
            const inputCurrency = $('#inputCurrency').val()
            const inputValue = $('#inputValue').val()
            const minimumAmount = parseFloat(inputValue) + parseFloat(inputValue * 0.1)
            $('#approvalModal label span').text(`${minimumAmount} ${inputCurrency}`)
            $('#approvalModal label span').attr('minimumAmount', minimumAmount)
            $('#approvalModal input[type=text]').val(minimumAmount)
        })
        
        async function estimateGasPrice (from, value, inputCurrency, outputCurrency) {
            console.log(inputCurrency, outputCurrency)
            let gas
            let amount = new BigNumber(value * Math.pow(10, 18))

            if (inputCurrency === 'ETH' && outputCurrency === 'ULT' || inputCurrency === 'ULT' && outputCurrency === 'ETH') {
                console.log(`ETH to ULT or ULT to ETH`)
                let exchange = exchangeAddresses['ULT']
                gas = await web3.eth.estimateGas({
                    from: from,
                    to: exchange,
                    value: amount
                })
            } else {
                console.log(`TOKEN to ULT or ULT to TOKEN`)
                let exchange1 = exchangeAddresses[inputCurrency]
                let exchange2 = exchangeAddresses[outputCurrency]
                let gas1 = await web3.eth.estimateGas({
                    from: from,
                    to: exchange1,
                    value: amount
                })
                let gas2 = await web3.eth.estimateGas({
                    from: from,
                    to: exchange2,
                    value: amount
                })
                gas = gas1 + gas2
            }
            let gas_price_network = await web3.eth.getGasPrice()
            gas_price_network = parseInt(gas_price_network) / Math.pow(10, 9)
            let cost = ((1.6 * gas * gas_price_network) * 1000000000) / Math.pow(10, 18)
            console.log(`Estimated Gas is ${gas} WEI`)
            console.log(`gas price from network: ${gas_price_network} GWEI`)
            console.log(`Tx Cost is ${cost} ETH`)
            return cost
        }
        
        $('#max-btn').on('click', async e => {
            e.preventDefault()
            const accounts = await web3.eth.getAccounts()
            let inputCurrency = $('#inputCurrency').val()
            let outputCurrency = $('#outputCurrency').val()
            let balance = await getAccountBalance(inputCurrency, accounts[0])
            
            // estimate gas and substrat from input amount
            let estimatedGas = await estimateGasPrice(accounts[0], balance, inputCurrency, outputCurrency)
            let availableAmount
            if (inputCurrency === 'ETH') availableAmount = balance - estimatedGas // in ETH unit
            else availableAmount = balance
            
            let inputValue = $('#inputValue').val(availableAmount)
            updateInputOutput('input')
        })
        
        $('#approve-btn').on('click', async e => {
            e.preventDefault()
            const accounts = await web3.eth.getAccounts()
            const inputCurrency = $('#inputCurrency').val()
            const approvedAmount = $('#approvalModal input[type=text]').val()
            const minimumAmount = $('#approvalModal label span').attr('minimumAmount')
            if(approvedAmount < minimumAmount) {
                alert('Approve amount cannot be less than minimum amount')
                $('#approvalModal input[type=text]').val(minimumAmount)
                return
            }
            $('#approvalModal').modal('hide')
            renderSwapModal('buy')
            await unlockToken(inputCurrency, accounts[0], approvedAmount)
        })
        
        $('#sell-btn, #buy-btn').on('click', async e => {
            e.stopPropagation()
            initiateMetamask()
            let isUserLoggedIn = await isLoggedIn()
            if (!isUserLoggedIn) {
                $('#noAccountModal').modal('show')
            }
            else {
                let action = $(e.target).attr('data-action')
                console.log(action)
                renderSwapModal(action)
            }
        })
        
        $('.pay-group .dropdown-menu .dropdown-item').on('click', async function(e) {
            e.preventDefault()
            const selectedToken = this.getAttribute('token-name')
            $('#inputCurrency').val(selectedToken)
            $('#input-select-btn').text(selectedToken)
            updateInputOutput('input')
        })
        
        $('.receive-group .dropdown-menu .dropdown-item').on('click', function(e) {
            e.preventDefault()
            const selectedToken = this.getAttribute('token-name')
            $('#outputCurrency').val(selectedToken)
            $('#output-select-btn').text(selectedToken)
            updateInputOutput('input')
        })
        
        $('#inputValue').on('change keydown paste input', () => {
            updateInputOutput('input')
        })
        
        $('#outputValue').on('change keydown paste input', () => {
            updateInputOutput('output')
        })
    }
    
    async function isLoggedIn() {
        let accounts
        try {
            accounts = await web3.eth.getAccounts()
        } catch(e) {
            console.log(e)
            console.log('Cannot get wallet account. Please log in')
            return false
        }
        if(accounts && accounts.length > 0) return true
        else return false
    }
    
    function renderSwapModal (action = 'buy') {
          $('#swapModal').modal('show')
          let modal = $('#swapModal')
          if (action === 'buy') modal.find('.modal-title').text('Buy ULT using ETH or ERC20 Tokens')
          else if (action === 'sell') modal.find('.modal-title').text('Sell ULT to receive ETH or ERC20 Tokens')
          modal.find('.modal-body input').val('')
          if (action === 'buy') {
              $('.pay-group .dropdown-toggle').attr('disabled', false)
              $('.receive-group .dropdown-toggle').attr('disabled', true)
              $('#inputCurrency').val('ETH')
              $('#outputCurrency').val(mainToken.symbol)
              $('#input-select-btn').text('ETH')
              $('#output-select-btn').text(mainToken.symbol)
              $('#convert-btn').text('BUY')
          } else if (action === 'sell') {
              $('.pay-group .dropdown-toggle').attr('disabled', true)
              $('.receive-group .dropdown-toggle').attr('disabled', false)
              $('#inputCurrency').val(mainToken.symbol)
              $('#outputCurrency').val('ETH')
              $('#input-select-btn').text(mainToken.symbol)
              $('#output-select-btn').text('ETH')
              $('#convert-btn').text('SELL')
          }
          $('.alert').hide()
    }
    
    // function list
    function getSwapType(inputCurrency, outputCurrency) {
        if (inputCurrency !== 'ETH' && outputCurrency === 'ETH') return 'TOKEN_TO_ETH'
        else if (inputCurrency === 'ETH' && outputCurrency !== 'ETH') return 'ETH_TO_TOKEN'
        else if (inputCurrency !== 'ETH' && outputCurrency !== 'ETH') return 'TOKEN_TO_TOKEN'
    }
    
    async function swap (data) {
        let { inputValue, inputCurrency, outputValue, outputCurrency } = data
        let type = getSwapType(inputCurrency, outputCurrency)
        
        const blockNumber = await web3.eth.getBlockNumber()
        const block = await web3.eth.getBlock(blockNumber)
        const deadline =  block.timestamp + 300;
        const accounts = await web3.eth.getAccounts()
        let exchangeContract
        if (type === 'ETH_TO_TOKEN') {
            exchangeContract = exchangeContracts[outputCurrency]
            // const min_token = new BigNumber(outputValue).multipliedBy(10 ** 18).multipliedBy(1 - ALLOWED_SLIPPAGE).toFixed(0)
            const min_token = new BigNumber(outputValue).minus(1).multipliedBy(10 ** 18).toFixed(0)
            console.log(`Minimum required token is: ${min_token} ${outputCurrency}`)
            const amount = new BigNumber(inputValue).multipliedBy(10 ** 18).toFixed(0)
            
            exchangeContract.methods.ethToTokenSwapInput(min_token,deadline)
                .send({from: accounts[0], value: amount}, (err, data) => {
                    if (err) console.log(err)
                    else {
                        console.log(`TxId is ${JSON.stringify(data)}`)
                        const txUrl = `https://etherscan.io/tx/${data}`
                        $('.alert').hide()
                        $('#swapModal').modal('hide')
                        $('#submittedModal').modal('show')
                        $('#txUrl').attr('href', txUrl)
                        postTxHashToServer(data)
                    }
                })
        } else if (type === 'TOKEN_TO_ETH') {
            exchangeContract = exchangeContracts[inputCurrency]
            const tokenSold = new BigNumber(inputValue).multipliedBy(10 ** 18).toFixed(0)
            // const minEth = new BigNumber(outputValue).multipliedBy(10 ** 18).multipliedBy(1 - ALLOWED_SLIPPAGE).toFixed(0)
            const exchangeRate = parseFloat(outputValue / inputValue)
            const minEth = new BigNumber(outputValue).minus(exchangeRate).multipliedBy(10 ** 18).toFixed(0)
            console.log(`Minimum required ETH is: ${minEth/Math.pow(10,18)} ${outputCurrency}`)
            
            exchangeContract.methods.tokenToEthSwapInput(tokenSold, minEth, deadline)
                .send({ from: accounts[0] }, (err, data) => {
                  if (err) {
                      alert('Transaction is not submitted')
                      $('#convert-btn').attr('disabled', false)
                      $('.alert').hide()
                  }
                  else {
                    console.log(`TxId is ${JSON.stringify(data)}`)
                    const txUrl = `https://etherscan.io/tx/${data}`
                    $('.alert').hide()
                    $('#swapModal').modal('hide')
                    $('#submittedModal').modal('show')
                    $('#txUrl').attr('href', txUrl)
                    postTxHashToServer(data)
                  }
                })
        } else if (type === 'TOKEN_TO_TOKEN') {
            exchangeContract = exchangeContracts[inputCurrency]
            const tokenSold = new BigNumber(inputValue).multipliedBy(10 ** 18).toFixed(0)
            // const minToken = new BigNumber(outputValue).multipliedBy(10 ** 18).multipliedBy(1 - ALLOWED_SLIPPAGE).toFixed(0)
            let exchangeRate
            let minToken
            if (inputCurrency === config.mainToken.symbol) {
                exchangeRate = parseFloat(outputValue / inputValue)
                minToken = new BigNumber(outputValue).minus(exchangeRate).multipliedBy(10 ** 18).toFixed(0)
            } else if (outputCurrency === config.mainToken.symbol) {
                minToken = new BigNumber(outputValue).minus(1).multipliedBy(10 ** 18).toFixed(0)
            }
            const minEth = new BigNumber(1).toFixed(0)
            const outputTokenAddress = tokenAddressess[outputCurrency]
            console.log(`Minimum required token is: ${minToken/Math.pow(10,18)} ${outputCurrency}`)
            
            exchangeContract.methods.tokenToTokenSwapInput(
                tokenSold,
                minToken,
                minEth,
                deadline,
                outputTokenAddress
            ).send({ from: accounts[0] }, (err, data) => {
                  if (err) console.log(err)
                  else {
                    console.log(`TxId is ${JSON.stringify(data)}`)
                    const txUrl = `https://etherscan.io/tx/${data}`
                    $('.alert').hide()
                    $('#swapModal').modal('hide')
                    $('#submittedModal').modal('show')
                    $('#txUrl').attr('href', txUrl)
                    postTxHashToServer(data)
                  }
                })
        }
    }
    
    async function postTxHashToServer(txHash) {
        console.log(`txHash is ${txHash}`)
        const receiptUrl = `${config.chartServerUrl}/uniswap/receipt`
        const response = await axios.post(receiptUrl, {txHash})
        console.log(response)
    }
    
    async function unlockToken(currency, account, approvedAmount) {
        $('.alert').hide()
        $('.alert-wait').show()
        const inputCurrency = currency
        const amount = new BigNumber(approvedAmount).multipliedBy(10 ** 18).toFixed(0)
        
        const tokenAddress = tokenAddressess[currency]
        const exchangeAddress = exchangeAddresses[currency]
        const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress)
        try {
            await contract.methods.approve(exchangeAddress, amount).send({ from: account })
        } catch(e) {
            alert('Approval Transaction is not submitted. Please try again.')
            $('#convert-btn').attr('disabled', false)
            $('.alert').hide()
            return
        }
        
        // check the allowance
        const check = setInterval(async () => {
            const allowance = await getAllowance(inputCurrency, approvedAmount)
            const input = approvedAmount * Math.pow(10, 18)
            if (allowance >= input) {
                clearInterval(check)
                hideUnlockButton()
                $('.alert').hide()
                $('.alert-wait').hide()
                $('.alert-approved').show()
                $('#swapModal').modal('hide')
                alert(`Your approval to spend ${approvedAmount} ${inputCurrency} is successfully confirmed ! You can submit transaction now.`)
            }
        }, 1000)
    }
    
    async function getAccountBalance(currency, address) {
        let balance
        if (currency === 'ETH') {
            balance = await web3.eth.getBalance(address)
        } else {
            balance = await tokenContracts[currency].methods.balanceOf(address).call()
        }
        return new BigNumber(balance).dividedBy(10 ** 18).toFixed(18)
    }
    
   function getULTToUSDPrice () {
        return new Promise((resolve, reject) => {
                $.get(`${config.chartServerUrl}/histohour?limit=1`, function(data) {
                    if (data.transactions && data.transactions.length > 0) {
                        resolve(data.transactions[0].close)
                    }
                })
        })
    }
    
    function getULTToETHPrice () {
        return new Promise((resolve, reject) => {
                $.get(`${config.chartServerUrl}/histohour`, function(data) {
                    if (data.transactions && data.transactions.length > 0) {
                        let lastTx
                        for (let i = data.transactions.length - 1; i >= 0; i--) {
                            if (data.transactions[i].amount_eth > 0) {
                                lastTx = data.transactions[i]
                                break
                            }
                        }
                        // console.log(lastTx)
                        let { amount_eth, amount_ult } = lastTx
                        let price = amount_eth / amount_ult
                        resolve(price)
                    }
                })
        })
    }
    
    async function getChartPrices(type) {
        if (type === 'ULT-USD') {
            let unitPrice = await getULTToUSDPrice()
            // console.log(`ULT - USD price is ${unitPrice}`)
            return unitPrice
        } if (type === 'ULT-ETH') {
            let unitPrice = await getULTToETHPrice()
            // console.log(`ULT - ETH price is ${unitPrice}`)
            return unitPrice
        }
    }
    
    async function calcuateInputOutput(inputCurrency, outputCurrency, inputType, value) {
        const swapType = getSwapType(inputCurrency, outputCurrency)
    
        if (swapType === 'ETH_TO_TOKEN') {
            let tokenExchangeAddress = exchangeAddresses[outputCurrency]
            let tokenContract = tokenContracts[outputCurrency]
            if (inputType === 'EXACT_INPUT') {
                let inputAmount = new BigNumber(value).multipliedBy(10 ** 18)
                let inputReserve = await web3.eth.getBalance(tokenExchangeAddress)
                let outputReserve = await tokenContract.methods.balanceOf(tokenExchangeAddress).call()
                
                inputReserve = new BigNumber(inputReserve)
                outputReserve = new BigNumber(outputReserve)
                /*
                numerator = inputAmount * outputReserve * 997
                denominator = inputReserve * 1000 + inputAmount * 997
                outputAmount = numerator / denominator
                */
                let numerator = inputAmount.multipliedBy(outputReserve).multipliedBy(997)
                let denominator = (inputReserve.multipliedBy(1000)).plus(inputAmount.multipliedBy(997))
                const outputAmount = numerator.dividedBy(denominator).dividedBy(10 ** 18)
                return outputAmount
            } else if (inputType === 'EXACT_OUTPUT') {
                let outputAmount = new BigNumber(value).multipliedBy(10 ** 18)
                let inputReserve = await web3.eth.getBalance(tokenExchangeAddress)
                let outputReserve = await tokenContract.methods.balanceOf(tokenExchangeAddress).call()
                
                inputReserve = new BigNumber(inputReserve)
                outputReserve = new BigNumber(outputReserve)
                /*
                numerator = outputAmount * inputReserve * 1000
                denominator = (outputReserve - outputAmount) * 997
                inputAmount = numerator / (denominator + 1) 
                */
                let numerator = outputAmount.multipliedBy(inputReserve).multipliedBy(1000)
                let denominator = (outputReserve.minus(outputAmount)).multipliedBy(997)
                let inputAmount = numerator.dividedBy(denominator.plus(1)).dividedBy(10 ** 18)
                return inputAmount
            }
        } else if (swapType === 'TOKEN_TO_ETH') {
            let tokenExchangeAddress = exchangeAddresses[inputCurrency]
            let tokenContract = tokenContracts[inputCurrency]
            if (inputType === 'EXACT_INPUT') {
                
                let inputAmount = new BigNumber(value).multipliedBy(10 ** 18)
                let inputReserve = await tokenContract.methods.balanceOf(tokenExchangeAddress).call()
                let outputReserve = await web3.eth.getBalance(tokenExchangeAddress)
                
                inputReserve = new BigNumber(inputReserve)
                outputReserve = new BigNumber(outputReserve)
                /*
                numerator = inputAmount * outputReserve * 997
                denominator = inputReserve * 1000 + inputAmount * 997
                outputAmount = numerator / denominator
                */
                let numerator = inputAmount.multipliedBy(outputReserve).multipliedBy(997)
                let denominator = (inputReserve.multipliedBy(1000)).plus(inputAmount.multipliedBy(997))
                let outputAmount = numerator.dividedBy(denominator).dividedBy(10 ** 18)
                return outputAmount
            } else if (inputType === 'EXACT_OUTPUT') {
                let outputAmount = new BigNumber(value).multipliedBy(10 ** 18)
                let inputReserve = await tokenContract.methods.balanceOf(tokenExchangeAddress).call()
                let outputReserve = await web3.eth.getBalance(tokenExchangeAddress)
                
                inputReserve = new BigNumber(inputReserve)
                outputReserve = new BigNumber(outputReserve)
                /*
                numerator = outputAmount * inputReserve * 1000
                denominator = (outputReserve - outputAmount) * 997
                inputAmount = numerator / (denominator + 1)
                */
                let numerator = outputAmount.multipliedBy(inputReserve).multipliedBy(1000)
                let denominator = (outputReserve.minus(outputAmount)).multipliedBy(997)
                let inputAmount = numerator.dividedBy(denominator.plus(1)).dividedBy(10 ** 18)
                return inputAmount
            }
        } else if (swapType === 'TOKEN_TO_TOKEN') {
            console.log(inputCurrency, outputCurrency, inputType)
            let tokenContractA = tokenContracts[inputCurrency]
            let exchangeAddressA = exchangeAddresses[inputCurrency]
            let tokenContractB = tokenContracts[outputCurrency]
            let exchangeAddressB = exchangeAddresses[outputCurrency]
            if (inputType === 'EXACT_INPUT') {
                let inputAmountA = new BigNumber(value).multipliedBy(10 ** 18)
                // TokenA (ERC20) to ETH conversion
                let inputReserveA = await tokenContractA.methods.balanceOf(exchangeAddressA).call()
                let outputReserveA = await web3.eth.getBalance(exchangeAddressA)
                inputReserveA = new BigNumber(inputReserveA)
                outputReserveA = new BigNumber(outputReserveA)
        
                // let numeratorA = inputAmountA * outputReserveA * 997
                // let denominatorA = inputReserveA * 1000 + inputAmountA * 997
                // let outputAmountA = numeratorA / denominatorA
                let numeratorA = inputAmountA.multipliedBy(outputReserveA).multipliedBy(997)
                let denominatorA = (inputReserveA.multipliedBy(1000)).plus(inputAmountA * 997)
                let outputAmountA = numeratorA.dividedBy(denominatorA)
    
                // ETH to TokenB conversion 
                let inputAmountB = outputAmountA    
                let inputReserveB = await web3.eth.getBalance(exchangeAddressB)
                let outputReserveB = await tokenContractB.methods.balanceOf(exchangeAddressB).call()
                inputReserveB = new BigNumber(inputReserveB)
                outputReserveB = new BigNumber(outputReserveB)
        
                // let numeratorB = inputAmountB * outputReserveB * 997
                // let denominatorB = inputReserveB * 1000 + inputAmountB * 997
                // let outputAmountB = numeratorB / denominatorB
                let numeratorB = inputAmountB.multipliedBy(outputReserveB).multipliedBy(997)
                let denominatorB = (inputReserveB.multipliedBy(1000)).plus(inputAmountB.multipliedBy(997))
                let outputAmountB = numeratorB.dividedBy(denominatorB).dividedBy(10 ** 18)
                return outputAmountB
            } else if (inputType === 'EXACT_OUTPUT') {
                // Buy TokenB with ETH
                let outputAmountB = new BigNumber(value).multipliedBy(10 ** 18)
                let inputReserveB = await web3.eth.getBalance(exchangeAddressB)
                let outputReserveB = await tokenContractB.methods.balanceOf(exchangeAddressB).call()
                inputReserveB = new BigNumber(inputReserveB)
                outputReserveB = new BigNumber(outputReserveB)
    
                // let numeratorB = outputAmountB * inputReserveB * 1000
                // let denominatorB = (outputReserveB - outputAmountB) * 997
                // let inputAmountB = numeratorB / (denominatorB + 1)
                let numeratorB = outputAmountB.multipliedBy(inputReserveB).multipliedBy(1000)
                let denominatorB = (outputReserveB.minus(outputAmountB)).multipliedBy(997)
                let inputAmountB = numeratorB.dividedBy(denominatorB.plus(1))
                // Buy ETH with TokenA
                let outputAmountA = inputAmountB
                let inputReserveA = await tokenContractA.methods.balanceOf(exchangeAddressA).call()
                let outputReserveA = await web3.eth.getBalance(exchangeAddressA)
                inputReserveA = new BigNumber(inputReserveA)
                outputReserveA = new BigNumber(outputReserveA)
    
                // let numeratorA = outputAmountA * inputReserveA * 1000
                // let denominatorA = (outputReserveA - outputAmountA) * 997
                // let inputAmountA = numeratorA / (denominatorA + 1)
                let numeratorA = outputAmountA.multipliedBy(inputReserveA).multipliedBy(1000)
                let denominatorA = (outputReserveA.minus(outputAmountA)).multipliedBy(997)
                let inputAmountA = numeratorA.dividedBy(denominatorA.plus(1)).dividedBy(10 ** 18)
                return inputAmountA
            }
        }
    }
    
    function drawUI(config) {
        
        const baseWidgetTemplate = `
        <h3 id="widget-title"></h3>
        <div class="row">
            <div class="col-md-3 logo-container">
                <img class="shardus-logo" src="${config.logoUrl}" alt="shardus-logo">
                <span>${config.mainToken.symbol}</span>
            </div>
            <div class="col-md-3">
                <h5>Current Price</h5>
                <p id="ULT-price-dai">--</p>
                <p id="ULT-price-eth">--</p>
            </div>
            
            <div class="col-md-3">
                <h5>Price Chart</h5>
                <div class="chart-column">
                <a href="${config.chartUrl}" target="_blank"><i class="fas fa-chart-line fa-3x"></i></a>
                </div>
            </div>
            
            <div class="col-md-3">
                <div>
                    <p id="uniswap-link">Powered By <a href="https://uniswap.exchange" target="_blank">Uniswap</a></p>
                </div>
                <div class="buy-sell-button-container">
                    <button type="button" class="btn btn-primary" data-target="#swapModal" data-toggle="modal" data-action="buy" id="buy-btn">Buy</button>
                    <button type="button" class="btn btn-primary" data-target="#swapModal" data-toggle="modal" data-action="sell" id="sell-btn">Sell</button>
                </div>
                <div class="modal fade" id="swapModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Convert ULT using ETH or ERC20 TOkens</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                          <div class="alert alert-warning alert-dismissible alert-unlock hide" role="alert">
                              Please unlock your token to allow Metamask wallet to spend
                              <a class="btn" id="unlock-token-btn">Unlock</a>
                          </div>
                          <div class="alert alert-primary alert-dismissible alert-wait hide" role="alert">
                              Please submit your approval transaction and wait a few seconds. We will check if your submitted approval transaction is confirmed on <strong>Ethereum Network</strong>
                          </div>
                          <div class="alert alert-success alert-dismissible alert-approved hide" role="alert">
                              Your approval to spend token is successfully confirmed !
                          </div>
                          <div class="alert alert-info alert-dismissible alert-check hide" role="alert">
                              Check your wallet to Confirm or Cancel the transaction
                          </div>
                          <div class="alert alert-success alert-dismissible alert-submitted hide" role="alert">
                              Transaction submitted.
                          </div>
                          <div class="alert alert-warning alert-dismissible alert-high-slippage hide" role="alert">
                              Please reduce the amount so that the <strong>slippage</strong> is less than 10%
                          </div>
                        <form id="uniswap-form">
                          <div class="form-group pay-group">
                            <label class="col-form-label">PAY WITH</label>
                            <div class="input-group">
                              <input type="text" class="form-control" aria-label="inputValue" id="inputValue" name="inputValue">
                              <input type="hidden" class="form-control" aria-label="inputCurrency" id="inputCurrency" name="inputCurrency">
                              <div class="input-group-append">
                                <button class="btn btn-outline-dark" id="max-btn">Max</button>
                                <button type="button" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="input-select-btn">ETH</button>
                                <div class="dropdown-menu">
                                  <a class="dropdown-item" token-name="ULT" href="#">ULT</a>
                                  <a class="dropdown-item" token-name="ETH" href="#">ETH</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="form-group receive-group">
                            <label class="col-form-label">RECEIVE</label>
                            <div class="input-group">
                              <input type="text" class="form-control" aria-label="outputValue" id="outputValue" name="outputValue">
                              <input type="hidden" class="form-control" aria-label="outputCurrency" id="outputCurrency" name="outputCurrency">
                              <div class="input-group-append">
                                <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="output-select-btn">ULT</button>
                                <div class="dropdown-menu">
                                  <a class="dropdown-item" token-name="ULT" href="#">ULT</a>
                                  <a class="dropdown-item" token-name="ETH" href="#">ETH</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <div class="row">
                            <div class="col-md-5" id="exchange-info">
                                <div><strong>Rate</strong></div>
                                <div>
                                    <p class="dai-rate">1 ULT = <span class="unit-ult-dai">0.01</span> DAI</p>
                                    <p class="eth-rate">1 ULT = <span class="unit-ult-eth">0.00083</span> ETH</p>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <p><strong>Slippage</strong></p>
                                <p id="slippage">2.5 %</p>
                            </div>
                            <div class="col-md-5">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" id="convert-btn" class="btn btn-primary">Convert</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!--No Account modal-->
                <div class="modal fade" tabindex="-1" role="dialog" id="noAccountModal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">No Metamask Wallet Found</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <p>Please login to Metamask Wallet to buy and sell ULT tokens. If you don't have a Metamask wallelt account, you can create one from <a href="https://metamask.io/">metamask.io/</a></p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                
                <!--submitted modal-->
                <div class="modal fade" tabindex="-1" role="dialog" id="submittedModal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Transaction Submitted</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <p>Your transaction is successfully submitted to Ethereum Network. Click link below to view your transaction on etherscan.io</p>
                        <a id="txUrl" target="_blank" rel="noopener noreferrer" href="https://etherscan.io/tx/0x7b51443ce4803bd4b8fa1f5b9f20af4b64f4ff1856d2e63b851a15bec1b9cb3e">View tx on etherscan.io</a>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <!-- Approval Modal -->
        <div class="modal fade" id="approvalModal" tabindex="-1" role="dialog" aria-labelledby="approvalModal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Unlock Your Token</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                 <p>Please unlock your token to allow Metamask Wallet to spend. Minimum allowance is <strong>input amount to convert + extra 10% </strong>. If you intend to convert more tokens in the future, please fill in higer allowance so that you can avoid extra gas fees caused by future approval transactions</p>
                 <form>
                  <div class="form-group">
                    <label for="approved-amount" class="col-form-label">Approved Amount : <span>0.123 DAI</span> (mininum)</label>
                    <input type="text" class="form-control" id="approved-amount">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="approve-btn">Approve</button>
              </div>
            </div>
          </div>
        </div>
        `
        
        $('#uniswap-convert-section').html(baseWidgetTemplate)
        $('#widget-title').html(config.widgetTitle)
        
        let selectHTML = `<a class="dropdown-item" token-name="ETH" href="#">ETH</a>`
        for (let i = 0; i < tokenSymbols.length; i += 1) {
            selectHTML += `<a class="dropdown-item" token-name="${tokenSymbols[i]}" href="#">${tokenSymbols[i]}</a>`
        }
        $('#uniswap-form .dropdown-menu').html(selectHTML)
        setTimeout(() => {
            updateULTPrice(mainToken.symbol)
            setInterval(() => {
                updateULTPrice(mainToken.symbol)
            }, 60000)
        }, 3000)
    }
    
    async function calculateULTPrice(inputCurrency, outptCurrency, inputValue) {
        let price = await calcuateInputOutput(inputCurrency, outptCurrency, 'EXACT_INPUT', inputValue)
        return price
    }
    
    async function updateULTPrice(inputCurrency) {
        // calculateULTPrice(inputCurrency, 'DAI', 1).then(price => {
        //     let inputValue = $('#inputValue').val()
        //     let outputValue = $('#outputValue').val()
        //     if(inputValue === '' && outputValue==='') $('#exchange-info .dai-rate').html(`1 ULT = ${price.toFixed(6)} DAI`)
        //     console.log('ULT-DAI price is updated')
        // })
        // calculateULTPrice(inputCurrency, 'ETH', 1).then(price => {
        //     let inputValue = $('#inputValue').val()
        //     let outputValue = $('#outputValue').val()
        //     if(inputValue === '' && outputValue === '') $('#exchange-info .eth-rate').html(`1 ULT = ${price.toFixed(6)} ETH`)
        //     console.log('ULT-ETH price is updated')
        // })
        
        let price_ult_usd = await getChartPrices('ULT-USD')
        let price_ult_eth = await getChartPrices('ULT-ETH')
        $('#ULT-price-dai').html(`<strong>${price_ult_usd.toFixed(6)}</strong> $`)
        $('#ULT-price-eth').html(`<strong>${price_ult_eth.toFixed(6)}</strong> ETH`)
        
        let inputValue = $('#inputValue').val()
        let outputValue = $('#outputValue').val()
        if(inputValue === '' && outputValue==='') {
            $('#exchange-info .dai-rate').html(`1 ULT = ${price_ult_usd.toFixed(6)} DAI`)
            $('#exchange-info .eth-rate').html(`1 ULT = ${price_ult_eth.toFixed(6)} ETH`)
            console.log('ULT-DAI price is updated')
        }
    }
    
    async function renderUnlockButton(inputCurrency, inputValue) {
        if (inputCurrency === 'ETH' || !inputValue || inputValue == 0) hideUnlockButton()
        else {
            const allowance = await getAllowance(inputCurrency, inputValue)
            const input = inputValue * Math.pow(10, 18)
            if (input > allowance) displayUnlockButton()
            else hideUnlockButton()
        }
    }
    
    async function getAllowance(inputCurrency, inputValue) {
        try {
            let exchangeAddress = exchangeAddresses[inputCurrency]
            let tokenAddress = tokenAddressess[inputCurrency]
            const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress)
            const accounts = await web3.eth.getAccounts()
            let allowance = await contract.methods.allowance(
                accounts[0],
                exchangeAddress
            ).call()
            return allowance
        } catch (e) {
            console.log(e)
            console.log('Cannot get token allowance value !')
        }
    }
    
    function displayUnlockButton() {
        $('#convert-btn').attr('disabled', true)
        $('.alert').hide()
        $('.alert-unlock').show()
        $('#unlock-token-btn').css('display', 'inline-block')
    }
    
    function hideUnlockButton() {
        $('#unlock-token-btn').css('display', 'none')
        $('#convert-btn').attr('disabled', false)
        $('.alert').hide()
    }
    
    function checkSlippage(slippage, inputCurrency, inputValue) {
        if (slippage >= 10) {
            $('#convert-btn').attr('disabled', true)
            $('.alert').hide()
            $('.alert-high-slippage').show()
        } else {
            let isDisabled = $('#convert-btn').attr('disabled')
            $('#convert-btn').attr('disabled', false)
            $('.alert-high-slippage').hide()
            renderUnlockButton(inputCurrency, inputValue)
        }
    }
    
    async function updateInputOutput(lastChangedField) {
        const inputCurrency = $('#inputCurrency').val()
        const outputCurrency = $('#outputCurrency').val()
        let inputValue
        let outputValue
        if (lastChangedField === 'input') {
            inputValue = $('#inputValue').val()
            if (!$.isNumeric(inputValue) || inputValue <= 0) {
                $('#outputValue').val('')
                return
            }
            outputValue = await calcuateInputOutput(inputCurrency, outputCurrency, 'EXACT_INPUT', inputValue)
            if(outputValue > 0) {
                $('#outputValue').val(outputValue.toFixed(7))
                updateExchangeRate(inputCurrency, outputCurrency, inputValue, outputValue)
            }
         
            else $('#outputValue').val('')
        } else if (lastChangedField === 'output') {
            outputValue = $('#outputValue').val()
            if (!$.isNumeric(outputValue) || outputValue <= 0) {
                $('#inputValue').val('')
                return
            }
            inputValue = await calcuateInputOutput(inputCurrency, outputCurrency, 'EXACT_OUTPUT', outputValue)
            if(inputValue > 0) {
                $('#inputValue').val(inputValue.toFixed(7))
                updateExchangeRate(inputCurrency, outputCurrency, inputValue, outputValue)
            }
            else $('#inputValue').val('')
        }
        renderUnlockButton(inputCurrency, inputValue)
    }
    
    async function updateExchangeRate (inputCurrency, outputCurrency, inputValue, outputValue) {
        if (inputCurrency === mainToken.symbol) {
            if (outputCurrency !== 'ETH') {
                let tokenExchangeAddressA = exchangeAddresses[inputCurrency]
                let tokenContractA = tokenContracts[inputCurrency]
                let ethReserveA = await web3.eth.getBalance(tokenExchangeAddressA)
                let tokenRserveA = await tokenContractA.methods.balanceOf(tokenExchangeAddressA).call()
                ethReserveA = new BigNumber(ethReserveA)
                tokenRserveA = new BigNumber(tokenRserveA)
                let absPriceA = tokenRserveA.dividedBy(ethReserveA)

                let tokenExchangeAddressB = exchangeAddresses[outputCurrency]
                let tokenContractB = tokenContracts[outputCurrency]
                let ethReserveB = await web3.eth.getBalance(tokenExchangeAddressB)
                let tokenReserveB = await tokenContractB.methods.balanceOf(tokenExchangeAddressB).call()
                ethReserveB = new BigNumber(ethReserveB)
                tokenReserveB = new BigNumber(tokenReserveB)
                let absPriceB = tokenReserveB.dividedBy(ethReserveB)

                let absPrice = absPriceB.dividedBy(absPriceA)
                absPrice = absPrice.toFixed(8)
                
                let exchangeRate = outputValue / inputValue
                let slippage = 100 * Math.abs(absPrice - exchangeRate) / absPrice
                
                $('#exchange-info .dai-rate').html(`1 ULT = ${exchangeRate.toFixed(6)} ${outputCurrency}`)
                $('#slippage').html(`${slippage.toFixed(2)} %`)
                checkSlippage(slippage, inputCurrency, inputValue)

                calculateULTPrice(mainToken.symbol, 'ETH', inputValue).then(output => {
                    let exchangeRate = output / inputValue
                    $('#exchange-info .eth-rate').html(`1 ULT = ${exchangeRate.toFixed(6)} ETH`)
                })
            } else if (outputCurrency === 'ETH') {
                let tokenExchangeAddress = exchangeAddresses[inputCurrency]
                let tokenContract = tokenContracts[inputCurrency]
                let ethReserve = await web3.eth.getBalance(tokenExchangeAddress)
                let tokenRserve = await tokenContract.methods.balanceOf(tokenExchangeAddress).call()
                ethReserve = new BigNumber(ethReserve)
                tokenRserve = new BigNumber(tokenRserve)
                
                let absPrice = ethReserve.dividedBy(tokenRserve)
                absPrice = absPrice.toFixed(8)
                
                // let absPrice = await getULTToETHPrice()
                let exchangeRate = outputValue / inputValue
                let slippage = 100 * Math.abs(absPrice - exchangeRate) / absPrice
                $('#exchange-info .eth-rate').html(`1 ULT = ${exchangeRate.toFixed(6)} ${outputCurrency}`)
                $('#slippage').html(`${slippage.toFixed(2)} %`)
                checkSlippage(slippage, inputCurrency, inputValue)
                
                calculateULTPrice(mainToken.symbol, 'DAI', inputValue).then(output => {
                    let exchangeRate = output / inputValue
                    $('#exchange-info .dai-rate').html(`1 ULT = ${exchangeRate.toFixed(6)} DAI`)
                })
            }
        } else if (outputCurrency === mainToken.symbol) {
            if(inputCurrency !== 'ETH') {
                let tokenExchangeAddressA = exchangeAddresses[inputCurrency]
                let tokenContractA = tokenContracts[inputCurrency]
                let ethReserveA = await web3.eth.getBalance(tokenExchangeAddressA)
                let tokenRserveA = await tokenContractA.methods.balanceOf(tokenExchangeAddressA).call()
                ethReserveA = new BigNumber(ethReserveA)
                tokenRserveA = new BigNumber(tokenRserveA)
                let absPriceA = tokenRserveA.dividedBy(ethReserveA)

                let tokenExchangeAddressB = exchangeAddresses[outputCurrency]
                let tokenContractB = tokenContracts[outputCurrency]
                let ethReserveB = await web3.eth.getBalance(tokenExchangeAddressB)
                let tokenReserveB = await tokenContractB.methods.balanceOf(tokenExchangeAddressB).call()
                ethReserveB = new BigNumber(ethReserveB)
                tokenReserveB = new BigNumber(tokenReserveB)
                let absPriceB = tokenReserveB.dividedBy(ethReserveB)

                let absPrice = absPriceB.dividedBy(absPriceA)
                absPrice = absPrice.toFixed(8)
                
                let exchangeRate = outputValue / inputValue
                let slippage = 100 * Math.abs(absPrice - exchangeRate) / absPrice
                
                $('#exchange-info .dai-rate').html(`1 ${inputCurrency} = ${exchangeRate.toFixed(6)} ${mainToken.symbol}`)
                $('#slippage').html(`${slippage.toFixed(2)} %`)
                checkSlippage(slippage, inputCurrency, inputValue)

                calculateULTPrice('ETH', mainToken.symbol, inputValue).then(ethOutput => {
                    let exchangeRate = ethOutput / inputValue
                    $('#exchange-info .eth-rate').html(`1 ETH = ${exchangeRate.toFixed(6)} ${mainToken.symbol}`)
                })
            } else if(inputCurrency === 'ETH') {
                let tokenExchangeAddress = exchangeAddresses[outputCurrency]
                let tokenContract = tokenContracts[outputCurrency]
                let ethReserve = await web3.eth.getBalance(tokenExchangeAddress)
                let tokenRserve = await tokenContract.methods.balanceOf(tokenExchangeAddress).call()
                ethReserve = new BigNumber(ethReserve)
                tokenRserve = new BigNumber(tokenRserve)
                let absPrice = tokenRserve.dividedBy(ethReserve)
                absPrice = absPrice.toFixed(8)
                
                // let absPrice = await getULTToETHPrice()
                // absPrice = 1 / absPrice
                let exchangeRate = outputValue / inputValue
                let slippage = 100 * Math.abs(absPrice - exchangeRate) / absPrice
                $('#exchange-info .eth-rate').html(`1 ${inputCurrency} = ${exchangeRate.toFixed(6)} ${mainToken.symbol}`)
                $('#slippage').html(`${slippage.toFixed(2)} %`)
                checkSlippage(slippage, inputCurrency, inputValue)

                calculateULTPrice('DAI', mainToken.symbol, inputValue).then(daiOutput => {
                    let exchangeRate = daiOutput / inputValue
                    $('#exchange-info .dai-rate').html(`1 DAI = ${exchangeRate.toFixed(6)} ${mainToken.symbol}`)
                })
            }
            
        }
    }
}


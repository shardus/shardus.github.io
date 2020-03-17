/* global BigNumber, Web3, factoryABI, exchangeABI, tokenABI, ERC20_ABI, tokenDB, $ */

let UniswapConvertWidget = async function(config) {
  // emitter.setMaxListeners(200)
  let G = {};
  G.ownedTokenList = [];
  G.summaryList = [];
  G.tokenList = [];
  const ERC20_ABI = [
    {
      constant: !0,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: !1,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: !1,
      inputs: [
        {
          name: "_spender",
          type: "address"
        },
        {
          name: "_value",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: !1,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: !0,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: !1,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: !1,
      inputs: [
        {
          name: "_from",
          type: "address"
        },
        {
          name: "_to",
          type: "address"
        },
        {
          name: "_value",
          type: "uint256"
        }
      ],
      name: "transferFrom",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: !1,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: !0,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8"
        }
      ],
      payable: !1,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: !0,
      inputs: [
        {
          name: "_owner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256"
        }
      ],
      payable: !1,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: !0,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: !1,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: !1,
      inputs: [
        {
          name: "_to",
          type: "address"
        },
        {
          name: "_value",
          type: "uint256"
        }
      ],
      name: "transfer",
      outputs: [
        {
          name: "",
          type: "bool"
        }
      ],
      payable: !1,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: !0,
      inputs: [
        {
          name: "_owner",
          type: "address"
        },
        {
          name: "_spender",
          type: "address"
        }
      ],
      name: "allowance",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: !1,
      stateMutability: "view",
      type: "function"
    },
    {
      payable: !0,
      stateMutability: "payable",
      type: "fallback"
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          name: "owner",
          type: "address"
        },
        {
          indexed: !0,
          name: "spender",
          type: "address"
        },
        {
          indexed: !1,
          name: "value",
          type: "uint256"
        }
      ],
      name: "Approval",
      type: "event"
    },
    {
      anonymous: !1,
      inputs: [
        {
          indexed: !0,
          name: "from",
          type: "address"
        },
        {
          indexed: !0,
          name: "to",
          type: "address"
        },
        {
          indexed: !1,
          name: "value",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    }
  ];
  const factoryABI = [
    {
      name: "NewExchange",
      inputs: [
        {
          type: "address",
          name: "token",
          indexed: true
        },
        {
          type: "address",
          name: "exchange",
          indexed: true
        }
      ],
      anonymous: false,
      type: "event"
    },
    {
      name: "initializeFactory",
      outputs: [],
      inputs: [
        {
          type: "address",
          name: "template"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 35725
    },
    {
      name: "createExchange",
      outputs: [
        {
          type: "address",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "token"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 187911
    },
    {
      name: "getExchange",
      outputs: [
        {
          type: "address",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "token"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 715
    },
    {
      name: "getToken",
      outputs: [
        {
          type: "address",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "exchange"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 745
    },
    {
      name: "getTokenWithId",
      outputs: [
        {
          type: "address",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "token_id"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 736
    },
    {
      name: "exchangeTemplate",
      outputs: [
        {
          type: "address",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 633
    },
    {
      name: "tokenCount",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 663
    }
  ];
  const tokenABI = [
    {
      name: "Transfer",
      inputs: [
        {
          type: "address",
          name: "_from",
          indexed: true
        },
        {
          type: "address",
          name: "_to",
          indexed: true
        },
        {
          type: "uint256",
          name: "_value",
          indexed: false
        }
      ],
      anonymous: false,
      type: "event"
    },
    {
      name: "Approval",
      inputs: [
        {
          type: "address",
          name: "_owner",
          indexed: true
        },
        {
          type: "address",
          name: "_spender",
          indexed: true
        },
        {
          type: "uint256",
          name: "_value",
          indexed: false
        }
      ],
      anonymous: false,
      type: "event"
    },
    {
      name: "__init__",
      outputs: [],
      inputs: [
        {
          type: "bytes32",
          name: "_name"
        },
        {
          type: "bytes32",
          name: "_symbol"
        },
        {
          type: "uint256",
          name: "_decimals"
        },
        {
          type: "uint256",
          name: "_supply"
        }
      ],
      constant: false,
      payable: false,
      type: "constructor"
    },
    {
      name: "deposit",
      outputs: [],
      inputs: [],
      constant: false,
      payable: true,
      type: "function",
      gas: 74279
    },
    {
      name: "withdraw",
      outputs: [
        {
          type: "bool",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "_value"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 108706
    },
    {
      name: "totalSupply",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 543
    },
    {
      name: "balanceOf",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_owner"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 745
    },
    {
      name: "transfer",
      outputs: [
        {
          type: "bool",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_to"
        },
        {
          type: "uint256",
          name: "_value"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 74698
    },
    {
      name: "transferFrom",
      outputs: [
        {
          type: "bool",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_from"
        },
        {
          type: "address",
          name: "_to"
        },
        {
          type: "uint256",
          name: "_value"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 110600
    },
    {
      name: "approve",
      outputs: [
        {
          type: "bool",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_spender"
        },
        {
          type: "uint256",
          name: "_value"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 37888
    },
    {
      name: "allowance",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_owner"
        },
        {
          type: "address",
          name: "_spender"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 1025
    },
    {
      name: "name",
      outputs: [
        {
          type: "bytes32",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 723
    },
    {
      name: "symbol",
      outputs: [
        {
          type: "bytes32",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 753
    },
    {
      name: "decimals",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 783
    }
  ];
  const exchangeABI = [
    {
      name: "TokenPurchase",
      inputs: [
        {
          type: "address",
          name: "buyer",
          indexed: true
        },
        {
          type: "uint256",
          name: "eth_sold",
          indexed: true
        },
        {
          type: "uint256",
          name: "tokens_bought",
          indexed: true
        }
      ],
      anonymous: false,
      type: "event"
    },
    {
      name: "EthPurchase",
      inputs: [
        {
          type: "address",
          name: "buyer",
          indexed: true
        },
        {
          type: "uint256",
          name: "tokens_sold",
          indexed: true
        },
        {
          type: "uint256",
          name: "eth_bought",
          indexed: true
        }
      ],
      anonymous: false,
      type: "event"
    },
    {
      name: "AddLiquidity",
      inputs: [
        {
          type: "address",
          name: "provider",
          indexed: true
        },
        {
          type: "uint256",
          name: "eth_amount",
          indexed: true
        },
        {
          type: "uint256",
          name: "token_amount",
          indexed: true
        }
      ],
      anonymous: false,
      type: "event"
    },
    {
      name: "RemoveLiquidity",
      inputs: [
        {
          type: "address",
          name: "provider",
          indexed: true
        },
        {
          type: "uint256",
          name: "eth_amount",
          indexed: true
        },
        {
          type: "uint256",
          name: "token_amount",
          indexed: true
        }
      ],
      anonymous: false,
      type: "event"
    },
    {
      name: "Transfer",
      inputs: [
        {
          type: "address",
          name: "_from",
          indexed: true
        },
        {
          type: "address",
          name: "_to",
          indexed: true
        },
        {
          type: "uint256",
          name: "_value",
          indexed: false
        }
      ],
      anonymous: false,
      type: "event"
    },
    {
      name: "Approval",
      inputs: [
        {
          type: "address",
          name: "_owner",
          indexed: true
        },
        {
          type: "address",
          name: "_spender",
          indexed: true
        },
        {
          type: "uint256",
          name: "_value",
          indexed: false
        }
      ],
      anonymous: false,
      type: "event"
    },
    {
      name: "setup",
      outputs: [],
      inputs: [
        {
          type: "address",
          name: "token_addr"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 175875
    },
    {
      name: "addLiquidity",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "min_liquidity"
        },
        {
          type: "uint256",
          name: "max_tokens"
        },
        {
          type: "uint256",
          name: "deadline"
        }
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 82605
    },
    {
      name: "removeLiquidity",
      outputs: [
        {
          type: "uint256",
          name: "out"
        },
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "amount"
        },
        {
          type: "uint256",
          name: "min_eth"
        },
        {
          type: "uint256",
          name: "min_tokens"
        },
        {
          type: "uint256",
          name: "deadline"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 116814
    },
    {
      name: "__default__",
      outputs: [],
      inputs: [],
      constant: false,
      payable: true,
      type: "function"
    },
    {
      name: "ethToTokenSwapInput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "min_tokens"
        },
        {
          type: "uint256",
          name: "deadline"
        }
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 12757
    },
    {
      name: "ethToTokenTransferInput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "min_tokens"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "recipient"
        }
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 12965
    },
    {
      name: "ethToTokenSwapOutput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_bought"
        },
        {
          type: "uint256",
          name: "deadline"
        }
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 50463
    },
    {
      name: "ethToTokenTransferOutput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_bought"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "recipient"
        }
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 50671
    },
    {
      name: "tokenToEthSwapInput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_sold"
        },
        {
          type: "uint256",
          name: "min_eth"
        },
        {
          type: "uint256",
          name: "deadline"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 47503
    },
    {
      name: "tokenToEthTransferInput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_sold"
        },
        {
          type: "uint256",
          name: "min_eth"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "recipient"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 47712
    },
    {
      name: "tokenToEthSwapOutput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "eth_bought"
        },
        {
          type: "uint256",
          name: "max_tokens"
        },
        {
          type: "uint256",
          name: "deadline"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 50175
    },
    {
      name: "tokenToEthTransferOutput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "eth_bought"
        },
        {
          type: "uint256",
          name: "max_tokens"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "recipient"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 50384
    },
    {
      name: "tokenToTokenSwapInput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_sold"
        },
        {
          type: "uint256",
          name: "min_tokens_bought"
        },
        {
          type: "uint256",
          name: "min_eth_bought"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "token_addr"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 51007
    },
    {
      name: "tokenToTokenTransferInput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_sold"
        },
        {
          type: "uint256",
          name: "min_tokens_bought"
        },
        {
          type: "uint256",
          name: "min_eth_bought"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "recipient"
        },
        {
          type: "address",
          name: "token_addr"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 51098
    },
    {
      name: "tokenToTokenSwapOutput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_bought"
        },
        {
          type: "uint256",
          name: "max_tokens_sold"
        },
        {
          type: "uint256",
          name: "max_eth_sold"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "token_addr"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 54928
    },
    {
      name: "tokenToTokenTransferOutput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_bought"
        },
        {
          type: "uint256",
          name: "max_tokens_sold"
        },
        {
          type: "uint256",
          name: "max_eth_sold"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "recipient"
        },
        {
          type: "address",
          name: "token_addr"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 55019
    },
    {
      name: "tokenToExchangeSwapInput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_sold"
        },
        {
          type: "uint256",
          name: "min_tokens_bought"
        },
        {
          type: "uint256",
          name: "min_eth_bought"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "exchange_addr"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 49342
    },
    {
      name: "tokenToExchangeTransferInput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_sold"
        },
        {
          type: "uint256",
          name: "min_tokens_bought"
        },
        {
          type: "uint256",
          name: "min_eth_bought"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "recipient"
        },
        {
          type: "address",
          name: "exchange_addr"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 49532
    },
    {
      name: "tokenToExchangeSwapOutput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_bought"
        },
        {
          type: "uint256",
          name: "max_tokens_sold"
        },
        {
          type: "uint256",
          name: "max_eth_sold"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "exchange_addr"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 53233
    },
    {
      name: "tokenToExchangeTransferOutput",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_bought"
        },
        {
          type: "uint256",
          name: "max_tokens_sold"
        },
        {
          type: "uint256",
          name: "max_eth_sold"
        },
        {
          type: "uint256",
          name: "deadline"
        },
        {
          type: "address",
          name: "recipient"
        },
        {
          type: "address",
          name: "exchange_addr"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 53423
    },
    {
      name: "getEthToTokenInputPrice",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "eth_sold"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 5542
    },
    {
      name: "getEthToTokenOutputPrice",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_bought"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 6872
    },
    {
      name: "getTokenToEthInputPrice",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "tokens_sold"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 5637
    },
    {
      name: "getTokenToEthOutputPrice",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "uint256",
          name: "eth_bought"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 6897
    },
    {
      name: "tokenAddress",
      outputs: [
        {
          type: "address",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1413
    },
    {
      name: "factoryAddress",
      outputs: [
        {
          type: "address",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1443
    },
    {
      name: "balanceOf",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_owner"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 1645
    },
    {
      name: "transfer",
      outputs: [
        {
          type: "bool",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_to"
        },
        {
          type: "uint256",
          name: "_value"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 75034
    },
    {
      name: "transferFrom",
      outputs: [
        {
          type: "bool",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_from"
        },
        {
          type: "address",
          name: "_to"
        },
        {
          type: "uint256",
          name: "_value"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 110907
    },
    {
      name: "approve",
      outputs: [
        {
          type: "bool",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_spender"
        },
        {
          type: "uint256",
          name: "_value"
        }
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 38769
    },
    {
      name: "allowance",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [
        {
          type: "address",
          name: "_owner"
        },
        {
          type: "address",
          name: "_spender"
        }
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 1925
    },
    {
      name: "name",
      outputs: [
        {
          type: "bytes32",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1623
    },
    {
      name: "symbol",
      outputs: [
        {
          type: "bytes32",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1653
    },
    {
      name: "decimals",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1683
    },
    {
      name: "totalSupply",
      outputs: [
        {
          type: "uint256",
          name: "out"
        }
      ],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1713
    }
  ];
  // let web3 = new Web3(G.web3.givenProvider || 'wss://some.local-or-remote.node:8546');
  G.web3 = new Web3(Web3.givenProvider || "wss://mainnet.infura.io/ws");

  let tokenAddressess = {};
  const ALLOWED_SLIPPAGE = 0.025;
  let mainToken = config.mainToken;
  const DaiTokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  // initialise the app

  grecaptcha.ready(function() {
    grecaptcha
      .execute("6LdJWuAUAAAAAOddxQnKzif0ojf7Vun_b-rgUfkH", {
        action: "homepage"
      })
      .then(function(token) {
        G.recapToken = token;
        init(config);
      });
  });

  async function prepareOwnedTokenList() {
    G.ownedTokenList = await getOwnedTokenList();
    initialiseDropdown(".input-token-dropdown");
    initialiseDropdown(".output-token-dropdown");
    G.isDropdownsPrepared = true;
  }

  // FUNCTIONS
  async function initiateMetamask() {
    if (!window.ethereum) {
      console.log("Requesting metamask...");
      $("#noAccountModal").modal("show");
    }
    await window.ethereum.enable();
    console.log("Metamask is initialise");
    if (!G.isDropdownsPrepared) await prepareOwnedTokenList();
  }

  async function getAccountAddress() {
    const accounts = await G.web3.eth.getAccounts();
    if (accounts.length > 0) return accounts[0];
  }

  async function queryMainServer(url) {
    let option = {
      url,
      params: {
        key: G.siteKey,
        key_time: G.siteKeyTimestamp
      },
      method: "get"
    };
    let res = await axios(option);
    return res;
  }

  async function getOwnedTokenList() {
    const accountAddress = await getAccountAddress();
    if (accountAddress) {
      const res = await queryMainServer(
        `${config.mainConfig.mainServerUrl}/api/tokenHolding?accountAddress=${accountAddress}`
      );
      return res.data.result || [];
    }
    return [];
  }

  async function getTokenList() {
    const res = await queryMainServer(
      `${config.mainConfig.mainServerUrl}/api/token`
    );
    const tokenList = res.data.result.map(token => {
      let foundSummary = G.summaryList.find(s => s.token_id === token.id);
      if (foundSummary) {
        return {
          ...token,
          order: foundSummary.auto_order,
          liquidity: foundSummary.liquidity
        };
      } else {
        return {
          ...token,
          order: 999999,
          liquidity: 0
        };
      }
    });
    return tokenList
      .filter(t => t.liquidity > 0)
      .sort((a, b) => a.order - b.order);
  }
  async function getSummaryList() {
    const res = await queryMainServer(
      `${config.mainConfig.mainServerUrl}/api/summary`
    );
    const sortedList = res.data.result.sort((a, b) => {
      return b.liquidity - a.liquidity;
    });
    let finalList = [];
    for (let i = 0; i < sortedList.length; i++) {
      finalList.push({
        ...sortedList[i],
        auto_order: i + 1
      });
    }
    return finalList;
  }

  function getToken(tokenAddress) {
    if (!tokenAddress) {
      throw new Error("Provide token address to get token detail");
    }
    const foundToken = G.tokenList.find(
      t => t.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
    );
    return foundToken;
  }

  function getSumamry(tokenAddress) {
    if (!tokenAddress) {
      throw new Error("Provide token address to get summary detail");
    }
    const foundToken = G.tokenList.find(
      t => t.tokenAddress.toLowerCase() === tokenAddress.toLowerCase
    );
    if (foundToken) {
      const foundSummary = G.summaryList.find(
        s => s.token_id === foundToken.id
      );
      return foundSummary;
    }
  }

  function initialiseDropdown(selector) {
    // Pass single element
    const element = document.querySelector(selector);
    let inputOptionsForTokens = G.tokenList.filter(token => {
      return token.name && token.symbol;
    });

    if (selector === ".input-token-dropdown") {
      inputOptionsForTokens = inputOptionsForTokens.filter(token => {
        if (G.ownedTokenList.length > 0) {
          const isOwnedToken = G.ownedTokenList.find(
            t =>
              t.tokenAddress.toLowerCase() === token.tokenAddress.toLowerCase()
          );
          if (isOwnedToken) return true;
        }
        return false;
      });
    }
    inputOptionsForTokens = inputOptionsForTokens.map(token => {
      return {
        value: token.tokenAddress,
        label: `${token.symbol} (${token.name})`,
        selected: false,
        disabled: false,
        customProperties: {
          ...token
        }
      };
    });
    const inputOptions = [
      {
        value: "ETH",
        label: `ETH (Ether)`,
        selected: false,
        disabled: false,
        customProperties: {
          order: 0
        }
      },
      ...inputOptionsForTokens
    ];
    let choice = new Choices(element, {
      silent: false,
      items: [],
      choices: [...inputOptions],
      renderChoiceLimit: -1,
      maxItemCount: -1,
      addItems: true,
      addItemFilter: null,
      removeItems: true,
      removeItemButton: false,
      editItems: false,
      duplicateItemsAllowed: true,
      delimiter: ",",
      paste: true,
      searchEnabled: true,
      searchChoices: true,
      searchFloor: 1,
      searchResultLimit: 4,
      searchFields: ["label", "value", "customProperties.token.name"],
      position: "auto",
      resetScrollPosition: true,
      shouldSort: true,
      shouldSortItems: false,
      sorter: function(a, b) {
        return b.customProperties.liquidity - a.customProperties.liquidity;
      },
      placeholder: true,
      placeholderValue: "Select a token",
      searchPlaceholderValue: "Search a token",
      prependValue: null,
      appendValue: null,
      renderSelectedChoices: "auto",
      loadingText: "Loading...",
      noResultsText: "No results found",
      noChoicesText: "No choices to choose from",
      itemSelectText: "Press to select",
      addItemText: value => {
        return `Press Enter to add <b>"${value}"</b>`;
      },
      maxItemText: maxItemCount => {
        return `Only ${maxItemCount} values can be added`;
      },
      valueComparer: (value1, value2) => {
        return value1 === value2;
      },
      // Choices uses the great Fuse library for searching. You
      // can find more options here: https://github.com/krisk/Fuse#options
      fuseOptions: {
        include: "score"
      },
      callbackOnInit: null,
      callbackOnCreateTemplates: null
    });
    if (selector === ".input-token-dropdown") {
      G.inputChoice = choice;
      G.inputChoice.passedElement.element.addEventListener(
        "change",
        function(event) {
          // do something creative here...
          updateInputOutput("input");
        },
        false
      );
    } else if (selector === ".output-token-dropdown") {
      G.outputChoice = choice;
      G.outputChoice.passedElement.element.addEventListener(
        "change",
        function(event) {
          // do something creative here...
          updateInputOutput("output");
        },
        false
      );
    }
  }

  async function init(config) {
    G.I = await getIValueFromServer(G.recapToken);
    G.siteKeyTimestamp = Date.now();
    G.siteKey = generateSiteKey(G.I, G.siteKeyTimestamp);
    G.summaryList = await getSummaryList();
    G.tokenList = await getTokenList();
    G.ownedTokenList = await getOwnedTokenList();
    G.exchangeContracts = {};
    G.tokenContracts = {};
    G.exchangeAddresses = {};

    for (let i = 0; i < G.tokenList.length; i += 1) {
      const token = G.tokenList[i];
      G.exchangeContracts[token.tokenAddress] = new G.web3.eth.Contract(
        exchangeABI,
        token.exchangeAddress
      );
    }

    G.tokenList.forEach(token => {
      G.exchangeAddresses[token.tokenAddress] = token.exchangeAddress;
    });
    G.tokenList.forEach(token => {
      G.tokenContracts[token.tokenAddress] = new G.web3.eth.Contract(
        tokenABI,
        token.tokenAddress
      );
    });
    drawUI(config);

    $("#convert-btn").on("click", async function(e) {
      let isUserLoggedIn = await isLoggedIn();
      if (!isUserLoggedIn) {
        $("#swapModal").modal("hide");
        $("#noAccountModal").modal("show");
      } else {
        const accounts = await G.web3.eth.getAccounts();
        let inputTokenAddress = $("#inputCurrency").val();
        let inputValue = $("#inputValue").val();
        let balance = await getAccountBalance(inputTokenAddress, accounts[0]);
        if (parseFloat(inputValue) > parseFloat(balance)) {
          alert(
            `Your wallet does not have enough ${inputTokenAddress} to create this transaction`
          );
          return;
        }
        let data = {
          inputTokenAddress: $("#inputCurrency").val(),
          inputValue: parseFloat($("#inputValue").val()),
          outputTokenAddress: $("#outputCurrency").val(),
          outputValue: parseFloat($("#outputValue").val())
        };
        //  $("#uniswap-form")
        //    .serializeArray()
        //    .forEach(input => {
        //      data[input.name] = input.value;
        //    });
        $(".alert").hide();
        $(".alert-check").show();
        $(this).attr("disabled", true);
        try {
          swap(data);
        } catch (e) {
          alert("Network Error. Please try again");
          $("#convert-btn").attr("disabled", false);
          $(".alert").hide();
        }
      }
    });

    $("#unlock-token-btn").on("click", async e => {
      e.preventDefault();
      $("#swapModal").modal("hide");
      $("#approvalModal").modal("show");
      const inputTokenAddress = $("#inputCurrency").val();
      const inputToken = getToken(inputTokenAddress);
      const inputValue = $("#inputValue").val();
      const minimumAmount =
        parseFloat(inputValue) + parseFloat(inputValue * 0.1);
      $("#approvalModal label span").text(
        `${minimumAmount} ${inputToken.symbol}`
      );
      $("#approvalModal label span").attr("minimumAmount", minimumAmount);
      $("#approvalModal input[type=text]").val(minimumAmount);
    });

    async function estimateGasPrice(
      from,
      value,
      inputTokenAddress,
      outputTokenAddress
    ) {
      console.log(inputTokenAddress, outputTokenAddress);
      let gas;
      let amount = new BigNumber(value * Math.pow(10, 18));

      if (
        (inputTokenAddress === "ETH" &&
          outputTokenAddress === mainToken.tokenAddress) ||
        (inputTokenAddress === mainToken.tokenAddress &&
          outputTokenAddress === "ETH")
      ) {
        console.log(`ETH to ULT or ULT to ETH`);
        let exchange = G.exchangeAddresses[mainToken.tokenAddress];
        gas = await G.web3.eth.estimateGas({
          from: from,
          to: exchange,
          value: amount
        });
      } else {
        console.log(`TOKEN to ULT or ULT to TOKEN`);
        let exchange1 = G.exchangeAddresses[inputTokenAddress];
        let exchange2 = G.exchangeAddresses[outputTokenAddress];
        let gas1 = await G.web3.eth.estimateGas({
          from: from,
          to: exchange1,
          value: amount
        });
        let gas2 = await G.web3.eth.estimateGas({
          from: from,
          to: exchange2,
          value: amount
        });
        gas = gas1 + gas2;
      }
      let gas_price_network = await G.web3.eth.getGasPrice();
      gas_price_network = parseInt(gas_price_network) / Math.pow(10, 9);
      let cost =
        (1.6 * gas * gas_price_network * 1000000000) / Math.pow(10, 18);
      console.log(`Estimated Gas is ${gas} WEI`);
      console.log(`gas price from network: ${gas_price_network} GWEI`);
      console.log(`Tx Cost is ${cost} ETH`);
      return cost;
    }

    $("#max-btn").on("click", async e => {
      e.preventDefault();
      const accounts = await G.web3.eth.getAccounts();
      let inputTokenAddress = $("#inputCurrency").val();
      let outputTokenAddress = $("#outputCurrency").val();
      let balance = await getAccountBalance(inputTokenAddress, accounts[0]);

      // estimate gas and substrat from input amount
      let estimatedGas = await estimateGasPrice(
        accounts[0],
        balance,
        inputTokenAddress,
        outputTokenAddress
      );
      let availableAmount;
      if (inputTokenAddress === "ETH") availableAmount = balance - estimatedGas;
      // in ETH unit
      else availableAmount = balance;

      let inputValue = $("#inputValue").val(availableAmount);
      updateInputOutput("input");
    });

    $("#approve-btn").on("click", async e => {
      e.preventDefault();
      const accounts = await G.web3.eth.getAccounts();
      const inputTokenAddress = $("#inputCurrency").val();
      const approvedAmount = $("#approvalModal input[type=text]").val();
      const minimumAmount = $("#approvalModal label span").attr(
        "minimumAmount"
      );
      if (approvedAmount < minimumAmount) {
        alert("Approve amount cannot be less than minimum amount");
        $("#approvalModal input[type=text]").val(minimumAmount);
        return;
      }
      $("#approvalModal").modal("hide");
      renderSwapModal("buy");
      await unlockToken(inputTokenAddress, accounts[0], approvedAmount);
    });

    $("#sell-btn, #buy-btn").on("click", async e => {
      e.stopPropagation();

      let isUserLoggedIn = await isLoggedIn();

      if (!isUserLoggedIn) {
        $("#noAccountModal").modal("show");
        initiateMetamask();
      } else {
        if (!G.isDropdownsPrepared) await prepareOwnedTokenList();
        let action = $(e.target).attr("data-action");
        console.log(action);
        renderSwapModal(action);
      }
    });

    $(".pay-group .dropdown-menu .dropdown-item").on("click", async function(
      e
    ) {
      e.preventDefault();
      const selectedToken = this.getAttribute("token-name");
      $("#inputCurrency").val(selectedToken);
      $("#input-select-btn").text(selectedToken);
      updateInputOutput("input");
    });

    $(".receive-group .dropdown-menu .dropdown-item").on("click", function(e) {
      e.preventDefault();
      const selectedToken = this.getAttribute("token-name");
      $("#outputCurrency").val(selectedToken);
      $("#output-select-btn").text(selectedToken);
      updateInputOutput("input");
    });

    $("#inputValue").on("change keydown paste input", () => {
      updateInputOutput("input");
    });

    $("#outputValue").on("change keydown paste input", () => {
      updateInputOutput("output");
    });
  }

  async function isLoggedIn() {
    let accounts;
    try {
      accounts = await G.web3.eth.getAccounts();
    } catch (e) {
      console.log(e);
      console.log("Cannot get wallet account. Please log in");
      return false;
    }
    if (accounts && accounts.length > 0) return true;
    else return false;
  }

  function renderSwapModal(action = "buy") {
    $("#swapModal").modal("show");
    let modal = $("#swapModal");
    if (action === "buy") {
      modal.find(".modal-title").text("Buy ULT using ETH or ERC20 Tokens");
    } else if (action === "sell") {
      modal
        .find(".modal-title")
        .text("Sell ULT to receive ETH or ERC20 Tokens");
    }

    modal.find(".modal-body input").val("");
    if (action === "buy") {
      $(".pay-group .dropdown-toggle").attr("disabled", false);
      $(".receive-group .dropdown-toggle").attr("disabled", true);
      // $("#inputCurrency").val("ETH");
      // $("#outputCurrency").val(mainToken.symbol);
      G.inputChoice.setChoiceByValue("ETH");
      G.outputChoice.setChoiceByValue(mainToken.tokenAddress);
      G.outputChoice.disable();
      G.inputChoice.enable();
      $("#input-select-btn").text("ETH");
      $("#output-select-btn").text(mainToken.symbol);
      $("#convert-btn").text("BUY");
    } else if (action === "sell") {
      $(".pay-group .dropdown-toggle").attr("disabled", true);
      $(".receive-group .dropdown-toggle").attr("disabled", false);
      // $("#inputCurrency").val(mainToken.symbol);
      // $("#outputCurrency").val("ETH");
      G.outputChoice.setChoiceByValue("ETH");
      G.inputChoice.setChoiceByValue(mainToken.tokenAddress);
      G.inputChoice.disable();
      G.outputChoice.enable();
      $("#input-select-btn").text(mainToken.symbol);
      $("#output-select-btn").text("ETH");
      $("#convert-btn").text("SELL");
    }
    $(".alert").hide();
  }

  // function list
  function getSwapType(inputTokenAddress, outputTokenAddress) {
    if (inputTokenAddress !== "ETH" && outputTokenAddress === "ETH")
      return "TOKEN_TO_ETH";
    else if (inputTokenAddress === "ETH" && outputTokenAddress !== "ETH")
      return "ETH_TO_TOKEN";
    else if (inputTokenAddress !== "ETH" && outputTokenAddress !== "ETH")
      return "TOKEN_TO_TOKEN";
  }

  async function swap(data) {
    let {
      inputValue,
      outputValue,
      inputTokenAddress,
      outputTokenAddress
    } = data;
    console.log(data);
    // let inputTokenAddress = data.inputCurrency
    // let outputTokenAddress = data.outputCurrency
    let type = getSwapType(inputTokenAddress, outputTokenAddress);

    console.log(inputTokenAddress, outputTokenAddress);

    const blockNumber = await G.web3.eth.getBlockNumber();
    const block = await G.web3.eth.getBlock(blockNumber);
    const deadline = block.timestamp + 300;
    const accounts = await G.web3.eth.getAccounts();
    let exchangeContract;
    if (type === "ETH_TO_TOKEN") {
      exchangeContract = G.exchangeContracts[outputTokenAddress];
      // const min_token = new BigNumber(outputValue).multipliedBy(10 ** 18).multipliedBy(1 - ALLOWED_SLIPPAGE).toFixed(0)
      const min_token = new BigNumber(outputValue)
        .minus(1)
        .multipliedBy(10 ** 18)
        .toFixed(0);
      console.log(
        `Minimum required token is: ${min_token} ${outputTokenAddress}`
      );
      const amount = new BigNumber(inputValue)
        .multipliedBy(10 ** 18)
        .toFixed(0);

      exchangeContract.methods.ethToTokenSwapInput(min_token, deadline).send(
        {
          from: accounts[0],
          value: amount
        },
        (err, data) => {
          if (err) console.log(err);
          else {
            console.log(`TxId is ${JSON.stringify(data)}`);
            const txUrl = `https://etherscan.io/tx/${data}`;
            $(".alert").hide();
            $("#swapModal").modal("hide");
            $("#submittedModal").modal("show");
            $("#txUrl").attr("href", txUrl);
          }
        }
      );
    } else if (type === "TOKEN_TO_ETH") {
      exchangeContract = G.exchangeContracts[inputTokenAddress];
      const tokenSold = new BigNumber(inputValue)
        .multipliedBy(10 ** 18)
        .toFixed(0);
      // const minEth = new BigNumber(outputValue).multipliedBy(10 ** 18).multipliedBy(1 - ALLOWED_SLIPPAGE).toFixed(0)
      const exchangeRate = parseFloat(outputValue / inputValue);
      const minEth = new BigNumber(outputValue)
        .minus(exchangeRate)
        .multipliedBy(10 ** 18)
        .toFixed(0);
      console.log(
        `Minimum required ETH is: ${minEth /
          Math.pow(10, 18)} ${outputTokenAddress}`
      );

      exchangeContract.methods
        .tokenToEthSwapInput(tokenSold, minEth, deadline)
        .send(
          {
            from: accounts[0]
          },
          (err, data) => {
            if (err) {
              alert("Transaction is not submitted");
              $("#convert-btn").attr("disabled", false);
              $(".alert").hide();
            } else {
              console.log(`TxId is ${JSON.stringify(data)}`);
              const txUrl = `https://etherscan.io/tx/${data}`;
              $(".alert").hide();
              $("#swapModal").modal("hide");
              $("#submittedModal").modal("show");
              $("#txUrl").attr("href", txUrl);
            }
          }
        );
    } else if (type === "TOKEN_TO_TOKEN") {
      exchangeContract = G.exchangeContracts[inputTokenAddress];
      const tokenSold = new BigNumber(inputValue)
        .multipliedBy(10 ** 18)
        .toFixed(0);
      // const minToken = new BigNumber(outputValue).multipliedBy(10 ** 18).multipliedBy(1 - ALLOWED_SLIPPAGE).toFixed(0)
      let exchangeRate;
      let minToken;
      if (inputTokenAddress === config.mainToken.tokenAddress) {
        exchangeRate = parseFloat(outputValue / inputValue);
        minToken = new BigNumber(outputValue)
          .minus(exchangeRate)
          .multipliedBy(10 ** 18)
          .toFixed(0);
      } else if (outputTokenAddress === config.mainToken.tokenAddress) {
        minToken = new BigNumber(outputValue)
          .minus(1)
          .multipliedBy(10 ** 18)
          .toFixed(0);
      }
      const minEth = new BigNumber(1).toFixed(0);
      // const outputTokenAddress = $('#outputCurrency').val()
      console.log(
        `Minimum required token is: ${minToken /
          Math.pow(10, 18)} ${outputTokenAddress}`
      );

      exchangeContract.methods
        .tokenToTokenSwapInput(
          tokenSold,
          minToken,
          minEth,
          deadline,
          outputTokenAddress
        )
        .send(
          {
            from: accounts[0]
          },
          (err, data) => {
            if (err) console.log(err);
            else {
              console.log(`TxId is ${JSON.stringify(data)}`);
              const txUrl = `https://etherscan.io/tx/${data}`;
              $(".alert").hide();
              $("#swapModal").modal("hide");
              $("#submittedModal").modal("show");
              $("#txUrl").attr("href", txUrl);
            }
          }
        );
    }
  }

  async function unlockToken(tokenAddress, account, approvedAmount) {
    $(".alert").hide();
    $(".alert-wait").show();
    const inputToken = getToken(tokenAddress);
    const amount = new BigNumber(approvedAmount)
      .multipliedBy(10 ** 18)
      .toFixed(0);

    const exchangeAddress = G.exchangeAddresses[tokenAddress];
    const contract = new G.web3.eth.Contract(ERC20_ABI, tokenAddress);
    try {
      await contract.methods.approve(exchangeAddress, amount).send({
        from: account
      });
    } catch (e) {
      alert("Approval Transaction is not submitted. Please try again.");
      $("#convert-btn").attr("disabled", false);
      $(".alert").hide();
      return;
    }

    // check the allowance
    const check = setInterval(async () => {
      const allowance = await getAllowance(tokenAddress, approvedAmount);
      const input = approvedAmount * Math.pow(10, 18);
      if (allowance >= input) {
        clearInterval(check);
        hideUnlockButton();
        $(".alert").hide();
        $(".alert-wait").hide();
        $(".alert-approved").show();
        $("#swapModal").modal("hide");
        alert(
          `Your approval to spend ${approvedAmount} ${inputToken.symbol} is successfully confirmed ! You can submit transaction now.`
        );
      }
    }, 1000);
  }

  async function getAccountBalance(tokenAddress, accountAddress) {
    let balance;
    if (tokenAddress === "ETH") {
      balance = await G.web3.eth.getBalance(accountAddress);
    } else {
      balance = await G.tokenContracts[tokenAddress].methods
        .balanceOf(accountAddress)
        .call();
    }
    return new BigNumber(balance).dividedBy(10 ** 18).toFixed(18);
  }

  async function getETHToUSDPrice() {
    let url = `${config.mainConfig.mainServerUrl}/api/event?tokenAddress=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&limit=10`;
    let res = await queryMainServer(url);
    if (res.data.result) {
      let events = res.data.result;
      for (let i = 0; i < events.length; i++) {
        let event = events[i];
        if (event.price > 0) return parseFloat(1 / event.price);
        else return 0;
      }
    }
  }

  async function getIValueFromServer(recaptchaToken) {
    let url = `${config.authServerUrl}/sitekey?recaptchatoken=${recaptchaToken}`;
    let res = await axios.get(url);
    return res.data;
  }

  function generateSiteKey(I, timestamp) {
    const K = cryptoUtils.hashObj({ data: [I, timestamp] });
    return K;
  }

  async function getMainTokenToEthPrice() {
    let res = await queryMainServer(config.summaryUrl);
    console.log(res.data.result.price_last_10M);
    return res.data.result.price_last_10M;
  }

  async function getChartPrices(type) {
    if (type === "ULT-USD") {
      let unitPriceEth = await getMainTokenToEthPrice();
      let ethToUsd = await getETHToUSDPrice();
      let unitPriceUsd = unitPriceEth * ethToUsd;
      console.log(`ULT - ETH price is ${unitPriceEth}`);
      return unitPriceUsd;
    }
    if (type === "ULT-ETH") {
      let unitPriceEth = await getMainTokenToEthPrice();
      console.log(`ULT - ETH price is ${unitPriceEth}`);
      return unitPriceEth;
    }
  }

  async function calcuateInputOutput(
    inputTokenAddress,
    outputTokenAddress,
    inputType,
    value
  ) {
    const swapType = getSwapType(inputTokenAddress, outputTokenAddress);
    if (swapType === "ETH_TO_TOKEN") {
      let exchangeAddress = G.exchangeAddresses[outputTokenAddress];
      let tokenContract = G.tokenContracts[outputTokenAddress];
      if (inputType === "EXACT_INPUT") {
        let inputAmount = new BigNumber(value).multipliedBy(10 ** 18);
        let inputReserve = await G.web3.eth.getBalance(exchangeAddress);
        let outputReserve = await tokenContract.methods
          .balanceOf(exchangeAddress)
          .call();

        inputReserve = new BigNumber(inputReserve);
        outputReserve = new BigNumber(outputReserve);
        /*
                numerator = inputAmount * outputReserve * 997
                denominator = inputReserve * 1000 + inputAmount * 997
                outputAmount = numerator / denominator
                */
        let numerator = inputAmount
          .multipliedBy(outputReserve)
          .multipliedBy(997);
        let denominator = inputReserve
          .multipliedBy(1000)
          .plus(inputAmount.multipliedBy(997));
        const outputAmount = numerator
          .dividedBy(denominator)
          .dividedBy(10 ** 18);
        return outputAmount;
      } else if (inputType === "EXACT_OUTPUT") {
        let outputAmount = new BigNumber(value).multipliedBy(10 ** 18);
        let inputReserve = await G.web3.eth.getBalance(exchangeAddress);
        let outputReserve = await tokenContract.methods
          .balanceOf(exchangeAddress)
          .call();

        inputReserve = new BigNumber(inputReserve);
        outputReserve = new BigNumber(outputReserve);
        /*
                numerator = outputAmount * inputReserve * 1000
                denominator = (outputReserve - outputAmount) * 997
                inputAmount = numerator / (denominator + 1) 
                */
        let numerator = outputAmount
          .multipliedBy(inputReserve)
          .multipliedBy(1000);
        let denominator = outputReserve.minus(outputAmount).multipliedBy(997);
        let inputAmount = numerator
          .dividedBy(denominator.plus(1))
          .dividedBy(10 ** 18);
        return inputAmount;
      }
    } else if (swapType === "TOKEN_TO_ETH") {
      let tokenExchangeAddress = G.exchangeAddresses[inputTokenAddress];
      let tokenContract = G.tokenContracts[inputTokenAddress];
      if (inputType === "EXACT_INPUT") {
        let inputAmount = new BigNumber(value).multipliedBy(10 ** 18);
        let inputReserve = await tokenContract.methods
          .balanceOf(tokenExchangeAddress)
          .call();
        let outputReserve = await G.web3.eth.getBalance(tokenExchangeAddress);

        inputReserve = new BigNumber(inputReserve);
        outputReserve = new BigNumber(outputReserve);
        /*
                numerator = inputAmount * outputReserve * 997
                denominator = inputReserve * 1000 + inputAmount * 997
                outputAmount = numerator / denominator
                */
        let numerator = inputAmount
          .multipliedBy(outputReserve)
          .multipliedBy(997);
        let denominator = inputReserve
          .multipliedBy(1000)
          .plus(inputAmount.multipliedBy(997));
        let outputAmount = numerator.dividedBy(denominator).dividedBy(10 ** 18);
        return outputAmount;
      } else if (inputType === "EXACT_OUTPUT") {
        let outputAmount = new BigNumber(value).multipliedBy(10 ** 18);
        let inputReserve = await tokenContract.methods
          .balanceOf(tokenExchangeAddress)
          .call();
        let outputReserve = await G.web3.eth.getBalance(tokenExchangeAddress);

        inputReserve = new BigNumber(inputReserve);
        outputReserve = new BigNumber(outputReserve);
        /*
                numerator = outputAmount * inputReserve * 1000
                denominator = (outputReserve - outputAmount) * 997
                inputAmount = numerator / (denominator + 1)
                */
        let numerator = outputAmount
          .multipliedBy(inputReserve)
          .multipliedBy(1000);
        let denominator = outputReserve.minus(outputAmount).multipliedBy(997);
        let inputAmount = numerator
          .dividedBy(denominator.plus(1))
          .dividedBy(10 ** 18);
        return inputAmount;
      }
    } else if (swapType === "TOKEN_TO_TOKEN") {
      let tokenContractA = G.tokenContracts[inputTokenAddress];
      let exchangeAddressA = G.exchangeAddresses[inputTokenAddress];
      let tokenContractB = G.tokenContracts[outputTokenAddress];
      let exchangeAddressB = G.exchangeAddresses[outputTokenAddress];
      if (inputType === "EXACT_INPUT") {
        let inputAmountA = new BigNumber(value).multipliedBy(10 ** 18);
        // TokenA (ERC20) to ETH conversion
        let inputReserveA = await tokenContractA.methods
          .balanceOf(exchangeAddressA)
          .call();
        let outputReserveA = await G.web3.eth.getBalance(exchangeAddressA);
        inputReserveA = new BigNumber(inputReserveA);
        outputReserveA = new BigNumber(outputReserveA);

        // let numeratorA = inputAmountA * outputReserveA * 997
        // let denominatorA = inputReserveA * 1000 + inputAmountA * 997
        // let outputAmountA = numeratorA / denominatorA
        let numeratorA = inputAmountA
          .multipliedBy(outputReserveA)
          .multipliedBy(997);
        let denominatorA = inputReserveA
          .multipliedBy(1000)
          .plus(inputAmountA * 997);
        let outputAmountA = numeratorA.dividedBy(denominatorA);

        // ETH to TokenB conversion
        let inputAmountB = outputAmountA;
        let inputReserveB = await G.web3.eth.getBalance(exchangeAddressB);
        let outputReserveB = await tokenContractB.methods
          .balanceOf(exchangeAddressB)
          .call();
        inputReserveB = new BigNumber(inputReserveB);
        outputReserveB = new BigNumber(outputReserveB);

        // let numeratorB = inputAmountB * outputReserveB * 997
        // let denominatorB = inputReserveB * 1000 + inputAmountB * 997
        // let outputAmountB = numeratorB / denominatorB
        let numeratorB = inputAmountB
          .multipliedBy(outputReserveB)
          .multipliedBy(997);
        let denominatorB = inputReserveB
          .multipliedBy(1000)
          .plus(inputAmountB.multipliedBy(997));
        let outputAmountB = numeratorB
          .dividedBy(denominatorB)
          .dividedBy(10 ** 18);
        return outputAmountB;
      } else if (inputType === "EXACT_OUTPUT") {
        // Buy TokenB with ETH
        let outputAmountB = new BigNumber(value).multipliedBy(10 ** 18);
        let inputReserveB = await G.web3.eth.getBalance(exchangeAddressB);
        let outputReserveB = await tokenContractB.methods
          .balanceOf(exchangeAddressB)
          .call();
        inputReserveB = new BigNumber(inputReserveB);
        outputReserveB = new BigNumber(outputReserveB);

        // let numeratorB = outputAmountB * inputReserveB * 1000
        // let denominatorB = (outputReserveB - outputAmountB) * 997
        // let inputAmountB = numeratorB / (denominatorB + 1)
        let numeratorB = outputAmountB
          .multipliedBy(inputReserveB)
          .multipliedBy(1000);
        let denominatorB = outputReserveB
          .minus(outputAmountB)
          .multipliedBy(997);
        let inputAmountB = numeratorB.dividedBy(denominatorB.plus(1));
        // Buy ETH with TokenA
        let outputAmountA = inputAmountB;
        let inputReserveA = await tokenContractA.methods
          .balanceOf(exchangeAddressA)
          .call();
        let outputReserveA = await G.web3.eth.getBalance(exchangeAddressA);
        inputReserveA = new BigNumber(inputReserveA);
        outputReserveA = new BigNumber(outputReserveA);

        // let numeratorA = outputAmountA * inputReserveA * 1000
        // let denominatorA = (outputReserveA - outputAmountA) * 997
        // let inputAmountA = numeratorA / (denominatorA + 1)
        let numeratorA = outputAmountA
          .multipliedBy(inputReserveA)
          .multipliedBy(1000);
        let denominatorA = outputReserveA
          .minus(outputAmountA)
          .multipliedBy(997);
        let inputAmountA = numeratorA
          .dividedBy(denominatorA.plus(1))
          .dividedBy(10 ** 18);
        return inputAmountA;
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
                    <p id="uniswap-link">Powered By <a href="https://uniswapdex.com" target="_blank">UniswapDEX</a></p>
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

                          <div class="input-container">
                          <div class="input-group">
                              <label for=""><strong>From</strong></label>
                              <select id="inputCurrency" class="input-token-dropdown">
                                
                              </select>
                          </div>
                          <div class="input-group">
                              <label for="">Enter amount</label>
                              <input
                                type="text"
                                class="form-control"
                                aria-label="inputValue"
                                id="inputValue"
                                name="inputValue"
                                autocomplete="off"
                              />
                          </div>
                       </div>
    
                      
    
             <div class="input-container">
                <div class="input-group">
                    <label for=""><strong>To</strong></label>
                    <select id="outputCurrency" class="output-token-dropdown">
                     
                    </select>
                </div>
                <div class="input-group">
                    <label for="">Enter amount</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="outputValue"
                      id="outputValue"
                      name="outputValue"
                      autocomplete="off"
                    />
                </div>
             </div>
                        
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

                <div class="gitlab-source-container">
                    <p class="gitlab-source">Source on <a href="https://gitlab.com/shardus/uniswap/uniswap-widget" target="_blank">Gitlab</a></p>
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
        `;

    $("#uniswap-convert-section").html(baseWidgetTemplate);
    $("#widget-title").html(config.widgetTitle);

    let selectHTML = `<a class="dropdown-item" token-name="ETH" href="#">ETH</a>`;
    for (let i = 0; i < G.tokenList.length; i += 1) {
      selectHTML += `<a class="dropdown-item" token-name="${G.tokenList[i].symbol}" href="#">${G.tokenList[i].symbol}</a>`;
    }
    $("#uniswap-form .dropdown-menu").html(selectHTML);
    // initialiseDropdown(".input-token-dropdown");
    // initialiseDropdown(".output-token-dropdown");
    setTimeout(() => {
      updateMainTokenPrice();
      setInterval(() => {
        updateMainTokenPrice();
      }, 60000);
    }, 3000);
  }

  async function calculateULTPrice(
    inputTokenAddress,
    outputTokenAddress,
    inputValue
  ) {
    let price = await calcuateInputOutput(
      inputTokenAddress,
      outputTokenAddress,
      "EXACT_INPUT",
      inputValue
    );
    return price;
  }

  async function updateMainTokenPrice() {
    let price_ult_usd = await getChartPrices("ULT-USD");
    let price_ult_eth = await getChartPrices("ULT-ETH");
    $("#ULT-price-dai").html(`<strong>${price_ult_usd.toFixed(6)}</strong> $`);
    $("#ULT-price-eth").html(
      `<strong>${price_ult_eth.toFixed(6)}</strong> ETH`
    );

    let inputValue = $("#inputValue").val();
    let outputValue = $("#outputValue").val();
    if (inputValue === "" && outputValue === "") {
      $("#exchange-info .dai-rate").html(
        `1 ULT = ${price_ult_usd.toFixed(6)} DAI`
      );
      $("#exchange-info .eth-rate").html(
        `1 ULT = ${price_ult_eth.toFixed(6)} ETH`
      );
      console.log("ULT-DAI price is updated");
    }
  }

  async function renderUnlockButton(inputTokenAddress, inputValue) {
    if (inputTokenAddress === "ETH" || !inputValue || inputValue == 0)
      hideUnlockButton();
    else {
      const allowance = await getAllowance(inputTokenAddress, inputValue);
      const input = inputValue * Math.pow(10, 18);
      if (input > allowance) displayUnlockButton();
      else hideUnlockButton();
    }
  }

  async function getAllowance(tokenAddress, inputValue) {
    try {
      let exchangeAddress = G.exchangeAddresses[tokenAddress];
      const contract = new G.web3.eth.Contract(ERC20_ABI, tokenAddress);
      const accounts = await G.web3.eth.getAccounts();
      let allowance = await contract.methods
        .allowance(accounts[0], exchangeAddress)
        .call();
      return allowance;
    } catch (e) {
      console.log(e);
      console.log("Cannot get token allowance value !");
    }
  }

  function displayUnlockButton() {
    $("#convert-btn").attr("disabled", true);
    $(".alert").hide();
    $(".alert-unlock").show();
    $("#unlock-token-btn").css("display", "inline-block");
  }

  function hideUnlockButton() {
    $("#unlock-token-btn").css("display", "none");
    $("#convert-btn").attr("disabled", false);
    $(".alert").hide();
  }

  function checkSlippage(slippage, inputCurrency, inputValue) {
    if (slippage >= 10) {
      $("#convert-btn").attr("disabled", true);
      $(".alert").hide();
      $(".alert-high-slippage").show();
    } else {
      let isDisabled = $("#convert-btn").attr("disabled");
      $("#convert-btn").attr("disabled", false);
      $(".alert-high-slippage").hide();
      renderUnlockButton(inputCurrency, inputValue);
    }
  }

  async function updateInputOutput(lastChangedField) {
    const inputTokenAddress = $("#inputCurrency").val();
    const inputToken = getToken(inputTokenAddress);
    const outputTokenAddress = $("#outputCurrency").val();
    let inputValue;
    let outputValue;
    if (lastChangedField === "input") {
      inputValue = $("#inputValue").val();
      if (!$.isNumeric(inputValue) || inputValue <= 0) {
        $("#outputValue").val("");
        return;
      }
      outputValue = await calcuateInputOutput(
        inputTokenAddress,
        outputTokenAddress,
        "EXACT_INPUT",
        inputValue
      );
      if (outputValue > 0) {
        $("#outputValue").val(outputValue.toFixed(7));
        updateExchangeRate(
          inputTokenAddress,
          outputTokenAddress,
          inputValue,
          outputValue
        );
      } else $("#outputValue").val("");
    } else if (lastChangedField === "output") {
      outputValue = $("#outputValue").val();
      if (!$.isNumeric(outputValue) || outputValue <= 0) {
        $("#inputValue").val("");
        return;
      }
      inputValue = await calcuateInputOutput(
        inputTokenAddress,
        outputTokenAddress,
        "EXACT_OUTPUT",
        outputValue
      );
      if (inputValue > 0) {
        $("#inputValue").val(inputValue.toFixed(7));
        updateExchangeRate(
          inputTokenAddress,
          outputTokenAddress,
          inputValue,
          outputValue
        );
      } else $("#inputValue").val("");
    }
    renderUnlockButton(inputTokenAddress, inputValue);
  }

  async function updateExchangeRate(
    inputTokenAddress,
    outputTokenAddress,
    inputValue,
    outputValue
  ) {
    if (inputTokenAddress === mainToken.tokenAddress) {
      if (outputTokenAddress !== "ETH") {
        let tokenExchangeAddressA = G.exchangeAddresses[inputTokenAddress];
        let tokenContractA = G.tokenContracts[inputTokenAddress];
        let ethReserveA = await G.web3.eth.getBalance(tokenExchangeAddressA);
        let tokenRserveA = await tokenContractA.methods
          .balanceOf(tokenExchangeAddressA)
          .call();
        ethReserveA = new BigNumber(ethReserveA);
        tokenRserveA = new BigNumber(tokenRserveA);
        let absPriceA = tokenRserveA.dividedBy(ethReserveA);

        let tokenExchangeAddressB = G.exchangeAddresses[outputTokenAddress];
        let tokenContractB = G.tokenContracts[outputTokenAddress];
        let ethReserveB = await G.web3.eth.getBalance(tokenExchangeAddressB);
        let tokenReserveB = await tokenContractB.methods
          .balanceOf(tokenExchangeAddressB)
          .call();
        ethReserveB = new BigNumber(ethReserveB);
        tokenReserveB = new BigNumber(tokenReserveB);
        let absPriceB = tokenReserveB.dividedBy(ethReserveB);

        let absPrice = absPriceB.dividedBy(absPriceA);
        absPrice = absPrice.toFixed(8);

        let exchangeRate = outputValue / inputValue;
        let slippage = (100 * Math.abs(absPrice - exchangeRate)) / absPrice;

        $("#exchange-info .dai-rate").html(
          `1 ULT = ${exchangeRate.toFixed(6)} ${
            getToken(outputTokenAddress).symbol
          }`
        );
        $("#slippage").html(`${slippage.toFixed(2)} %`);
        checkSlippage(slippage, inputTokenAddress, inputValue);

        calculateULTPrice(mainToken.tokenAddress, "ETH", inputValue).then(
          output => {
            let exchangeRate = output / inputValue;
            $("#exchange-info .eth-rate").html(
              `1 ULT = ${exchangeRate.toFixed(6)} ETH`
            );
          }
        );
      } else if (outputTokenAddress === "ETH") {
        let tokenExchangeAddress = G.exchangeAddresses[inputTokenAddress];
        let tokenContract = G.tokenContracts[inputTokenAddress];
        let ethReserve = await G.web3.eth.getBalance(tokenExchangeAddress);
        let tokenRserve = await tokenContract.methods
          .balanceOf(tokenExchangeAddress)
          .call();
        ethReserve = new BigNumber(ethReserve);
        tokenRserve = new BigNumber(tokenRserve);

        let absPrice = ethReserve.dividedBy(tokenRserve);
        absPrice = absPrice.toFixed(8);

        // let absPrice = await getULTToETHPrice()
        let exchangeRate = outputValue / inputValue;
        let slippage = (100 * Math.abs(absPrice - exchangeRate)) / absPrice;
        $("#exchange-info .eth-rate").html(
          `1 ULT = ${exchangeRate.toFixed(6)} ${outputTokenAddress}`
        );
        $("#slippage").html(`${slippage.toFixed(2)} %`);
        checkSlippage(slippage, inputTokenAddress, inputValue);

        calculateULTPrice(
          mainToken.tokenAddress,
          DaiTokenAddress,
          inputValue
        ).then(output => {
          let exchangeRate = output / inputValue;
          $("#exchange-info .dai-rate").html(
            `1 ULT = ${exchangeRate.toFixed(6)} DAI`
          );
        });
      }
    } else if (outputTokenAddress === mainToken.tokenAddress) {
      if (inputTokenAddress !== "ETH") {
        let tokenExchangeAddressA = G.exchangeAddresses[inputTokenAddress];
        let tokenContractA = G.tokenContracts[inputTokenAddress];
        let ethReserveA = await G.web3.eth.getBalance(tokenExchangeAddressA);
        let tokenRserveA = await tokenContractA.methods
          .balanceOf(tokenExchangeAddressA)
          .call();
        ethReserveA = new BigNumber(ethReserveA);
        tokenRserveA = new BigNumber(tokenRserveA);
        let absPriceA = tokenRserveA.dividedBy(ethReserveA);

        let tokenExchangeAddressB = G.exchangeAddresses[outputTokenAddress];
        let tokenContractB = G.tokenContracts[outputTokenAddress];
        let ethReserveB = await G.web3.eth.getBalance(tokenExchangeAddressB);
        let tokenReserveB = await tokenContractB.methods
          .balanceOf(tokenExchangeAddressB)
          .call();
        ethReserveB = new BigNumber(ethReserveB);
        tokenReserveB = new BigNumber(tokenReserveB);
        let absPriceB = tokenReserveB.dividedBy(ethReserveB);

        let absPrice = absPriceB.dividedBy(absPriceA);
        absPrice = absPrice.toFixed(8);

        let exchangeRate = outputValue / inputValue;
        let slippage = (100 * Math.abs(absPrice - exchangeRate)) / absPrice;
        $("#exchange-info .dai-rate").html(
          `1 ${getToken(inputTokenAddress).symbol} = ${exchangeRate.toFixed(
            6
          )} ${mainToken.symbol}`
        );
        $("#slippage").html(`${slippage.toFixed(2)} %`);
        checkSlippage(slippage, inputTokenAddress, inputValue);

        calculateULTPrice("ETH", mainToken.tokenAddress, inputValue).then(
          ethOutput => {
            let exchangeRate = ethOutput / inputValue;
            $("#exchange-info .eth-rate").html(
              `1 ETH = ${exchangeRate.toFixed(6)} ${mainToken.symbol}`
            );
          }
        );
      } else if (inputTokenAddress === "ETH") {
        let tokenExchangeAddress = G.exchangeAddresses[outputTokenAddress];
        let tokenContract = G.tokenContracts[outputTokenAddress];
        let ethReserve = await G.web3.eth.getBalance(tokenExchangeAddress);
        let tokenRserve = await tokenContract.methods
          .balanceOf(tokenExchangeAddress)
          .call();
        ethReserve = new BigNumber(ethReserve);
        tokenRserve = new BigNumber(tokenRserve);
        let absPrice = tokenRserve.dividedBy(ethReserve);
        absPrice = absPrice.toFixed(8);

        // let absPrice = await getULTToETHPrice()
        // absPrice = 1 / absPrice
        let exchangeRate = outputValue / inputValue;
        let slippage = (100 * Math.abs(absPrice - exchangeRate)) / absPrice;
        $("#exchange-info .eth-rate").html(
          `1 ${inputTokenAddress} = ${exchangeRate.toFixed(6)} ${
            mainToken.symbol
          }`
        );
        $("#slippage").html(`${slippage.toFixed(2)} %`);
        checkSlippage(slippage, inputTokenAddress, inputValue);

        calculateULTPrice(
          DaiTokenAddress,
          mainToken.tokenAddress,
          inputValue
        ).then(daiOutput => {
          let exchangeRate = daiOutput / inputValue;
          $("#exchange-info .dai-rate").html(
            `1 DAI = ${exchangeRate.toFixed(6)} ${mainToken.symbol}`
          );
        });
      }
    }
  }
};

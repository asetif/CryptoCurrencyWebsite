import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();


export default new Vuex.Store({
  state: {
    cryptoList:[],
    page_number:1,
    cryptoData:{},
  },
  mutations: {
    fillCryptoList(state,payload){
      state.cryptoList=payload
    },
    increment(state){
      state.page_number+=1
    },
    decrement(state){
      if(state.page_number==1){
        return;
      }
      state.page_number-=1
    },
    fillCrypto(state,payload){
      state.cryptoData = payload
    }
  },
  actions: {
    async getCryptoList(context){
      const result = await CoinGeckoClient.coins.markets({vs_currency:'eur',ids:"",order:"",per_page:20,page:this.state.page_number,sparkline:false});
      context.commit('fillCryptoList',result)
    },
    async getCryptoDetails(context,index){
      const result= await CoinGeckoClient.coins.fetch(index);
      console.log(result)
      context.commit('fillCrypto',result)
    }
  },
  modules: {
  }
})

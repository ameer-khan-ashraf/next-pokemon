import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export interface IGetPokemonArgs {
    limit?:number,
    offset?:number
}

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
    }
    },
    endpoints: (builder) => ({
      getPokemonByName: builder.query<any, string>({
        query: (name) => `pokemon/${name}`,
      }),
      listPokemon:builder.query<any,IGetPokemonArgs>({
        query:({limit=20,offset=0})=>{
            return `pokemon?limit=${limit}&offset=${limit*offset}`
        }
      })
    }),
  })
  


export const {
    useGetPokemonByNameQuery,
    useListPokemonQuery,
    util:{getRunningQueriesThunk}
} = pokemonApi

export const {getPokemonByName,listPokemon} = pokemonApi.endpoints
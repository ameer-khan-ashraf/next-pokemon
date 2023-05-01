import { getPokemonByName, getRunningQueriesThunk, useGetPokemonByNameQuery } from '@/services/pokemon'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { wrapper } from '@/store'
import Link from 'next/link'

const Pokemon = ({}) => {
  const router = useRouter()
  const [pokemonName, setPokemonName] = useState<any>(router.query.name||'')
  const {data, error, isLoading } = useGetPokemonByNameQuery(pokemonName)
  const [pokemonImage,setPokemonImage] = useState(null)

  useEffect(() => {
    if(data?.sprites){
      setPokemonImage(data?.sprites.front_default)
    }
  }, [data])
  
  return (
    <div>
      {error?<div>Something went wrong</div>:
      isLoading?<div>Loading...</div>:
      data?<div>
        <Link href='/'>Home</Link>
        <h1>{data.name}</h1>
        {
          pokemonImage?
          <Image alt={`${data.name}-pic`} width={100} height={100} src={pokemonImage}/>:
          <span>Loading Image</span>
        }
      </div>:
      null}
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) =>{
    const name = context.params?.name
    if(typeof name === 'string'){
      store.dispatch(getPokemonByName.initiate(name))
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    return{
      props:{}
    }
  }
)

export default Pokemon
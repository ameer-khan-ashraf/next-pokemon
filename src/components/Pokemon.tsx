import { useGetPokemonByNameQuery } from '@/services/pokemon'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface IPokemonProps {
    name:string
}

const Pokemon = ({name}:IPokemonProps) => {
  const {data, error, isLoading } = useGetPokemonByNameQuery(name)
  const [pokemonImage,setPokemonImage] = useState(null)

  useEffect(() => {
    if(data?.sprites){
      setPokemonImage(data?.sprites.front_default)
    }
  }, [data])

  return (
    <div className='flex flex-col items-center justify-center hover:outline outline-white rounded-md'>
      {error?<div>Something went wrong</div>:
      isLoading?<div>Loading...</div>:
      data?<div>
        {
          pokemonImage?
          <Image alt={`${data.name}-pic`} width={100} height={100} src={pokemonImage}/>:
          <span>Loading Image</span>
        }
        <h1 className='text-center'>{data.name}</h1>
      </div>:
      null}
    </div>
  )
}

export default Pokemon
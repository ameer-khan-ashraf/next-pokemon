import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import Link from 'next/link'
import Pokemon from '@/components/Pokemon'
import { wrapper } from '@/store'
import { getRunningQueriesThunk, listPokemon, useListPokemonQuery } from '@/services/pokemon'

const inter = Inter({ subsets: ['latin'] })

export default function Home({}:any) {
  
  const {data} = useListPokemonQuery({})
  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-5 p-24 ${inter.className}`}
    >
      <span>What Pokemon do you choose?</span>
      <div className='grid grid-cols-6 gap-4'>
        {
          data.results.map((pokemon:any)=><Link href={`/${pokemon.name}`} key={pokemon.name}>
            <Pokemon name={pokemon.name}/>
          </Link>)
        }
      </div>
    </main>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(listPokemon.initiate({}))
    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    return {
      props:{}
    }
  }
)
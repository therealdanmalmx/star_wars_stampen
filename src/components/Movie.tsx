import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmTitleSlug } from '../../utils/helpers';

type Film = {
    episode_id: number;
    title: string;
    opening_crawl: string;
}


const Movie = () => {
    const [filmInfo, setFilmInfo] = useState({} as Film)
    const { id } = useParams();

    useEffect(() => {
        const getSingleFilm = async (id: string | undefined) => {
            const response = await fetch(`https://swapi.dev/api/films/${id}`)
            const data = await response.json()
            setFilmInfo(data)
            console.log( {data} )
            console.log(data.title)
        }
        console.log({filmInfo})
        getSingleFilm(id);
    }, [id])

    return (
        <div className='flex'>
            {filmInfo && filmInfo.title && (
                <div key={filmInfo.episode_id} className='flex justify-between'>
                    <img src={`/src/assets/${getFilmTitleSlug(filmInfo.title)}.jpg`} alt={`${filmInfo.title} image`} className="h-[650px] object-cover" />
                    <div>
                        <h1 className='bg-black text-yellow-500 p-8 w-full text-center text-5xl uppercase font-bold'>{filmInfo.title}</h1>
                        <p className='mx-12 text-xl'>{filmInfo.opening_crawl}</p>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Movie
import { useState, useRef, useCallback } from "react"
import useImageSearch from "../hooks/useImageSearch"
import Navbar from "../components/Navbar";
import SmallImage from "../components/SmallImage";
import homeStyles from '../styles/home.module.css';
import SmallImageSkeleton from "../components/SmallImageSkeleton";
import LargeImage from "../components/LargeImage";
import axios from "axios";

function Home() {
    const [query, setQuery] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false);
    const [imageId, setImageId] = useState<string | null>(null);
    const [imageLink, setImageLink] = useState<string | undefined>(undefined);
    
    const observer = useRef<IntersectionObserver | null>(null);
    
    const {
        images,
        isLoading,
        fetchNextPage,
        error,
        hasMore
    } = useImageSearch(query)


    
    const lastImage = useCallback((node: Element | null) => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
             fetchNextPage();
        }
    })
        if (node) observer.current.observe(node)
    }, [hasMore])

    const handleSearch = (search: string) => {
        setQuery(search)
    }

    const openModal = (id: string, link: string) => {
        axios.get(`https://api.unsplash.com/photos?`)

        setImageId(id)
        setImageLink(link)
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }
  
    return (
        <>
            <Navbar handleSearch={handleSearch} query={query} />
            <div className={homeStyles.imageSection} >
                {images?.map((image, index) => {
                const key = image.id ? image.id : index;
                if (images.length === index + 1) {
                    return <SmallImage openModal={openModal} imageId={image.id} key={key} ref={lastImage} url={image.urls.small} name={image.alt_description} />
                } else {
                    return <SmallImage openModal={openModal} imageId={image.id} key={key} url={image.urls.small} name={image.alt_description} />
                }})}
            </div>
            <div>{isLoading && !error && <div className={homeStyles.imageSection}> <SmallImageSkeleton /> </div> }</div>
            <div>{error && 'Something unexpected happened. Please try again later.'}</div>

            {modal && imageId && <LargeImage imageUrl={imageLink} imageId={imageId} closeModal={closeModal} />}
        </>
    )
}

export default Home
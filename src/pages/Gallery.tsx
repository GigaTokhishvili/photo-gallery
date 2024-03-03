import { useState } from "react";
import Navbar from "../components/Navbar"
import { useQueryClient } from "@tanstack/react-query"
import galleryStyles from '../styles/gallery.module.css'
import SmallImage from "../components/SmallImage";
import axios from "axios";
import LargeImage from "../components/LargeImage";

function Gallery() {
  const [data, setData] = useState()
  const [modal, setModal] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const [imageLink, setImageLink] = useState<string | undefined>(undefined);
  
  const queryClient = useQueryClient();

  const queryKeys = queryClient.getQueryCache().findAll().map(query => query.queryKey);

  const handleClick = (queryKey: [string]) => {
    const data = queryClient.getQueryData(queryKey);
    setData(data.pages[0].results);
  };

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
      <Navbar />
      <div>
        <div className={galleryStyles.queryDiv}>  
          {queryKeys.map((queryKey, index) => (
            <button className={galleryStyles.queryButton} key={index} onClick={() => handleClick(queryKey)}>
              {JSON.stringify(queryKey)}
            </button>
            ))}
        </div>

        <div className={galleryStyles.imageSection} >
                {data?.map((image, index) => {
                const key = image.id ? image.id : index;
                if (data.length === index + 1) {
                    return <SmallImage openModal={openModal} imageId={image.id} key={key} url={image.urls.small} name={image.alt_description} />
                } else {
                    return <SmallImage openModal={openModal} imageId={image.id} key={key} url={image.urls.small} name={image.alt_description} />
                }})}
            </div>
    </div>
    {modal && imageId && <LargeImage imageUrl={imageLink} imageId={imageId} closeModal={closeModal} />}
    </>
    
  )
}

export default Gallery
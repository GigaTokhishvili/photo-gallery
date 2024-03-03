import { forwardRef } from 'react'
import smallImageStyles from '../styles/smallImage.module.css'

interface smallImageProps {
    openModal: (id: string, link: string) => void;
    url: string;
    name: string;
    imageId: string;
}

const SmallImage = forwardRef<HTMLDivElement, smallImageProps> (({ url, name, openModal, imageId}, ref) => {
    return (
        <div onClick={() => openModal(imageId, url)} ref={ref} className={smallImageStyles.smallImageDiv}>
            <img src={url} alt={name} className={smallImageStyles.image} />
        </div>
    )
})

export default SmallImage
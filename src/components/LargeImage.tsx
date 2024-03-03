import largeImageStyles from '../styles/largeImage.module.css';

interface LargeImageProps {
  closeModal: () => void;
  imageId: string,
  imageUrl: string | undefined,
}

const LargeImage: React.FC<LargeImageProps> = ({ closeModal, imageId, imageUrl }) => {
  return (
    <div onClick={() => closeModal()} className={largeImageStyles.largeImageSection}>
        <div onClick={e => e.stopPropagation()} className={largeImageStyles.largeImageDiv} >
            <img id={imageId} src={imageUrl} alt="img" className={largeImageStyles.largeImage} />
        </div>
    </div>
  );
}

export default LargeImage;
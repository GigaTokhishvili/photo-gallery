import { FC } from 'react'
import skeletonStyles from '../styles/smallImageSkeleton.module.css'

const SmallImageSkeleton:FC = () => {
  return (
    <>
        <div className={skeletonStyles.imageSkeletonDiv}></div>
        <div className={skeletonStyles.imageSkeletonDiv}></div>
        <div className={skeletonStyles.imageSkeletonDiv}></div>
        <div className={skeletonStyles.imageSkeletonDiv}></div>

        <div className={skeletonStyles.imageSkeletonDiv}></div>
        <div className={skeletonStyles.imageSkeletonDiv}></div>
        <div className={skeletonStyles.imageSkeletonDiv}></div>
        <div className={skeletonStyles.imageSkeletonDiv}></div>
    </>
  )
}

export default SmallImageSkeleton
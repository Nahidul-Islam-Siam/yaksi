import InfiniteScrollGallery from '@/components/pages/gallery/InfiniteScrollGallery'
import HeroBanner from '@/components/shared/HeroBanner/HeroBanner'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Gallery | JetXClub',
    description: 'Enjoy the moments of our members at JetXClub!',
};

const GalleryPage = () => {
    return (
        <div>
            <HeroBanner
                title="Gallery"
                subtitle="The smarter, more affordable alternative to ownership."
            />
            <InfiniteScrollGallery />
        </div>
    )
}

export default GalleryPage;
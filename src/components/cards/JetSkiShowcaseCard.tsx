'use client';

import {  TJetSki } from '@/type/type';
import Image from 'next/image';

interface JetSkiShowcaseCardProps {
     jetSki: TJetSki;
}

export default function JetSkiShowcaseCard({
    jetSki,
}: JetSkiShowcaseCardProps) {
    // Get brand from jetSki model (extract brand name from model)
    const getBrandFromModel = (model: string) => {
        if (model.includes('Sea-Doo')) return 'SEADOO';
        if (model.includes('Yamaha')) return 'YAMAHA';
        if (model.includes('Kawasaki')) return 'KAWASAKI';
        return 'SEADOO'; // default
    };

    const brand = jetSki ? getBrandFromModel(jetSki.name) : 'SEADOO';
    const model = jetSki ? jetSki.model : 'GTI 130';
    const hp = jetSki ? jetSki.hp : 130;

    return (
      <div
        className={`w-full rounded-2xl overflow-hidden shadow-lg transition-all duration-300 bg-white hover:shadow-xl`}
      >
        {/* Image Section with Overlay */}
        <div className="relative">
          <Image
            src={
              jetSki?.images?.[0] ||
              "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
            }
            alt={model}
            width={500}
            height={400}
            className="w-full h-56 2xl:h-72 object-cover"
          />

          {/* Overlay Text */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
            <div>
              <p className="text-sm uppercase tracking-wider font-medium mix-blend-difference opacity-90">
                {brand}
              </p>
              <h3 className="text-2xl font-bold leading-tight mix-blend-difference">
                {model}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold mix-blend-difference">
                <span className="text-3xl mix-blend-difference">{hp}</span> HP
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-6 bg-gray-50`}>
          {/* Price */}
          <p className={`text-sm font-medium mb-3 text-gray-900`}>
            ${jetSki.price}/Day
          </p>

          {/* Description */}
          <p className={`text-sm leading-relaxed text-gray-600 line-clamp-3`}>
            {jetSki.description}
          </p>
        </div>
      </div>
    );
}
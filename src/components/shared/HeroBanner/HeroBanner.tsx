interface HeroBannerProps {
    title: string;
    subtitle?: string;
}

export default function HeroBanner({ title, subtitle }: HeroBannerProps) {
    return (
        <section className="bg-black text-white pb-16 md:pb-20 pt-32 md:pt-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
                    {title}
                </h1>
                {
                    subtitle && (
                        <p className="mt-3 text-base md:text-lg text-gray-300 font-light">
                            {subtitle}
                        </p>
                    )
                }
            </div>
        </section>
    );
}
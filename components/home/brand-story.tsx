export function BrandStory() {
  return (
    <section className="relative bg-muted overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/Minimalist_Skincare_Brand_Video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            The VÉRA Standard
          </h2>
          <p className="mt-6 text-white/90 leading-relaxed">
            Every formula is developed to deliver results you can see and
            measure. We use only ingredients with proven efficacy, at
            concentrations that work.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-center">
            <div>
              <h3 className="font-medium text-white">Clinically Tested</h3>
              <p className="mt-2 text-sm text-white/80">
                Every product undergoes rigorous testing for safety and
                efficacy.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white">Clean Formulas</h3>
              <p className="mt-2 text-sm text-white/80">
                No parabens, sulfates, or synthetic fragrances. Only what your
                skin needs.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-white">Sustainable</h3>
              <p className="mt-2 text-sm text-white/80">
                Recyclable packaging and responsibly sourced ingredients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

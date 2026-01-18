export function BrandStory() {
  return (
    <section className="bg-muted">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            The VÉRA Standard
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Every formula is developed to deliver results you can see and
            measure. We use only ingredients with proven efficacy, at
            concentrations that work.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-center">
            <div>
              <h3 className="font-medium">Clinically Tested</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every product undergoes rigorous testing for safety and
                efficacy.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Clean Formulas</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No parabens, sulfates, or synthetic fragrances. Only what your
                skin needs.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Sustainable</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Recyclable packaging and responsibly sourced ingredients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

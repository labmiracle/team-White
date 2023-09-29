import React from "react";

interface EventCompleteProps {
  // If you have any props to pass to the Footer component, define their types here.
  // For example, if you have a prop named "year" of type number:
  // year: number;
}

const EventComplete: React.FC<EventCompleteProps> = () => {
  return (
    <>
      <main>
        <header>
          <h1>Titulo del evento</h1>
        </header>

        <section>
          <h2>Fecha del evento</h2>

        </section>

        <section>
          <div>
            <img src="" alt="Foto del evento" />
          </div>
          <div>detalles</div>
        </section>

        <section>
          <h2>Descripción del evento</h2>
          <p>

          </p>
        </section>
      </main>
    </>
  );
};

export default EventComplete;

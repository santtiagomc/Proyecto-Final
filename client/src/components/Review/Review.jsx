import style from "./Review.module.css";

export default function Review() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Reviews</h2>
      <div className={style.reviewContainer}>
        <div className={style.userContainer}>
          <h3 className={style.user}>Jane Doe</h3>
          <div>
            <span className={style.star}>&#9733;</span>
            <span className={style.star}>&#9733;</span>
            <span className={style.star}>&#9733;</span>
            <span className={style.star}>&#9733;</span>
            <span className={style.star}>&#9733;</span>
          </div>
        </div>
        <p className={style.review}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et
          accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias
          excepturi sint occaecati cupiditate non provident, similique sunt in
          culpa qui officia deserunt mollitia animi, id est laborum et dolorum
          fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
          libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat facere
        </p>
      </div>
      <div className={style.reviewContainer}>
        <div className={style.userContainer}>
          <h3 className={style.user}>Jonh Doe</h3>
          <div>
            <span className={style.star}>&#9733;</span>
            <span className={style.star}>&#9733;</span>
            <span className={style.star}>&#9733;</span>
          </div>
        </div>
        <p className={style.review}>
          Reina en mi espíritu una alegría admirable, muy parecida a las dulces
          alboradas de la primavera, de que gozo aquí con delicia. Estoy solo, y
          me felicito de vivir en este país, el más a propósito para almas como
          la mía, soy tan dichoso, mi querido amigo, me sojuzga de tal modo la
          idea de reposar, que no me ocupo de mi arte. Ahora no sabría dibujar,
          ni siquiera hacer una línea con el lápiz; y, sin embargo, jamás he
          sido mejor pintor Cuando el valle se vela en torno mío con un encaje
          de vapores; cuando el sol de
        </p>
      </div>
      <div className={style.reviewContainer}>
        <div className={style.userContainer}>
          <h3 className={style.user}>no se</h3>
          <div>
            <span className={style.star}>&#9733;</span>
            <span className={style.star}>&#9733;</span>
          </div>
        </div>
        <p className={style.review}>
          Muy lejos, más allá de las montañas de palabras, alejados de los
          países de las vocales y las consonantes, viven los textos simulados.
          Viven aislados en casas de letras, en la costa de la semántica, un
          gran océano de lenguas. Un riachuelo llamado Pons fluye por su pueblo
          y los abastece con las normas necesarias. Hablamos de un país
          paraisomático en el que a uno le caen pedazos de frases asadas en la
          boca. Ni siquiera los todopoderosos signos de puntuación dominan a los
          textos simulados; una vida, se puede decir, poco ortográfica. Pero un
          buen día, una pequeña línea de texto simulado, llamada Lorem Ipsum,
          decidió aventurarse y salir al vasto mundo de la gramática. El gran
          Oxmox le desanconsejó hacerlo, ya que esas tierras estaban llenas de
          comas malvadas, signos de interrogación salvajes y puntos y coma
          traicioneros, pero el texto simulado no se dejó atemorizar. Empacó sus
          siete versales, enfundó su inicial en el cinturón y se puso en camino.
          Cuando ya había escalado las primeras colinas de las montañas
          cursivas, se dio media vuelta para dirigir su mirada por última vez,
          hacia su ciudad natal Letralandia, el encabezamiento del pueblo
          Alfabeto y el subtítulo de su propia calle, la calle del renglón. Una
          pregunta retórica se le pasó por la mente y le puso melancólico, pero
          enseguida reemprendió su marcha. De nuevo en camino, se encontró con
          una copia. La copia advirtió al pequeño texto simulado de que en el
          lugar del que ella venía, la habían reescrito miles de veces y que
          todo lo que había quedado de su original era la palabra "y", así que
          más le valía al pequeño texto simulado volver a su país, donde estaría
          mucho más seguro. Pero nada de lo dicho por la copia pudo convencerlo,
          de manera que al cabo de poco tiempo, unos pérfidos redactores
          publicitarios lo encontraron y emborracharon con Longe y Parole para
          llevárselo después a su agencia, donde abusaron de él para sus
          proyectos, una y otra vez. Y si aún no lo han reescrito, lo siguen
          utilizando hasta ahora.Muy lejos, más allá de las montañas de
          palabras, alejados de los países de las vocales y las consonantes,
          viven los textos simulados. Viven aislados en casas de letras, en la
          costa de la semántica, un gran océano de lenguas. Un riachuelo llamado
          Pons fluye por su pueblo y los abastece con las normas
        </p>
      </div>
    </div>
  );
}

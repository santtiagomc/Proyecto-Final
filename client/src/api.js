const api = {
  books: [
    {
      id: 1,
      name: "Este Dolor No Es Mio",
      author: "Wolynn Mark",
      description: `DEPRESIÓN. ANSIEDAD. DOLORES CRÓNICOS. FOBIAS. PENSAMIENTOS OBSESIVOS.
      La evidencia científca muestra que los traumas pueden ser heredados.
      Existen pruebas fiables de que muchos problemas crónicos o de largo plazo pueden no tener su origen en nuestras vivencias inmediatas o en desequilibrios químicos de nuestro cerebro, sino en las vidas de nuestros padres, abuelos o bisabuelos.
      Mark Wolynn, fundador y director del Instituto de Constelaciones Familiares (FCI) y pionero en el estudio de los traumas familiares heredados, presenta en "Este dolor no es mío" un enfoque transformador que permite resolver problemas crónicos que no han podido ser aliviados mediante la terapia tradicional, los medicamentos u otras medidas.`,
      price: 1299,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9788484456810_1.jpg?id_com=1113",
      genre: "Accion",
      stock: 1,
      editorial: "GAIA EDICIONES",
      edition: 1990,
    },
    {
      id: 2,
      name: "Harry Potter I Y La Piedra Filosofal",
      author: "Rowling, J. K.",
      description: `Harry Potter se ha quedado huérfano y vive en casa de sus abominables tíos y del insoportable primo Dudley. Se siente muy triste y solo, hasta que un buen día recibe una carta que cambiará su vida para siempre. En ella le comunican que ha sido aceptado como alumno en el colegio interno Hogwarts de magia y hechicería.
      A partir de ese momento, la suerte de Harry da un vuelco espectacular. En esa escuela tan especial aprenderá encantamientos, trucos fabulosos y tácticas de defensa contra las malas artes. Se convertirá en el campeón escolar de quidditch, especie de fútbol aéreo que se juega montado sobre escobas, y hará un puñado de buenos amigos... aunque también algunos temibles enemigos. Pero, sobre todo, conocerá los secretos que le permitirán cumplir con su destino. Pues, aunque no lo parezca a primera vista, Harry no es un chico común y corriente. ¡Es un verdadero mago!`,
      price: 3799,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_885399-MLA42274904648_062020-O.webp",
      genre: "Terror",
      stock: 300,
      editorial: "Salamandra",
      edition: 2020,
    },
    {
      id: 3,
      name: "Gaturro Mundial Qatar 2022",
      author: "Nik",
      description: `¡Gaturro va al mundial y lo quiere compartir con vos! En este comic encontrá 39 tiras inéditas, datos y curiosidades de los 32 países que participarán del Mundial Qatar. Información sobre los jugadores estrella y contenido exclusivo sobre los estadios increíbles donde tendrán lugar los partidos.

      Los mejores chistes de Mundial, jugadores de los 32 países participantes, datos curiosos, los 8 estadios y mucho más!!!`,
      price: 1299,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_779250-MLA30414595995_052019-O.webp",
      genre: "Comedia",
      stock: 20,
      editorial: "Catapulta",
      edition: 2022,
    },
    {
      id: 4,
      name: "Juego De Tronos (canción De Hielo Y Fuego 1)",
      author: "George Martin",
      description: `JUEGO DE TRONOS ES EL PRIMER VOLUMEN DE CANCIÓN DE HIELO Y FUEGO, LA MONUMENTAL SAGA DE FANTASÍA ÉPICA DEL ESCRITOR GEORGE R. R. MARTIN QUE HA VENDIDO MÁS DE 20 MILLONES DE EJEMPLARES EN TODO EL MUNDO. TRADUCIDA A MÁS DE 30 IDIOMAS, ESTA NOVELA HA SIDO ADAPTADA A LA TELEVISIÓN EN UNA SUPERPRODUCCIÓN DE HBO.

      EN EL LEGENDARIO MUNDO DE LOS SIETE REINOS, DONDE EL VERANO PUEDE DURAR DÉCADAS Y EL INVIERNO TODA UNA VIDA, Y DONDE RASTROS DE UNA MAGIA INMEMORIAL SURGEN EN LOS RINCONES MÁS SOMBRÍOS, LA TIERRA DEL NORTE, INVERNALIA, ESTÁ RESGUARDADA POR UN COLOSAL MURO DE HIELO QUE DETIENE A FUERZAS OSCURAS Y SOBRENATURALES. EN ESTE MAJESTUOSO ESCENARIO, LORD STARK Y SU FAMILIA SE ENCUENTRAN EN EL CENTRO DE UN CONFLICTO QUE DESATARÁ TODAS LAS PASIONES: LA TRAICIÓN Y LA LEALTAD, LA COMPASIÓN Y LA SED DE VENGANZA, EL AMOR Y EL PODER, LA LUJURIA Y EL INCESTO, TODO ELLO PARA GANAR LA MÁS MORTAL DE LAS BATALLAS: EL TRONO DE HIERRO, UNA PODEROSA TRAMPA QUE ATRAPARÁ A LOS PERSONAJES... Y AL LECTOR.`,
      price: 6.299,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9788484456810_1.jpg?id_com=1113",
      genre: "Fantasia",
      stock: 12,
      editorial: "Debolsillo",
      edition: 1987,
    },
    {
      id: 5,
      name: "El resplandor",
      author: "King Stephen",
      description: `Danny tenía cinco años, y a esa edad pocos niños saben que los espejos invierten las imágenes, y menos aún pueden diferenciar entre realidad y fantasía. Pero Danny tenía pruebas de que sus fantasías relacionadas con el resplandor del espejo acabarían cumpliéndose. Su madre estaba pensando en el divorcio, y su padre, obsesionado con algo muy malo, tan malo como la muerte y el suicidio, necesitaba aceptar la propuesta de cuidar aquel hotel de lujo, con más de cien habitaciones y aislado por la nieve, durante seis meses. Hasta el deshielo iban a estar solos. ¿Solos? `,
      price: 4.814,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_679936-MLA33018282359_112019-O.webp",
      genre: "Terror",
      stock: 80,
      editorial: "DEBOLSILLO",
      edition: 2019,
    },
    {
      id: 6,
      name: "Violeta",
      author: "Allende Isabel",
      description: `Violeta, la primera niña de una familia de cinco bulliciosos hermanos, viene al mundo un tormentoso día de 1920. Desde el principio su vida estará marcada por acontecimientos extraordinarios, pues todavía se sienten las ondas expansivas de la Gran Guerra cuando la gripe española llega a las orillas de su país sudamericano natal, casi en el momento exacto de su nacimiento. Gracias a la clarividencia del padre, la familia saldrá indemne de esta crisis para enfrentarse a una nueva, cuando la Gran Depresión altera la elegante vida urbana que Violeta ha conocido hasta ahora. Lo perderán todo y se verán obligados a retirarse a una región salvaje y remota del país. Allí Violeta alcanzará la mayoría de edad y tendrá su primer pretendiente... En una larga carta dirigida a una persona a la que ama por encima de todas las demás, Violeta rememora devastadores desengaños amorosos y romances apasionados, momentos de pobreza y también de prosperidad, pérdidas terribles e inmensas alegrías. Moldearán su vida algunos de los grandes sucesos de la historia: la lucha por los derechos de la mujer, el auge y la caída de tiranos y, en última instancia, no una sino dos pandemias.

      Vista con los ojos de una mujer poseedora de una pasión, una determinación y un sentido del humor inolvidables que la sostienen a lo largo de una vida turbulenta, Isabel Allende nos regala, una vez más, una historia épica profundamente inspiradora y emotiva.`,
      price: 1299,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9789500766647_1.jpg?id_com=1113",
      genre: "Romance",
      stock: 1,
      editorial: "SUDAMERICANA",
      edition: 2021,
    },
    {
      id: 7,
      name: "Vista Desde Una Acera",
      author: "Allende Isabel",
      description: `Esta es la historia de Fernando y Adrian, dos jovenes colombianos, estudiantes universitarios de literatura, novios. Tambien es la historia de sus dificultades .económicas, familiares, personales. y de sus deseos y proyectos compartidos. Pero es, ademas y tragicamente, la historia de un diagnostico: el de HIV positivo en una época en que su efecto sólo podía ser devastador para la salud y el futuro de ambos. Luminosa y desgarradora, Vista desde una acera es una novela que conmueve por lo crudo de su relato y al mismo tiempo asombra por la gracia y belleza de su lenguaje. Como en Un beso de Dick, su otra novela, Fernando Molano Vargas ofrece aqui un alegato a favor del amor, los sentimientos y la literatura. `,
      price: 2790,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9789878473536_1.jpg?id_com=1113",
      genre: "Aventura",
      stock: 800,
      editorial: "Blatt & Rios",
      edition: 800,
    },
    {
      id: 8,
      name: "Treinta Y Seis Metros",
      author: "Ambao Santiago",
      description: `Cosas que pasan porque sí, cafés que se tiran a la pileta sin beber, tostadas que se tiran a la basura sin comer, un protagonista que trata de poner name a sus sentimientos pero que se obliga a no pensar en determinadas direcciones, una mujer que casi siempre está en la ducha o tras otro tipo de mamparas, otra mujer que asoma como promesa pero que apenas se roza, una chica inocente y ligeramente bizca, un funcionario que enloquece justo cuando esta llegando a su jubilación, un jefe o dos que hacen y deshacen a su antojo, dos niños que se sumergen en la realidad deformada de la Play Station, un televisor de última generación, un sillón confortable y la mejor cafetera posible, el deseo no cumplido de ir a pescar en familia, una fuga interior, una fuga futura.`,
      price: 2500,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9788484456810_1.jpg?id_com=1113",
      genre: "Suspenso",
      stock: 304,
      editorial: "Barret",
      edition: 2022,
    },
    {
      id: 9,
      name: "El Sutil Arte De Que (casi Todo) Te Importe Una Mierda",
      author: "Mark Marson",
      description: `En esta guia de autoayuda, el bestseller internacional que esta definiendo a toda una generacion, el bloguero superestrella Mark Manson nos demuestra que la clave para ser personas mas seguras y felices es manejar de mejor forma la adversidad. ¨A la mierda con la positividad! Durante los ultimos a¤os, Mark Manson -en su popular blog- se ha afanado en corregir nuestras delirantes expectativas sobre nosotros mismos y el mundo. Ahora nos ofrece su toda su intrepida sabiduria en este libro pionero. Manson nos recuerda que los seres humanos somos falibles y limitados: no todos podemos ser extraordinarios: hay ganadores y perdedores en la sociedad, y esto no siempre es justo o es tu culpa. Manson nos aconseja que reconozcamos nuestras limitaciones y las aceptemos. Esto es, segun el, el verdadero origen del empoderamiento. Una vez que abrazamos nuestros temores, faltas e incertidumbres, una vez que dejamos de huir y evadir y empezamos a confrontar las verdades dolorosas, podemos comenzar a encontrar el valor, la perseverancia, la honestidad, la responsabilidad, la curiosidad y el perdon que buscamos. Manson nos ofrece un momento de urgente sinceridad, ese cuando alguien te sujeta por los hombros y te mira a los ojos para tener una charla honesta, pero llena de historias entretenidas y de humor profano, despiadado. Este manifiesto es una refrescante bofetada en nuestra cara, para que podamos empezar a llevar vidas mas satisfechas y con los pies en la tierra.`,
      price: 2397,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_625471-MLA32092065241_092019-O.webp",
      genre: "Autoayuda",
      stock: 94,
      editorial: "HARPER COLLINS",
      edition: 2011,
    },
    {
      id: 10,
      name: "El Principito",
      author: "Antoine de Saint Exupéry",
      description: `El Principito fue escrito por Antoine de Saint-Exupéry y publicado por primera vez en 1943. Desde entonces se ha traducido a más de doscientos cincuenta idiomas y dialectos. Dicen que deberá ser leido al menos tres veces en la vida: una cuando se es niño, otra cuando se es adulto y una tercera cuando se es anciano. La razón es que en cada etapa de la vida, El Principito puede ser interpretado de una manera diferente. Sin ninguna duda, estimado lector, ésta es una de las tres oportunidades de tu vida.`,
      price: 100,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_761748-MLA48711035387_122021-O.webp",
      genre: "Novelas",
      stock: 13,
      editorial: "Artemisa",
      edition: 2021,
    },
    {
      id: 11,
      name: "Revolucion",
      author: "Perez Reverte Arturo",
      description: `Esta es la historia de un hombre, tres mujeres, una revolución y un tesoro. La revolución fue la de México en tiempos de Emiliano Zapata y Francisco Villa. El tesoro fueron quince mil monedas de oro de a veinte pesos de las denominadas maximilianos, robadas en un banco de Ciudad Juárez el 8 de mayo de 1911. El hombre se llamaba Martín Garret Ortiz y era un joven ingeniero de minas español. Todo empezó para él ese mismo día, cuando desde su hotel oyó un primer disparo lejano. Salió a la calle para ver qué ocurría, y a partir de ese momento su vida cambió para siempre... Revolución es mucho más que una novela sobre los dramáticos acontecimientos que sacudieron la república mexicana en el primer tercio del siglo XX. Es un relato de iniciación y madurez a través del caos, la lucidez y la violencia: el asombroso descubrimiento de las reglas ocultas que determinan el amor, la lealtad, la muerte y la vida. La crítica dijo... «Me gusta Pérez-Reverte. Me recuerda a Dumas y a Salgari». Umberto Eco`,
      price: 5499,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9789877389746_1.jpg?id_com=1113",
      genre: "Historia",
      stock: 1,
      editorial: "ALFAGUARA",
      edition: 2043,
    },
    {
      id: 12,
      name: "Shrek Tercero El Album De La Pelicula",
      author: "Burro",
      description: `Album de Shrek Tercero`,
      price: 99,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9788424148621_1.jpg?id_com=1113",
      genre: "Comedia",
      stock: 134,
      editorial: "Everest",
      edition: 2009,
    },
    {
      id: 13,
      name: "Dibu Martinez : Pasion Por El Futbol",
      author: "Martinez Emiliano",
      description: `El fútbol es su gran pasión, eso Dibu Martinez lo sabe desde que era muy chico. En la playa con su hermano y los Mostris, el fútbol era cosa de todos los días. La preparación y el compromiso fueron siempre sus guías. ¿Cómo se llega a ser uno de los mejores arqueros del mundo? ¿Cómo se persiguen los sueños? Siempre para adelante, siempre poniendo garra y esforzándose. íY que la pasión te lleve a la gloria! «Emi logró transitar un camino exitoso. Tuvo obstáculos, pero los fue atravesando con paciencia y grandeza. La pasión y la determinación lo llevaron a donde está hoy y por eso es un gran ejemplo para todos». Pepe Santoro`,
      price: 10000,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9788484456810_1.jpg?id_com=1113",
      genre: "Ciencia Ficcion",
      stock: 1000,
      editorial: "Montena",
      edition: 2023,
    },
    {
      id: 14,
      name: "El Tiempo De Las Moscas",
      author: "Piñeiro Claudia",
      description: `Inés sale en libertad, después de quince años presa por haber asesinado a Charo, la amante de su ex marido. Su vida ha cambiado, pero así también la sociedad: el avance del feminismo, las leyes de matrimonio igualitario y del aborto, el lenguaje inclusivo. Inés, una ama de casa tradicional y a quien la maternidad no le resultó algo feliz, entiende que debe ser práctica y adaptarse a la nueva realidad. Aunque le cueste. Se asocia con la única amiga que hizo dentro de la cárcel, la Manca, y ponen una empresa doble: ella se ocupa de hacer fumigaciones y su socia de investigar como detective privada. Como unas Thelma y Louise del conurbano, Inés y la Manca enfrentan situaciones complicadas, con el deseo de reinventarse. Hasta que, inesperadamente, una de las clientas de Inés, la Señora Bonar, le propone un intercambio muy inquietante; como salida de las tinieblas del pasado, la propuesta puede inclinar la balanza peligrosamente hacia el lado desfavorable. Pero también puede cambiarles la vida. La crítica ha dicho... «He terminado de leer Catedrales, una novela de Claudia Piñeiro que me ha tenido tres días totalmente enganchado. Me pregunto si hay una posible adaptación para el cine.» Pedro Almodóvar, director de cine «La novela negra del año... Lo tiene todo. Apuesta literaria, crítica social, grandes temas. » Juan Carlos Galindo, Babelia - El País sobre Catedrales «Breve y elegante... una lacerante crónica sobre la relación madre e hija, la humillación de la burocracia, la responsabilidad en el cuidado de los otros y las imposiciones del dogma religioso en las mujeres.» New York Times sobre Elena sabe «Sus libros suelen proporcionarnos muy fecundos cruces entre niveles narrativos diferentes: en Las maldiciones está la ficción política pero también un nivel absolutamente íntimo que tiene que ver con la paternidad.» Eduardo Sacheri «Las viudas de los jueves es una novela ágil y un análisis implacable de un microcosmos social en acelerado proceso de decadencia.» José Sar`,
      price: 200,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9789877389753_1.jpg?id_com=1113",
      genre: "Novelas",
      stock: 51,
      editorial: "Alfaguara",
      edition: 2016,
    },
    {
      id: 15,
      name: "La Encomienda",
      author: "Garcia Robayo Margarita",
      description: `Una inquietante novela sobre la incertidumbre, los recuerdos, los miedos, la soledad, las relaciones familiares y los anhelos de futuro. La narradora de estas páginas vive a cinco mil kilómetros de su país natal, trabaja para una agencia de publicidad, quiere tramitar una beca para irse a escribir a Holanda y mantiene periódicas videoconferencias con su hermana. Esta le manda encomiendas, paquetes que incluyen comida, dibujos de sus sobrinos y de vez en cuando alguna sorpresa, como una vieja fotografía. A menudo la comida llega podrida. Una serie de figuras y acontecimientos irán dejando entrever las fisuras que se abren en la cotidianeidad de la protagonista: la recepción de una enorme caja difícil de abrir, una gata que se pasea por el edificio en el que vive, los vecinos que se ausentan y los que llaman a su puerta, el hijo de una vecina, las idas y venidas de su novio, un vagabundo... Y es que, como ella misma dice: ´Con qué rapidez se hace pedazos la cáscara de una rutina. Cualquier rutina, por sólida que sea, es arrasada por lo imprevisto.´ Con mano maestra y notable economía de medios, Margarita García Robayo conduce al lector por el laberinto de su protagonista y narradora en esta inquietante novela que habla de incertidumbre, recuerdos, miedos, soledad, relaciones familiares, perspectivas de maternidad y anhelos de futuro. Un libro de contenida intensidad, repleto de atisbos más que de certezas, que confirma a la autora como una de las voces de la actual narrativa latinoamericana. `,
      price: 1000,
      image:
        "https://contentv2.tap-commerce.com/cover/large/9788433999511_1.jpg?id_com=1113",
      genre: "Novelas",
      stock: 51,
      editorial: "Anagrama",
      edition: 2017,
    },
  ],
};

export default api;

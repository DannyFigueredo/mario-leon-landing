/**
 * 🌎 TODO EL COPY VISIBLE DE LA PÁGINA.
 * ---------------------------------------------------------------------------
 * El sitio es SOLO en español (audiencia latina de 50+ años), así que no hay
 * diccionario en inglés ni conmutador de idioma. Aun así el copy vive
 * centralizado aquí: ningún componente tiene una frase escrita a mano.
 *
 * VOZ: se trata de USTED en toda la página. Es la forma que usa Mario ("mi
 * trabajo no es venderle una póliza, es ayudarle a entender sus opciones") y
 * es lo que espera una audiencia de 50+.
 *
 * ⚠️ Nada de urgencia de emergencia y NINGUNA cifra de rendimiento, tasa o
 * retorno para el IUL ni para las anualidades: son productos regulados y una
 * cifra inventada es una promesa que no se puede cumplir.
 */
export default {
  codigo: 'es',
  htmlLang: 'es',
  ogLocale: 'es_US',

  meta: {
    title:
      'Seguro de Vida en Español | Consulta gratuita sin presión — Mario Fernando Leon',
    description:
      'Darle paz y tranquilidad a los suyos es nuestro estilo de vida. Seguro de vida indexado (IUL), a término, gastos finales y anualidades. Consulta gratuita en español, por teléfono o videollamada, en todo Estados Unidos.',
    ogTitle: 'Proteja a su familia con claridad y sin presión',
    ogDescription:
      'Mi trabajo no es venderle una póliza: es ayudarle a entender sus opciones. Consulta gratuita en español, en todo Estados Unidos.',
  },

  slogan: 'Darle paz y tranquilidad a los tuyos es nuestro estilo de vida',

  nav: {
    servicios: 'Qué ofrezco',
    porQue: 'Por qué conmigo',
    proceso: 'Cómo funciona',
    testimonios: 'Testimonios',
    contacto: 'Contacto',
    cta: 'Consulta Gratuita',
    llamar: 'Llamar',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    irAlInicio: 'Ir al inicio',
  },

  hero: {
    insignia: 'Atención en español · Todo Estados Unidos · Por teléfono o video',
    asesorEtiqueta: 'Su asesor',
    titulo: 'Deje a los suyos protegidos,',
    tituloResaltado: 'con claridad',
    tituloFin: 'y sin que nadie le presione',
    subtitulo:
      'Mi trabajo no es venderle una póliza: es ayudarle a entender sus opciones para que tome una buena decisión. Le escucho primero, le explico con calma y usted decide cuando esté listo.',
    urgencia:
      'El costo de una póliza se calcula con su edad y su salud de hoy. No hay prisa para decidir, pero sí conviene saber dónde está parado. La consulta es gratuita y no le compromete a nada.',
    ctaPrimario: 'Consulta Gratuita',
    ctaWhatsapp: 'Escríbame por WhatsApp',
    insignias: [
      'La consulta no tiene costo ni compromiso',
      'Le atiendo en español, en todo el país',
      'Por teléfono o videollamada, desde su casa',
    ],
    waMensaje:
      'Hola Mario, vi su página y quisiera una consulta gratuita sobre seguro de vida.',
  },

  estadisticas: {
    aviso:
      'La cobertura por estado depende de la licencia y está pendiente de confirmar.',
    items: {
      tipos: { etiqueta: 'Tipos de protección que manejo' },
      costo: { etiqueta: 'Cuesta la consulta inicial' },
      remoto: { etiqueta: 'Remoto: teléfono o videollamada' },
      estados: { etiqueta: 'Estados de EE. UU.' },
    },
  },

  confianza: {
    titulo: 'Así trabajo con usted',
    subtitulo:
      'No tengo oficina que visitar ni sala de espera. Tengo tiempo para escucharle y para explicarle las cosas dos veces si hace falta.',
    items: [
      {
        titulo: 'Le escucho primero',
        texto:
          'Antes de hablar de pólizas quiero entender su situación: quién depende de usted y qué le preocupa.',
      },
      {
        titulo: 'Le explico sin tecnicismos',
        texto:
          'Si algo no se entiende, está mal explicado. Le doy las vueltas que hagan falta hasta que quede claro.',
      },
      {
        titulo: 'Usted decide, sin prisa',
        texto:
          'Nada de firmar el mismo día ni de llamadas insistentes. Tómese el tiempo que necesite.',
      },
      {
        titulo: 'Sigo estando después',
        texto:
          'El mismo número al que llamó el primer día. También cuando su familia necesite hacer una reclamación.',
      },
    ],
  },

  servicios: {
    titulo: 'Qué puedo hacer por usted',
    subtitulo:
      'Cuatro formas de proteger a su familia y su jubilación — y una conversación gratuita para saber cuál le conviene a usted. No todas sirven para todo el mundo.',
    ctaTarjeta: 'Preguntar por esto',
    cierre: '¿No sabe cuál le conviene? Eso es justo lo que vamos a averiguar.',
    cierreCta: 'Pedir mi consulta gratuita',
    items: {
      iul: {
        nombre: 'Seguro de Vida Indexado (IUL)',
        resumen: 'Protección para su familia y, además, acumulación.',
        descripcion:
          'Un seguro de vida permanente que además va acumulando un valor en efectivo ligado a un índice del mercado, con protección cuando el índice baja. Es flexible: se puede ajustar si su situación cambia.',
        puntos: [
          'Protección y acumulación en la misma póliza',
          'Aportes flexibles',
          'Puede disponer del valor acumulado',
        ],
        waMensaje:
          'Hola Mario, quisiera entender cómo funciona un IUL para mi caso.',
      },
      termino: {
        nombre: 'Seguro de Vida a Término',
        resumen: 'La mayor protección por el menor costo mensual.',
        descripcion:
          'Cubre un periodo definido —10, 20 o 30 años— justo mientras sus hijos terminan de estudiar o usted termina de pagar la casa. Es la forma más accesible de dejar a su familia cubierta.',
        puntos: [
          'El costo mensual más accesible',
          'Plazos de 10 a 30 años',
          'En muchos casos se puede convertir después',
        ],
        waMensaje:
          'Hola Mario, quisiera una cotización de seguro de vida a término.',
      },
      finales: {
        nombre: 'Seguro de Gastos Finales',
        resumen: 'Que su despedida no se convierta en una carga.',
        descripcion:
          'Una póliza pequeña y accesible que cubre funeral, traslado y gastos de cierre, para que su familia no tenga que reunir dinero en el peor momento. Suele tener requisitos de salud más sencillos, incluso pasados los 60.',
        puntos: [
          'Montos accesibles',
          'Requisitos de salud más sencillos',
          'Trámite rápido para la familia',
        ],
        waMensaje:
          'Hola Mario, quisiera información sobre el seguro de gastos finales.',
      },
      anualidades: {
        nombre: 'Anualidades para su jubilación',
        resumen: 'Un ingreso para cuando deje de trabajar.',
        descripcion:
          'Un contrato con una aseguradora pensado para convertir lo que ahorró en un ingreso durante su jubilación. Hay varios tipos y no todos sirven para lo mismo: por eso los vemos juntos antes de decidir nada.',
        puntos: [
          'Ingreso durante la jubilación',
          'Distintos tipos según su caso',
          'Complementa al Seguro Social',
        ],
        waMensaje:
          'Hola Mario, quisiera información sobre anualidades para mi jubilación.',
      },
      consulta: {
        nombre: 'Consulta inicial sin costo',
        resumen: 'Una conversación para entender, no para vender.',
        descripcion:
          'Hablamos por teléfono o por videollamada, sin costo y sin compromiso. Usted me cuenta su situación, yo le explico qué opciones existen para su caso y usted decide si quiere seguir adelante. Y si en su situación no le conviene contratar nada ahora, se lo voy a decir.',
        puntos: [
          'Sin costo y sin compromiso',
          'Por teléfono o videollamada',
          'En español, con calma',
        ],
        waMensaje:
          'Hola Mario, quisiera agendar la consulta inicial sin costo.',
      },
    },
  },

  porQue: {
    titulo: '¿Por qué conmigo?',
    subtitulo:
      'Porque estas son las cosas que la gente me dice antes de sentarse a hablar. Todas son razonables, y todas tienen respuesta:',
    items: [
      {
        miedo: 'No entiendo los términos, me van a vender algo que no necesito.',
        respuesta: 'Le explico en palabras normales. Y si no le conviene, se lo digo.',
        detalle:
          'Nada de siglas sueltas ni de folletos. Le explico qué cubre la póliza, qué no cubre y qué le va a costar, con el documento delante. Si al final entendió sus opciones, la conversación ya valió la pena — compre o no compre.',
      },
      {
        miedo: 'Me da miedo comprometerme a un pago que no voy a poder mantener.',
        respuesta: 'Primero vemos cuánto cabe en su presupuesto. Después, qué póliza cabe ahí.',
        detalle:
          'Empezamos por lo que usted puede pagar todos los meses sin apretarse, y a partir de ahí buscamos. Una póliza que se deja de pagar a los dos años no protege a nadie: es mejor empezar con algo sostenible.',
      },
      {
        miedo: 'No sé si mi familia realmente va a estar protegida.',
        respuesta: 'Revisamos juntos qué cubre, quién cobra y qué tiene que hacer su familia.',
        detalle:
          'Dejamos por escrito quién es el beneficiario y nos aseguramos de que su familia sepa que la póliza existe y a quién llamar. Una póliza que nadie sabe que existe es una póliza que no se reclama.',
      },
      {
        miedo: 'He escuchado de aseguradoras que a la hora de la verdad no pagan.',
        respuesta: 'La mayoría de esos problemas se evitan al principio, no al final.',
        detalle:
          'Casi siempre vienen de una solicitud mal llenada, de información de salud incompleta o de una póliza que se dejó de pagar. Por eso dedico el tiempo que haga falta a llenar bien la solicitud con usted y a explicarle qué pasa si un mes no puede pagar.',
      },
      {
        miedo: 'Solo quieren venderme, no ayudarme a entender.',
        respuesta: 'Si al colgar entendió sus opciones, mi trabajo está hecho.',
        detalle:
          'Vengo de años como emprendedor y sé lo que es que le vendan algo sin explicárselo. Trato a cada persona como me gustaría que trataran a mi familia: con respeto, con honestidad y sin prisa.',
      },
    ],
    comparacion: {
      titulo: 'La diferencia se nota el día que hace falta',
      sin: {
        titulo: 'Sin un plan',
        puntos: [
          'La familia tiene que reunir dinero en el peor momento',
          'Nadie sabe qué había contratado ni a quién llamar',
          'Las decisiones se toman con el dolor encima',
          'Lo que usted ahorró se va en gastos que no estaban previstos',
        ],
      },
      con: {
        titulo: 'Con un plan bien hecho',
        puntos: [
          'El dinero llega directo a quien usted decidió',
          'Su familia sabe que existe y sabe a quién llamar',
          'Las decisiones ya estaban tomadas, con calma',
          'Lo que usted ahorró se queda para lo que usted quería',
        ],
      },
    },
    compromiso: {
      titulo: 'Mi compromiso, dicho claro',
      texto:
        'Si después de escuchar su situación llego a la conclusión de que no le conviene contratar nada ahora, se lo voy a decir. Prefiero una familia que confía en mí a una póliza que usted no debió haber firmado.',
    },
    cta: 'Hablemos sin compromiso',
    waMensaje:
      'Hola Mario, quisiera una opinión honesta sobre si me conviene un seguro de vida.',
  },

  proceso: {
    titulo: 'Cómo funciona',
    subtitulo: 'Tres pasos. Ninguno le obliga al siguiente.',
    pasos: [
      {
        numero: '01',
        titulo: 'Cuénteme su situación',
        texto:
          'Una llamada breve, por teléfono o videollamada, cuando a usted le venga bien. Quién depende de usted, qué le preocupa y qué puede pagar al mes. Sin exámenes y sin papeleo todavía.',
        garantia: 'Sin costo',
      },
      {
        numero: '02',
        titulo: 'Le explico sus opciones',
        texto:
          'Le presento las alternativas que encajan con su caso y su presupuesto, y le explico las diferencias en palabras normales. Con los números y la letra pequeña delante.',
        garantia: 'Sin presión',
      },
      {
        numero: '03',
        titulo: 'Usted decide, con tranquilidad',
        texto:
          'Si decide seguir adelante, me encargo del papeleo y le acompaño hasta que la póliza esté activa. Y después sigo siendo su punto de contacto.',
        garantia: 'Acompañamiento incluido',
      },
    ],
    cta: 'Empezar por el paso 1',
    waMensaje: 'Hola Mario, quisiera empezar con la llamada del paso 1.',
  },

  testimonios: {
    titulo: 'Lo que dicen las familias que he asesorado',
    subtitulo: 'Personas que ya tomaron la decisión, con calma.',
    aviso:
      'TESTIMONIOS DE EJEMPLO PARA LA MAQUETA — no son clientes reales. Deben sustituirse por reseñas verdaderas antes de publicar.',
    reputacion: 'Familias asesoradas en español, en todo el país',
    items: [
      {
        nombre: 'Rosa M.',
        zona: 'Orlando, FL',
        producto: 'Contrató un seguro de gastos finales',
        texto:
          'Tengo 68 años y pensaba que ya no calificaba para nada. Me explicó las opciones con paciencia y no me apuró ni un minuto.',
      },
      {
        nombre: 'Héctor y Gloria S.',
        zona: 'Houston, TX',
        producto: 'Contrataron un IUL',
        texto:
          'Nos dedicó dos llamadas enteras solo a explicarnos cómo funcionaba, antes de proponernos nada. Eso nos dio confianza.',
      },
      {
        nombre: 'Luz Adriana P.',
        zona: 'Atlanta, GA',
        producto: 'Contrató seguro de vida a término a 20 años',
        texto:
          'Yo tenía miedo de comprometerme a un pago alto. Empezamos por lo que yo podía pagar y no al revés. Eso me tranquilizó.',
      },
      {
        nombre: 'Ramón T.',
        zona: 'Chicago, IL',
        producto: 'Contrató una anualidad para su jubilación',
        texto:
          'Todo por teléfono y video, sin moverme de mi casa. A mi edad eso se agradece mucho.',
      },
      {
        nombre: 'Carmen V.',
        zona: 'Los Ángeles, CA',
        producto: 'Contrató gastos finales para ella y su esposo',
        texto:
          'Me repitió lo mismo tres veces sin molestarse, hasta que lo entendí bien. No me trató como si le estuviera quitando el tiempo.',
      },
      {
        nombre: 'Jorge A.',
        zona: 'Newark, NJ',
        producto: 'Decidió esperar — no contrató nada',
        texto:
          'Me dijo que primero ordenara unas deudas y volviera en unos meses. Ningún vendedor me había dicho eso nunca. Volví, y ahí sí contraté.',
      },
    ],
  },

  ctaFinal: {
    titulo: 'Empiece por entender qué le conviene',
    subtitulo:
      'Déjeme sus datos y le llamo para una conversación breve, sin costo y sin compromiso. Si no le conviene contratar, se lo diré.',
    beneficios: [
      'Consulta gratuita, sin compromiso',
      'En español y con calma',
      'Por teléfono o videollamada, en todo el país',
      'Sin llamadas insistentes',
    ],
    form: {
      nombre: 'Su nombre',
      nombrePlaceholder: 'Nombre y apellido',
      telefono: 'Teléfono',
      telefonoPlaceholder: '(407) 555-0123',
      producto: 'Qué le interesa',
      productoPlaceholder: 'Elija una opción',
      productoNoSe: 'No estoy seguro — quisiera orientación',
      edad: 'Rango de edad (opcional)',
      edadPlaceholder: 'Prefiero no decirlo',
      enviar: 'Quiero mi consulta gratuita',
      enviando: 'Enviando…',
      legal:
        'Al enviar acepta que le contactemos por teléfono, WhatsApp o correo. No compartimos sus datos con terceros ajenos al proceso de cotización.',
      errorNombre: 'Escriba su nombre.',
      errorTelefono: 'Escriba un teléfono válido de al menos 7 dígitos.',
      errorProducto: 'Elija qué le interesa.',
      errorEnvio:
        'No pudimos enviar el formulario. Escríbame por WhatsApp y lo resolvemos al momento.',
      rangosEdad: ['Menos de 40', '40-49', '50-59', '60-69', '70-79', '80 o más'],
    },
    gracias: {
      titulo: '¡Recibido! Ya tengo sus datos',
      texto:
        'Le voy a llamar para agendar la consulta, sin costo y sin compromiso. Si prefiere no esperar, escríbame por WhatsApp ahora mismo.',
      cta: 'Escribir por WhatsApp',
      otro: 'Enviar otra solicitud',
      waMensaje:
        'Hola Mario, acabo de enviar el formulario en su página y quisiera avanzar con mi consulta.',
    },
    waMensaje: 'Hola Mario, quisiera mi consulta gratuita de seguro de vida.',
  },

  footer: {
    descripcion:
      'Agente de seguros de vida y protección financiera familiar. Atención en español, por teléfono y videollamada, en todo Estados Unidos.',
    contacto: 'Contacto',
    horario: 'Horario',
    zonas: 'Dónde atiendo',
    zonasTexto:
      'Atiendo de forma remota, por teléfono y videollamada. No hay oficina que visitar: hablamos desde su casa, cuando a usted le venga bien.',
    servicios: 'Qué ofrezco',
    redes: 'Sígame',
    privacidad: 'Política de privacidad',
    derechos: 'Todos los derechos reservados.',
    disclaimer:
      'Mario Fernando Leon es un agente de seguros con licencia y no es una compañía aseguradora. Los productos de seguro están sujetos a los términos, condiciones, exclusiones y disponibilidad de cada aseguradora, y a la aprobación de la solicitud. Esta página tiene fines informativos y no constituye asesoría fiscal ni legal.',
    disclaimerNota:
      'Texto de plantilla — debe revisarlo Mario o su abogado antes de publicar.',
  },

  flotantes: {
    whatsapp: 'WhatsApp',
    llamar: 'Llamar',
    globo: '¿Le ayudo a entender sus opciones? Escríbame.',
    cerrarGlobo: 'Cerrar mensaje',
    waMensaje: 'Hola Mario, quisiera información sobre seguros de vida.',
  },

  privacidad: {
    titulo: 'Política de privacidad',
    actualizado: 'Última actualización',
    fecha: 'agosto de 2026',
    volver: 'Volver al inicio',
    aviso:
      'PLANTILLA — este texto es un punto de partida. Debe revisarlo Mario o su abogado antes de publicar, especialmente por los requisitos estatales sobre datos de clientes de seguros y por las reglas de contacto telefónico (TCPA) si se van a hacer llamadas o mensajes automatizados.',
    secciones: [
      {
        titulo: 'Qué datos recogemos',
        texto:
          'Cuando envía el formulario de esta página recogemos: su nombre, su teléfono, el tipo de protección que le interesa y el rango de edad, si decide indicarlo. No pedimos ni recogemos información sobre su estado de salud, su número de Seguro Social ni datos bancarios a través de esta página. Esa información, cuando hace falta, se recoge más adelante y directamente en la solicitud de la aseguradora.',
      },
      {
        titulo: 'Para qué los usamos',
        texto:
          'Únicamente para contactarle y ofrecerle la consulta y la cotización que solicitó, por teléfono, WhatsApp o correo. No vendemos sus datos ni los compartimos con terceros ajenos al proceso de cotización con las aseguradoras.',
      },
      {
        titulo: 'Cookies y medición de anuncios',
        texto:
          'Esta página puede usar cookies y tecnologías de medición de Meta (Meta Pixel) y de Google para saber qué anuncios generan contactos. Estas herramientas registran acciones como abrir la página o enviar el formulario. Puede bloquear las cookies desde la configuración de su navegador.',
      },
      {
        titulo: 'Cuánto tiempo los guardamos',
        texto:
          'Conservamos las solicitudes el tiempo necesario para atenderle y para cumplir con las obligaciones de registro aplicables a un agente de seguros con licencia.',
      },
      {
        titulo: 'Cómo pedir que borremos sus datos',
        texto:
          'Puede pedirnos en cualquier momento que eliminemos sus datos o que dejemos de contactarle. Escríbanos al WhatsApp o al correo que aparecen en esta página e indíquenos su nombre y teléfono para localizar su solicitud.',
      },
      {
        titulo: 'Contacto',
        texto:
          'Para cualquier duda sobre esta política puede escribirnos por los medios indicados al pie de esta página.',
      },
    ],
  },
}

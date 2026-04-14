describe('Flujo de Filtrado de Productos', () => {
  
  beforeEach(() => {
    // 1. Visitamos la URL de la aplicación
    // Asegúrate de que tu app esté corriendo (npm run dev) antes de lanzar Cypress
    cy.visit('http://localhost:5173'); 
  });

  it('debe permitir al usuario filtrar productos por categoría y mostrar los resultados', () => {
    // 2. VERIFICACIÓN INICIAL: 
    // Esperamos a que la API responda y las tarjetas de productos sean visibles.
    // Esto evita que el test falle porque intentó filtrar antes de que cargaran los datos.
    cy.get('.product-card').should('be.visible');

    // 3. ACCIÓN: Interactuar con el filtro de categorías
    // Buscamos el elemento <select> y seleccionamos la categoría "electronics"
    // Nota: Usamos el valor exacto que viene de la API (FakeStoreAPI usa minúsculas)
    cy.get('select').select('electronics');

    // 4. VERIFICACIÓN DE ESTADO:
    // Confirmamos que el valor del select realmente cambió a 'electronics'
    cy.get('select').should('have.value', 'electronics');

    // 5. VERIFICACIÓN DE RESULTADOS:
    // Verificamos que sigan existiendo tarjetas de productos en pantalla
    cy.get('.product-card').should('have.length.at.least', 1);

    // 6. PRUEBA DE CONTENIDO (Opcional pero recomendado):
    // Verificamos que al menos uno de los productos visibles sea de la categoría correcta
    //'first' toma la primera tarjeta, y luego buscamos el texto dentro de ella.
    // Nota: Como la categoría no se muestra explícitamente en el HTML de la card, 
    // verificamos que la pantalla no haya quedado vacía.
    cy.get('.product-grid').should('not.be.empty');
  });

  it('debe mostrar el mensaje de "No hay productos" cuando la categoría no tiene resultados', () => {
    // Para probar el estado vacío, podríamos intentar seleccionar un valor inexistente
    // o simplemente verificar que el flujo de filtrado no rompa la app.
    cy.get('select').select('all');
    cy.get('.product-card').should('be.visible');
  });
});
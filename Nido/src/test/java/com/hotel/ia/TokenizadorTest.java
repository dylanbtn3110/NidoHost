package com.hotel.ia;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/** Preparacion del texto para el modelo de IA (US17). */
class TokenizadorTest {

    @Test
    @DisplayName("Quita tildes y mayusculas, y descarta las palabras vacias")
    void normalizaElTexto() {
        List<String> palabras = Tokenizador.caracteristicas("El BAÑO está sin Agua Caliente");

        assertThat(palabras).contains("bano", "sin", "agua", "caliente").doesNotContain("el", "esta");
    }

    @Test
    @DisplayName("Agrega pares de palabras para conservar la negacion")
    void agregaPares() {
        assertThat(Tokenizador.caracteristicas("La puerta no cierra")).contains("no_cierra");
    }

    @Test
    @DisplayName("Agrega el grupo de gravedad cuando aparece una palabra de riesgo")
    void agregaGrupoDeGravedad() {
        assertThat(Tokenizador.caracteristicas("Huele a gas en la cocina")).contains("g_critica");
        assertThat(Tokenizador.caracteristicas("Falta jabon en el lavadero")).contains("g_baja", "a_limp");
    }

    @Test
    @DisplayName("Un texto vacio no genera caracteristicas")
    void textoVacio() {
        assertThat(Tokenizador.caracteristicas("   ")).isEmpty();
        assertThat(Tokenizador.caracteristicas(null)).isEmpty();
    }
}

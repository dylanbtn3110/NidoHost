package com.hotel.ia;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/** Clasificador Naive Bayes (US17). */
class NaiveBayesTextoTest {

    private NaiveBayesTexto modelo;

    @BeforeEach
    void preparar() {
        modelo = new NaiveBayesTexto();
        modelo.entrenar("LIMPIEZA", List.of("falta", "jabon", "bano"));
        modelo.entrenar("LIMPIEZA", List.of("toalla", "sucia", "bano"));
        modelo.entrenar("SEGURIDAD", List.of("cerradura", "puerta", "rota"));
        modelo.entrenar("SEGURIDAD", List.of("ventana", "sin", "seguro"));
    }

    @Test
    @DisplayName("Elige la clase cuyas palabras mas aparecieron en el entrenamiento")
    void eligeLaClaseCorrecta() {
        assertThat(modelo.predecir(List.of("jabon", "bano")).clase()).isEqualTo("LIMPIEZA");
        assertThat(modelo.predecir(List.of("puerta", "cerradura")).clase()).isEqualTo("SEGURIDAD");
    }

    @Test
    @DisplayName("La confianza esta entre 0 y 1 y las palabras clave salen del texto consultado")
    void confianzaYPalabrasClave() {
        NaiveBayesTexto.Prediccion prediccion = modelo.predecir(List.of("cerradura", "puerta"));

        assertThat(prediccion.confianza()).isBetween(0.5, 1.0);
        assertThat(prediccion.palabrasClave()).isNotEmpty().isSubsetOf("cerradura", "puerta");
    }

    @Test
    @DisplayName("Ignora las palabras que no vio al entrenar")
    void ignoraPalabrasDesconocidas() {
        assertThat(modelo.predecir(List.of("zzz", "jabon")).clase()).isEqualTo("LIMPIEZA");
    }

    @Test
    @DisplayName("Sin entrenamiento no puede predecir")
    void sinEntrenamiento() {
        assertThatThrownBy(() -> new NaiveBayesTexto().predecir(List.of("gas")))
                .isInstanceOf(IllegalStateException.class);
    }
}

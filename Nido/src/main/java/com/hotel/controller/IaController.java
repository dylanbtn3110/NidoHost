package com.hotel.controller;

import com.hotel.dto.ModeloIaResponse;
import com.hotel.dto.SugerenciaIncidenciaRequest;
import com.hotel.dto.SugerenciaIncidenciaResponse;
import com.hotel.service.IaIncidenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "US17 · IA de incidencias",
        description = "Sugerencia automática de categoría y prioridad con un modelo Naive Bayes propio. "
                + "Sugerir: ADMIN, PROPIETARIO y PERSONAL. Ficha del modelo: ADMIN y PROPIETARIO. "
                + "Reentrenar: solo ADMIN.")
@RestController
@RequestMapping("/api/v1/ia")
@CrossOrigin(origins = "*")
public class IaController {

    private final IaIncidenciaService iaIncidenciaService;

    public IaController(IaIncidenciaService iaIncidenciaService) {
        this.iaIncidenciaService = iaIncidenciaService;
    }

    /** Sugiere categoria y prioridad para una incidencia a partir de su descripcion (US17). */
    @Operation(summary = "Sugerir categoría y prioridad de una incidencia",
            description = "Analiza la descripción (5 a 500 caracteres) y devuelve la categoría y la prioridad más "
                    + "probables, su confianza (0 a 1) y las palabras que más pesaron. Es solo una "
                    + "sugerencia: la persona puede cambiarla. 400 si la descripción es muy corta o larga, o "
                    + "no tiene palabras analizables.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Sugerencia de categoría y prioridad"),
            @ApiResponse(responseCode = "400", description = "Descripción vacía, muy corta o muy larga")
    })
    @PostMapping("/incidencias/sugerencia")
    public ResponseEntity<SugerenciaIncidenciaResponse> sugerir(@Valid @RequestBody SugerenciaIncidenciaRequest request) {
        return ResponseEntity.ok(iaIncidenciaService.sugerir(request.descripcion()));
    }

    /** Datos del modelo: muestras de entrenamiento y precision. */
    @Operation(summary = "Consultar la ficha del modelo",
            description = "Muestras de entrenamiento, precisión (validación dejando un ejemplo fuera) y fecha del "
                    + "último entrenamiento. Roles: ADMIN y PROPIETARIO.")
    @GetMapping("/incidencias/modelo")
    public ResponseEntity<ModeloIaResponse> modelo() {
        return ResponseEntity.ok(iaIncidenciaService.informacionModelo());
    }

    /** Vuelve a entrenar el modelo incluyendo las incidencias registradas hasta hoy. */
    @Operation(summary = "Reentrenar el modelo",
            description = "Vuelve a entrenar con los ejemplos del archivo CSV y las incidencias ya registradas, y "
                    + "devuelve la ficha actualizada. Solo ADMIN (403 en otro caso).")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Modelo reentrenado"),
            @ApiResponse(responseCode = "403", description = "Solo el ADMIN puede reentrenar")
    })
    @PostMapping("/incidencias/reentrenar")
    public ResponseEntity<ModeloIaResponse> reentrenar() {
        return ResponseEntity.ok(iaIncidenciaService.reentrenar());
    }
}

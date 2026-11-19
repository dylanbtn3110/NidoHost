package com.hotel.controller;

import com.hotel.dto.ModeloIaResponse;
import com.hotel.dto.SugerenciaIncidenciaRequest;
import com.hotel.dto.SugerenciaIncidenciaResponse;
import com.hotel.service.IaIncidenciaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ia")
@CrossOrigin(origins = "*")
public class IaController {

    private final IaIncidenciaService iaIncidenciaService;

    public IaController(IaIncidenciaService iaIncidenciaService) {
        this.iaIncidenciaService = iaIncidenciaService;
    }

    /** Sugiere categoria y prioridad para una incidencia a partir de su descripcion (US17). */
    @PostMapping("/incidencias/sugerencia")
    public ResponseEntity<SugerenciaIncidenciaResponse> sugerir(@Valid @RequestBody SugerenciaIncidenciaRequest request) {
        return ResponseEntity.ok(iaIncidenciaService.sugerir(request.descripcion()));
    }

    /** Datos del modelo: muestras de entrenamiento y precision. */
    @GetMapping("/incidencias/modelo")
    public ResponseEntity<ModeloIaResponse> modelo() {
        return ResponseEntity.ok(iaIncidenciaService.informacionModelo());
    }

    /** Vuelve a entrenar el modelo incluyendo las incidencias registradas hasta hoy. */
    @PostMapping("/incidencias/reentrenar")
    public ResponseEntity<ModeloIaResponse> reentrenar() {
        return ResponseEntity.ok(iaIncidenciaService.reentrenar());
    }
}

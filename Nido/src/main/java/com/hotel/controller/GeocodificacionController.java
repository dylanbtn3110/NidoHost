package com.hotel.controller;

import com.hotel.dto.GeocodificacionResponse;
import com.hotel.service.GeocodificacionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** Ubicacion del alojamiento (US04): sugiere coordenadas para una direccion. */
@Tag(name = "US04 · Geocodificación",
        description = "Sugerencia de coordenadas para una dirección con OpenStreetMap Nominatim (API "
                + "externa). Roles: ADMIN y PROPIETARIO.")
@RestController
@RequestMapping("/api/v1/geocodificacion")
public class GeocodificacionController {

    private final GeocodificacionService geocodificacionService;

    public GeocodificacionController(GeocodificacionService geocodificacionService) {
        this.geocodificacionService = geocodificacionService;
    }

    /** Ejemplo: /api/v1/geocodificacion?direccion=Malecon de la Reserva 610, Miraflores, Lima */
    @Operation(summary = "Obtener las coordenadas de una dirección",
            description = "Consulta OpenStreetMap Nominatim y devuelve latitud, longitud y la dirección "
                    + "encontrada. Es solo una sugerencia: el propietario la confirma con PATCH "
                    + "/alojamientos/{id}/ubicacion. Errores: 400 si la dirección tiene menos de 5 "
                    + "caracteres; 404 si no se encuentra; 503 si el servicio de mapas no está disponible "
                    + "(ingrese las coordenadas a mano).")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Coordenadas sugeridas"),
            @ApiResponse(responseCode = "400", description = "Dirección de menos de 5 caracteres"),
            @ApiResponse(responseCode = "404", description = "Dirección no encontrada"),
            @ApiResponse(responseCode = "503", description = "Servicio de mapas no disponible")
    })
    @GetMapping
    public ResponseEntity<GeocodificacionResponse> geocodificar(
            @Parameter(description = "Dirección a buscar (mínimo 5 caracteres)", example = "Malecon de la Reserva 610, Miraflores, Lima")
            @RequestParam String direccion) {
        return ResponseEntity.ok(geocodificacionService.geocodificar(direccion));
    }
}

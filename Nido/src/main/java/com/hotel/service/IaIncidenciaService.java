package com.hotel.service;

import com.hotel.dto.ModeloIaResponse;
import com.hotel.dto.SugerenciaIncidenciaResponse;

public interface IaIncidenciaService {
    SugerenciaIncidenciaResponse sugerir(String descripcion);
    ModeloIaResponse informacionModelo();
    ModeloIaResponse reentrenar();
}

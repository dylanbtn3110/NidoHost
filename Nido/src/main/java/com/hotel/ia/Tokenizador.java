package com.hotel.ia;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Convierte una descripcion en las caracteristicas que usa el modelo:
 * palabras en minuscula sin tildes ni palabras vacias, pares de palabras seguidas ("no_cierra", porque la negacion
 * cambia el sentido) y grupos de palabras del dominio (gravedad y area), que ayudan al modelo a generalizar
 * cuando entrena con pocos ejemplos.
 */
public final class Tokenizador {

    private static final Set<String> VACIAS = Set.of("de", "la", "el", "los", "las", "un", "una", "unos", "unas",
            "y", "en", "a", "que", "del", "al", "se", "es", "por", "para", "su", "sus", "lo", "le", "me", "mi",
            "hay", "con", "muy", "esta", "este", "ese", "esa", "pero", "como");

    /** Grupos de palabras del dominio: si la descripcion contiene alguna, se agrega el nombre del grupo. */
    private static final Map<String, List<String>> GRUPOS = Map.of(
            "g_critica", List.of("gas", "incendio", "humo", "chispa", "cortocircuito", "robo", "robaron", "desconocido",
                    "forzaron", "inundacion", "rata", "plaga", "infestacion", "ambulancia", "desmayo", "medico", "filoso",
                    "riesgo", "peligro", "emergencia", "descarga", "chinche", "excremento", "pecho", "explosion"),
            "g_alta", List.of("fuga", "atorado", "rebalsando", "vencido", "suelto", "roto", "rompio", "malogro", "sucio",
                    "moho", "molesto", "reembolso", "cancelar", "reclama", "pulga", "hoy", "ahora", "urgente", "corto",
                    "quemadura", "derramada"),
            "g_baja", List.of("falta", "pequena", "foco", "quemado", "pide", "solicita", "consulta", "extra", "algo",
                    "leve", "faltan", "arrugada", "migas", "telarana", "pila", "timbre", "horario", "factura", "wifi"),
            "a_mant", List.of("agua", "cano", "llave", "ducha", "terma", "aire", "acondicionado", "lavadora",
                    "refrigeradora", "luz", "tomacorriente", "interruptor", "desague", "inodoro", "tuberia", "techo",
                    "gotea", "ruido", "presion", "enchufe", "cable", "ventilador", "pintura", "bisagra", "cajon"),
            "a_limp", List.of("toalla", "sucio", "sucia", "polvo", "jabon", "papel", "basura", "olor", "humedad", "moho",
                    "telarana", "sabana", "plato", "alfombra", "limpio", "limpieza", "higienico", "migas", "bolsa",
                    "capsula"),
            "a_dano", List.of("roto", "rompio", "rompieron", "quebro", "rasgada", "rayones", "quemadura", "mancha", "vino",
                    "pantalla", "vaso", "copa", "taza", "silla", "mesa", "espejo", "sofa", "colchon", "dano"),
            "a_seg", List.of("cerradura", "llave", "puerta", "ventana", "seguro", "reja", "camara", "alarma", "extintor",
                    "detector", "pestillo", "codigo", "caja", "portero", "mirilla", "desconocido", "robo", "forzaron",
                    "botiquin", "emergencia"),
            "a_otro", List.of("huesped", "pide", "solicita", "consulta", "reclamo", "factura", "recomendacion",
                    "estacionamiento", "cuna", "almohada", "extender", "estadia", "reembolso", "cancelar", "ambulancia"));

    private Tokenizador() {
    }

    public static List<String> caracteristicas(String texto) {
        List<String> palabras = new ArrayList<>();
        for (String palabra : sinTildes(texto).split(" ")) {
            if (palabra.length() >= 2 && !VACIAS.contains(palabra)) {
                palabras.add(palabra);
            }
        }
        List<String> base = palabras.stream().map(Tokenizador::singular).toList();
        List<String> resultado = new ArrayList<>(base);
        for (int i = 0; i < base.size() - 1; i++) {
            resultado.add(base.get(i) + "_" + base.get(i + 1));
        }
        // Cada grupo se agrega dos veces para que pese mas que una palabra suelta
        GRUPOS.forEach((nombre, claves) -> {
            if (palabras.stream().anyMatch(p -> claves.stream().anyMatch(c -> p.startsWith(c.substring(0, Math.min(5, c.length())))))) {
                resultado.add(nombre);
                resultado.add(nombre);
            }
        });
        return resultado;
    }

    private static String singular(String palabra) {
        return palabra.length() > 4 && palabra.endsWith("s") ? palabra.substring(0, palabra.length() - 1) : palabra;
    }

    private static String sinTildes(String texto) {
        return Normalizer.normalize(texto == null ? "" : texto, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", " ")
                .trim();
    }
}
